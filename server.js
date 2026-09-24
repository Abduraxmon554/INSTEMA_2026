import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const { Pool } = pg;
const scrypt = promisify(crypto.scrypt);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Render proksi ortida ishlaydi — haqiqiy mijoz IP'sini olish uchun (rate limit).
app.set('trust proxy', 1);

// CORS_ORIGIN — vergul bilan ajratilgan ruxsat etilgan saytlar ro'yxati
// (masalan: https://sizning-sayt.vercel.app). Bo'sh bo'lsa hamma saytga ruxsat.
const corsOrigins = (process.env.CORS_ORIGIN || '').split(',').map(o => o.trim().replace(/\/$/, '')).filter(Boolean);
app.use(cors({
  origin: corsOrigins.length ? corsOrigins : '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '100kb' }));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (req.secure) res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  next();
});

// ===================== Autentifikatsiya =====================
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 soat
let AUTH_SECRET = process.env.AUTH_SECRET;
if (!AUTH_SECRET && process.env.NODE_ENV === 'production') {
  console.error("❌ Production rejimida AUTH_SECRET majburiy.");
  process.exit(1);
}
if (!AUTH_SECRET) {
  AUTH_SECRET = crypto.randomBytes(32).toString('hex');
  console.warn("⚠️ AUTH_SECRET o'rnatilmagan. Vaqtinchalik kalit yaratildi — server qayta ishga tushganda barcha adminlar qayta login qilishi kerak.");
}

const DEFAULT_ADMIN_PASSWORD = 'instema2026'; // db.seed.json dagi standart parol

const isHashed = (value) => typeof value === 'string' && value.startsWith('scrypt$');

async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
}

async function verifyPassword(password, stored) {
  if (!isHashed(stored)) return false;
  const [, saltHex, hashHex] = stored.split('$');
  const expected = Buffer.from(hashHex, 'hex');
  const actual = await scrypt(password, Buffer.from(saltHex, 'hex'), expected.length);
  return crypto.timingSafeEqual(actual, expected);
}

function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', AUTH_SECRET).update(body).digest('base64url');
  return `${body}.${sig}`;
}

function verifyToken(token) {
  if (typeof token !== 'string') return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = crypto.createHmac('sha256', AUTH_SECRET).update(body).digest();
  let given;
  try { given = Buffer.from(sig, 'base64url'); } catch { return null; }
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const payload = header.startsWith('Bearer ') ? verifyToken(header.slice(7)) : null;
  if (!payload || payload.role !== 'admin') {
    return res.status(401).json({ error: "Avtorizatsiya talab qilinadi. Qayta login qiling." });
  }
  req.auth = payload;
  next();
}

// Oddiy xotiradagi rate limit (bitta server uchun yetarli).
function rateLimit({ windowMs, max, message }) {
  const hits = new Map();
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key);
  }, windowMs).unref();
  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip;
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }
    entry.count += 1;
    if (entry.count > max) {
      res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({ error: message });
    }
    next();
  };
}

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: "Juda ko'p urinish. 15 daqiqadan keyin qayta urinib ko'ring." });
const registrationLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30, message: "Juda ko'p so'rov yuborildi. Birozdan keyin qayta urinib ko'ring." });
const reviewLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: "Juda ko'p sharh yuborildi. Birozdan keyin qayta urinib ko'ring." });

const cleanText = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
const STATUS_OPTIONS = ["yangi", "bog'lanildi", "tasdiqlandi", "bekor qilindi"];


const dbUrl = process.env.DATABASE_URL;
let pool = null;
let usePostgres = false;

const DB_SEED_PATH = path.join(__dirname, 'db.seed.json');

function getSeedData() {
  try {
    if (fs.existsSync(DB_SEED_PATH)) {
      return JSON.parse(fs.readFileSync(DB_SEED_PATH, 'utf-8'));
    }
  } catch (err) {
    console.error("db.seed.json ni o'qishda xatolik:", err.message);
  }
  return {
    registrations: [],
    reviews: [],
    certificates: [],
    schedule: [],
    website: []
  };
}


