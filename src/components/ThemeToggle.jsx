import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={isDark ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
      aria-pressed={isDark}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">
          <svg
            className="theme-toggle-icon theme-toggle-icon--sun"
            viewBox="0 0 24 24"
            width="13"
            height="13"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4.6" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="12" y1="1.6" x2="12" y2="4.2" />
              <line x1="12" y1="19.8" x2="12" y2="22.4" />
              <line x1="1.6" y1="12" x2="4.2" y2="12" />
              <line x1="19.8" y1="12" x2="22.4" y2="12" />
              <line x1="4.4" y1="4.4" x2="6.2" y2="6.2" />
              <line x1="17.8" y1="17.8" x2="19.6" y2="19.6" />
              <line x1="4.4" y1="19.6" x2="6.2" y2="17.8" />
              <line x1="17.8" y1="6.2" x2="19.6" y2="4.4" />
            </g>
          </svg>
          <svg
            className="theme-toggle-icon theme-toggle-icon--moon"
            viewBox="0 0 24 24"
            width="13"
            height="13"
            aria-hidden="true"
          >
            <path
              d="M20.4 14.7A8.6 8.6 0 1 1 9.3 3.6a7 7 0 0 0 11.1 11.1Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}
