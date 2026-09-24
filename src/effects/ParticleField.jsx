import { useEffect, useRef } from "react";

/**
 * Particle Background — orqa fonda sekin uchib yuruvchi zarrachalar.
 * Canvas'da chiziladi, GPU'ga og'ir bo'lmasligi uchun zarracha soni
 * konteyner o'lchamiga qarab cheklanadi.
 */
export default function ParticleField({ count = 44, color = "241, 236, 226", className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    let width = 0;
    let height = 0;
    let particles = [];
    let raf = null;
    let running = true;

    function resize() {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeParticles() {
      const n = Math.max(12, Math.min(count, Math.round((width * height) / 22000)));
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.7 + Math.random() * 2.1,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.06 - Math.random() * 0.16,
        o: 0.15 + Math.random() * 0.45,
      }));
    }

    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    }

    resize();
    makeParticles();
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      resize();
      makeParticles();
    };
    window.addEventListener("resize", onResize);

    function onVisibility() {
      running = document.visibilityState === "visible";
      if (running && !raf) raf = requestAnimationFrame(tick);
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, color]);

  return <canvas ref={canvasRef} className={`effect-canvas-layer ${className}`.trim()} aria-hidden="true" />;
}
