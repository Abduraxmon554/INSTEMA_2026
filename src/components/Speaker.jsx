import { useLanguage } from "../context/LanguageContext";
import Tilt from "../effects/Tilt";
import Reveal from "./Reveal";
import "./Speaker.css";

export default function Speaker() {
  const { t } = useLanguage();
  const { speaker } = t;

  return (
    <section id="spiker" className="section speaker-section">
      <div className="container speaker-inner">
        <Tilt max={7} glare>
          <div className="speaker-card">
            <Reveal variant="mask" as="div">
              <img
                className="speaker-photo"
                src="/media/photos/portrait.jpg"
                alt={speaker.name}
              />
            </Reveal>
            <div className="speaker-card-body">
              <span className="speaker-flag">🇪🇸</span>
              <h3 className="speaker-name">{speaker.name}</h3>
              <p className="speaker-roles">{speaker.roles}</p>
              <div className="speaker-divider" />
              <p className="speaker-institute">{speaker.instituteLine}</p>
            </div>
          </div>
        </Tilt>

        <div className="speaker-copy">
          <span className="section-kicker">{speaker.kicker}</span>
          <h2 className="section-title">{speaker.name}</h2>
          {speaker.bio.map((p, i) => (
            <p className="speaker-paragraph" key={i}>
              {p}
            </p>
          ))}
          <a href="#royxat" className="btn btn-primary speaker-cta">
            {t.nav.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
