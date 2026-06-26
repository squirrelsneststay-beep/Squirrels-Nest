"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollType — the "text writes itself as you scroll" effect. Each word fades
 * from faint to full, scrubbed to the scroll position, so the line appears to
 * type out as the reader moves down. Reduced-motion shows it fully.
 */
export function ScrollType({
  text,
  className,
  style,
  as = "p",
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "p" | "h2" | "h3";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".st-w");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => (w.style.opacity = "1"));
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: "top 38%",
          scrub: 0.5,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [text]);

  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} className="st-w" style={{ opacity: 0.14 }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
