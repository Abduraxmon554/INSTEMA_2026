import { useLanguage } from "../context/LanguageContext";
import "./OpeningQuestions.css";

export default function OpeningQuestions() {
  const { t } = useLanguage();
  const { openingQuestions: q } = t;

  return (
    <section className="section questions-section">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">{q.kicker}</span>
          <h2 className="section-title">{q.title}</h2>
          <p className="section-lede">{q.lede}</p>
        </div>

        <ol className="questions-list">
          {q.items.map((item, i) => (
            <li key={item}>
              <span className="questions-index">{String(i + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>

        <p className="questions-answer">{q.answer}</p>
      </div>
    </section>
  );
}
