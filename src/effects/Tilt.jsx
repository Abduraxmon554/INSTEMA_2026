import { cloneElement, useEffect, useRef } from "react";

/**
 * 3D Tilt Effect — mouse yurganda bolasi elementni 3D qiyshaytiradi.
 * Sensorli (touch) qurilmalarda va reduced-motion'da o'chirilgan.
 *
 * Foydalanish: <Tilt max={12} glare><div className="card">...</div></Tilt>
 */
export default function Tilt({ children, max = 10, scale = 1.02, glare = true, className = "" }) {
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
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rotateY = (px - 0.5) * max * 2;
        const rotateX = (0.5 - py) * max * 2;
        el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        el.style.setProperty("--tilt-x", `${px * 100}%`);
        el.style.setProperty("--tilt-y", `${py * 100}%`);
      });
    }

    function onLeave() {
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max, scale]);

  const child = children;
  const mergedClassName = `tilt-el tilt-3d-hover ${child.props.className || ""} ${className}`.trim();

  return cloneElement(child, {
    ref: (node) => {
      ref.current = node;
      const { ref: childRef } = child;
      if (typeof childRef === "function") childRef(node);
      else if (childRef && typeof childRef === "object") childRef.current = node;
    },
    className: mergedClassName,
    children: glare ? (
      <>
        {child.props.children}
        <span className="tilt-shine" aria-hidden="true" />
      </>
    ) : (
      child.props.children
    ),
  });
}
