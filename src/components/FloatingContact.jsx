import { useLanguage } from "../context/LanguageContext";
import {
  getTelegramUrl,
  getWhatsappUrl,
  isTelegramConfigured,
  isWhatsappConfigured,
} from "../utils/contact";
import Magnetic from "../effects/Magnetic";
import "./FloatingContact.css";

export default function FloatingContact() {
  const { t } = useLanguage();

  if (!isTelegramConfigured() && !isWhatsappConfigured()) return null;

  return (
    <div className="floating-contact" role="group" aria-label={t.contact.ariaLabel}>
      {isWhatsappConfigured() && (
        <Magnetic strength={0.35} radius={50} glow>
          <a
            className="floating-contact-btn floating-contact-whatsapp"
            href={getWhatsappUrl(t.contact.whatsappPrefill)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.contact.whatsappLabel}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.65-1.03-5.13-2.9-7C17.17 3.03 14.69 2 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.32a8.18 8.18 0 0 1-1.26-4.38c0-4.55 3.7-8.22 8.24-8.22Zm-4.7 4.6c-.17 0-.44.06-.67.32-.23.25-.87.85-.87 2.08 0 1.22.9 2.4 1.02 2.57.13.17 1.75 2.8 4.32 3.82 2.14.85 2.58.68 3.04.64.47-.04 1.52-.62 1.73-1.22.21-.6.21-1.11.15-1.22-.06-.11-.23-.17-.47-.3-.25-.13-1.52-.75-1.75-.84-.24-.08-.41-.13-.58.13-.17.25-.66.83-.81 1-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.38-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.92-.2-.5-.42-.44-.58-.45h-.5Z"
              />
            </svg>
          </a>
        </Magnetic>
      )}
      {isTelegramConfigured() && (
        <Magnetic strength={0.35} radius={50} glow>
          <a
            className="floating-contact-btn floating-contact-telegram"
            href={getTelegramUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.contact.telegramLabel}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M21.9 4.36 18.7 19.6c-.24 1.06-.87 1.33-1.77.83l-4.9-3.62-2.36 2.28c-.26.26-.48.48-.98.48l.35-4.98 9.06-8.19c.4-.35-.08-.55-.62-.2L6.4 12.4 1.5 10.87c-1.06-.33-1.08-1.06.22-1.57L20.5 2.95c.88-.33 1.65.2 1.4 1.4Z"
              />
            </svg>
          </a>
        </Magnetic>
      )}
    </div>
  );
}
