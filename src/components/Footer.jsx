import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import "./Footer.css";

export default function Footer() {
  const { t } = useLanguage();
  const { event, footer, nav } = t;

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div>
          <span className="brand-text">INSTEMA / {event.city}</span>
          <p className="footer-note">
            {event.speakerFlag} {event.speakerName} — {footer.tagline}
          </p>
          <div className="footer-controls">
            <LanguageSwitcher className="lang-switcher--footer" />
            <ThemeToggle />
          </div>
        </div>
        <nav className="footer-links">
          <a href="#dastur">{nav.program}</a>
          <a href="#spiker">{nav.speaker}</a>
          <a href="#kimlar-uchun">{nav.audience}</a>
          <a href="#royxat">{nav.register}</a>
          <a href="/login">{nav.login}</a>
          <a href="/seminar">{nav.admin}</a>
        </nav>
      </div>
      <div className="container">
        <p className="footer-copy">
          © {new Date().getFullYear()} {footer.copy}
        </p>
      </div>
    </footer>
  );
}
