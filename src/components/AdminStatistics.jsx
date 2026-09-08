import { useEffect, useState } from "react";
import "./AdminStatistics.css";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");

export default function AdminStatistics() {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    attendees: 0,
    byCity: {},
    byProfession: {},
    averageRating: 0,
    totalReviews: 0,
    certificatesIssued: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      const [regRes, reviewsRes, certsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/registrations`),
        fetch(`${API_BASE_URL}/reviews`),
        fetch(`${API_BASE_URL}/certificates`),
      ]);
      if (!regRes.ok || !reviewsRes.ok || !certsRes.ok) {
        throw new Error("Statistikani yuklab bo'lmadi.");
      }
      const [registrations, reviews, certificates] = await Promise.all([
        regRes.json(),
        reviewsRes.json(),
        certsRes.json(),
      ]);

      // Hisoblash
      const byCity = {};
      const byProfession = {};
      const UNKNOWN = "Noma'lum";

      registrations.forEach((reg) => {
        const city = reg.city?.trim() || UNKNOWN;
        const profession = reg.profession?.trim() || UNKNOWN;
        byCity[city] = (byCity[city] || 0) + 1;
        byProfession[profession] = (byProfession[profession] || 0) + 1;
      });

      const attendees = registrations.filter((r) => r.attended).length;
      const avgRating =
        reviews.length > 0
          ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
          : 0;

      setStats({
        totalRegistrations: registrations.length,
        attendees: attendees,
        byCity,
        byProfession,
        averageRating: avgRating,
        totalReviews: reviews.length,
        certificatesIssued: certificates.length,
      });
      setLoading(false);
    } catch (err) {
      console.error("Statistikani yuklashda xato:", err);
      setError("Statistikani yuklab bo'lmadi. Qayta urinib ko'ring.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (loading)
    return <div className="stats-loading">Statistika yuklanmoqda...</div>;

  if (error) {
    return (
      <div className="stats-loading">
        {error}{" "}
        <button className="refresh-btn" onClick={fetchStatistics}>
          🔄 Qayta urinish
        </button>
      </div>
    );
  }

  const maxCityCount =
    Object.values(stats.byCity).length > 0 ? Math.max(...Object.values(stats.byCity)) : 0;

  return (
    <section className="admin-statistics">
      <div className="stats-container">
        <h2 className="stats-title">📊 Master-class Statistikasi</h2>

        {/* Main Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-number">{stats.totalRegistrations}</div>
            <div className="stat-label">Jami Ro'yxatdan O'tgan</div>
            <div className="stat-icon">📝</div>
          </div>

          <div className="stat-card success">
            <div className="stat-number">{stats.attendees}</div>
            <div className="stat-label">Ishtirokchilar</div>
            <div className="stat-icon">👥</div>
          </div>

          <div className="stat-card info">
            <div className="stat-number">{stats.totalReviews}</div>
            <div className="stat-label">Sharhlar</div>
            <div className="stat-icon">⭐</div>
          </div>

          <div className="stat-card warning">
            <div className="stat-number">{stats.certificatesIssued}</div>
            <div className="stat-label">Sertifikatlar</div>
            <div className="stat-icon">🎓</div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="stats-section">
          <h3>⭐ O'rtacha Baho</h3>
          <div className="rating-display">
            <span className="rating-score">{stats.averageRating}</span>
            <span className="rating-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`star ${i < Math.round(stats.averageRating) ? "filled" : ""}`}
                >
                  ★
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* By City */}
        <div className="stats-section">
          <h3>🌍 Shahar bo'yicha</h3>
          <div className="chart-bars">
            {Object.entries(stats.byCity).map(([city, count]) => (
              <div key={city} className="chart-bar">
                <div className="bar-label">{city}</div>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${maxCityCount > 0 ? (count / maxCityCount) * 100 : 0}%`,
                    }}
                  />
                  <span className="bar-value">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Profession */}
        <div className="stats-section">
          <h3>💼 Kasbiy tasnif bo'yicha</h3>
          <div className="profession-list">
            {Object.entries(stats.byProfession).map(([profession, count]) => (
              <div key={profession} className="profession-item">
                <span className="profession-name">{profession}</span>
                <span className="profession-count">{count} kishi</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="stats-section">
          <h3>📈 Qayd etilganlarning
          ishtirokchi foizini</h3>
          <div className="conversion-meter">
            <div className="conversion-bar">
              <div
                className="conversion-fill"
                style={{
                  width: `${
                    stats.totalRegistrations > 0
                      ? (stats.attendees / stats.totalRegistrations) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
            <div className="conversion-text">
              {stats.totalRegistrations > 0
                ? Math.round(
                    (stats.attendees / stats.totalRegistrations) * 100
                  )
                : 0}
              % ({stats.attendees} / {stats.totalRegistrations})
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="stats-actions">
          <button className="refresh-btn" onClick={fetchStatistics}>
            🔄 Yangilash
          </button>
        </div>
      </div>
    </section>
  );
}
