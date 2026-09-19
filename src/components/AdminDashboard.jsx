import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRegistrations } from "../context/RegistrationContext";
import { useToast } from "../context/ToastContext";
import AdminStatistics from "./AdminStatistics";
import "./AdminDashboard.css";

const STATUS_OPTIONS = ["yangi", "bog'lanildi", "tasdiqlandi", "bekor qilindi"];
const PAGE_SIZE = 10;
const COLUMNS = [
  { key: "fullName", label: "Ism" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Telefon" },
  { key: "profession", label: "Mutaxassislik" },
  { key: "city", label: "Shahar" },
  { key: "note", label: "Izoh" },
  { key: "createdAt", label: "Sana" },
  { key: "status", label: "Holat" },
];

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function toCsv(rows) {
  const header = ["Ism", "Email", "Telefon", "Mutaxassislik", "Shahar", "Izoh", "Holat", "Sana"];
  const lines = rows.map((r) =>
    [r.fullName, r.email || "", r.phone, r.profession, r.city, r.note, r.status, r.createdAt]
      .map((v) => `"${(v || "").toString().replace(/"/g, '""')}"`)
      .join(",")
  );
  return [header.join(","), ...lines].join("\n");
}

function toExcelRows(rows) {
  return rows.map((r) => ({
    Ism: r.fullName,
    Email: r.email || "",
    Telefon: r.phone,
    Mutaxassislik: r.profession || "",
    Shahar: r.city || "",
    Izoh: r.note || "",
    Holat: r.status,
    Sana: formatDate(r.createdAt),
  }));
}

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const {
    registrations,
    loading,
    error,
    fetchRegistrations,
    updateStatus,
    deleteRegistration,
  } = useRegistrations();
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("hammasi");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [view, setView] = useState("list"); // list | stats

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const filtered = useMemo(() => {
    return registrations.filter((r) => {
      const matchesQuery =
        !query ||
        `${r.fullName} ${r.phone} ${r.city} ${r.profession}`
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "hammasi" || r.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [registrations, query, statusFilter]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = (a[sortKey] ?? "").toString().toLowerCase();
      const bv = (b[sortKey] ?? "").toString().toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(
    () => sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [sorted, currentPage]
  );

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function handleExport() {
    const csv = toCsv(sorted);
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "instema-royxat.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV fayli yuklab olindi.");
  }

  async function handleExportExcel() {
    toast.info("Excel tayyorlanmoqda...", { duration: 1500 });
    try {
      const XLSX = await import("xlsx");
      const worksheet = XLSX.utils.json_to_sheet(toExcelRows(sorted));
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Ro'yxat");
      XLSX.writeFile(workbook, "instema-royxat.xlsx");
      toast.success("Excel fayli yuklab olindi.");
    } catch {
      toast.error("Excel faylini yaratib bo'lmadi.");
    }
  }

  async function handleDelete(id, name) {
    if (window.confirm(`"${name}" arizasini o'chirmoqchimisiz?`)) {
      const result = await deleteRegistration(id);
      if (result.ok) {
        toast.success(`"${name}" arizasi o'chirildi.`);
      } else {
        toast.error(result.error || "O'chirishda xatolik yuz berdi.");
      }
    }
  }

  async function handleStatusChange(id, name, status) {
    const result = await updateStatus(id, status);
    if (result.ok) {
      toast.info(`"${name}" holati "${status}" ga o'zgartirildi.`);
    } else {
      toast.error(result.error || "Holatni yangilab bo'lmadi.");
    }
  }

  function sortIndicator(key) {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " ▲" : " ▼";
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="container admin-header-inner">
          <div>
            <span className="eyebrow-tag">INSTEMA / ADMIN</span>
            <h1>Ro'yxatdan o'tganlar</h1>
          </div>
          <div className="admin-header-actions">
            <span className="admin-user">👤 {admin?.username}</span>
            <button className="btn btn-outline" onClick={logout}>
              Chiqish
            </button>
          </div>
        </div>
      </header>

      <main className="container admin-main">
        <div className="admin-tabs">
          <button
            className={`admin-tab ${view === "list" ? "is-active" : ""}`}
            onClick={() => setView("list")}
          >
            📋 Ro'yxat
          </button>
          <button
            className={`admin-tab ${view === "stats" ? "is-active" : ""}`}
            onClick={() => setView("stats")}
          >
            📊 Statistika
          </button>
        </div>

        {view === "stats" ? (
          <AdminStatistics />
        ) : (
          <>
            <div className="admin-toolbar">
          <input
            className="admin-search"
            placeholder="Ism, telefon yoki shahar bo'yicha qidirish..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <select
            className="admin-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="hammasi">Barcha holatlar</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button className="btn btn-outline" onClick={fetchRegistrations}>
            Yangilash
          </button>
          <button className="btn btn-outline" onClick={handleExport}>
            CSV yuklab olish
          </button>
          <button className="btn btn-primary" onClick={handleExportExcel}>
            Excel yuklab olish
          </button>
        </div>

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="admin-th-sortable"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                    {sortIndicator(col.key)}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={9} className="admin-empty">
                    Yuklanmoqda...
                  </td>
                </tr>
              )}
              {!loading && sorted.length === 0 && (
                <tr>
                  <td colSpan={9} className="admin-empty">
                    Hech qanday ariza topilmadi.
                  </td>
                </tr>
              )}
              {!loading &&
                paginated.map((r) => (
                  <tr key={r.id}>
                    <td className="admin-name">{r.fullName}</td>
                    <td>{r.email || "—"}</td>
                    <td>{r.phone}</td>
                    <td>{r.profession || "—"}</td>
                    <td>{r.city || "—"}</td>
                    <td className="admin-note" title={r.note}>
                      {r.note || "—"}
                    </td>
                    <td className="admin-date">{formatDate(r.createdAt)}</td>
                    <td>
                      <select
                        className="admin-status"
                        data-status={r.status}
                        value={r.status}
                        onChange={(e) =>
                          handleStatusChange(r.id, r.fullName, e.target.value)
                        }
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="admin-delete"
                        onClick={() => handleDelete(r.id, r.fullName)}
                        aria-label="O'chirish"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {!loading && sorted.length > 0 && (
          <div className="admin-pagination">
            <button
              className="btn btn-outline"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ← Oldingi
            </button>
            <span className="admin-pagination-info">
              {currentPage} / {totalPages} sahifa ({sorted.length} ta ariza)
            </span>
            <button
              className="btn btn-outline"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Keyingi →
            </button>
          </div>
        )}
          </>
        )}
      </main>
    </div>
  );
}
