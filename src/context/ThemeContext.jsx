import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "instema-theme";

function readInitialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage unavailable — ignore
  }
  // Foydalanuvchi tizim darajasida qorong'i rejimni tanlagan bo'lsa, shuni hurmat qilamiz.
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitialTheme);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.style.colorScheme = theme;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore write errors (private mode, etc.)
    }
  }, [theme]);

  // Agar foydalanuvchi hech qachon qo'lda tanlamagan bo'lsa, tizim mavzusi
  // o'zgarganda saytni ham shunga moslab boramiz.
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    let userChose = false;
    try {
      userChose = window.localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      userChose = false;
    }
    if (userChose) return undefined;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    function onChange(e) {
      setThemeState(e.matches ? "dark" : "light");
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function setTheme(next) {
    if (next === "light" || next === "dark") setThemeState(next);
  }

  function toggleTheme() {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, isDark: theme === "dark" }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme() faqat ThemeProvider ichida ishlatilishi kerak");
  }
  return ctx;
}