if (dbUrl) {
  console.log("Bazaga ulanish URLi aniqlandi. PostgreSQL ulanmoqda...");
  const isLocal = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');
  pool = new Pool({
    connectionString: dbUrl,
    // Render External/Internal URL uchun SSL shart; lokal Postgres uchun kerak emas.
    ssl: isLocal ? false : { rejectUnauthorized: false }
  });
  // Bo'sh turgan ulanish uzilib qolsa (Render free tarifida bo'ladi) server qulab tushmasin.
  pool.on('error', (err) => {
    console.error("⚠️ PostgreSQL pool xatosi (server ishlashda davom etadi):", err.message);
  });
} else {
  console.error("❌ DATABASE_URL o'rnatilmagan. Server PostgreSQL bazasiz ishlamaydi (data/db.json fallback olib tashlangan).");
  process.exit(1);
}

// Ochiq matndagi parollarni hash'laydi, .env dagi adminni yaratadi/yangilaydi
// va standart parolli (instema2026) adminni olib tashlaydi yoki ogohlantiradi.
async function secureAccounts() {
  const envUsername = cleanText(process.env.ADMIN_USERNAME, 64);
  const envPassword = process.env.ADMIN_PASSWORD || '';
  const hasEnvAdmin = Boolean(envUsername && envPassword);

  const admins = (await pool.query('SELECT id, username, password FROM admins')).rows;
  const users = (await pool.query('SELECT id, username, password FROM users')).rows;

  const changed = [];
  for (const [table, rows] of [['admins', admins], ['users', users]]) {
    for (const row of rows) {
      if (!isHashed(row.password)) {
        row.password = await hashPassword(String(row.password ?? ''));
        changed.push({ table, row });
      }
    }
  }

  if (hasEnvAdmin) {
    const existing = admins.find(a => a.username.toLowerCase() === envUsername.toLowerCase());
    if (existing) {
      if (!(await verifyPassword(envPassword, existing.password))) {
        existing.password = await hashPassword(envPassword);
        changed.push({ table: 'admins', row: existing });
      }
    } else {
      const row = { id: crypto.randomUUID(), username: envUsername, password: await hashPassword(envPassword) };
      admins.push(row);
      changed.push({ table: 'admins', row, isNew: true });
    }
  }

  const removed = [];
  for (const admin of [...admins]) {
    if (!(await verifyPassword(DEFAULT_ADMIN_PASSWORD, admin.password))) continue;
    if (hasEnvAdmin && admin.username.toLowerCase() !== envUsername.toLowerCase()) {
      admins.splice(admins.indexOf(admin), 1);
      removed.push(admin);
      console.log(`🔒 Standart parolli "${admin.username}" admini olib tashlandi (ADMIN_USERNAME ishlatiladi).`);
    } else {
      console.warn(`⚠️ XAVFSIZLIK: "${admin.username}" admini hali standart parol bilan turibdi. ADMIN_USERNAME va ADMIN_PASSWORD ni o'rnating!`);
    }
  }

  for (const { table, row, isNew } of changed) {
    if (removed.includes(row)) continue;
    if (isNew) {
      await pool.query(
        'INSERT INTO admins (id, username, password) VALUES ($1, $2, $3) ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password',
        [row.id, row.username, row.password]
      );
    } else {
      await pool.query(`UPDATE ${table} SET password = $1 WHERE id = $2`, [row.password, row.id]);
    }
  }
  for (const admin of removed) {
    await pool.query('DELETE FROM admins WHERE id = $1', [admin.id]);
  }

  if (changed.length) console.log(`🔐 ${changed.length} ta parol xavfsiz (hash) ko'rinishga o'tkazildi/yangilandi.`);
}

async function findAccount(username) {
  const lower = username.toLowerCase();
  const adminRes = await pool.query('SELECT id, username, password FROM admins WHERE lower(username) = $1', [lower]);
  if (adminRes.rows[0]) return { ...adminRes.rows[0], role: 'admin' };
  const userRes = await pool.query('SELECT id, username, password, role FROM users WHERE lower(username) = $1', [lower]);
  if (userRes.rows[0]) return { ...userRes.rows[0], role: userRes.rows[0].role || 'user' };
  return null;
}

