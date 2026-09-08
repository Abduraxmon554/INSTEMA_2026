import { useEffect, useRef, useState } from "react";
import "./GoogleTranslate.css";

// Google Translate qo'llab-quvvatlaydigan deyarli barcha tillar — uz/es/en/ru
// (bular sayt ichida LanguageSwitcher orqali qo'lda tarjima qilingan) dan
// tashqari, mehmon xohlagan istalgan tilga avtomatik tarjima qilish uchun.
const GT_LANGS = [
  { code: "af", label: "Afrikaans" },
  { code: "sq", label: "Shqip" },
  { code: "am", label: "አማርኛ" },
  { code: "ar", label: "العربية" },
  { code: "hy", label: "Հայերեն" },
  { code: "as", label: "অসমীয়া" },
  { code: "ay", label: "Aymar aru" },
  { code: "az", label: "Azərbaycan" },
  { code: "bm", label: "Bamanankan" },
  { code: "eu", label: "Euskara" },
  { code: "be", label: "Беларуская" },
  { code: "bn", label: "বাংলা" },
  { code: "bho", label: "भोजपुरी" },
  { code: "bs", label: "Bosanski" },
  { code: "bg", label: "Български" },
  { code: "ca", label: "Català" },
  { code: "ceb", label: "Cebuano" },
  { code: "ny", label: "Chichewa" },
  { code: "zh-CN", label: "中文 (简体)" },
  { code: "zh-TW", label: "中文 (繁體)" },
  { code: "co", label: "Corsu" },
  { code: "hr", label: "Hrvatski" },
  { code: "cs", label: "Čeština" },
  { code: "da", label: "Dansk" },
  { code: "dv", label: "ދިވެހި" },
  { code: "doi", label: "डोगरी" },
  { code: "nl", label: "Nederlands" },
  { code: "en", label: "English" },
  { code: "eo", label: "Esperanto" },
  { code: "et", label: "Eesti" },
  { code: "ee", label: "Eʋegbe" },
  { code: "tl", label: "Filipino" },
  { code: "fi", label: "Suomi" },
  { code: "fr", label: "Français" },
  { code: "fy", label: "Frysk" },
  { code: "gl", label: "Galego" },
  { code: "ka", label: "ქართული" },
  { code: "de", label: "Deutsch" },
  { code: "el", label: "Ελληνικά" },
  { code: "gn", label: "Guarani" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "ht", label: "Kreyòl Ayisyen" },
  { code: "ha", label: "Hausa" },
  { code: "haw", label: "ʻŌlelo Hawaiʻi" },
  { code: "he", label: "עברית" },
  { code: "hi", label: "हिन्दी" },
  { code: "hmn", label: "Hmoob" },
  { code: "hu", label: "Magyar" },
  { code: "is", label: "Íslenska" },
  { code: "ig", label: "Igbo" },
  { code: "ilo", label: "Ilokano" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "ga", label: "Gaeilge" },
  { code: "it", label: "Italiano" },
  { code: "ja", label: "日本語" },
  { code: "jv", label: "Basa Jawa" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "kk", label: "Қазақша" },
  { code: "km", label: "ខ្មែរ" },
  { code: "rw", label: "Kinyarwanda" },
  { code: "gom", label: "कोंकणी" },
  { code: "ko", label: "한국어" },
  { code: "kri", label: "Krio" },
  { code: "ku", label: "Kurdî" },
  { code: "ckb", label: "کوردیی ناوەندی" },
  { code: "ky", label: "Кыргызча" },
  { code: "lo", label: "ລາວ" },
  { code: "la", label: "Latina" },
  { code: "lv", label: "Latviešu" },
  { code: "ln", label: "Lingála" },
  { code: "lt", label: "Lietuvių" },
  { code: "lg", label: "Luganda" },
  { code: "lb", label: "Lëtzebuergesch" },
  { code: "mk", label: "Македонски" },
  { code: "mai", label: "मैथिली" },
  { code: "mg", label: "Malagasy" },
  { code: "ms", label: "Bahasa Melayu" },
  { code: "ml", label: "മലയാളം" },
  { code: "mt", label: "Malti" },
  { code: "mi", label: "Māori" },
  { code: "mr", label: "मराठी" },
  { code: "mni-Mtei", label: "মৈতৈলোন্" },
  { code: "lus", label: "Mizo ṭawng" },
  { code: "mn", label: "Монгол" },
  { code: "my", label: "မြန်မာ" },
  { code: "ne", label: "नेपाली" },
  { code: "no", label: "Norsk" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "om", label: "Afaan Oromoo" },
  { code: "ps", label: "پښتو" },
  { code: "fa", label: "فارسی" },
  { code: "pl", label: "Polski" },
  { code: "pt", label: "Português" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "qu", label: "Runasimi" },
  { code: "ro", label: "Română" },
  { code: "ru", label: "Русский" },
  { code: "sm", label: "Gagana Sāmoa" },
  { code: "sa", label: "संस्कृत" },
  { code: "gd", label: "Gàidhlig" },
  { code: "nso", label: "Sepedi" },
  { code: "sr", label: "Српски" },
  { code: "st", label: "Sesotho" },
  { code: "sn", label: "ChiShona" },
  { code: "sd", label: "سنڌي" },
  { code: "si", label: "සිංහල" },
  { code: "sk", label: "Slovenčina" },
  { code: "sl", label: "Slovenščina" },
  { code: "so", label: "Soomaali" },
  { code: "es", label: "Español" },
  { code: "su", label: "Basa Sunda" },
  { code: "sw", label: "Kiswahili" },
  { code: "sv", label: "Svenska" },
  { code: "tg", label: "Тоҷикӣ" },
  { code: "ta", label: "தமிழ்" },
  { code: "tt", label: "Татарча" },
  { code: "te", label: "తెలుగు" },
  { code: "th", label: "ไทย" },
  { code: "ti", label: "ትግርኛ" },
  { code: "ts", label: "Xitsonga" },
  { code: "tr", label: "Türkçe" },
  { code: "tk", label: "Türkmençe" },
  { code: "ak", label: "Twi" },
  { code: "uk", label: "Українська" },
  { code: "ur", label: "اردو" },
  { code: "ug", label: "ئۇيغۇرچە" },
  { code: "uz", label: "O'zbekcha" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "cy", label: "Cymraeg" },
  { code: "xh", label: "isiXhosa" },
  { code: "yi", label: "ייִדיש" },
  { code: "yo", label: "Yorùbá" },
  { code: "zu", label: "isiZulu" },
];

