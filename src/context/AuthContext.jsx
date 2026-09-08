import { createContext, useContext, useState } from "react";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");
const API_URL = `${API_BASE_URL}/admins`;
const USERS_URL = `${API_BASE_URL}/users`;
const STORAGE_KEY = "instema_admin_session";

const AuthContext = createContext(null);

function readStoredSession() {
  const saved = sessionStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(readStoredSession);
  const ready = true;

  async function login(username, password) {
    try {
      const cleanUsername = String(username || "").trim();
      const cleanPassword = String(password || "").trim();

      const [adminsRes, usersRes] = await Promise.all([
        fetch(API_URL),
        fetch(USERS_URL).catch(() => ({ ok: false, json: async () => [] })),
      ]);

      if (!adminsRes.ok) throw new Error("Serverga ulanib bo'lmadi.");

      const admins = await adminsRes.json();
      const users = usersRes.ok ? await usersRes.json() : [];
      const accounts = [
        ...admins.map((a) => ({ ...a, role: "admin" })),
        ...users.map((u) => ({ ...u, role: u.role || "user" })),
      ];

      const match = accounts.find(
        (account) =>
          account.username.trim().toLowerCase() === cleanUsername.toLowerCase() &&
          account.password === cleanPassword
      );

      if (!match) {
        return { ok: false, error: "Login yoki parol noto'g'ri." };
      }

      const session = {
        username: match.username,
        id: match.id,
        role: match.role || "user",
      };

      setAdmin(session);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      return { ok: true, role: session.role };
    } catch (err) {
      return {
        ok: false,
        error:
          err.message ||
          "Serverga ulanib bo'lmadi. 'npm run server' ishga tushirilganini tekshiring.",
      };
    }
  }

  function logout() {
    setAdmin(null);
    sessionStorage.removeItem(STORAGE_KEY);
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