async function initPostgres() {
  let client;
  try {
    client = await pool.connect();
    console.log("✅ PostgreSQL bazasiga muvaffaqiyatli ulandi!");
    usePostgres = true;

    // 1. Jadvallarni yaratish
    await client.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        profession TEXT,
        city TEXT,
        note TEXT,
        status TEXT NOT NULL DEFAULT 'yangi',
        attended BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS admins (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user'
      );

      CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY,
        registration_id TEXT,
        rating INTEGER NOT NULL DEFAULT 5,
        comment TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS certificates (
        id TEXT PRIMARY KEY,
        registration_id TEXT,
        full_name TEXT NOT NULL,
        profession TEXT,
        event_title TEXT NOT NULL,
        speaker TEXT NOT NULL,
        issue_date TEXT,
        hours_attended INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS schedule (
        id TEXT PRIMARY KEY,
        day INTEGER NOT NULL,
        date TEXT NOT NULL,
        sessions JSONB NOT NULL DEFAULT '[]'::jsonb
      );

      CREATE TABLE IF NOT EXISTS website (
        id TEXT PRIMARY KEY,
        url TEXT NOT NULL,
        name TEXT NOT NULL
      );
    `);


    const seed = getSeedData();


    const scheduleCountRes = await client.query('SELECT COUNT(*) FROM schedule');
    if (parseInt(scheduleCountRes.rows[0].count, 10) === 0 && seed.schedule?.length) {
      for (const s of seed.schedule) {
        await client.query(
          'INSERT INTO schedule (id, day, date, sessions) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING',
          [s.id || crypto.randomUUID(), s.day, s.date, JSON.stringify(s.sessions || [])]
        );
      }
      console.log("ℹ️ Schedule jadvali boshlang'ich ma'lumotlar bilan to'ldirildi.");
    }

    const reviewsCountRes = await client.query('SELECT COUNT(*) FROM reviews');
    if (parseInt(reviewsCountRes.rows[0].count, 10) === 0 && seed.reviews?.length) {
      for (const r of seed.reviews) {
        await client.query(
          'INSERT INTO reviews (id, registration_id, rating, comment, created_at) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING',
          [r.id || crypto.randomUUID(), r.registrationId || null, r.rating || 5, r.comment, r.createdAt || new Date().toISOString()]
        );
      }
      console.log("ℹ️ Reviews jadvali boshlang'ich ma'lumotlar bilan to'ldirildi.");
    }

    const certCountRes = await client.query('SELECT COUNT(*) FROM certificates');
    if (parseInt(certCountRes.rows[0].count, 10) === 0 && seed.certificates?.length) {
      for (const c of seed.certificates) {
        await client.query(
          'INSERT INTO certificates (id, registration_id, full_name, profession, event_title, speaker, issue_date, hours_attended, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (id) DO NOTHING',
          [c.id || crypto.randomUUID(), c.registrationId || null, c.fullName, c.profession, c.eventTitle, c.speaker, c.issueDate, c.hoursAttended || 0, c.createdAt || new Date().toISOString()]
        );
      }
      console.log("ℹ️ Certificates jadvali boshlang'ich ma'lumotlar bilan to'ldirildi.");
    }

    const websiteCountRes = await client.query('SELECT COUNT(*) FROM website');
    if (parseInt(websiteCountRes.rows[0].count, 10) === 0 && seed.website?.length) {
      for (const w of seed.website) {
        await client.query(
          'INSERT INTO website (id, url, name) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING',
          [w.id || crypto.randomUUID(), w.url, w.name]
        );
      }
      console.log("ℹ️ Website jadvali boshlang'ich ma'lumotlar bilan to'ldirildi.");
    }

    await secureAccounts();
  } catch (err) {
    console.error("❌ PostgreSQL bazasiga ulanishda yoki jadvallarni sozlashda xatolik:", err.message);
    console.error("❌ Server to'xtatildi: DATABASE_URL ni tekshiring.");
    process.exit(1);
  } finally {
    if (client) client.release();
  }
}


app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mode: usePostgres ? 'postgresql' : 'starting',
    time: new Date().toISOString()
  });
});

let dummyHash = null;
app.post('/api/login', loginLimiter, async (req, res) => {
  try {
    const username = cleanText(req.body?.username, 64);
    const password = cleanText(req.body?.password, 200);
    if (!username || !password) {
      return res.status(400).json({ error: "Login va parolni kiriting." });
    }

    const account = await findAccount(username);
    let ok = false;
    if (account) {
      ok = await verifyPassword(password, account.password);
    } else {
      // Login mavjud/mavjud emasligini vaqt orqali bildirmaslik uchun.
      dummyHash = dummyHash || await hashPassword('dummy');
      await verifyPassword(password, dummyHash);
    }
    if (!ok) return res.status(401).json({ error: "Login yoki parol noto'g'ri." });

    const expiresAt = Date.now() + TOKEN_TTL_MS;
    const token = signToken({ sub: account.id, u: account.username, role: account.role, exp: expiresAt });
    res.json({ token, expiresAt, user: { id: account.id, username: account.username, role: account.role } });
  } catch (err) {
    console.error("Login xatosi:", err);
    res.status(500).json({ error: "Kirishda xatolik yuz berdi." });
  }
});

app.get('/registrations', requireAdmin, async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          id,
          full_name AS "fullName",
          phone,
          email,
          profession,
          city,
          note,
          status,
          attended,
          created_at AS "createdAt"
        FROM registrations
        ORDER BY created_at DESC
      `);
      return res.json(result.rows);
    } catch (err) {
      console.error("Arizalarni olishda xato:", err);
      return res.status(500).json({ error: "Ma'lumotlar bazasidan arizalarni olishda xato yuz berdi" });
    }
});

