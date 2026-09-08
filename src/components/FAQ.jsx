import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./FAQ.css";

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq-section" aria-labelledby="faq-title">
      <div className="container faq-inner">
        <div className="section-head">
          <span className="section-kicker">{t.faq.kicker}</span>
          <h2 id="faq-title" className="section-title">{t.faq.title}</h2>
          <p className="section-lede">{t.faq.lede}</p>
        </div>

        <div className="faq-list">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.question}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className="faq-answer"
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <div className="faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
