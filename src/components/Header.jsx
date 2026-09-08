import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import GoogleTranslate from "./GoogleTranslate";
import Magnetic from "../effects/Magnetic";
import "./Header.css";

export default function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const LINKS = [
    { href: "#dastur", label: t.nav.program },
    { href: "#amaliyot", label: t.nav.practice },
    { href: "#spiker", label: t.nav.speaker },
    { href: "#kimlar-uchun", label: t.nav.audience },
    { href: "#royxat", label: t.nav.register },
    { href: "/login", label: t.nav.login },
  ];

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick() {
    setOpen(false);
  }

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-topbar">
        <div className="container site-topbar-inner">
          <LanguageSwitcher className="lang-switcher--header" />
          <GoogleTranslate />
          <ThemeToggle />
        </div>
      </div>

      <div className="container site-header-inner">
        <a href="#top" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 20 32" width="14" height="22">
              <circle cx="10" cy="4" r="3" fill="currentColor" />
              <circle cx="10" cy="14" r="3" fill="currentColor" />
              <circle cx="10" cy="24" r="3" fill="var(--rust)" />
              <circle cx="10" cy="28" r="2" fill="currentColor" opacity="0.5" />
            </svg>
          </span>
          <span className="brand-text">
            INSTEMA <span className="brand-text-city">/ {t.event.city}</span>
          </span>
        </a>

        <nav className={`site-nav ${open ? "is-open" : ""}`}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={handleNavClick}>
              {link.label}
            </a>
          ))}
          <Magnetic strength={0.3} radius={40} glow>
            <a
              href="#royxat"
              className="btn btn-primary site-nav-cta"
              onClick={handleNavClick}
            >
              {t.nav.cta}
            </a>
          </Magnetic>
        </nav>

        <button
          className="nav-toggle"
          aria-label={t.nav.menuLabel}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
