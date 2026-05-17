"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Cream breathing-room bridge between sections.
 *
 * Sits between two dark photographic sections (e.g. Hero → ChapterJourney)
 * so the transition is not a hard cut between photos. A thin vertical
 * rule descends as you scroll, with a single quiet sentence that fades
 * in mid-section. Acts as a soft tonal "white bar" — a breath.
 *
 * Use sparingly. Default to ~50vh.
 */
export function BridgeBreath({ phrase = "Slow down. You're nearly there." }: { phrase?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bb-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.6,
          },
        }
      );
      gsap.fromTo(
        ".bb-phrase",
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 60%", once: true },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex flex-col items-center justify-center"
      style={{
        background: "var(--v2-bg)",
        minHeight: "55vh",
        paddingBlock: "10vh",
      }}
    >
      <div
        className="bb-line"
        aria-hidden
        style={{
          width: "1px",
          height: "5rem",
          background: "var(--v2-mute)",
          opacity: 0.5,
          marginBottom: "1.75rem",
        }}
      />
      <p
        className="bb-phrase"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)",
          color: "var(--v2-ink-soft)",
          letterSpacing: "-0.005em",
          textAlign: "center",
          maxWidth: "28rem",
          margin: 0,
        }}
      >
        {phrase}
      </p>
    </section>
  );
}
