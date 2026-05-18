"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Centered editorial scroll moment:
 *   Word A ──── thin line draws ──── Word B
 *   ↳ subline fades in below
 *
 * The line is a 1px high div that scales horizontally from 0 → 1 on scroll-scrub.
 * No SVG, no turbulence, no jitter — clean and minimal.
 */
export function WordLineMoment() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const wL = root.querySelector(".wlm-l");
      const wR = root.querySelector(".wlm-r");
      const line = root.querySelector(".wlm-line");
      const sub = root.querySelector(".wlm-sub");

      gsap.set([wL, wR, sub], { opacity: 0, y: 16 });
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

      if (prefersReducedMotion) {
        gsap.set([wL, wR, sub], { clearProps: "all" });
        gsap.set(line, { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      tl.to(wL, { opacity: 1, y: 0, duration: 0.15 }, 0);
      tl.to(line, { scaleX: 1, duration: 0.4, ease: "power2.inOut" }, 0.15);
      tl.to(wR, { opacity: 1, y: 0, duration: 0.15 }, 0.5);
      tl.to(sub, { opacity: 1, y: 0, duration: 0.2 }, 0.65);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative py-32 md:py-48" style={{ background: "var(--v2-bg)" }}>
      <div className="v2-container">
        {/* Word A ——— line ——— Word B, single row, centered horizontally */}
        <div className="flex items-baseline justify-center gap-6 md:gap-10">
          <span
            className="wlm-l font-display"
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2.5rem)",
              color: "var(--v2-ink)",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              whiteSpace: "nowrap",
            }}
          >
            A working farm
          </span>

          <div
            className="wlm-line"
            style={{
              flex: "1 1 0",
              maxWidth: "20rem",
              height: "1px",
              background: "var(--v2-ink)",
              opacity: 0.4,
            }}
          />

          <span
            className="wlm-r font-display"
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2.5rem)",
              color: "var(--v2-ink)",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              whiteSpace: "nowrap",
            }}
          >
            a quieter rhythm.
          </span>
        </div>

        {/* Subline below */}
        <p
          className="wlm-sub text-center mx-auto mt-10 md:mt-14 font-display-italic"
          style={{
            fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
            color: "var(--v2-ink-soft)",
            lineHeight: 1.5,
            maxWidth: "36ch",
          }}
        >
          Squirrels&apos; Nest — a converted cabin set against open English fields and quiet skies.
        </p>
      </div>
    </section>
  );
}
