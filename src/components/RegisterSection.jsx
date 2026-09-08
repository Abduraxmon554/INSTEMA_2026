import { useRef, useState } from "react";
import { useRegistrations } from "../context/RegistrationContext";
import { useLanguage } from "../context/LanguageContext";
import { useToast } from "../context/ToastContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { buildClickPaymentUrl, isClickConfigured } from "../utils/clickPayment";
import { downloadEventIcs } from "../utils/eventSchedule";
import ParticleField from "../effects/ParticleField";
import "./RegisterSection.css";

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  profession: "",
  city: "",
  note: "",
  consent: false,
  hpFax: "", // honeypot — foydalanuvchiga ko'rinmaydi; nom atayin noodatiy tanlangan,
  // chunki brauzer avto-to'ldirishi "website"/"url"/"company" kabi odatiy
  // nomlarni ko'rinmas bo'lsa ham to'ldirib qo'yishi mumkin.
};

const MIN_SUBMIT_SECONDS = 3; // 3 soniyadan tez yuborilgan forma bot deb hisoblanadi

export default function RegisterSection() {
  const { addRegistration } = useRegistrations();
  const { t } = useLanguage();
  const { register, event } = t;
  const toast = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [touched, setTouched] = useState(false);
  const [registration, setRegistration] = useState(null);
  const mountedAt = useRef(null);
  if (mountedAt.current === null) mountedAt.current = Date.now();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const isEmailValid = !form.email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const isValid =
    form.fullName.trim().length > 1 &&
    form.phone.trim().length > 5 &&
    isEmailValid &&
    form.consent;

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    // Spam himoyasi: honeypot maydoni to'ldirilgan bo'lsa yoki forma juda
    // tez yuborilgan bo'lsa (bot xatti-harakati), jimgina to'xtatiladi.
    if (form.hpFax) {
      setStatus("success");
      setForm(EMPTY_FORM);
      setTouched(false);
      return;
    }
    const elapsedSeconds = (Date.now() - mountedAt.current) / 1000;
    if (elapsedSeconds < MIN_SUBMIT_SECONDS) {
      setStatus("error");
      setErrorMsg(register.form.spamError || "Iltimos, formani qayta tekshirib yuboring.");
      toast.error(register.form.spamError || "Iltimos, formani qayta tekshirib yuboring.");
      return;
    }

    setStatus("submitting");
    const { hpFax: _hpFax, ...payload } = form;
    const result = await addRegistration(payload);
    if (result.ok) {
      setStatus("success");
      setRegistration(result.data);
      setForm(EMPTY_FORM);
      setTouched(false);
      toast.success(register.success.title);
    } else {
      setStatus("error");
      setErrorMsg(result.error);
      toast.error(result.error);
    }
  }

  return (
    <section id="royxat" className="section register-section">
      <span className="aurora-bg" aria-hidden="true" />
      <ParticleField count={36} color="241, 236, 226" />
      <div className="container register-inner">
        <div className="register-info">
          <LanguageSwitcher className="register-lang-switcher" />
          <span className="section-kicker">{register.kicker}</span>
          <h2 className="section-title">{register.title}</h2>
          <p className="section-lede">{register.lede}</p>
          <ul className="register-bullets">
            {register.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="register-seats">{register.seatsNote}</p>
        </div>

        <div className="register-form-wrap">
          {status === "success" ? (
            <div className="register-success">
              <h3>{register.success.title}</h3>
              <p>{register.success.text}</p>
              {isClickConfigured() && registration?.id && (
                <a
                  className="btn btn-primary btn-block register-payment-button"
                  href={buildClickPaymentUrl(registration.id)}
                >
                  {register.success.paymentCta}
                </a>
              )}
              <button
                type="button"
                className="btn btn-outline btn-block"
                onClick={() =>
                  downloadEventIcs({
                    title: event.title,
                    description: event.taglineFull,
                    location: `${event.city} — ${event.venueNote}`,
                    url: typeof window !== "undefined" ? window.location.origin : "",
                  })
                }
              >
                📅 {register.success.calendarCta}
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setStatus("idle")}
              >
                {register.success.cta}
              </button>
            </div>
          ) : (
            <form className="register-form" onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="hp_fax_confirm"
                value={form.hpFax}
                onChange={(e) => update("hpFax", e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="register-honeypot"
              />
              <div className="field">
                <label htmlFor="fullName">{register.form.fullNameLabel}</label>
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder={register.form.fullNamePlaceholder}
                  autoComplete="name"
                />
                {touched && form.fullName.trim().length <= 1 && (
                  <span className="field-error">{register.form.fullNameError}</span>
                )}
              </div>

              <div className="field">
                <label htmlFor="phone">{register.form.phoneLabel}</label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder={register.form.phonePlaceholder}
                  autoComplete="tel"
                />
                {touched && form.phone.trim().length <= 5 && (
                  <span className="field-error">{register.form.phoneError}</span>
                )}
              </div>

              <div className="field">
                <label htmlFor="email">{register.form.emailLabel}</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder={register.form.emailPlaceholder}
                  autoComplete="email"
                />
                {touched && form.email.trim() && !isEmailValid && (
                  <span className="field-error">{register.form.emailError}</span>
                )}
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="profession">{register.form.professionLabel}</label>
                  <input
                    id="profession"
                    type="text"
                    value={form.profession}
                    onChange={(e) => update("profession", e.target.value)}
                    placeholder={register.form.professionPlaceholder}
                  />
                </div>
                <div className="field">
                  <label htmlFor="city">{register.form.cityLabel}</label>
                  <input
                    id="city"
                    type="text"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    placeholder={register.form.cityPlaceholder}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="note">{register.form.noteLabel}</label>
                <textarea
                  id="note"
                  rows={3}
                  value={form.note}
                  onChange={(e) => update("note", e.target.value)}
                  placeholder={register.form.notePlaceholder}
                />
              </div>

              <label className="consent-field">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                />
                <span>{register.form.consentLabel}</span>
              </label>
              {touched && !form.consent && (
                <span className="field-error">{register.form.consentError}</span>
              )}

              {status === "error" && (
                <p className="register-form-error">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? register.form.submitting : register.form.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
