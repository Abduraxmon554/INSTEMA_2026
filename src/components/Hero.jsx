import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import CountdownTimer from "./CountdownTimer";
import { downloadEventIcs } from "../utils/eventSchedule";
import ShaderBackground from "../effects/ShaderBackground";
import TextReveal from "../effects/TextReveal";
import Tilt from "../effects/Tilt";
import Magnetic from "../effects/Magnetic";
import "./Hero.css";

export default function Hero() {
  const { t } = useLanguage();
  const { event } = t;
  const figureRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    const el = figureRef.current;
    if (!el) return undefined;

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = window.scrollY;
        // Hero rasm sekinroq harakatlanadi (klassik parallax effekti),
        // faqat hero ko'rinib turgan hududda.
        if (offset < window.innerHeight * 1.2 && el) {
          el.style.transform = `translateY(${offset * 0.12}px)`;
        }
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="hero">
      <ShaderBackground className="hero-shader-bg" />
      <span className="blob hero-blob hero-blob-1 morph-blob gooey-layer" aria-hidden="true" />
      <span className="blob hero-blob hero-blob-2 morph-blob gooey-layer" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow-tag hero-eyebrow">
            {event.speakerFlag} {event.speakerName} · {event.eyebrowSuffix}
          </p>
          <TextReveal as="h1" text={event.title} variant="kinetic" className="hero-title" />
          <ul className="hero-subjects">
            {event.subjects.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="hero-tagline gradient-text">{event.tagline}</p>
          <p className="hero-tagline-full">{event.taglineFull}</p>

          <div className="hero-actions">
            <Magnetic strength={0.4} glow>
              <a href="#royxat" className="btn btn-primary anim-pulse-cta">
                {event.heroCtaPrimary}
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a href="#dastur" className="btn btn-ghost-light">
                {event.heroCtaSecondary}
              </a>
            </Magnetic>
            <button
              type="button"
              className="btn btn-ghost-light hero-calendar-btn"
              onClick={() =>
                downloadEventIcs({
                  title: event.title,
                  description: event.taglineFull,
                  location: `${event.city} — ${event.venueNote}`,
                  url: typeof window !== "undefined" ? window.location.origin : "",
                })
              }
            >
              📅 {event.addToCalendarCta}
            </button>
          </div>

          <CountdownTimer />

          <dl className="hero-meta">
            <div>
              <dt>{event.metaAddress}</dt>
              <dd>{event.city}</dd>
            </div>
            <div>
              <dt>{event.metaInvestment}</dt>
              <dd>{event.price}</dd>
            </div>
            <div>
              <dt>{event.metaSeats}</dt>
              <dd>{event.seatsNote}</dd>
            </div>
          </dl>
        </div>

        <div className="hero-figure" ref={figureRef}>
          <Tilt max={8} glare>
            <a
              href="#royxat"
              className="hero-poster"
              aria-label={event.heroCtaPrimary}
            >
              <img
                src="/media/photos/tashkent-flyer.jpg"
                alt={event.title}
                className="hero-poster-img"
              />
              <span className="hero-poster-badge">{event.heroCtaPrimary}</span>
            </a>
          </Tilt>
          <span className="hero-figure-caption">{event.figureCaption}</span>
        </div>
      </div>
    </section>
  );
}
