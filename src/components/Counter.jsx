import { useEffect, useRef, useState } from "react";

/**
 * Ko'rinishga kirganda 0 dan qiymatgacha "counting up" animatsiyasi bilan
 * sonni ko'rsatuvchi komponent. `value` ichida raqam bo'lmagan prefiks/
 * suffiks (masalan "$", "so'm", "+") bo'lsa, ular saqlanib qoladi va faqat
 * raqamli qism animatsiya qilinadi.
 *
 * Masalan: value="$1,200" -> "$0" dan "$1,200" gacha o'sadi.
 */
export default function Counter({
  value,
  duration = 1400,
  className = "",
  as: Tag = "span",
  ...rest
}) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [display, setDisplay] = useState(null);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const str = String(value ?? "");
  const match = str.match(/(-?[\d.,]*\d)/);
  const numericPart = match ? match[0] : null;
  const prefix = numericPart ? str.slice(0, match.index) : "";
  const suffix = numericPart ? str.slice(match.index + numericPart.length) : "";
  const target = numericPart
    ? parseFloat(numericPart.replace(/,/g, ""))
    : null;
  const hasCommas = numericPart ? numericPart.includes(",") : false;
  const decimals = numericPart && numericPart.includes(".")
    ? numericPart.split(".")[1].length
    : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null || prefersReduced) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, prefersReduced]);

  useEffect(() => {
    if (!started || target === null) return undefined;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = target * eased;
      setDisplay(formatNumber(current, decimals, hasCommas));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(formatNumber(target, decimals, hasCommas));
      }
    }

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration, decimals, hasCommas]);

  if (target === null) {
    // Raqamsiz qiymat — animatsiyasiz to'g'ridan-to'g'ri ko'rsatiladi.
    return (
      <Tag ref={ref} className={`count-up ${className}`.trim()} {...rest}>
        {str}
      </Tag>
    );
  }

  const shown = prefersReduced
    ? formatNumber(target, decimals, hasCommas)
    : display ?? formatNumber(0, decimals, hasCommas);

  return (
    <Tag ref={ref} className={`count-up ${className}`.trim()} {...rest}>
      {prefix}
      {shown}
      {suffix}
    </Tag>
  );
}

function formatNumber(n, decimals, hasCommas) {
  const fixed = decimals > 0 ? n.toFixed(decimals) : String(Math.round(n));
  if (!hasCommas) return fixed;
  const [intPart, decPart] = fixed.split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decPart ? `${withCommas}.${decPart}` : withCommas;
}
