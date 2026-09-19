// Master-classning markazlashtirilgan sana/vaqt ma'lumotlari.
// db.json dagi `schedule` massividagi kunlar bilan bir xil bo'lishi kerak.
// Manzil hali aniqlanmagani uchun aniq manzil ko'rsatilmaydi — ro'yxatdan
// o'tganlarga alohida yuboriladi (haqiqiy bo'lmagan manzilni ixtiro qilmaslik uchun).

export const EVENT_START_ISO = "2026-09-15T09:00:00+05:00";
export const EVENT_END_ISO = "2026-09-16T15:00:00+05:00";
export const EVENT_TIMEZONE = "Asia/Tashkent";

export function getEventStartDate() {
  return new Date(EVENT_START_ISO);
}

export function getEventEndDate() {
  return new Date(EVENT_END_ISO);
}

export function isEventPast() {
  return Date.now() > getEventEndDate().getTime();
}

// Qolgan vaqtni { days, hours, minutes, seconds, total } ko'rinishida qaytaradi.
export function getTimeRemaining() {
  const total = getEventStartDate().getTime() - Date.now();
  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { total, days, hours, minutes, seconds };
}

function toIcsDate(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

// .ics faylini yaratib, brauzerda yuklab olishga majbur qiladi
// (Google Calendar, Outlook, Apple Calendar bilan mos).
export function downloadEventIcs({ title, description, location, url }) {
  const start = toIcsDate(getEventStartDate());
  const end = toIcsDate(getEventEndDate());
  const now = toIcsDate(new Date());
  const uid = `instema-masterclass-${Date.now()}@instema.uz`;

  const escapeText = (value) =>
    String(value || "")
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\n/g, "\\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//INSTEMA//Masterclass//UZ",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeText(title)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `LOCATION:${escapeText(location)}`,
    url ? `URL:${escapeText(url)}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  const blob = new Blob([lines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = "instema-masterclass.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
}
