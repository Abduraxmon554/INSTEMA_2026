import { createContext, useCallback, useContext, useState } from "react";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");
const API_URL = `${API_BASE_URL}/registrations`;

const RegistrationContext = createContext(null);

export function RegistrationProvider({ children }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Ma'lumotlarni olishda xatolik yuz berdi.");
      const data = await res.json();
      // Sorting in JavaScript since json-server v1 doesn't support _sort params well
      const sorted = [...data].sort((a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
      setRegistrations(sorted);
      return sorted;
    } catch (err) {
      setError(
        err.message ||
          "Serverga ulanib bo'lmadi. 'npm run server' ishga tushirilganini tekshiring."
      );
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const addRegistration = useCallback(async (payload) => {
    setError(null);
    const body = {
      ...payload,
      status: "yangi",
      createdAt: new Date().toISOString(),
    };
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Arizani yuborishda xatolik yuz berdi.");
      const created = await res.json();
      setRegistrations((prev) => [created, ...prev]);
      return { ok: true, data: created };
    } catch (err) {
      const message =
        err.message ||
        "Serverga ulanib bo'lmadi. Iltimos, birozdan so'ng qayta urinib ko'ring.";
      setError(message);
      return { ok: false, error: message };
    }
  }, []);

  const updateStatus = useCallback(async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Holatni yangilab bo'lmadi.");
      const updated = await res.json();
      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? updated : r))
      );
      return { ok: true };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    }
  }, []);

  const deleteRegistration = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("O'chirishda xatolik yuz berdi.");
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
      return { ok: true };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    }
  }, []);

  const value = {
    registrations,
    loading,
    error,
    fetchRegistrations,
    addRegistration,
    updateStatus,
    deleteRegistration,
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistrations() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) {
    throw new Error(
      "useRegistrations RegistrationProvider ichida ishlatilishi kerak"
    );
  }
  return ctx;
}
