import { useEffect, useRef } from "react";

/**
 * Cursor Trail — cursor ortidan yumshoq yorug'lik izi qoladi.
 * Faqat "fine" pointer (sichqoncha) qurilmalarda ishlaydi; mobil/touch va
 * reduced-motion'da butunlay render qilinmaydi (effects.css orqali).
 */
export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isCoarsePointer) return undefined;

    const ctx = canvas.getContext("2d");
    let points = [];
    let raf = null;
    let active = false;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onMove(e) {
      active = true;
      points.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (points.length > 22) points.shift();
    }

    function tick() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      points.forEach((p, i) => {
        p.life -= 0.05;
      });
      points = points.filter((p) => p.life > 0);

      for (let i = 1; i < points.length; i++) {
        const p = points[i];
        const prev = points[i - 1];
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(178, 58, 46, ${p.life * 0.35})`;
        ctx.lineWidth = p.life * 3.2;
        ctx.lineCap = "round";
        ctx.stroke();
      }
      if (points.length) {
        const head = points[points.length - 1];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(178, 58, 46, ${head.life * 0.6})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail-canvas" aria-hidden="true" />;
}
