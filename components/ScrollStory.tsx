"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderImage } from "./PlaceholderImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Iconic dark-scroll moment — single sticky frame where two short phrases
 * sit at opposite ends of the viewport connected by a thin line that draws
 * across as the user scrolls. A curved descender drops to a subline below.
 *
 * Flat colour: solid forest/charcoal background, cream text. No gradients.
 */
export function ScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = sectionRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const wL = root.querySelector(".ss-word-l");
      const wR = root.querySelector(".ss-word-r");
      const hLine = root.querySelector<HTMLElement>(".ss-h-line");
      const cLine = root.querySelector<SVGPathElement>(".ss-c-line");
      const sub = root.querySelector(".ss-sub");
      const bgImg = root.querySelector(".ss-bg-img");

      gsap.set([wL, wR, sub], { opacity: 0, y: 24 });
      gsap.set(hLine, { scaleX: 0 });
      gsap.set(cLine, { strokeDashoffset: 100 });

      if (prefersReducedMotion) {
        gsap.set([wL, wR, sub], { clearProps: "all" });
        gsap.set(hLine, { scaleX: 1 });
        gsap.set(cLine, { strokeDashoffset: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=200%",
          pin: ".ss-pin",
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Image slightly zooms throughout
      tl.fromTo(bgImg, { scale: 1 }, { scale: 1.1, ease: "none" }, 0);

      tl.to(wL, { opacity: 1, y: 0 }, 0.08);
      tl.to(hLine, { scaleX: 1, ease: "none" }, 0.12);
      tl.to(wR, { opacity: 1, y: 0 }, 0.34);
      tl.to(cLine, { strokeDashoffset: 0, ease: "none" }, 0.42);
      tl.to(sub, { opacity: 1, y: 0 }, 0.62);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="ss-pin relative h-screen overflow-hidden" style={{ background: "var(--lef-charcoal)" }}>
        {/* Flat dark image — replace with real cabin photo */}
        <div className="ss-bg-img absolute inset-0" style={{ willChange: "transform" }}>
          <PlaceholderImage tone="charcoal" aspect="auto" className="!h-full" />
        </div>

        {/* Top eyebrow */}
        <div className="absolute top-0 inset-x-0 z-30 pt-8">
          <div className="lef-container flex items-center justify-between">
            <span className="font-mono-eyebrow" style={{ color: "color-mix(in srgb, var(--lef-cream) 55%, transparent)" }}>
              001
            </span>
            <span className="font-mono-eyebrow" style={{ color: "color-mix(in srgb, var(--lef-cream) 55%, transparent)" }}>
              A short journey
            </span>
          </div>
        </div>

        {/* Center content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="lef-container w-full">
            {/* Horizontal word—line—word row */}
            <div className="flex items-baseline justify-between gap-6 mb-12">
              <span
                className="ss-word-l font-display-italic"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  color: "var(--lef-cream)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                }}
              >
                A road
              </span>

              <div className="flex-1 mx-6 relative" style={{ height: "1px" }}>
                <div
                  className="ss-h-line absolute inset-y-0 left-0 origin-left"
                  style={{
                    width: "100%",
                    background: "var(--lef-cream)",
                    transform: "scaleX(0)",
                  }}
                />
              </div>

              <span
                className="ss-word-r font-display-italic"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  color: "var(--lef-cream)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                }}
              >
                a quieter rhythm
              </span>
            </div>

            {/* Curved descender to subline */}
            <div className="flex justify-end pr-[15%]" style={{ height: "8rem" }}>
              <svg
                width="280"
                height="120"
                viewBox="0 0 280 120"
                preserveAspectRatio="none"
                style={{ overflow: "visible" }}
                aria-hidden
              >
                <path
                  className="ss-c-line"
                  d="M 260 0 C 260 60, 80 50, 80 118"
                  stroke="var(--lef-cream)"
                  strokeWidth="0.6"
                  fill="none"
                  pathLength={100}
                  strokeDasharray="100"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* Subline right-aligned */}
            <p
              className="ss-sub font-display ml-auto text-right"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                color: "var(--lef-cream)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                fontWeight: 400,
                maxWidth: "28ch",
              }}
            >
              Lane End Farm.
              <span className="block font-display-italic" style={{ color: "color-mix(in srgb, var(--lef-cream) 75%, transparent)" }}>
                A converted cabin on a working farm.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
