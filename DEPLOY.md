# instema.uz ni Render'ga joylash

1. Loyihani GitHub'ga (private repo) yuklang. `.env` yuklanmaydi (.gitignore'da).
2. render.com -> New -> Blueprint -> repoingizni tanlang (render.yaml o'zi o'qiladi).
3. Render so'raydigan 3 ta qiymatni kiriting:
   - DATABASE_URL  : Neon connection string (Neon -> Connect)
   - ADMIN_USERNAME: masalan admin
   - ADMIN_PASSWORD: kuchli parol (12+ belgi)
   AUTH_SECRET ni Render o'zi yaratadi.
4. Deploy tugagach: Settings -> Custom Domains -> instema.uz va www.instema.uz ni qo'shing.
5. Render ko'rsatgan DNS yozuvlarini domen panelida kiriting:
   - www  -> CNAME (Render bergan manzil)
   - instema.uz -> A yozuvi (Render bergan IP) yoki ALIAS
6. Tekshiring: https://instema.uz (sayt), https://instema.uz/login (admin).

Eslatma: bepul tarifda sayt 15 daqiqa foydalanilmasa uxlaydi (birinchi kirish 30-60 soniya).
Neon parolini almashtirgan bo'lsangiz, yangi manzilni ishlating.
