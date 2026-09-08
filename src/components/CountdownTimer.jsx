import { useEffect, useState } from "react";
import { getTimeRemaining, isEventPast } from "../utils/eventSchedule";
import { useLanguage } from "../context/LanguageContext";
import "./CountdownTimer.css";

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer() {
  const { t } = useLanguage();
  const [remaining, setRemaining] = useState(getTimeRemaining);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getTimeRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  if (isEventPast() || remaining.total <= 0) return null;

  const units = [
    { key: "days", value: remaining.days, label: t.countdown.days },
    { key: "hours", value: pad(remaining.hours), label: t.countdown.hours },
    { key: "minutes", value: pad(remaining.minutes), label: t.countdown.minutes },
    { key: "seconds", value: pad(remaining.seconds), label: t.countdown.seconds },
  ];

  return (
    <div className="countdown" role="timer" aria-label={t.countdown.ariaLabel}>
      <span className="countdown-label">{t.countdown.label}</span>
      <div className="countdown-units">
        {units.map((u) => (
          <div key={u.label} className="countdown-unit">
            {/* key o'zgarganda React elementni qayta o'rnatadi, shu orqali
                CSS "digit-tick" animatsiyasi har soniyada qayta ishga tushadi. */}
            <span className="countdown-value" key={`${u.key}-${u.value}`}>
              {u.value}
            </span>
            <span className="countdown-unit-label">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