let scriptLoadStarted = false;

function loadGoogleTranslateScript(onReady) {
  if (window.google?.translate?.TranslateElement) {
    onReady();
    return;
  }

  window.googleTranslateElementInit = function googleTranslateElementInit() {
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "auto",
        // includedLanguages ataylab berilmayapti — shunda Google o'zi
        // qo'llab-quvvatlaydigan BARCHA tillar combo-boxga yuklanadi.
        autoDisplay: false,
      },
      "google_translate_element"
    );
    onReady();
  };

  if (scriptLoadStarted) return;
  scriptLoadStarted = true;

  const script = document.createElement("script");
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

export default function GoogleTranslate({ className = "" }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState("");
  const rootRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleToggleOpen() {
    if (!open) {
      // Widget birinchi marta ochilganda "dangasa" yuklanadi — sahifa tezligini saqlaydi.
      loadGoogleTranslateScript(() => setReady(true));
      setQuery("");
      setTimeout(() => searchRef.current?.focus(), 60);
    }
    setOpen((v) => !v);
  }

  function applyLanguage(code, attempt = 0) {
    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change"));
      setActive(code);
      setOpen(false);
      return;
    }
    if (attempt < 25) {
      setTimeout(() => applyLanguage(code, attempt + 1), 200);
    }
  }

  function resetToOriginal() {
    setActive(null);
    setOpen(false);
    const hostname = window.location.hostname;
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
    window.location.reload();
  }

  const filteredLangs = query.trim()
    ? GT_LANGS.filter(
        (l) =>
          l.label.toLowerCase().includes(query.trim().toLowerCase()) ||
          l.code.toLowerCase().includes(query.trim().toLowerCase())
      )
    : GT_LANGS;

  return (
    <div className={`gtranslate ${className}`} ref={rootRef}>
      {/* Google widgeti shu yerda yashirin holda yaratiladi — biz faqat uning
          <select class="goog-te-combo"> elementini dasturiy tarzda boshqaramiz. */}
      <div id="google_translate_element" className="gtranslate-hidden-widget" />

      <button
        type="button"
        className="gtranslate-trigger"
        onClick={handleToggleOpen}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Google Translate — boshqa tilni tanlash"
        title="Google Translate"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <ellipse cx="12" cy="12" rx="4" ry="9.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <line x1="2.8" y1="12" x2="21.2" y2="12" stroke="currentColor" strokeWidth="1.4" />
          <line x1="4.2" y1="7.2" x2="19.8" y2="7.2" stroke="currentColor" strokeWidth="1.2" />
          <line x1="4.2" y1="16.8" x2="19.8" y2="16.8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      <div className={`gtranslate-menu ${open ? "is-open" : ""}`} role="listbox">
        <input
          ref={searchRef}
          type="text"
          className="gtranslate-search"
          placeholder="Tilni qidirish…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          className={`gtranslate-item ${active === null ? "is-active" : ""}`}
          onClick={resetToOriginal}
        >
          ⟲ Asl matn
        </button>
        <div className="gtranslate-divider" />
        {!ready && open && <div className="gtranslate-loading">Yuklanmoqda…</div>}
        <div className="gtranslate-list">
          {filteredLangs.map((l) => (
            <button
              key={l.code}
              type="button"
              className={`gtranslate-item ${active === l.code ? "is-active" : ""}`}
              onClick={() => applyLanguage(l.code)}
            >
              {l.label}
            </button>
          ))}
          {filteredLangs.length === 0 && (
            <div className="gtranslate-loading">Hech narsa topilmadi</div>
          )}
        </div>
      </div>
    </div>
  );
}