app.post('/registrations', registrationLimiter, async (req, res) => {
  // Ochiq forma: faqat shu maydonlar qabul qilinadi. id, status, sana va "attended"
  // har doim serverda belgilanadi (mijoz o'zboshimchalik bilan yubora olmaydi).
  const body = req.body || {};
  const fullName = cleanText(body.fullName, 120);
  const phone = cleanText(body.phone, 32);
  const email = cleanText(body.email, 254);
  const profession = cleanText(body.profession, 120);
  const city = cleanText(body.city, 120);
  const note = cleanText(body.note, 1000);
  if (!fullName || phone.length < 5) {
    return res.status(400).json({ error: "Ism va telefon raqamni to'g'ri kiriting." });
  }
  const newId = crypto.randomUUID();
  const createdDate = new Date().toISOString();
  const currentStatus = 'yangi';
  const attended = false;

    try {
      const result = await pool.query(`
        INSERT INTO registrations (id, full_name, phone, email, profession, city, note, status, attended, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING
          id,
          full_name AS "fullName",
          phone,
          email,
          profession,
          city,
          note,
          status,
          attended,
          created_at AS "createdAt"
      `, [newId, fullName, phone, email || null, profession || null, city || null, note || null, currentStatus, attended, createdDate]);

      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Arizani saqlashda xato:", err);
      return res.status(500).json({ error: "Arizani bazaga saqlashda xatolik yuz berdi" });
    }
});

app.patch('/registrations/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status, attended, fullName, phone, email, profession, city, note } = req.body || {};
  if (status !== undefined && !STATUS_OPTIONS.includes(status)) {
    return res.status(400).json({ error: "Noto'g'ri holat qiymati." });
  }

    try {
      const existingRes = await pool.query('SELECT * FROM registrations WHERE id = $1', [id]);
      if (existingRes.rows.length === 0) {
        return res.status(404).json({ error: "Ariza topilmadi" });
      }

      const updatedRes = await pool.query(`
        UPDATE registrations
        SET
          status = COALESCE($1, status),
          attended = COALESCE($2, attended),
          full_name = COALESCE($3, full_name),
          phone = COALESCE($4, phone),
          email = COALESCE($5, email),
          profession = COALESCE($6, profession),
          city = COALESCE($7, city),
          note = COALESCE($8, note)
        WHERE id = $9
        RETURNING
          id,
          full_name AS "fullName",
          phone,
          email,
          profession,
          city,
          note,
          status,
          attended,
          created_at AS "createdAt"
      `, [
        status !== undefined ? status : null,
        attended !== undefined ? attended : null,
        fullName !== undefined ? fullName : null,
        phone !== undefined ? phone : null,
        email !== undefined ? email : null,
        profession !== undefined ? profession : null,
        city !== undefined ? city : null,
        note !== undefined ? note : null,
        id
      ]);

      return res.json(updatedRes.rows[0]);
    } catch (err) {
      console.error("Arizani yangilashda xato:", err);
      return res.status(500).json({ error: "Arizani yangilashda xatolik yuz berdi" });
    }
});

