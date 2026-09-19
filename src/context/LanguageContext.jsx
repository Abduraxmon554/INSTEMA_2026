import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, SUPPORTED_LANGS, DEFAULT_LANG } from "../i18n/translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "instema-lang";

function readInitialLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  } catch {
    // localStorage unavailable — ignore, fall back to default
  }
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang);

  const t = translations[lang] ?? translations[DEFAULT_LANG];

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = t.htmlLang;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore write errors (private mode, etc.)
    }
  }, [lang, t.htmlLang]);

  function setLang(next) {
    if (SUPPORTED_LANGS.includes(next)) setLangState(next);
  }

  const value = useMemo(
    () => ({ lang, setLang, t, languages: SUPPORTED_LANGS.map((code) => translations[code]) }),
    [lang, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage() faqat LanguageProvider ichida ishlatilishi kerak");
  }
  return ctx;
}
