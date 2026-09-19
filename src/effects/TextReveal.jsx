import { useEffect, useRef, useState } from "react";

/**
 * Text Reveal Animation / Kinetic Typography — matnni so'zlarga bo'lib,
 * scroll bilan ko'rinishga kirganda birma-bir chiroyli chiqaradi.
 *
 * variant: "reveal" (yumshoq, yuqoridan chiqadi) | "kinetic" (dinamik, sakrab chiqadi)
 * as: qaysi teg (h1, h2, p...)
 */
export default function TextReveal({
  text,
  variant = "reveal",
  as: Tag = "span",
  className = "",
  staggerMs = 45,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const words = String(text).split(" ");
  const variantClass = variant === "kinetic" ? "text-reveal-kinetic" : "";

  return (
    <Tag
      ref={ref}
      className={`text-reveal ${variantClass} ${visible ? "is-visible" : ""} ${className}`.trim()}
      {...rest}
    >
      {words.map((word, i) => (
        <span className="text-reveal-word" key={`${word}-${i}`} style={{ "--twd": `${i * staggerMs}ms` }}>
          <span>{word}&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
}
