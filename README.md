# INSTEMA Toshkent — Master-Class sayti

Juan José Boscà Gandía bilan Toshkentda o'tkaziladigan manual terapiya /
osteopatiya xalqaro amaliy master-classi uchun landing sayt + admin panel.

React (Vite) + React Router bilan qurilgan. Ro'yxatdan o'tish arizalari
`json-server` orqali `db.json` fayliga saqlanadi (kichik demo/lokal backend).

## Loyihaning tuzilishi

```
masterclass-site/
├── db.json                  # "backend" — json-server bazasi (registrations, admins)
├── index.html
├── package.json
├── src/
│   ├── main.jsx               # ilova kirish nuqtasi
│   ├── App.jsx                 # marshrutlar (/, /admin)
│   ├── index.css               # global dizayn tokenlari (ranglar, shriftlar)
│   ├── data/
│   │   └── content.js          # saytdagi barcha matn/kontent (flyerdan olingan)
│   ├── context/
│   │   ├── AuthContext.jsx         # admin login holati
│   │   └── RegistrationContext.jsx # arizalar bilan ishlash (fetch/add/update/delete)
│   ├── components/
│   │   ├── Header.jsx / .css
│   │   ├── Hero.jsx / .css
│   │   ├── OpeningQuestions.jsx / .css
│   │   ├── Pillars.jsx / .css
│   │   ├── ProgramTimeline.jsx / .css   # 10 bosqichli dastur (klinik algoritm)
│   │   ├── Speaker.jsx / .css
│   │   ├── Audience.jsx / .css
│   │   ├── Pricing.jsx / .css
│   │   ├── RegisterSection.jsx / .css   # ro'yxatdan o'tish formasi
│   │   ├── Footer.jsx / .css
│   │   ├── AdminLogin.jsx / .css
│   │   └── AdminDashboard.jsx / .css
│   └── pages/
│       ├── Home.jsx            # asosiy sahifa (barcha bo'limlarni yig'adi)
│       └── Admin.jsx           # /admin — login yoki dashboard
```

## O'rnatish

Node.js 18+ talab qilinadi.

```bash
npm install
```

## Ishga tushirish (development)

Saytda ham frontend (Vite), ham backend (json-server) bir vaqtda ishlashi kerak.

**Eng oson yo'li:**

```bash
npm start
```

Bu buyruq frontend va backendni birga ishga tushiradi **va saytni
brauzerda avtomatik ochadi** (`http://localhost:5173`).

Agar brauzer avtomatik ochilishi kerak bo'lmasa:

```bash
npm run dev:all
```

Bu quyidagilarni ochadi:
- **Sayt:** http://localhost:5173
- **API (json-server):** http://localhost:3001

Agar alohida ishga tushirmoqchi bo'lsangiz, ikkita terminalda:

```bash
npm run dev      # frontend — http://localhost:5173
npm run server   # backend  — http://localhost:3001
```

> **Muhim:** Ro'yxatdan o'tish formasi va admin panel `http://localhost:3001`
> manziliga so'rov yuboradi. Agar `npm run server` ishga tushirilmagan bo'lsa,
> forma va admin panel xato haqida xabar beradi.

## Sahifalar

- **`/`** — asosiy landing sahifa (flyerdagi barcha bo'limlar: muammo,
  klinik tizim, 10 bosqichli dastur, **amaliyotdan video/foto lavhalar**,
  spiker, kimlar uchun, narx, ro'yxatdan o'tish formasi).
- **`/admin`** — boshqaruv paneli. Kirish uchun demo login:
  - **Login:** `admin`
  - **Parol:** `instema2026`

  Admin panelda: barcha arizalarni ko'rish, qidirish, holat bo'yicha
  filtrlash (yangi / bog'lanildi / tasdiqlandi / bekor qilindi), holatni
  o'zgartirish, arizani o'chirish, CSV formatida yuklab olish.

  > Login va parolni ishlab chiqarishga chiqarishdan oldin `db.json` dagi
  > `admins` massivida o'zgartiring.

## Kontentni tahrirlash

Barcha matnlar (savollar, dastur bo'limlari, spiker haqida, narx va h.k.)
`src/data/content.js` faylida joylashgan — dizaynga tegmasdan matnni
o'zgartirish uchun shu faylni tahrirlang.

Ranglar va shriftlar `src/index.css` dagi `:root` ichida `--ink`, `--rust`,
`--paper`, `--font-display`, `--font-body` kabi o'zgaruvchilar orqali
boshqariladi.

## Media (video va fotolar)

"Amaliyotda" bo'limi va spiker fotosi uchun barcha rasm/video fayllar
`public/media/` papkasida:

```
public/media/
├── photos/     # 8 ta foto (portret, klinikadagi seanslar, o'quv jarayoni)
└── videos/     # 3 ta qisqa video (mp4) + har biri uchun poster rasm
```

Fayllarni almashtirish uchun xuddi shu nom bilan yangi faylni shu papkaga
qo'ying, yoki `src/data/content.js` dagi `galleryPhotos` / `galleryVideos`
massivlarida yo'l va sarlavhalarni o'zgartiring.

> Videolar veb uchun H.264/MP4 formatiga o'tkazilgan va siqilgan
> (jami ~13MB). Agar o'z videolaringizni qo'shsangiz, brauzerlarda
> ishlashi uchun ularni ham MP4 (H.264) formatida saqlang.

## Production uchun build qilish

```bash
npm run build
```

Tayyor statik fayllar `dist/` papkasida bo'ladi. Uni istalgan statik hosting
(Netlify, Vercel, oddiy Nginx va h.k.) ga joylashtirish mumkin.

**Diqqat:** `json-server` demo/development uchun mo'ljallangan oddiy
backend. Haqiqiy production saytda arizalarni Google Sheets, Telegram bot,
yoki to'liq backend (Node/Express, Firebase va h.k.) orqali qabul qilish
tavsiya etiladi — hozirgi `db.json` yechimi faqat lokal muhitda ishlaydi.

## Ishlatilgan texnologiyalar

- React 19 + Vite
- React Router 7
- json-server (fake REST API / db.json)
- Toza CSS (framework yo'q) — moslashuvchan dizayn tokenlari bilan
