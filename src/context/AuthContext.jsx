import { createContext, useContext, useState } from "react";
import { API_BASE_URL, SESSION_KEY, readSession } from "../utils/api";

const LOGIN_URL = `${API_BASE_URL}/api/login`;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(readSession);
  const ready = true;

  async function login(username, password) {
    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: String(username || "").trim(),
          password: String(password || "").trim(),
        }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        // JSON bo'lmagan javob (masalan, server o'chiq)
      }

      if (!res.ok) {
        return { ok: false, error: data.error || "Serverga ulanib bo'lmadi." };
      }

      const session = {
        username: data.user.username,
        id: data.user.id,
        role: data.user.role || "user",
        token: data.token,
        expiresAt: data.expiresAt,
      };

      setAdmin(session);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { ok: true, role: session.role };
    } catch {
      return {
        ok: false,
        error: "Serverga ulanib bo'lmadi. 'npm run server' ishga tushirilganini tekshiring.",
      };
    }
  }

  function logout() {
    setAdmin(null);
    sessionStorage.removeItem(SESSION_KEY);
  }

  return (
    <AuthContext.Provider value={{ admin, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth AuthProvider ichida ishlatilishi kerak");
  return ctx;
}