app.delete('/registrations/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;

    try {
      await pool.query('DELETE FROM registrations WHERE id = $1', [id]);
      return res.json({ ok: true, id });
    } catch (err) {
      console.error("Arizani o'chirishda xato:", err);
      return res.status(500).json({ error: "Arizani o'chirishda xatolik yuz berdi" });
    }
});

app.get('/reviews', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          id,
          registration_id AS "registrationId",
          rating,
          comment,
          created_at AS "createdAt"
        FROM reviews
        ORDER BY created_at DESC
      `);
      return res.json(result.rows);
    } catch (err) {
      console.error("Sharhlarni olishda xato:", err);
      return res.status(500).json({ error: "Sharhlarni olishda xatolik" });
    }
});

app.post('/reviews', reviewLimiter, async (req, res) => {
  const body = req.body || {};
  const comment = cleanText(body.comment, 1000);
  if (!comment) {
    return res.status(400).json({ error: "Sharh matnini kiriting." });
  }
  const registrationId = null; // ochiq forma orqali ariza bilan bog'lanmaydi
  const newId = crypto.randomUUID();
  const createdDate = new Date().toISOString();
  const numRating = Math.min(5, Math.max(1, parseInt(body.rating, 10) || 5));

    try {
      const result = await pool.query(`
        INSERT INTO reviews (id, registration_id, rating, comment, created_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
          id,
          registration_id AS "registrationId",
          rating,
          comment,
          created_at AS "createdAt"
      `, [newId, registrationId || null, numRating, comment, createdDate]);

      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Sharh qo'shishda xato:", err);
      return res.status(500).json({ error: "Sharhni saqlashda xatolik" });
    }
});

app.get('/certificates', requireAdmin, async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          id,
          registration_id AS "registrationId",
          full_name AS "fullName",
          profession,
          event_title AS "eventTitle",
          speaker,
          issue_date AS "issueDate",
          hours_attended AS "hoursAttended",
          created_at AS "createdAt"
        FROM certificates
        ORDER BY created_at ASC
      `);
      return res.json(result.rows);
    } catch (err) {
      console.error("Sertifikatlarni olishda xato:", err);
      return res.status(500).json({ error: "Sertifikatlarni olishda xatolik" });
    }
});

app.get('/schedule', async (req, res) => {
    try {
      const result = await pool.query('SELECT id, day, date, sessions FROM schedule ORDER BY day ASC');
      return res.json(result.rows);
    } catch (err) {
      console.error("Jadvalni olishda xato:", err);
      return res.status(500).json({ error: "Dastur jadvalini olishda xatolik" });
    }
});

app.get('/website', async (req, res) => {
    try {
      const result = await pool.query('SELECT id, url, name FROM website');
      return res.json(result.rows);
    } catch (err) {
      console.error("Website havolalarni olishda xato:", err);
      return res.status(500).json({ error: "Sayt havolalarini olishda xatolik" });
    }
});

const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { dotfiles: 'ignore', index: 'index.html' }));
  app.use((req, res, next) => {
    if (
      req.method === 'GET' &&
      !req.path.startsWith('/api') &&
      !req.path.startsWith('/registrations') &&
      !req.path.startsWith('/reviews') &&
      !req.path.startsWith('/admins') &&
      !req.path.startsWith('/users') &&
      !req.path.startsWith('/certificates') &&
      !req.path.startsWith('/schedule') &&
      !req.path.startsWith('/website')
    ) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

 
app.listen(PORT, async () => {
  console.log(`🚀 Server ${PORT} portida ishga tushdi.`);
  await initPostgres();
});
