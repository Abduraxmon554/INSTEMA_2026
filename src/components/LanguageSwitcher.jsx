import { useLanguage } from "../context/LanguageContext";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang, languages } = useLanguage();

  return (
    <div className={`lang-switcher ${className}`} role="group" aria-label="Til / Idioma">
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`lang-switcher-btn ${lang === l.code ? "is-active" : ""}`}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
        >
          <span aria-hidden="true">{l.flag}</span> {l.label}
        </button>
      ))}
    </div>
  );
}
