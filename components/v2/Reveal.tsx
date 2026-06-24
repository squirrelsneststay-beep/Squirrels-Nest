"use client";

import { useEffect, useRef } from "react";

/**
 * Reveal — wraps any block in a scroll-triggered clip-path + lift + fade.
 * IntersectionObserver adds `.in` once, so it's cheap and never re-hides.
 * `delay` staggers siblings. Honours reduced-motion via the CSS rule.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
  imgWipe = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  imgWipe?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${imgWipe ? "imgwipe" : "rv"} ${className}`}
      style={{ ["--rv-d" as string]: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}
