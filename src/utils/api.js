// Backend bilan ishlash uchun umumiy yordamchilar.
export const API_BASE_URL = (import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:3001" : "")).replace(/\/$/, "");
export const SESSION_KEY = "instema_admin_session";

// Saqlangan admin sessiyasini o'qiydi. Muddati tugagan bo'lsa o'chirib tashlaydi.
export function readSession() {
  const saved = sessionStorage.getItem(SESSION_KEY);
  if (!saved) return null;
  try {
    const session = JSON.parse(saved);
    if (!session?.token || (session.expiresAt && session.expiresAt < Date.now())) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function authHeaders(extra = {}) {
  const session = readSession();
  return session ? { ...extra, Authorization: `Bearer ${session.token}` } : { ...extra };
}

// Server 401 qaytarsa (token eskirgan/yaroqsiz) — sessiyani tozalab, login sahifasiga o'tkazadi.
export function handleUnauthorized() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = "/login";
}
