import { useLanguage } from "../context/LanguageContext";
import "./Audience.css";

export default function Audience() {
  const { t } = useLanguage();
  const { audience } = t;

  return (
    <section id="kimlar-uchun" className="section audience-section">
      <div className="container audience-inner">
        <div className="section-head" style={{ marginBottom: 32 }}>
          <span className="section-kicker">{audience.kicker}</span>
          <h2 className="section-title">{audience.title}</h2>
        </div>

        <ul className="audience-list">
          {audience.items.map((a) => (
            <li key={a}>
              <span aria-hidden="true">✓</span>
              {a}
            </li>
          ))}
        </ul>

        <p className="audience-note">
          <strong>{audience.noteLabel}</strong> {audience.note}
        </p>

        <div className="audience-cta-wrap">
          <a href="#royxat" className="btn btn-primary">
            {t.nav.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
