"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Horizontal text scrolling across the page at a different speed than the
 * page scroll. The viewer is fixed; the text moves around them.
 * Inspired by the Framer Text-Scroll technique.
 */
export function TextScrollMarquee() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const track = root.querySelector<HTMLElement>(".tsm-track");
      if (!track) return;

      gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Word loop — duplicated so the marquee can scroll seamlessly
  const words = ["wood", "fire", "fields", "stillness", "morning", "smoke", "wood", "fire", "fields", "stillness", "morning", "smoke"];

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: "var(--v2-bg)" }}
    >
      <div className="tsm-track flex whitespace-nowrap" style={{ willChange: "transform" }}>
        {words.map((w, i) => (
          <span
            key={i}
            className="font-display-italic px-6"
            style={{
              fontSize: "clamp(4rem, 12vw, 12rem)",
              color: "var(--v2-ink)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {w}.
          </span>
        ))}
      </div>
    </section>
  );
}
