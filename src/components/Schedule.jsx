import { useEffect, useState } from "react";
import "./Schedule.css";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/schedule`)
      .then((res) => {
        if (!res.ok) throw new Error("Jadvalni yuklab bo'lmadi.");
        return res.json();
      })
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Jadvalni yuklashda xato:", err);
        setError("Jadvalni yuklab bo'lmadi. Sahifani qayta yuklab ko'ring.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="schedule-loading">Jadval yuklanmoqda...</div>;
  if (error) return <div className="schedule-loading">{error}</div>;
  if (schedule.length === 0) return null;

  return (
    <section className="schedule">
      <div className="schedule-container">
        <h2 className="schedule-title">📅 Jadval va Agenda</h2>

        <div className="schedule-days">
          {schedule.map((day) => (
            <div key={day.id} className="schedule-day">
              <div className="day-header">
                <span className="day-number">Kun {day.day}</span>
                <span className="day-date">{day.date}</span>
              </div>

              <div className="sessions">
                {day.sessions.map((session, idx) => (
                  <div key={idx} className="session-card">
                    <div className="session-time">⏰ {session.time}</div>
                    <div className="session-title">{session.title}</div>
                    <div className="session-description">{session.description}</div>
                    <div className="session-speaker">👨‍🏫 {session.speaker}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="schedule-total">
          <p>📌 Jami davomiyligi: <strong>12 soat</strong></p>
          <p>📍 Joylar cheklangan - Dastlab ro'yxatdan o'ting!</p>
        </div>
      </div>
    </section>
  );
}
