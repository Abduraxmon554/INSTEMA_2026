import { useLanguage } from "../context/LanguageContext";
import "./Pillars.css";

export default function Pillars() {
  const { t } = useLanguage();
  const { pillars } = t;

  return (
    <section className="section pillars-section">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">{pillars.kicker}</span>
          <h2 className="section-title">{pillars.title}</h2>
          <p className="section-lede">{pillars.lede}</p>
        </div>

        <div className="pillars-grid">
          {pillars.items.map((p) => (
            <article className="pillar-card" key={p.title}>
              <span className="pillar-icon" aria-hidden="true">
                {p.icon}
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
