import { createContext, useCallback, useContext, useState } from "react";
import { API_BASE_URL, authHeaders, handleUnauthorized } from "../utils/api";

const API_URL = `${API_BASE_URL}/registrations`;
const LOCAL_KEY = "instema_local_registrations";

function getLocalRegistrations() {
  try {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveLocalRegistration(item) {
  try {
    const list = getLocalRegistrations();
    const filtered = list.filter((r) => r.id !== item.id);
    const updated = [item, ...filtered];
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("LocalStorage save error:", err);
  }
}

function removeLocalRegistration(id) {
  try {
    const list = getLocalRegistrations();
    const filtered = list.filter((r) => r.id !== id);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error("LocalStorage delete error:", err);
  }
}

function updateLocalStatus(id, status) {
  try {
    const list = getLocalRegistrations();
    const updated = list.map((r) => (r.id === id ? { ...r, status } : r));
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("LocalStorage update error:", err);
  }
}

const RegistrationContext = createContext(null);

export function RegistrationProvider({ children }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRegistrations = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    let serverData = [];
    try {
      const res = await fetch(API_URL, { headers: authHeaders() });
      if (res.status === 401) {
        handleUnauthorized();
        return [];
      }
      if (res.ok) {
        serverData = await res.json();
      }
    } catch (err) {
      console.warn("Backend fetch failed, using local backup:", err.message);
    }

    const localData = getLocalRegistrations();

    // Merge server data and local storage data without duplicates
    const map = new Map();
    [...serverData, ...localData].forEach((item) => {
      if (item && item.id) {
        map.set(item.id, { ...map.get(item.id), ...item });
      }
    });

    const merged = Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );

    setRegistrations(merged);
    if (!silent) setLoading(false);

    // Background sync: attempt to send un-synced local items to server
    if (localData.length > 0 && serverData.length >= 0) {
      const serverIds = new Set(serverData.map((s) => s.id));
      for (const localItem of localData) {
        if (!serverIds.has(localItem.id)) {
          fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(localItem),
          }).catch(() => {});
        }
      }
    }

    return merged;
  }, []);

  const addRegistration = useCallback(async (payload) => {
    setError(null);
    const tempId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newRegistration = {
      id: tempId,
      ...payload,
      status: "yangi",
      createdAt: new Date().toISOString(),
    };

    // Save locally immediately
    saveLocalRegistration(newRegistration);
    setRegistrations((prev) => [newRegistration, ...prev]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const created = await res.json();
        removeLocalRegistration(tempId);
        saveLocalRegistration(created);
        setRegistrations((prev) =>
          prev.map((r) => (r.id === tempId ? created : r))
        );
        return { ok: true, data: created };
      }
    } catch (err) {
      console.warn("Server POST failed, saved to local storage:", err.message);
    }

    return { ok: true, data: newRegistration };
  }, []);

  const updateStatus = useCallback(async (id, status) => {
    updateLocalStatus(id, status);
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ status }),
      });
      if (res.status === 401) {
        handleUnauthorized();
        return { ok: false, error: "Sessiya tugadi." };
      }
      if (res.ok) {
        const updated = await res.json();
        saveLocalRegistration(updated);
      }
    } catch (err) {
      console.warn("Backend patch failed, updated locally:", err.message);
    }

    return { ok: true };
  }, []);

  const deleteRegistration = useCallback(async (id) => {
    removeLocalRegistration(id);
    setRegistrations((prev) => prev.filter((r) => r.id !== id));

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.status === 401) {
        handleUnauthorized();
        return { ok: false, error: "Sessiya tugadi." };
      }
    } catch (err) {
      console.warn("Backend delete failed, deleted locally:", err.message);
    }

    return { ok: true };
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
