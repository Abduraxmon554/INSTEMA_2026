import { cloneElement, useEffect, useRef } from "react";

/**
 * Magnetic Cursor — cursor elementga yaqinlashganda, element cursor tomon
 * ozgina "tortiladi". glow=true bo'lsa, orqasida yumshoq porlash paydo bo'ladi.
 *
 * Foydalanish: <Magnetic strength={0.35} glow><a className="btn">...</a></Magnetic>
 */
export default function Magnetic({ children, strength = 0.35, radius = 90, glow = false, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isCoarsePointer) return undefined;

    let frame = null;

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(rect.width, rect.height) / 2 + radius;

      if (dist < influence) {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        });
      }
    }

    function onLeave() {
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = "translate(0, 0)";
    }

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength, radius]);

  const child = children;
  const mergedClassName = `magnetic-el ${glow ? "magnetic-glow" : ""} ${child.props.className || ""} ${className}`.trim();

  return cloneElement(child, {
    ref: (node) => {
      ref.current = node;
      const { ref: childRef } = child;
      if (typeof childRef === "function") childRef(node);
      else if (childRef && typeof childRef === "object") childRef.current = node;
    },
    className: mergedClassName,
  });
}
