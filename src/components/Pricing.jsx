import { useLanguage } from "../context/LanguageContext";
import Counter from "./Counter";
import Tilt from "../effects/Tilt";
import Magnetic from "../effects/Magnetic";
import "./Pricing.css";

export default function Pricing() {
  const { t } = useLanguage();
  const { pricing, event } = t;

  return (
    <section className="section pricing-section">
      <div className="container pricing-inner">
        <div className="pricing-takeaways">
          <span className="section-kicker">{pricing.kickerTakeaways}</span>
          <h2 className="section-title" style={{ marginBottom: 22 }}>
            {pricing.title}
          </h2>
          <ul className="takeaways-list">
            {pricing.takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <Tilt max={6} glare>
          <div className="pricing-card">
            <span className="section-kicker">
              {pricing.kickerWhyPrefix} {event.price}?
            </span>
            <p className="pricing-lede">{pricing.lede}</p>

            <div className="pricing-flow">
              {pricing.flow.map((step, i) => (
                <span key={step} className="pricing-flow-step">
                  {step}
                  {i < pricing.flow.length - 1 && (
                    <span className="pricing-flow-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>

            <p className="pricing-closing">{pricing.closing}</p>

            <div className="pricing-figure">
              <Counter
                value={event.price}
                className="pricing-figure-price"
                as="span"
              />
              <span className="pricing-figure-label">{pricing.perPerson}</span>
            </div>

            <Magnetic strength={0.25} glow>
              <a href="#royxat" className="btn btn-primary btn-block">
                {pricing.cta}
              </a>
            </Magnetic>
          </div>
        </Tilt>
      </div>
    </section>
  );
}
