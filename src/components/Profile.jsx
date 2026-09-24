import { useLanguage } from "../context/LanguageContext";
import { profile } from "../data/profile";
import Reveal from "./Reveal";
import "./Profile.css";

export default function Profile() {
  const { lang } = useLanguage();
  const p = profile[lang] || profile.uz;

  return (
    <section id="profil" className="section profile-section">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">{p.id}</span>
          <h2 className="section-title">{p.title}</h2>
          <p className="section-lede">{p.lede}</p>
        </div>

        <dl className="profile-stats">
          {p.stats.map((s) => (
            <div className="profile-stat" key={s.value}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>

        <Reveal variant="stagger" className="profile-groups">
          {p.groups.map((g) => (
            <article className="profile-group" key={g.title}>
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>

        <div className="profile-strengths">
          <h3>{p.strengthsTitle}</h3>
          <ul>
            {p.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="profile-closing">{p.closing}</p>
        </div>
      </div>
    </section>
  );
}
