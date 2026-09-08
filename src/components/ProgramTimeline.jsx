import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./ProgramTimeline.css";

export default function ProgramTimeline() {
  const { t } = useLanguage();
  const { program } = t;
  const [openId, setOpenId] = useState(program.modules[0].num);

  return (
    <section id="dastur" className="section program-section">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">{program.kicker}</span>
          <h2 className="section-title">{program.title}</h2>
          <p className="section-lede">{program.lede}</p>
        </div>

        <div className="program-spine">
          {program.modules.map((m) => {
            const isOpen = openId === m.num;
            return (
              <div className={`program-row ${isOpen ? "is-open" : ""}`} key={m.num}>
                <div className="program-rail">
                  <span className="program-node" />
                </div>

                <div className="program-body">
                  <button
                    className="program-toggle"
                    onClick={() => setOpenId(isOpen ? null : m.num)}
                    aria-expanded={isOpen}
                  >
                    <span className="program-num">{m.num}</span>
                    <span className="program-title">{m.title}</span>
                    <span className="program-caret" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="program-detail">
                      {m.intro && <p className="program-intro">{m.intro}</p>}
                      {m.points.length > 0 && (
                        <ul className="program-points">
                          {m.points.map((pt) => (
                            <li key={pt}>{pt}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
