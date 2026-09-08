import { useEffect, useRef, useState } from "react";

/**
 * Scroll bilan paydo bo'ladigan animatsiya wrapper.
 * variant: "up" | "fade" | "scale" | "left" | "right" | "stagger"
 *   - "stagger" bevosita bolalarni birma-bir chiqaradi (masalan kartochkalar grid).
 * as: qaysi HTML teg sifatida render qilinsin (default: "div").
 */
export default function Reveal({
  children,
  variant = "up",
  as: Tag = "div",
  className = "",
  delay = 0,
  once = true,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    // Reduced-motion afzal ko'rilsa, darhol ko'rsatamiz (animatsiyasiz).
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || (visible && once)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(el);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, visible]);

  const variantClass =
    variant === "stagger"
      ? "reveal-stagger"
      : variant === "mask"
      ? "mask-reveal"
      : `reveal reveal-${variant}`;

  return (
    <Tag
      ref={ref}
      className={`${variantClass} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
