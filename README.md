# INSTEMA Toshkent — Master-Class sayti

React (Vite) + Express + PostgreSQL. `db.json` ishlatilmaydi — barcha ma'lumotlar
(arizalar, sharhlar, dastur, adminlar) PostgreSQL bazada saqlanadi.

- Sayt: `/`
- Admin kirish: `/login`  ->  panel: `/seminar`

## Tez boshlash

1. Node.js 20+ o'rnating (`node -v` bilan tekshiring).
2. Bepul baza oching: neon.tech -> Create project -> **Connect** -> connection string'ni nusxalang.
3. Terminalda loyiha papkasida:

```bash
npm install
copy .env.example .env        # Mac/Linux: cp .env.example .env
```

4. `.env` ni ochib 4 qatorni to'ldiring:

```
DATABASE_URL=postgresql://...neon.tech/neondb?sslmode=require
ADMIN_USERNAME=admin
ADMIN_PASSWORD=kuchli-parol-12+belgi
AUTH_SECRET=uzun-tasodifiy-qator
```

AUTH_SECRET yaratish:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

5. Ishga tushirish:

```bash
npm run dev:all          # tahrirlash rejimi -> http://localhost:5173
# yoki haqiqiy rejim:
npm run build
npm start                # -> http://localhost:3001
```

Jadvallar birinchi ishga tushishda avtomatik yaratiladi.
Admin parolini almashtirish: `.env` dagi `ADMIN_PASSWORD` ni o'zgartirib, serverni qayta ishga tushiring.

## Internetga chiqarish

`DEPLOY.md` ga qarang (GitHub -> Render -> domen).

## Kontent

- Matnlar: `src/data/content.js`
- Tarjimalar: `src/i18n/translations.js`
- Dastur jadvali/sharhlar: bazada (`db.seed.json` faqat birinchi to'ldirish uchun)
- Ranglar/shriftlar: `src/index.css` (`:root`)
- Rasm/video: `public/media/`

## Muhit o'zgaruvchilari

`.env.example` da hammasi izohlangan. Majburiy: `DATABASE_URL`, `ADMIN_USERNAME`,
`ADMIN_PASSWORD` (production'da `AUTH_SECRET` ham).

## Xavfsizlik

- Parollar `scrypt` bilan hash'lanadi, login serverda tekshiriladi (`POST /api/login`).
- `GET/PATCH/DELETE /registrations` va `GET /certificates` faqat admin tokeni bilan ochiladi.
- `.env` ni hech qachon GitHub'ga yuklamang (`.gitignore` da bor).
