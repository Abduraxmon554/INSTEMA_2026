// Barcha sayt matnlari — til bo'yicha (uz / es).
// Har bir tilning tuzilishi bir xil bo'lishi shart: yangi til qo'shish uchun
// shu faylga yangi kalit (masalan "ru") qo'shib, xuddi shu shakl bo'yicha
// tarjima qiling, so'ng LanguageContext.jsx dagi SUPPORTED_LANGS ro'yxatiga
// qo'shing.

export const translations = {
  uz: {
    code: "uz",
    label: "UZ",
    flag: "🇺🇿",
    htmlLang: "uz",

    nav: {
      program: "Dastur",
      practice: "Amaliyotda",
      speaker: "Spiker",
      audience: "Kimlar uchun",
      register: "Ro'yxatdan o'tish",
      login: "Login",
      cta: "Ariza qoldirish",
      admin: "Admin",
      menuLabel: "Menyu",
    },

    event: {
      speakerFlag: "🇪🇸",
      speakerName: "Juan José Boscà Gandía",
      eyebrowSuffix: "Xalqaro amaliy seminar",
      title: "Toshkentda xalqaro amaliy master-class",
      subjects: [
        "Manual terapiya",
        "Osteopatiya",
        "Clinical reasoning",
        "Neyrofiziologiya",
        "Manipulyativ texnikalar",
      ],
      tagline: "Texnikani yodlash emas.",
      taglineFull:
        "Bemorni tushunish, klinik fikrlash va to'g'ri manual strategiyani tanlash.",
      city: "Toshkent",
      venueNote: "Aniq manzil ro'yxatdan o'tgan ishtirokchilarga elektron pochta orqali yuboriladi.",
      price: "$1,200",
      seatsNote: "Joylar cheklangan",
      heroCtaPrimary: "Seminar dasturini olish",
      heroCtaSecondary: "Dasturni ko'rish",
      addToCalendarCta: "Kalendarga qo'shish",
      metaAddress: "Manzil",
      metaInvestment: "Investitsiya",
      metaSeats: "Joylar",
      figureCaption: "SUR. 01 — SEGMENTAR BAHOLASH",
    },

    countdown: {
      label: "Master-class boshlanishiga",
      ariaLabel: "Master-class boshlanishiga qolgan vaqt",
      days: "kun",
      hours: "soat",
      minutes: "daqiqa",
      seconds: "soniya",
    },

    contact: {
      ariaLabel: "Tezkor bog'lanish",
      whatsappLabel: "WhatsApp orqali yozing",
      telegramLabel: "Telegram orqali yozing",
      whatsappPrefill: "Assalomu alaykum! Master-class haqida savolim bor edi.",
    },

    notFound: {
      title: "Sahifa topilmadi",
      text: "Siz izlagan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.",
      cta: "Bosh sahifaga qaytish",
    },

    openingQuestions: {
      kicker: "MUAMMO",
      title:
        "Manual terapevt uchun eng muhim ko'nikma — ko'proq texnika bilish emas",
      lede: "Muhimi — to'g'ri klinik qaror qabul qilish.",
      items: [
        "Bir xil simptomga ega ikki bemor nima uchun bir xil davolanishi shart emas?",
        "Qaysi holatda manual terapiya tanlanadi?",
        "Qachon manipulyatsiya qilish mumkin emas?",
        "Og'riq manbai haqiqatan ham bemor ko'rsatayotgan joymi?",
        "Nevrologik komponent mavjudligini qanday baholash mumkin?",
        "Davolashdan keyingi o'zgarishni qanday tekshirish kerak?",
      ],
      answer:
        "Ushbu Master-Class aynan shu savollarga tizimli yondashuv beradi.",
    },

    pillars: {
      kicker: "TIZIM",
      title: "Bu oddiy texnika kursi emas",
      lede:
        "Seminar quyidagi yo'nalishlarni yagona klinik tizimga birlashtiradi.",
      items: [
        {
          icon: "🧠",
          title: "Clinical reasoning",
          text: "Klinik fikrlash va qaror qabul qilish.",
        },
        {
          icon: "🔬",
          title: "Clinical assessment",
          text: "Anamnez, fizik tekshiruv, funksional baholash va qayta baholash.",
        },
        {
          icon: "🧠",
          title: "Neyrofiziologiya",
          text: "Og'riq, nosisepsiya, sensor-motor tizim va manual stimulyatsiyaning neyrofiziologik asoslari.",
        },
        {
          icon: "🦴",
          title: "Osteopatiya",
          text: "Strukturaviy va funksional munosabatlarni klinik fikrlash bilan integratsiya qilish.",
        },
        {
          icon: "🤲",
          title: "Manual terapiya",
          text: "Mobilizatsiya, artikulyatsion, yumshoq to'qima va boshqa manual yondashuvlar.",
        },
        {
          icon: "⚡️",
          title: "Manipulyatsiya",
          text: "Vertebral manipulyatsiyaning klinik tanlovi, biomekanikasi va xavfsizlik tamoyillari.",
        },
        {
          icon: "💪",
          title: "Muskul-skelet tizimi",
          text: "Cervical, thoracic, lumbar, pelvis va periferik bo'g'imlarni kompleks baholash.",
        },
      ],
    },

    program: {
      kicker: "DASTUR",
      title: "Seminarda nimalar o'rganiladi?",
      lede:
        "O'n bosqichli klinik yo'l — anamnezdan tortib manipulyatsiyadan keyingi reassessmentgacha.",
      modules: [
        {
          num: "01",
          title: "Klinik diagnostika",
          intro:
            "Anamnez → simptomlarni tahlil qilish → klinik gipoteza → fizik tekshiruv → funksional baholash → davolash strategiyasi → reassessment",
          points: [
            "simptomlarni klinik tahlil qilish",
            "og'riq mexanizmlarini farqlash",
            "funksional cheklanishlarni aniqlash",
            "klinik testlardan maqsadli foydalanish",
            "palpatsiyani klinik kontekstda qo'llash",
            "davolashdan oldin va keyin baholash",
          ],
        },
        {
          num: "02",
          title: "Neyrofiziologiya va og'riq",
          intro: "Manual terapiyaga zamonaviy neyrofiziologik qarash.",
          points: [
            "nosisepsiya",
            "og'riqni modulyatsiya qilish",
            "periferik va markaziy mexanizmlar",
            "sensor-motor tizim",
            "propriosepsiya",
            "mexanoreseptorlar",
            "og'riq va harakat o'rtasidagi bog'liqlik",
          ],
        },
        {
          num: "03",
          title: "Osteopatik klinik yondashuv",
          intro:
            "Osteopatik topilmani shunchaki \u201ctopish\u201d emas. Savol: \u201cBu topilma bemorning klinik holati bilan qanday bog'liq?\u201d",
          points: [
            "strukturaviy va funksional munosabatlar",
            "segmental harakat",
            "bo'g'imlararo bog'liqlik",
            "mushak-fassial tizim",
            "kompensatsion harakatlar",
            "klinik ahamiyatga ega topilmalarni ajratish",
          ],
        },
        {
          num: "04",
          title: "Muskul-skelet tizimiga kompleks yondashuv",
          intro:
            "Bemorni faqat og'riyotgan joy orqali baholash emas. Masalan, bo'yin og'rig'ida: Cervical → Thoracic → Shoulder Complex → Nerv System → Movement Strategy → Pain Mechanism.",
          points: [
            "Cervical",
            "Thoracic",
            "Lumbar",
            "Pelvis",
            "Shoulder",
            "Elbow",
            "Wrist",
            "Hip",
            "Knee",
            "Ankle",
          ],
        },
        {
          num: "05",
          title: "Manual terapiya",
          intro:
            "Har bir manual texnika uchun beshta asosiy savol: qachon? nima uchun? qanday? qachon qo'llamaslik kerak? natijani qanday baholash kerak?",
          points: [
            "mobilizatsiya",
            "artikulyatsion texnikalar",
            "yumshoq to'qimalar bilan ishlash",
            "spinal segmentlar",
            "periferik bo'g'imlar",
            "funksional manual yondashuvlar",
          ],
        },
        {
          num: "06",
          title: "Vertebral manipulyatsiya",
          intro:
            "Manipulyatsiya — shunchaki kuchli harakat emas. U klinik tanlov, anatomiya, biomekanika, pozitsiyalash, xavfsizlik, texnika va qayta baholash kombinatsiyasidir.",
          points: [
            "ko'rsatmalar",
            "kontraindikatsiyalar",
            "bemorni tanlash",
            "segmentni baholash",
            "terapevt va bemor pozitsiyasi",
            "biomekanik parametrlar",
            "texnikani bajarish",
            "xavfsizlik",
            "manipulyatsiyadan keyingi reassessment",
          ],
        },
        {
          num: "07",
          title: "Cervical • Thoracic • Lumbar",
          intro: "",
          points: [
            "Cervical — bo'yin og'rig'i, harakat cheklanishi, klinik baholash, nevrologik komponent va xavfsiz manual/manipulyativ yondashuvlar",
            "Thoracic — thoracic segmentlar, ko'krak qafasi harakatchanligi va cervical/shoulder complex bilan funksional aloqalar",
            "Lumbar — bel og'rig'i, radikulyar simptomlar, funksional baholash va manual/manipulyativ yondashuvlar",
          ],
        },
        {
          num: "08",
          title: "Nevrologik komponent",
          intro:
            "Manual terapevt uchun muhim savol: \u201cBu oddiy muskul-skelet muammosimi yoki nevrologik komponent mavjudmi?\u201d",
          points: [
            "radikulyar simptomlar",
            "periferik nervlar",
            "sensor o'zgarishlar",
            "motor komponent",
            "reflektor javoblar",
            "xavf belgilarini aniqlash",
            "qachon bemorni boshqa mutaxassisga yo'naltirish kerakligi",
          ],
        },
        {
          num: "09",
          title: "Klinik case'lar",
          intro:
            "Nazariyani real klinik vaziyatlarga qo'llash. Case: bo'yin og'rig'i + bosh og'rig'i + harakat cheklanishi. Darhol manipulyatsiyami? Yoki anamnez → xavf belgilarini baholash → nevrologik tekshiruv → funksional test → klinik gipoteza → davolash → reassessment?",
          points: [],
        },
        {
          num: "10",
          title: "Klinik algoritm",
          intro: "Seminar davomida asosiy model:",
          points: [
            "Patient — bemorni tinglash",
            "Assessment — klinik baholash",
            "Hypothesis — klinik gipoteza",
            "Decision — strategiyani tanlash",
            "Technique — mos manual/manipulyativ yondashuv",
            "Reassessment — natijani qayta baholash",
            "Adaptation — natijaga qarab strategiyani moslashtirish",
          ],
        },
      ],
    },

    gallery: {
      kicker: "AMALIYOTDA",
      title: "Bu odam nima qiladi",
      lede:
        "Juan José Boscà Gandía klinikada bemor bilan ishlaydi, xalqaro seminarlarda dars beradi va manual/manipulyativ texnikalarni jonli namoyish qiladi. Quyida — uning amaliyotidan qisqa lavhalar.",
      playLabelPrefix: "Videoni ko'rsatish: ",
      zoomLabelPrefix: "Kattalashtirish: ",
      closeLabel: "Yopish",
      audioNote: "Original audio: ispan tili",
      videos: [
        {
          id: "testimonial",
          src: "/media/videos/testimonial.mp4",
          poster: "/media/videos/testimonial-poster.jpg",
          caption: "Bel og'rig'i bo'yicha qisqa klinik sharh",
        },
        {
          id: "technique",
          src: "/media/videos/technique.mp4",
          poster: "/media/videos/technique-poster.jpg",
          caption: "Manipulyativ texnika amalda",
        },
        {
          id: "mobilization",
          src: "/media/videos/mobilization.mp4",
          poster: "/media/videos/mobilization-poster.jpg",
          caption: "Periferik bo'g'im mobilizatsiyasi",
        },
        {
          id: "clinic-session",
          src: "/media/videos/clinic-session.mp4",
          poster: "/media/videos/clinic-session-poster.jpg",
          caption: "Klinikada guruh bilan amaliy mashg'ulot",
        },
        {
          id: "spine-model-teaching",
          src: "/media/videos/spine-model-teaching.mp4",
          poster: "/media/videos/spine-model-teaching-poster.jpg",
          caption: "Umurtqa pog'onasi modeli asosida ma'ruza",
        },
        {
          id: "lecture-hall",
          src: "/media/videos/lecture-hall.mp4",
          poster: "/media/videos/lecture-hall-poster.jpg",
          caption: "Klinik dalillar bo'yicha ma'ruza",
        },
        {
          id: "group-circle",
          src: "/media/videos/group-circle.mp4",
          poster: "/media/videos/group-circle-poster.jpg",
          caption: "Guruh bilan amaliy muhokama",
        },
      ],
      photos: [
        {
          id: "cervical-adjust",
          src: "/media/photos/cervical-adjust.jpg",
          caption: "Cervical segmentni klinik baholash",
        },
        {
          id: "table-work",
          src: "/media/photos/table-work.jpg",
          caption: "Bemor bilan individual seans",
        },
        {
          id: "teaching-skull",
          src: "/media/photos/teaching-skull.jpg",
          caption: "Kranial anatomiya bo'yicha ma'ruza",
        },
        {
          id: "teaching-leg-raise",
          src: "/media/photos/teaching-leg-raise.jpg",
          caption: "Amaliy mashg'ulot — guruh bilan ishlash",
        },
        {
          id: "spine-model",
          src: "/media/photos/spine-model.jpg",
          caption: "INSTEMA o'quv markazida, Ispaniya",
        },
        {
          id: "classroom",
          src: "/media/photos/classroom.jpg",
          caption: "To'liq guruh bilan amaliy dars",
        },
        {
          id: "tashkent-flyer",
          src: "/media/photos/tashkent-flyer.jpg",
          caption: "Toshkent master-klassi — rasmiy taklifnoma",
        },
      ],
    },

    speaker: {
      kicker: "SPIKER",
      instituteLine:
        "INSTEMA — Instituto de Postgrado en Terapia Manual, direktor",
      name: "Juan José Boscà Gandía",
      roles: "Physiotherapist • Osteopath D.O. • Kinesiology & Physiatry • Nursing",
      bio: [
        "Juan José Boscà Gandía manual terapiya, osteopatiya va vertebral manipulyatsiya yo'nalishlarida xalqaro klinik va akademik tajribaga ega mutaxassis.",
        "U Valencia universitetida fizioterapiya bo'yicha tahsil olgan, Osteopath D.O. darajasiga ega, Kinesiologiya va Fiziatriya bo'yicha diplom olgan hamda INSTEMA — Instituto de Postgrado en Terapia Manual direktori sifatida faoliyat yuritadi.",
        "Uning ta'lim faoliyatida manual terapiya, vertebral manipulyatsiya, klinik yondashuv, neyrofiziologiya va amaliy texnikalar birlashtiriladi.",
      ],
    },

    audience: {
      kicker: "KIMLAR UCHUN?",
      title: "Ushbu Master-Class kimlar uchun",
      items: [
        "Fizioterapevtlar",
        "Osteopatlar",
        "Manual terapevtlar",
        "Reabilitologlar",
        "Sport fizioterapevtlari",
        "Shifokorlar",
        "Muskul-skelet tizimi bilan ishlaydigan malakali mutaxassislar",
      ],
      noteLabel: "Muhim:",
      note:
        "Manipulyativ texnikalar yuqori darajadagi anatomiya, klinik baholash va xavfsizlik bilimlarini talab qiladi.",
    },

    pricing: {
      kickerTakeaways: "SEMINARDAN NIMA OLASIZ?",
      title: "Faqat texnikalar ro'yxati emas — klinik fikrlash tizimi",
      takeaways: [
        "bemorni tizimli baholash",
        "klinik gipoteza tuzish",
        "simptom va mexanizmni farqlash",
        "neyrofiziologik mexanizmlarni tushunish",
        "manual terapiyani maqsadli tanlash",
        "manipulyatsiyaning klinik va xavfsizlik tamoyillarini tushunish",
        "spinal va periferik tizimlarni kompleks ko'rish",
        "davolashdan oldin va keyin natijani baholash",
        "individual davolash strategiyasini shakllantirish",
      ],
      kickerWhyPrefix: "NIMA UCHUN",
      lede:
        "Bu oddiy bir kunlik seminar narxi emas — bu xalqaro darajadagi professional ta'limga investitsiya.",
      flow: ["Assessment", "Clinical reasoning", "Decision", "Technique", "Reassessment"],
      closing:
        "Agar siz manual terapiya bilan professional darajada ishlasangiz, yangi texnika bilishdan ham muhimroq narsa bor: to'g'ri qaror qabul qilish.",
      perPerson: "1 kishi uchun",
      cta: "Ariza qoldirish",
    },

    register: {
      kicker: "RO'YXATDAN O'TISH",
      title: "Seminar haqida ma'lumot oling",
      lede:
        "Ismingizni qoldiring — menejerimiz siz bilan bog'lanib quyidagilar haqida to'liq ma'lumot beradi:",
      bullets: [
        "seminar dasturi",
        "sanasi va davomiyligi",
        "seminar manzili",
        "ishtirok shartlari",
        "to'lov tartibi",
        "ishtirokchi uchun taqdim etiladigan materiallar",
      ],
      seatsNote: "Joylar cheklangan.",
      success: {
        title: "Arizangiz qabul qilindi",
        text: "Tez orada menejerimiz siz bilan ko'rsatgan telefon raqamingiz orqali bog'lanadi.",
        paymentCta: "Click orqali to'lash",
        calendarCta: "Kalendarga qo'shish",
        cta: "Yana ariza qoldirish",
      },
      form: {
        fullNameLabel: "Ism va familiya *",
        fullNamePlaceholder: "Ismingiz Familiyangiz",
        fullNameError: "Ismingizni kiriting.",
        phoneLabel: "Telefon raqam *",
        phonePlaceholder: "+998 __ ___ __ __",
        phoneError: "To'g'ri telefon raqam kiriting.",
        emailLabel: "Email manzili",
        emailPlaceholder: "example@mail.com",
        professionLabel: "Mutaxassislik",
        professionPlaceholder: "Fizioterapevt, osteopat...",
        cityLabel: "Shahar",
        cityPlaceholder: "Toshkent",
        noteLabel: "Izoh (ixtiyoriy)",
        notePlaceholder: "Savol yoki qo'shimcha ma'lumot",
        emailError: "To'g'ri email manzilini kiriting.",
        consentLabel: "Arizamni ko'rib chiqish uchun ma'lumotlarimdan foydalanishga roziman.",
        consentError: "Arizani yuborish uchun rozilikni belgilang.",
        spamError: "Forma juda tez yuborildi. Iltimos, biroz kutib qayta urinib ko'ring.",
        submit: "Ishtirok etish uchun ariza qoldirish",
        submitting: "Yuborilmoqda...",
      },
    },

    faq: {
      kicker: "SAVOLLAR",
      title: "Ko'p beriladigan savollar",
      lede: "Seminar haqida eng muhim amaliy ma'lumotlar.",
      items: [
        { question: "Seminar kimlar uchun?", answer: "Seminar fizioterapevtlar, osteopatlar, manual terapevtlar, reabilitologlar, sport fizioterapevtlari, shifokorlar va muskul-skelet tizimi bilan ishlaydigan malakali mutaxassislar uchun mo'ljallangan." },
        { question: "Ishtirok etish uchun qanday hujjatlar kerak?", answer: "Ariza yuborish uchun ism va telefon raqami yetarli. Menejerimiz siz bilan bog'lanib, ishtirok shartlari va kerakli hujjatlar haqida batafsil ma'lumot beradi." },
        { question: "Sertifikat beriladimi?", answer: "Ha. Seminarni to'liq qatnashgan ishtirokchilarga ishtirok sertifikati beriladi." },
        { question: "To'lov qanday amalga oshiriladi?", answer: "Arizangiz qabul qilingandan keyin menejerimiz to'lov usullari va muddatlari haqida sizga aniq ma'lumot beradi." },
      ],
    },

    footer: {
      tagline: "xalqaro amaliy master-class",
      copy:
        "INSTEMA — Instituto de Postgrado en Terapia Manual. Barcha huquqlar himoyalangan.",
    },
  },

  es: {
    code: "es",
    label: "ES",
    flag: "🇪🇸",
    htmlLang: "es",

    nav: {
      program: "Programa",
      practice: "En la práctica",
      speaker: "Ponente",
      audience: "Dirigido a",
      register: "Inscripción",
      login: "Login",
      cta: "Enviar solicitud",
      admin: "Admin",
      menuLabel: "Menú",
    },

    event: {
      speakerFlag: "🇪🇸",
      speakerName: "Juan José Boscà Gandía",
      eyebrowSuffix: "Seminario internacional práctico",
      title: "Master-Class internacional práctico en Tashkent",
      subjects: [
        "Terapia manual",
        "Osteopatía",
        "Razonamiento clínico",
        "Neurofisiología",
        "Técnicas manipulativas",
      ],
      tagline: "No se trata de memorizar técnicas.",
      taglineFull:
        "Comprender al paciente, razonar clínicamente y elegir la estrategia manual correcta.",
      city: "Tashkent",
      venueNote: "La dirección exacta se enviará por email a los inscritos.",
      price: "$1,200",
      seatsNote: "Plazas limitadas",
      heroCtaPrimary: "Obtener el programa del seminario",
      heroCtaSecondary: "Ver el programa",
      addToCalendarCta: "Añadir al calendario",
      metaAddress: "Ubicación",
      metaInvestment: "Inversión",
      metaSeats: "Plazas",
      figureCaption: "FIG. 01 — EVALUACIÓN SEGMENTARIA",
    },

    countdown: {
      label: "El master-class empieza en",
      ariaLabel: "Tiempo restante para el master-class",
      days: "días",
      hours: "horas",
      minutes: "min",
      seconds: "seg",
    },

    contact: {
      ariaLabel: "Contacto rápido",
      whatsappLabel: "Escríbenos por WhatsApp",
      telegramLabel: "Escríbenos por Telegram",
      whatsappPrefill: "¡Hola! Tengo una pregunta sobre el master-class.",
    },

    notFound: {
      title: "Página no encontrada",
      text: "La página que buscas no existe o fue movida.",
      cta: "Volver al inicio",
    },

    openingQuestions: {
      kicker: "EL PROBLEMA",
      title:
        "La habilidad más importante para un terapeuta manual no es conocer más técnicas",
      lede: "Lo importante es tomar la decisión clínica correcta.",
      items: [
        "¿Por qué dos pacientes con el mismo síntoma no deberían recibir necesariamente el mismo tratamiento?",
        "¿En qué casos se elige la terapia manual?",
        "¿Cuándo está contraindicada la manipulación?",
        "¿El origen del dolor está realmente donde el paciente lo señala?",
        "¿Cómo se valora la presencia de un componente neurológico?",
        "¿Cómo se verifica el cambio tras el tratamiento?",
      ],
      answer:
        "Este Master-Class ofrece un abordaje sistemático precisamente para estas preguntas.",
    },

    pillars: {
      kicker: "EL SISTEMA",
      title: "Esto no es un simple curso de técnicas",
      lede:
        "El seminario integra los siguientes ejes en un único sistema clínico.",
      items: [
        {
          icon: "🧠",
          title: "Razonamiento clínico",
          text: "Razonamiento clínico y toma de decisiones.",
        },
        {
          icon: "🔬",
          title: "Valoración clínica",
          text: "Anamnesis, exploración física, valoración funcional y reevaluación.",
        },
        {
          icon: "🧠",
          title: "Neurofisiología",
          text: "Bases neurofisiológicas del dolor, la nocicepción, el sistema sensitivo-motor y la estimulación manual.",
        },
        {
          icon: "🦴",
          title: "Osteopatía",
          text: "Integración de las relaciones estructurales y funcionales con el razonamiento clínico.",
        },
        {
          icon: "🤲",
          title: "Terapia manual",
          text: "Movilización, técnicas articulatorias, tejidos blandos y otros abordajes manuales.",
        },
        {
          icon: "⚡️",
          title: "Manipulación",
          text: "Selección clínica, biomecánica y principios de seguridad de la manipulación vertebral.",
        },
        {
          icon: "💪",
          title: "Sistema musculoesquelético",
          text: "Valoración integral de columna cervical, torácica, lumbar, pelvis y articulaciones periféricas.",
        },
      ],
    },

    program: {
      kicker: "PROGRAMA",
      title: "¿Qué se aprende en el seminario?",
      lede:
        "Un recorrido clínico en diez etapas — desde la anamnesis hasta la reevaluación posterior a la manipulación.",
      modules: [
        {
          num: "01",
          title: "Diagnóstico clínico",
          intro:
            "Anamnesis → análisis de síntomas → hipótesis clínica → exploración física → valoración funcional → estrategia de tratamiento → reevaluación",
          points: [
            "análisis clínico de los síntomas",
            "diferenciación de los mecanismos del dolor",
            "identificación de limitaciones funcionales",
            "uso dirigido de pruebas clínicas",
            "aplicación de la palpación en contexto clínico",
            "valoración antes y después del tratamiento",
          ],
        },
        {
          num: "02",
          title: "Neurofisiología y dolor",
          intro: "Una mirada neurofisiológica actual sobre la terapia manual.",
          points: [
            "nocicepción",
            "modulación del dolor",
            "mecanismos periféricos y centrales",
            "sistema sensitivo-motor",
            "propiocepción",
            "mecanorreceptores",
            "relación entre dolor y movimiento",
          ],
        },
        {
          num: "03",
          title: "Abordaje clínico osteopático",
          intro:
            "No se trata solo de \u201cencontrar\u201d un hallazgo osteopático. La pregunta es: \u201c¿cómo se relaciona este hallazgo con el cuadro clínico del paciente?\u201d",
          points: [
            "relaciones estructurales y funcionales",
            "movimiento segmentario",
            "interdependencia articular",
            "sistema miofascial",
            "movimientos compensatorios",
            "diferenciación de hallazgos clínicamente relevantes",
          ],
        },
        {
          num: "04",
          title: "Abordaje integral del sistema musculoesquelético",
          intro:
            "No valorar al paciente solo por la zona dolorosa. Por ejemplo, en cervicalgia: Cervical → Torácico → Complejo del hombro → Sistema nervioso → Estrategia de movimiento → Mecanismo del dolor.",
          points: [
            "Cervical",
            "Torácico",
            "Lumbar",
            "Pelvis",
            "Hombro",
            "Codo",
            "Muñeca",
            "Cadera",
            "Rodilla",
            "Tobillo",
          ],
        },
        {
          num: "05",
          title: "Terapia manual",
          intro:
            "Cinco preguntas clave para cada técnica manual: ¿cuándo? ¿por qué? ¿cómo? ¿cuándo no aplicarla? ¿cómo valorar el resultado?",
          points: [
            "movilización",
            "técnicas articulatorias",
            "trabajo de tejidos blandos",
            "segmentos espinales",
            "articulaciones periféricas",
            "abordajes manuales funcionales",
          ],
        },
        {
          num: "06",
          title: "Manipulación vertebral",
          intro:
            "La manipulación no es simplemente un movimiento con fuerza. Es una combinación de selección clínica, anatomía, biomecánica, posicionamiento, seguridad, técnica y reevaluación.",
          points: [
            "indicaciones",
            "contraindicaciones",
            "selección del paciente",
            "valoración del segmento",
            "posición del terapeuta y del paciente",
            "parámetros biomecánicos",
            "ejecución de la técnica",
            "seguridad",
            "reevaluación tras la manipulación",
          ],
        },
        {
          num: "07",
          title: "Cervical • Torácico • Lumbar",
          intro: "",
          points: [
            "Cervical — dolor cervical, limitación del movimiento, valoración clínica, componente neurológico y abordajes manuales/manipulativos seguros",
            "Torácico — segmentos torácicos, movilidad de la caja torácica y relaciones funcionales con el complejo cervical/hombro",
            "Lumbar — dolor lumbar, síntomas radiculares, valoración funcional y abordajes manuales/manipulativos",
          ],
        },
        {
          num: "08",
          title: "Componente neurológico",
          intro:
            "Pregunta clave para el terapeuta manual: \u201c¿es un problema musculoesquelético simple o existe un componente neurológico?\u201d",
          points: [
            "síntomas radiculares",
            "nervios periféricos",
            "cambios sensitivos",
            "componente motor",
            "respuestas reflejas",
            "identificación de banderas rojas",
            "cuándo derivar al paciente a otro especialista",
          ],
        },
        {
          num: "09",
          title: "Casos clínicos",
          intro:
            "Aplicación de la teoría a situaciones clínicas reales. Caso: dolor cervical + cefalea + limitación del movimiento. ¿Manipulación inmediata? ¿O anamnesis → valoración de banderas rojas → exploración neurológica → test funcional → hipótesis clínica → tratamiento → reevaluación?",
          points: [],
        },
        {
          num: "10",
          title: "Algoritmo clínico",
          intro: "El modelo principal a lo largo del seminario:",
          points: [
            "Patient — escuchar al paciente",
            "Assessment — valoración clínica",
            "Hypothesis — hipótesis clínica",
            "Decision — elección de la estrategia",
            "Technique — abordaje manual/manipulativo adecuado",
            "Reassessment — reevaluación del resultado",
            "Adaptation — adaptar la estrategia según el resultado",
          ],
        },
      ],
    },

    gallery: {
      kicker: "EN LA PRÁCTICA",
      title: "Esto es lo que hace",
      lede:
        "Juan José Boscà Gandía trabaja con pacientes en la clínica, imparte clases en seminarios internacionales y realiza demostraciones en vivo de técnicas manuales y manipulativas. A continuación, algunas escenas breves de su práctica.",
      playLabelPrefix: "Reproducir video: ",
      zoomLabelPrefix: "Ampliar: ",
      closeLabel: "Cerrar",
      audioNote: "Audio original: español",
      videos: [
        {
          id: "testimonial",
          src: "/media/videos/testimonial.mp4",
          poster: "/media/videos/testimonial-poster.jpg",
          caption: "Breve comentario clínico sobre el dolor lumbar",
        },
        {
          id: "technique",
          src: "/media/videos/technique.mp4",
          poster: "/media/videos/technique-poster.jpg",
          caption: "Técnica manipulativa en la práctica",
        },
        {
          id: "mobilization",
          src: "/media/videos/mobilization.mp4",
          poster: "/media/videos/mobilization-poster.jpg",
          caption: "Movilización de una articulación periférica",
        },
        {
          id: "clinic-session",
          src: "/media/videos/clinic-session.mp4",
          poster: "/media/videos/clinic-session-poster.jpg",
          caption: "Sesión práctica grupal en la clínica",
        },
        {
          id: "spine-model-teaching",
          src: "/media/videos/spine-model-teaching.mp4",
          poster: "/media/videos/spine-model-teaching-poster.jpg",
          caption: "Clase con modelo de columna vertebral",
        },
        {
          id: "lecture-hall",
          src: "/media/videos/lecture-hall.mp4",
          poster: "/media/videos/lecture-hall-poster.jpg",
          caption: "Clase magistral sobre evidencia clínica",
        },
        {
          id: "group-circle",
          src: "/media/videos/group-circle.mp4",
          poster: "/media/videos/group-circle-poster.jpg",
          caption: "Discusión práctica en grupo",
        },
      ],
      photos: [
        {
          id: "cervical-adjust",
          src: "/media/photos/cervical-adjust.jpg",
          caption: "Valoración clínica del segmento cervical",
        },
        {
          id: "table-work",
          src: "/media/photos/table-work.jpg",
          caption: "Sesión individual con un paciente",
        },
        {
          id: "teaching-skull",
          src: "/media/photos/teaching-skull.jpg",
          caption: "Clase sobre anatomía craneal",
        },
        {
          id: "teaching-leg-raise",
          src: "/media/photos/teaching-leg-raise.jpg",
          caption: "Práctica en grupo",
        },
        {
          id: "spine-model",
          src: "/media/photos/spine-model.jpg",
          caption: "En el centro de formación de INSTEMA, España",
        },
        {
          id: "classroom",
          src: "/media/photos/classroom.jpg",
          caption: "Clase práctica con el grupo completo",
        },
        {
          id: "tashkent-flyer",
          src: "/media/photos/tashkent-flyer.jpg",
          caption: "Master-Class en Tashkent — invitación oficial",
        },
      ],
    },

    speaker: {
      kicker: "PONENTE",
      instituteLine:
        "INSTEMA — Instituto de Postgrado en Terapia Manual, director",
      name: "Juan José Boscà Gandía",
      roles: "Fisioterapeuta • Osteópata D.O. • Kinesiología y Fisiatría • Enfermería",
      bio: [
        "Juan José Boscà Gandía es un profesional con experiencia clínica y académica internacional en terapia manual, osteopatía y manipulación vertebral.",
        "Se formó en Fisioterapia en la Universidad de Valencia, es Osteópata D.O., diplomado en Kinesiología y Fisiatría, y dirige INSTEMA — Instituto de Postgrado en Terapia Manual.",
        "Su actividad docente combina terapia manual, manipulación vertebral, razonamiento clínico, neurofisiología y técnicas prácticas.",
      ],
    },

    audience: {
      kicker: "¿DIRIGIDO A QUIÉN?",
      title: "¿A quién está dirigido este Master-Class?",
      items: [
        "Fisioterapeutas",
        "Osteópatas",
        "Terapeutas manuales",
        "Especialistas en rehabilitación",
        "Fisioterapeutas deportivos",
        "Médicos",
        "Profesionales cualificados que trabajan con el sistema musculoesquelético",
      ],
      noteLabel: "Importante:",
      note:
        "Las técnicas manipulativas requieren un alto nivel de conocimiento en anatomía, valoración clínica y seguridad.",
    },

    pricing: {
      kickerTakeaways: "¿QUÉ OBTIENES DEL SEMINARIO?",
      title: "No es solo una lista de técnicas — es un sistema de razonamiento clínico",
      takeaways: [
        "valoración sistemática del paciente",
        "formulación de hipótesis clínicas",
        "diferenciación entre síntoma y mecanismo",
        "comprensión de los mecanismos neurofisiológicos",
        "selección dirigida de la terapia manual",
        "comprensión de los principios clínicos y de seguridad de la manipulación",
        "visión integral de los sistemas espinal y periférico",
        "valoración del resultado antes y después del tratamiento",
        "diseño de una estrategia de tratamiento individual",
      ],
      kickerWhyPrefix: "¿POR QUÉ",
      lede:
        "No es el precio de un simple seminario de un día — es una inversión en formación profesional de nivel internacional.",
      flow: ["Assessment", "Clinical reasoning", "Decision", "Technique", "Reassessment"],
      closing:
        "Si trabajas con terapia manual a nivel profesional, hay algo más importante que conocer una técnica nueva: tomar la decisión correcta.",
      perPerson: "por persona",
      cta: "Enviar solicitud",
    },

    register: {
      kicker: "INSCRIPCIÓN",
      title: "Recibe información sobre el seminario",
      lede:
        "Déjanos tu nombre — nuestro gestor se pondrá en contacto contigo y te dará información completa sobre lo siguiente:",
      bullets: [
        "el programa del seminario",
        "la fecha y la duración",
        "la ubicación del seminario",
        "las condiciones de participación",
        "las condiciones de pago",
        "los materiales que se entregan a los participantes",
      ],
      seatsNote: "Plazas limitadas.",
      success: {
        title: "Tu solicitud ha sido recibida",
        text: "Pronto nuestro gestor se pondrá en contacto contigo a través del número de teléfono indicado.",
        paymentCta: "Pagar con Click",
        calendarCta: "Añadir al calendario",
        cta: "Enviar otra solicitud",
      },
      form: {
        fullNameLabel: "Nombre y apellidos *",
        fullNamePlaceholder: "Tu nombre y apellidos",
        fullNameError: "Introduce tu nombre.",
        phoneLabel: "Número de teléfono *",
        phonePlaceholder: "+998 __ ___ __ __",
        phoneError: "Introduce un número de teléfono válido.",
        emailLabel: "Correo electrónico",
        emailPlaceholder: "ejemplo@correo.com",
        professionLabel: "Profesión",
        professionPlaceholder: "Fisioterapeuta, osteópata...",
        cityLabel: "Ciudad",
        cityPlaceholder: "Tashkent",
        noteLabel: "Comentario (opcional)",
        notePlaceholder: "Pregunta o información adicional",
        emailError: "Introduce un correo electrónico válido.",
        consentLabel: "Acepto que mis datos se utilicen para gestionar mi solicitud.",
        consentError: "Acepta el uso de tus datos para enviar la solicitud.",
        spamError: "El formulario se envió demasiado rápido. Espera un momento e inténtalo de nuevo.",
        submit: "Enviar solicitud de participación",
        submitting: "Enviando...",
      },
    },

    faq: {
      kicker: "PREGUNTAS",
      title: "Preguntas frecuentes",
      lede: "La información práctica más importante sobre el seminario.",
      items: [
        { question: "¿Para quién es el seminario?", answer: "Está dirigido a fisioterapeutas, osteópatas, terapeutas manuales, especialistas en rehabilitación, fisioterapeutas deportivos, médicos y profesionales cualificados del sistema musculoesquelético." },
        { question: "¿Qué documentos necesito?", answer: "Para enviar la solicitud solo necesitas tu nombre y teléfono. Nuestro gestor te contactará para explicarte las condiciones y los documentos necesarios." },
        { question: "¿Se entrega certificado?", answer: "Sí. Los participantes que asistan al seminario completo recibirán un certificado de participación." },
        { question: "¿Cómo se realiza el pago?", answer: "Después de recibir tu solicitud, nuestro gestor te informará de los métodos y plazos de pago disponibles." },
      ],
    },

    footer: {
      tagline: "master-class internacional práctico",
      copy:
        "INSTEMA — Instituto de Postgrado en Terapia Manual. Todos los derechos reservados.",
    },
  },

  en: {
    code: "en",
    label: "EN",
    flag: "🇬🇧",
    htmlLang: "en",

    nav: {
      program: "Program",
      practice: "In practice",
      speaker: "Speaker",
      audience: "For whom",
      register: "Registration",
      login: "Login",
      cta: "Apply now",
      admin: "Admin",
      menuLabel: "Menu",
    },

    event: {
      speakerFlag: "🇬🇧",
      speakerName: "Juan José Boscà Gandía",
      eyebrowSuffix: "International practical seminar",
      title: "International practical master-class in Tashkent",
      subjects: [
        "Manual therapy",
        "Osteopathy",
        "Clinical reasoning",
        "Neurophysiology",
        "Manipulative techniques",
      ],
      tagline: "It is not about memorizing techniques.",
      taglineFull:
        "Understand the patient, reason clinically, and choose the right manual strategy.",
      city: "Tashkent",
      venueNote: "The exact venue address will be emailed to registered participants.",
      price: "$1,200",
      seatsNote: "Limited seats",
      heroCtaPrimary: "Get the seminar program",
      heroCtaSecondary: "View the program",
      addToCalendarCta: "Add to calendar",
      metaAddress: "Location",
      metaInvestment: "Investment",
      metaSeats: "Seats",
      figureCaption: "FIG. 01 — SEGMENTAL ASSESSMENT",
    },

    countdown: {
      label: "Master-class starts in",
      ariaLabel: "Time remaining until the master-class",
      days: "days",
      hours: "hours",
      minutes: "min",
      seconds: "sec",
    },

    contact: {
      ariaLabel: "Quick contact",
      whatsappLabel: "Message us on WhatsApp",
      telegramLabel: "Message us on Telegram",
      whatsappPrefill: "Hi! I have a question about the master-class.",
    },

    notFound: {
      title: "Page not found",
      text: "The page you're looking for doesn't exist or has moved.",
      cta: "Back to home",
    },

    openingQuestions: {
      kicker: "THE PROBLEM",
      title:
        "The most important skill for a manual therapist is not knowing more techniques",
      lede: "The key is making the correct clinical decision.",
      items: [
        "Why should two patients with the same symptom not necessarily receive the same treatment?",
        "In which cases is manual therapy chosen?",
        "When is manipulation contraindicated?",
        "Is the source of pain really where the patient points?",
        "How can the presence of a neurological component be assessed?",
        "How should the post-treatment change be checked?",
      ],
      answer:
        "This Master-Class offers a systematic approach precisely to these questions.",
    },

    pillars: {
      kicker: "THE SYSTEM",
      title: "This is not just a technique course",
      lede:
        "The seminar integrates the following areas into one clinical system.",
      items: [
        {
          icon: "🧠",
          title: "Clinical reasoning",
          text: "Clinical thinking and decision-making.",
        },
        {
          icon: "🔬",
          title: "Clinical assessment",
          text: "History, physical examination, functional assessment, and reassessment.",
        },
        {
          icon: "🧠",
          title: "Neurophysiology",
          text: "Neurophysiological foundations of pain, nociception, sensorimotor system, and manual stimulation.",
        },
        {
          icon: "🦴",
          title: "Osteopathy",
          text: "Integrating structural and functional relationships with clinical reasoning.",
        },
        {
          icon: "🤲",
          title: "Manual therapy",
          text: "Mobilization, articulatory, soft tissue, and other manual approaches.",
        },
        {
          icon: "⚡️",
          title: "Manipulation",
          text: "Clinical selection, biomechanics, and safety principles of spinal manipulation.",
        },
        {
          icon: "💪",
          title: "Musculoskeletal system",
          text: "Comprehensive assessment of cervical, thoracic, lumbar, pelvis, and peripheral joints.",
        },
      ],
    },

    program: {
      kicker: "PROGRAM",
      title: "What is learned at the seminar?",
      lede:
        "A ten-step clinical path — from history-taking to post-manipulation reassessment.",
      modules: [
        {
          num: "01",
          title: "Clinical diagnosis",
          intro:
            "History → symptom analysis → clinical hypothesis → physical exam → functional assessment → treatment strategy → reassessment",
          points: [
            "clinical analysis of symptoms",
            "differentiation of pain mechanisms",
            "identification of functional limitations",
            "targeted use of clinical tests",
            "application of palpation in clinical context",
            "pre- and post-treatment assessment",
          ],
        },
        {
          num: "02",
          title: "Neurophysiology and pain",
          intro: "A modern neurophysiological view of manual therapy.",
          points: [
            "nociception",
            "pain modulation",
            "peripheral and central mechanisms",
            "sensorimotor system",
            "proprioception",
            "mechanoreceptors",
            "relationship between pain and movement",
          ],
        },
        {
          num: "03",
          title: "Osteopathic clinical approach",
          intro:
            "An osteopathic finding is not just something to 'find.' The question is: 'How does this finding relate to the patient’s clinical condition?'",
          points: [
            "structural and functional relationships",
            "segmental movement",
            "joint interdependence",
            "myofascial system",
            "compensatory movements",
            "differentiate clinically relevant findings",
          ],
        },
        {
          num: "04",
          title: "Comprehensive musculoskeletal approach",
          intro:
            "Do not assess the person only by the painful area. For example, in neck pain: Cervical → Thoracic → Shoulder Complex → Nervous System → Movement Strategy → Pain Mechanism.",
          points: [
            "Cervical",
            "Thoracic",
            "Lumbar",
            "Pelvis",
            "Shoulder",
            "Elbow",
            "Wrist",
            "Hip",
            "Knee",
            "Ankle",
          ],
        },
        {
          num: "05",
          title: "Manual therapy",
          intro:
            "Five key questions for each manual technique: when? why? how? when not to apply it? how to evaluate the result?",
          points: [
            "mobilization",
            "articulatory techniques",
            "soft tissue work",
            "spinal segments",
            "peripheral joints",
            "functional manual approaches",
          ],
        },
        {
          num: "06",
          title: "Vertebral manipulation",
          intro:
            "Manipulation is not simply a forceful movement. It is a combination of clinical selection, anatomy, biomechanics, positioning, safety, technique, and reassessment.",
          points: [
            "indications",
            "contraindications",
            "patient selection",
            "segment assessment",
            "therapist and patient positioning",
            "biomechanical parameters",
            "technique execution",
            "safety",
            "post-manipulation reassessment",
          ],
        },
        {
          num: "07",
          title: "Cervical • Thoracic • Lumbar",
          intro: "",
          points: [
            "Cervical — neck pain, movement restriction, clinical assessment, neurological component, and safe manual/manipulative approaches",
            "Thoracic — thoracic segments, rib cage mobility, and functional relationships with the cervical/shoulder complex",
            "Lumbar — low back pain, radicular symptoms, functional assessment, and manual/manipulative approaches",
          ],
        },
        {
          num: "08",
          title: "Neurological component",
          intro:
            "A key question for the manual therapist: 'Is this a simple musculoskeletal issue or is there a neurological component?'",
          points: [
            "radicular symptoms",
            "peripheral nerves",
            "sensory changes",
            "motor component",
            "reflex responses",
            "identification of red flags",
            "when to refer the patient to another specialist",
          ],
        },
        {
          num: "09",
          title: "Clinical cases",
          intro:
            "Applying theory to real clinical situations. Case: neck pain + headache + movement restriction. Immediate manipulation? Or history → red-flag assessment → neurological exam → functional test → clinical hypothesis → treatment → reassessment?",
          points: [],
        },
        {
          num: "10",
          title: "Clinical algorithm",
          intro: "The main model used throughout the seminar:",
          points: [
            "Patient — listen to the patient",
            "Assessment — clinical assessment",
            "Hypothesis — clinical hypothesis",
            "Decision — choose the strategy",
            "Technique — appropriate manual/manipulative approach",
            "Reassessment — re-evaluate the result",
            "Adaptation — adapt the strategy according to the outcome",
          ],
        },
      ],
    },

    gallery: {
      kicker: "IN PRACTICE",
      title: "This is what he does",
      lede:
        "Juan José Boscà Gandía works with patients in clinic, teaches at international seminars, and demonstrates manual and manipulative techniques live. Below are short scenes from his practice.",
      playLabelPrefix: "Play video: ",
      zoomLabelPrefix: "Zoom: ",
      closeLabel: "Close",
      audioNote: "Original audio: Spanish",
      videos: [
        {
          id: "testimonial",
          src: "/media/videos/testimonial.mp4",
          poster: "/media/videos/testimonial-poster.jpg",
          caption: "Short clinical commentary on low back pain",
        },
        {
          id: "technique",
          src: "/media/videos/technique.mp4",
          poster: "/media/videos/technique-poster.jpg",
          caption: "Manipulative technique in practice",
        },
        {
          id: "mobilization",
          src: "/media/videos/mobilization.mp4",
          poster: "/media/videos/mobilization-poster.jpg",
          caption: "Mobilization of a peripheral joint",
        },
        {
          id: "clinic-session",
          src: "/media/videos/clinic-session.mp4",
          poster: "/media/videos/clinic-session-poster.jpg",
          caption: "Practical group session in the clinic",
        },
        {
          id: "spine-model-teaching",
          src: "/media/videos/spine-model-teaching.mp4",
          poster: "/media/videos/spine-model-teaching-poster.jpg",
          caption: "Lecture using a spinal model",
        },
        {
          id: "lecture-hall",
          src: "/media/videos/lecture-hall.mp4",
          poster: "/media/videos/lecture-hall-poster.jpg",
          caption: "Lecture on clinical evidence",
        },
        {
          id: "group-circle",
          src: "/media/videos/group-circle.mp4",
          poster: "/media/videos/group-circle-poster.jpg",
          caption: "Practical group discussion",
        },
      ],
      photos: [
        {
          id: "cervical-adjust",
          src: "/media/photos/cervical-adjust.jpg",
          caption: "Clinical assessment of the cervical segment",
        },
        {
          id: "table-work",
          src: "/media/photos/table-work.jpg",
          caption: "One-to-one patient session",
        },
        {
          id: "teaching-skull",
          src: "/media/photos/teaching-skull.jpg",
          caption: "Lecture on cranial anatomy",
        },
        {
          id: "teaching-leg-raise",
          src: "/media/photos/teaching-leg-raise.jpg",
          caption: "Practical group exercise",
        },
        {
          id: "spine-model",
          src: "/media/photos/spine-model.jpg",
          caption: "At the INSTEMA training center, Spain",
        },
        {
          id: "classroom",
          src: "/media/photos/classroom.jpg",
          caption: "Practical class with the full group",
        },
        {
          id: "tashkent-flyer",
          src: "/media/photos/tashkent-flyer.jpg",
          caption: "Tashkent master-class — official invitation",
        },
      ],
    },

    speaker: {
      kicker: "SPEAKER",
      instituteLine:
        "INSTEMA — Instituto de Postgrado en Terapia Manual, director",
      name: "Juan José Boscà Gandía",
      roles: "Physiotherapist • Osteopath D.O. • Kinesiology & Physiatry • Nursing",
      bio: [
        "Juan José Boscà Gandía is a professional with international clinical and academic experience in manual therapy, osteopathy, and vertebral manipulation.",
        "He studied physiotherapy at the University of Valencia, is an Osteopath D.O., holds a diploma in Kinesiology and Physiatry, and leads INSTEMA — Instituto de Postgrado en Terapia Manual.",
        "His teaching combines manual therapy, vertebral manipulation, clinical reasoning, neurophysiology, and practical techniques.",
      ],
    },

    audience: {
      kicker: "WHO IS IT FOR?",
      title: "Who is this Master-Class for?",
      items: [
        "Physiotherapists",
        "Osteopaths",
        "Manual therapists",
        "Rehabilitation specialists",
        "Sports physiotherapists",
        "Doctors",
        "Qualified professionals working with the musculoskeletal system",
      ],
      noteLabel: "Important:",
      note:
        "Manipulative techniques require a high level of knowledge in anatomy, clinical assessment, and safety.",
    },

    pricing: {
      kickerTakeaways: "WHAT DO YOU GET FROM THE SEMINAR?",
      title: "Not just a list of techniques — it is a clinical reasoning system",
      takeaways: [
        "systematic patient assessment",
        "formulation of clinical hypotheses",
        "distinguishing symptom from mechanism",
        "understanding neurophysiological mechanisms",
        "targeted selection of manual therapy",
        "understanding the clinical and safety principles of manipulation",
        "integrated view of the spinal and peripheral systems",
        "pre- and post-treatment outcome assessment",
        "development of an individual treatment strategy",
      ],
      kickerWhyPrefix: "WHY",
      lede:
        "This is not the price of a simple one-day seminar — it is an investment in international-level professional training.",
      flow: ["Assessment", "Clinical reasoning", "Decision", "Technique", "Reassessment"],
      closing:
        "If you work with manual therapy professionally, there is something more important than learning a new technique: making the right decision.",
      perPerson: "per person",
      cta: "Apply now",
    },

    register: {
      kicker: "REGISTRATION",
      title: "Get information about the seminar",
      lede:
        "Leave your name — our manager will contact you and provide complete information about the following:",
      bullets: [
        "seminar program",
        "date and duration",
        "seminar location",
        "participation conditions",
        "payment terms",
        "materials provided to participants",
      ],
      seatsNote: "Limited seats.",
      success: {
        title: "Your application has been received",
        text: "Soon our manager will contact you via the phone number you provided.",
        paymentCta: "Pay with Click",
        calendarCta: "Add to calendar",
        cta: "Submit another application",
      },
      form: {
        fullNameLabel: "Full name *",
        fullNamePlaceholder: "Your name and surname",
        fullNameError: "Please enter your name.",
        phoneLabel: "Phone number *",
        phonePlaceholder: "+998 __ ___ __ __",
        phoneError: "Enter a valid phone number.",
        emailLabel: "Email address",
        emailPlaceholder: "example@mail.com",
        professionLabel: "Profession",
        professionPlaceholder: "Physiotherapist, osteopath...",
        cityLabel: "City",
        cityPlaceholder: "Tashkent",
        noteLabel: "Comment (optional)",
        notePlaceholder: "Question or additional information",
        emailError: "Enter a valid email address.",
        consentLabel: "I agree that my data may be used to process my application.",
        consentError: "Please agree to the use of your data to submit the application.",
        spamError: "The form was submitted too quickly. Please wait a moment and try again.",
        submit: "Submit registration request",
        submitting: "Sending...",
      },
    },

    faq: {
      kicker: "QUESTIONS",
      title: "Frequently asked questions",
      lede: "The most important practical information about the seminar.",
      items: [
        { question: "Who is the seminar for?", answer: "It is intended for physiotherapists, osteopaths, manual therapists, rehabilitation specialists, sports physiotherapists, doctors, and qualified professionals working with the musculoskeletal system." },
        { question: "Which documents are required?", answer: "You only need your name and phone number to submit an application. Our manager will contact you with the participation requirements and necessary documents." },
        { question: "Is a certificate provided?", answer: "Yes. Participants who attend the complete seminar will receive a certificate of participation." },
        { question: "How is payment made?", answer: "After receiving your application, our manager will explain the available payment methods and deadlines." },
      ],
    },

    footer: {
      tagline: "international practical master-class",
      copy:
        "INSTEMA — Instituto de Postgrado en Terapia Manual. All rights reserved.",
    },
  },

  ru: {
    code: "ru",
    label: "RU",
    flag: "🇷🇺",
    htmlLang: "ru",

    nav: {
      program: "Программа",
      practice: "На практике",
      speaker: "Спикер",
      audience: "Для кого",
      register: "Регистрация",
      login: "Войти",
      cta: "Оставить заявку",
      admin: "Админ",
      menuLabel: "Меню",
    },

    event: {
      speakerFlag: "🇷🇺",
      speakerName: "Juan José Boscà Gandía",
      eyebrowSuffix: "Международный практический семинар",
      title: "Международный практический мастер-класс в Ташкенте",
      subjects: [
        "Мануальная терапия",
        "Остеопатия",
        "Клиническое мышление",
        "Нейрофизиология",
        "Манипулятивные техники",
      ],
      tagline: "Это не про запоминание техник.",
      taglineFull:
        "Понимать пациента, мыслить клинически и выбирать правильную мануальную стратегию.",
      city: "Ташкент",
      venueNote: "Точный адрес будет отправлен по электронной почте зарегистрированным участникам.",
      price: "$1,200",
      seatsNote: "Мест ограничено",
      heroCtaPrimary: "Получить программу семинара",
      heroCtaSecondary: "Посмотреть программу",
      addToCalendarCta: "Добавить в календарь",
      metaAddress: "Адрес",
      metaInvestment: "Инвестиции",
      metaSeats: "Места",
      figureCaption: "РИС. 01 — СЕГМЕНТНАЯ ОЦЕНКА",
    },

    countdown: {
      label: "До начала мастер-класса",
      ariaLabel: "Оставшееся время до мастер-класса",
      days: "дн.",
      hours: "ч.",
      minutes: "мин.",
      seconds: "сек.",
    },

    contact: {
      ariaLabel: "Быстрая связь",
      whatsappLabel: "Написать в WhatsApp",
      telegramLabel: "Написать в Telegram",
      whatsappPrefill: "Здравствуйте! У меня есть вопрос о мастер-классе.",
    },

    notFound: {
      title: "Страница не найдена",
      text: "Страница, которую вы ищете, не существует или была перемещена.",
      cta: "Вернуться на главную",
    },

    openingQuestions: {
      kicker: "ПРОБЛЕМА",
      title:
        "Самое важное умение мануального терапевта — это не знание большего числа техник",
      lede: "Главное — принять правильное клиническое решение.",
      items: [
        "Почему двум пациентам с одинаковым симптомом не всегда нужно назначать одинаковое лечение?",
        "В каких случаях выбирают мануальную терапию?",
        "Когда манипуляция противопоказана?",
        "Источником боли действительно является то место, куда указывает пациент?",
        "Как оценить наличие неврологического компонента?",
        "Как проверить изменения после лечения?",
      ],
      answer:
        "Этот Master-Class как раз предлагает системный подход к этим вопросам.",
    },

    pillars: {
      kicker: "СИСТЕМА",
      title: "Это не просто курс по техникам",
      lede:
        "Семинар объединяет перечисленные направления в единую клиническую систему.",
      items: [
        {
          icon: "🧠",
          title: "Клиническое мышление",
          text: "Клиническое мышление и принятие решений.",
        },
        {
          icon: "🔬",
          title: "Клиническая оценка",
          text: "Анамнез, физическое обследование, функциональная оценка и переоценка.",
        },
        {
          icon: "🧠",
          title: "Нейрофизиология",
          text: "Нейрофизиологические основы боли, ноцицепции, сенсомоторной системы и мануальной стимуляции.",
        },
        {
          icon: "🦴",
          title: "Остеопатия",
          text: "Интеграция структурных и функциональных взаимосвязей с клиническим мышлением.",
        },
        {
          icon: "🤲",
          title: "Мануальная терапия",
          text: "Мобилизация, артикуляционные техники, мягкие ткани и другие мануальные подходы.",
        },
        {
          icon: "⚡️",
          title: "Манипуляция",
          text: "Клинический выбор, биомеханика и принципы безопасности при позвоночной манипуляции.",
        },
        {
          icon: "💪",
          title: "Мышечно-скелетная система",
          text: "Комплексная оценка шейного, грудного, поясничного отделов, таза и периферических суставов.",
        },
      ],
    },

    program: {
      kicker: "ПРОГРАММА",
      title: "Что изучается на семинаре?",
      lede:
        "Десятиступенчатый клинический путь — от анамнеза до переоценки после манипуляции.",
      modules: [
        {
          num: "01",
          title: "Клиническая диагностика",
          intro:
            "Анамнез → анализ симптомов → клиническая гипотеза → физикальное обследование → функциональная оценка → стратегия лечения → переоценка",
          points: [
            "клинический анализ симптомов",
            "различение механизмов боли",
            "выявление функциональных ограничений",
            "целевое использование клинических тестов",
            "применение пальпации в клиническом контексте",
            "оценка до и после лечения",
          ],
        },
        {
          num: "02",
          title: "Нейрофизиология и боль",
          intro: "Современный нейрофизиологический взгляд на мануальную терапию.",
          points: [
            "ноцицепция",
            "модуляция боли",
            "периферические и центральные механизмы",
            "сенсомоторная система",
            "проприоцепция",
            "механорецепторы",
            "связь боли и движения",
          ],
        },
        {
          num: "03",
          title: "Остеопатический клинический подход",
          intro:
            "Остеопатический феномен — это не просто «найти». Вопрос: «Как этот признак связан с клинической картиной пациента?»",
          points: [
            "структурные и функциональные взаимосвязи",
            "сегментарное движение",
            "межсуставная зависимость",
            "миофасциальная система",
            "компенсаторные движения",
            "разделение клинически значимых находок",
          ],
        },
        {
          num: "04",
          title: "Комплексный подход к мышечно-скелетной системе",
          intro:
            "Не оценивайте пациента только по болезненному участку. Например, при боли в шее: Шея → Грудной отдел → Плечевой комплекс → Нервная система → Стратегия движения → Механизм боли.",
          points: [
            "Шея",
            "Грудной отдел",
            "Поясница",
            "Таз",
            "Плечо",
            "Локоть",
            "Запястье",
            "Бедро",
            "Колено",
            "Лодыжка",
          ],
        },
        {
          num: "05",
          title: "Мануальная терапия",
          intro:
            "Пять ключевых вопросов для каждой мануальной техники: когда? зачем? как? когда не применять? как оценить результат?",
          points: [
            "мобилизация",
            "артикуляционные техники",
            "работа с мягкими тканями",
            "позвоночные сегменты",
            "периферические суставы",
            "функциональные мануальные подходы",
          ],
        },
        {
          num: "06",
          title: "Позвоночная манипуляция",
          intro:
            "Манипуляция — это не просто силовое движение. Это сочетание клинического выбора, анатомии, биомеханики, позиционирования, безопасности, техники и переоценки.",
          points: [
            "показания",
            "противопоказания",
            "выбор пациента",
            "оценка сегмента",
            "позиция терапевта и пациента",
            "биомеханические параметры",
            "выполнение техники",
            "безопасность",
            "переоценка после манипуляции",
          ],
        },
        {
          num: "07",
          title: "Шея • Грудь • Поясница",
          intro: "",
          points: [
            "Шея — боль в шее, ограничение движения, клиническая оценка, неврологический компонент и безопасные мануальные/манипулятивные подходы",
            "Грудной отдел — грудные сегменты, подвижность грудной клетки и функциональные связи с шейно-плечевым комплексом",
            "Поясница — боль в пояснице, радикулопатические симптомы, функциональная оценка и мануальные/манипулятивные подходы",
          ],
        },
        {
          num: "08",
          title: "Неврологический компонент",
          intro:
            "Ключевой вопрос для мануального терапевта: «Это простая мышечно-скелетная проблема или есть неврологический компонент?»",
          points: [
            "радикулопатические симптомы",
            "периферические нервы",
            "сенсорные изменения",
            "двигательный компонент",
            "рефлекторные ответы",
            "выявление тревожных признаков",
            "когда направлять пациента к другому специалисту",
          ],
        },
        {
          num: "09",
          title: "Клинические кейсы",
          intro:
            "Применение теории к реальным клиническим ситуациям. Кейс: боль в шее + головная боль + ограничение движения. Нужна ли немедленная манипуляция? Или анамнез → оценка тревожных признаков → неврологическое обследование → функциональный тест → клиническая гипотеза → лечение → переоценка?",
          points: [],
        },
        {
          num: "10",
          title: "Клинический алгоритм",
          intro: "Основная модель на протяжении всего семинара:",
          points: [
            "Patient — выслушать пациента",
            "Assessment — клиническая оценка",
            "Hypothesis — клиническая гипотеза",
            "Decision — выбор стратегии",
            "Technique — подходящая мануальная/манипулятивная техника",
            "Reassessment — повторная оценка результата",
            "Adaptation — адаптация стратегии в зависимости от результата",
          ],
        },
      ],
    },

    gallery: {
      kicker: "НА ПРАКТИКЕ",
      title: "Что он делает",
      lede:
        "Juan José Boscà Gandía работает с пациентами в клинике, ведёт занятия на международных семинарах и показывает мануальные и манипулятивные техники вживую. Ниже — короткие фрагменты его практики.",
      playLabelPrefix: "Воспроизвести видео: ",
      zoomLabelPrefix: "Увеличить: ",
      closeLabel: "Закрыть",
      audioNote: "Оригинальная аудиодорожка: испанский",
      videos: [
        {
          id: "testimonial",
          src: "/media/videos/testimonial.mp4",
          poster: "/media/videos/testimonial-poster.jpg",
          caption: "Краткий клинический комментарий о боли в пояснице",
        },
        {
          id: "technique",
          src: "/media/videos/technique.mp4",
          poster: "/media/videos/technique-poster.jpg",
          caption: "Мануальная техника на практике",
        },
        {
          id: "mobilization",
          src: "/media/videos/mobilization.mp4",
          poster: "/media/videos/mobilization-poster.jpg",
          caption: "Мобилизация периферического сустава",
        },
        {
          id: "clinic-session",
          src: "/media/videos/clinic-session.mp4",
          poster: "/media/videos/clinic-session-poster.jpg",
          caption: "Практическое групповое занятие в клинике",
        },
        {
          id: "spine-model-teaching",
          src: "/media/videos/spine-model-teaching.mp4",
          poster: "/media/videos/spine-model-teaching-poster.jpg",
          caption: "Лекция с моделью позвоночника",
        },
        {
          id: "lecture-hall",
          src: "/media/videos/lecture-hall.mp4",
          poster: "/media/videos/lecture-hall-poster.jpg",
          caption: "Лекция о клинических доказательствах",
        },
        {
          id: "group-circle",
          src: "/media/videos/group-circle.mp4",
          poster: "/media/videos/group-circle-poster.jpg",
          caption: "Практическая групповая дискуссия",
        },
      ],
      photos: [
        {
          id: "cervical-adjust",
          src: "/media/photos/cervical-adjust.jpg",
          caption: "Клиническая оценка шейного сегмента",
        },
        {
          id: "table-work",
          src: "/media/photos/table-work.jpg",
          caption: "Индивидуальная работа с пациентом",
        },
        {
          id: "teaching-skull",
          src: "/media/photos/teaching-skull.jpg",
          caption: "Лекция по краниальной анатомии",
        },
        {
          id: "teaching-leg-raise",
          src: "/media/photos/teaching-leg-raise.jpg",
          caption: "Практическое обучение в группе",
        },
        {
          id: "spine-model",
          src: "/media/photos/spine-model.jpg",
          caption: "В учебном центре INSTEMA, Испания",
        },
        {
          id: "classroom",
          src: "/media/photos/classroom.jpg",
          caption: "Практическое занятие со всей группой",
        },
        {
          id: "tashkent-flyer",
          src: "/media/photos/tashkent-flyer.jpg",
          caption: "Ташкентский мастер-класс — официальное приглашение",
        },
      ],
    },

    speaker: {
      kicker: "СПИКЕР",
      instituteLine:
        "INSTEMA — Instituto de Postgrado en Terapia Manual, директор",
      name: "Juan José Boscà Gandía",
      roles: "Физиотерапевт • Остеопат D.O. • Кинезиология и физиатрия • Медсестринство",
      bio: [
        "Juan José Boscà Gandía — специалист с международным клиническим и академическим опытом в мануальной терапии, остеопатии и позвоночной манипуляции.",
        "Он обучался физиотерапии в Университете Валенсии, является остеопатом D.O., имеет диплом по кинезиологии и физиатрии и возглавляет INSTEMA — Instituto de Postgrado en Terapia Manual.",
        "В его преподавательской деятельности объединены мануальная терапия, позвоночная манипуляция, клиническое мышление, нейрофизиология и практические техники.",
      ],
    },

    audience: {
      kicker: "ДЛЯ КОГО?",
      title: "Для кого этот Master-Class?",
      items: [
        "Физиотерапевты",
        "Остеопаты",
        "Мануальные терапевты",
        "Специалисты по реабилитации",
        "Спортивные физиотерапевты",
        "Врачи",
        "Квалифицированные специалисты, работающие с мышечно-скелетной системой",
      ],
      noteLabel: "Важно:",
      note:
        "Манипулятивные техники требуют высокого уровня знаний по анатомии, клинической оценке и безопасности.",
    },

    pricing: {
      kickerTakeaways: "ЧТО ВЫ ПОЛУЧИТЕ НА СЕМИНАРЕ?",
      title: "Это не просто список техник — это система клинического мышления",
      takeaways: [
        "системная оценка пациента",
        "формулирование клинических гипотез",
        "различение симптома и механизма",
        "понимание нейрофизиологических механизмов",
        "целенаправленный выбор мануальной терапии",
        "понимание клинических и безопасностных принципов манипуляции",
        "комплексное видение позвоночной и периферической систем",
        "оценка результата до и после лечения",
        "формирование индивидуальной лечебной стратегии",
      ],
      kickerWhyPrefix: "ПОЧЕМУ",
      lede:
        "Это не цена обычного однодневного семинара — это инвестиция в профессиональное обучение международного уровня.",
      flow: ["Оценка", "Клиническое мышление", "Решение", "Техника", "Переоценка"],
      closing:
        "Если вы профессионально работаете с мануальной терапией, есть нечто более важное, чем узнать новую технику: принять правильное решение.",
      perPerson: "за человека",
      cta: "Оставить заявку",
    },

    register: {
      kicker: "РЕГИСТРАЦИЯ",
      title: "Получите информацию о семинаре",
      lede:
        "Оставьте своё имя — наш менеджер свяжется с вами и подробно расскажет о следующем:",
      bullets: [
        "программа семинара",
        "дата и продолжительность",
        "место проведения",
        "условия участия",
        "условия оплаты",
        "материалы, которые предоставляются участникам",
      ],
      seatsNote: "Мест ограничено.",
      success: {
        title: "Ваша заявка принята",
        text: "Скоро наш менеджер свяжется с вами по указанному номеру телефона.",
        paymentCta: "Оплатить через Click",
        calendarCta: "Добавить в календарь",
        cta: "Подать ещё одну заявку",
      },
      form: {
        fullNameLabel: "Имя и фамилия *",
        fullNamePlaceholder: "Ваше имя и фамилия",
        fullNameError: "Пожалуйста, введите ваше имя.",
        phoneLabel: "Номер телефона *",
        phonePlaceholder: "+998 __ ___ __ __",
        phoneError: "Введите корректный номер телефона.",
        emailLabel: "Электронная почта",
        emailPlaceholder: "example@mail.com",
        professionLabel: "Профессия",
        professionPlaceholder: "Физиотерапевт, остеопат...",
        cityLabel: "Город",
        cityPlaceholder: "Ташкент",
        noteLabel: "Комментарий (необязательно)",
        notePlaceholder: "Вопрос или дополнительная информация",
        emailError: "Введите корректный адрес электронной почты.",
        consentLabel: "Я согласен(на) на использование моих данных для обработки заявки.",
        consentError: "Дайте согласие на использование данных для отправки заявки.",
        spamError: "Форма отправлена слишком быстро. Подождите немного и попробуйте снова.",
        submit: "Отправить заявку на участие",
        submitting: "Отправка...",
      },
    },

    faq: {
      kicker: "ВОПРОСЫ",
      title: "Часто задаваемые вопросы",
      lede: "Самая важная практическая информация о семинаре.",
      items: [
        { question: "Для кого предназначен семинар?", answer: "Семинар предназначен для физиотерапевтов, остеопатов, мануальных терапевтов, специалистов по реабилитации, спортивных физиотерапевтов, врачей и квалифицированных специалистов, работающих с опорно-двигательной системой." },
        { question: "Какие документы нужны?", answer: "Для отправки заявки достаточно имени и номера телефона. Наш менеджер свяжется с вами и расскажет об условиях участия и необходимых документах." },
        { question: "Выдаётся ли сертификат?", answer: "Да. Участники, полностью прошедшие семинар, получают сертификат участника." },
        { question: "Как производится оплата?", answer: "После получения заявки наш менеджер сообщит доступные способы и сроки оплаты." },
      ],
    },

    footer: {
      tagline: "международный практический мастер-класс",
      copy:
        "INSTEMA — Instituto de Postgrado en Terapia Manual. Все права защищены.",
    },
  },
};

export const SUPPORTED_LANGS = ["uz", "es", "en", "ru"];
export const DEFAULT_LANG = "uz";
