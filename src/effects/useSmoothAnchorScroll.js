import { useEffect } from "react";

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Smooth Lenis-style Scroll — sahifa ichidagi #anchor havolalarga bosilganda
 * silliq, premium easing bilan scroll qiladi. E'tibor: bu haqiqiy Lenis
 * kutubxonasi emas (tarmoqsiz muhitda o'rnatib bo'lmaydi), lekin xuddi shu
 * "premium smooth scroll" tuyg'usini beradi — va, Lenis'dan farqli o'laroq,
 * oddiy g'ildirak/touch scroll'ni bosib olmaydi, shu bilan forma va
 * ro'yxatdan o'tish bo'limlari uchun xavfsizroq.
 */
export default function useSmoothAnchorScroll() {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    function animateScrollTo(targetY, duration = 900) {
      const startY = window.scrollY;
      const diff = targetY - startY;
      let startTime = null;

      function step(ts) {
        if (startTime === null) startTime = ts;
        const elapsed = ts - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + diff * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    function onClick(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 84;
      const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      animateScrollTo(targetY);
      if (history.pushState) history.pushState(null, "", hash);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
