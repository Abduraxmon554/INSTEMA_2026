import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AdminLogin.css";

export default function AdminLogin() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(username, password);
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    if (result.role === "admin") {
      window.location.href = "/seminar";
      return;
    }

    window.location.href = "/";
  }

  return (
    <div className="admin-login">
      <div className="admin-login-brand">
        <div className="admin-login-brand-top">
          <span className="eyebrow-tag">INSTEMA / ADMIN</span>
          <h2>Toshkentdagi master-class arizalarini bitta joydan boshqaring</h2>
        </div>
        <blockquote className="admin-login-brand-quote">
          Har bir ariza — klinikaga yangi mutaxassis qo'shilishi imkoni.
          <cite>Boshqaruv paneli</cite>
        </blockquote>
      </div>

      <div className="admin-login-panel">
        <form className="admin-login-card" onSubmit={handleSubmit}>
          <span className="admin-login-mark">IT</span>
          <h1>Tizimga kirish</h1>
          <p className="admin-login-lede">
            Ro'yxatdan o'tganlar ro'yxatini ko'rish uchun login va parolingizni kiriting.
          </p>

          <div className="field">
            <label htmlFor="username">Login</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              autoComplete="username"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Parol</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <p className="admin-login-error">⚠ {error}</p>}

          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Tekshirilmoqda..." : "Kirish"}
          </button>
        </form>
      </div>
    </div>
  );
}
