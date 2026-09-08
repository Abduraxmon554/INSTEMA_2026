// Telegram / WhatsApp kontakt havolalari — .env orqali sozlanadi.
// Haqiqiy raqam/username kiritilmagan bo'lsa, tugma umuman ko'rsatilmaydi
// (soxta/noto'g'ri kontakt ma'lumotini ko'rsatmaslik uchun).

const TELEGRAM_USERNAME = import.meta.env.VITE_TELEGRAM_USERNAME || "";
const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE || "";

export function isTelegramConfigured() {
  return Boolean(TELEGRAM_USERNAME);
}

export function isWhatsappConfigured() {
  return Boolean(WHATSAPP_PHONE);
}

export function getTelegramUrl() {
  if (!isTelegramConfigured()) return null;
  return `https://t.me/${TELEGRAM_USERNAME.replace(/^@/, "")}`;
}

export function getWhatsappUrl(prefilledMessage = "") {
  if (!isWhatsappConfigured()) return null;
  const digits = WHATSAPP_PHONE.replace(/[^\d]/g, "");
  const text = prefilledMessage ? `?text=${encodeURIComponent(prefilledMessage)}` : "";
  return `https://wa.me/${digits}${text}`;
}
