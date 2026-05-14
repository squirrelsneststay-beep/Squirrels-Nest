"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Opening title card. Massive "Lane End Farm" centered on cream.
 * No intro loader — the page IS the wordmark on first load.
 * As the user scrolls, it parallax-fades upward and the hero appears beneath.
 */
export function TitleCard() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Entrance — wordmark gently reveals on load
      gsap.from(".tc-mark .tc-mark-line", {
        y: 80,
        opacity: 0,
        duration: 1.6,
        ease: "power4.out",
        stagger: 0.15,
        delay: 0.2,
      });
      gsap.from(".tc-eyebrow", {
        y: 14,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4,
      });
      gsap.from(".tc-cue", {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1.4,
      });

      if (prefersReducedMotion) return;

      // Scroll-driven parallax + fade
      gsap.to(".tc-mark", {
        y: -120,
        opacity: 0,
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(".tc-eyebrow, .tc-cue", {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=40%",
          scrub: 0.6,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex items-center justify-center"
      style={{
        minHeight: "100vh",
        background: "var(--lef-cream)",
      }}
    >
      <div className="lef-container flex flex-col items-center text-center">
        <span
          className="tc-eyebrow font-mono-eyebrow mb-10"
          style={{ color: "var(--lef-bark)" }}
        >
          A converted cabin · the english countryside
        </span>

        <h1
          className="tc-mark font-display"
          style={{
            color: "var(--lef-forest)",
            lineHeight: 0.86,
            letterSpacing: "-0.01em",
            fontSize: "clamp(3.5rem, 12vw, 12rem)",
          }}
        >
          <span className="block overflow-hidden">
            <span className="tc-mark-line block">Lane End</span>
          </span>
          <span className="block overflow-hidden">
            <span className="tc-mark-line block font-display-italic" style={{ color: "var(--lef-moss)" }}>
              Farm
            </span>
          </span>
        </h1>

        <div
          className="tc-cue absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ color: "var(--lef-bark)" }}
        >
          <span className="font-mono-eyebrow">scroll</span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, color-mix(in srgb, var(--lef-bark) 60%, transparent), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
