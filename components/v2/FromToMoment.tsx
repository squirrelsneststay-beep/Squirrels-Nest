"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  image: string;
  alt?: string;
  labelLeft: string;
  labelRight: string;
  subline: string;
  italicTail?: string;
  /** Slightly tints overlay darker for legibility of white text */
  overlay?: number; // 0–1
};

/**
 * Centered "Label ━━━━ Label" moment with curved descender to a subline.
 * Full-bleed photo, centered white sans labels (thicker line now), pinned + scrubbed.
 * Re-usable: pass image + labels + subline.
 */
export function FromToMoment({
  image,
  alt = "",
  labelLeft,
  labelRight,
  subline,
  italicTail,
  overlay = 0.45,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const lA = root.querySelector(".ft-label-a");
      const lB = root.querySelector(".ft-label-b");
      const hLine = root.querySelector<HTMLElement>(".ft-h-line");
      const cLine = root.querySelector<SVGPathElement>(".ft-c-line");
      const sub = root.querySelector(".ft-sub");
      const img = root.querySelector(".ft-img");

      gsap.set([lA, lB, sub], { opacity: 0, y: 16 });
      gsap.set(hLine, { scaleX: 0, transformOrigin: "left center" });
      if (cLine) gsap.set(cLine, { strokeDashoffset: 100 });

      if (prefersReducedMotion) {
        gsap.set([lA, lB, sub], { clearProps: "all" });
        gsap.set(hLine, { scaleX: 1 });
        if (cLine) gsap.set(cLine, { strokeDashoffset: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=220%",
          pin: ".ft-pin",
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl.fromTo(img, { scale: 1 }, { scale: 1.08, ease: "none" }, 0);
      tl.to(lA, { opacity: 1, y: 0, duration: 0.08 }, 0.08);
      tl.to(hLine, { scaleX: 1, duration: 0.35, ease: "power2.inOut" }, 0.14);
      tl.to(lB, { opacity: 1, y: 0, duration: 0.08 }, 0.5);
      if (cLine) tl.to(cLine, { strokeDashoffset: 0, ease: "none", duration: 0.3 }, 0.56);
      tl.to(sub, { opacity: 1, y: 0, duration: 0.12 }, 0.78);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative">
      <div className="ft-pin relative h-screen overflow-hidden">
        {/* Photo */}
        <div className="ft-img absolute inset-0" style={{ willChange: "transform" }}>
          <img
            src={image}
            alt={alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `rgba(0,0,0,${overlay})` }}
        />

        {/* CENTERED content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-full mx-auto"
            style={{ maxWidth: "60rem", paddingInline: "clamp(1.25rem, 5vw, 4rem)" }}
          >
            {/* Centered horizontal label — line — label row */}
            <div className="flex items-center justify-center gap-5 md:gap-8">
              <span
                className="ft-label-a"
                style={{
                  fontFamily: "var(--font-geist)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#fff",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.01em",
                }}
              >
                {labelLeft}
              </span>

              {/* Thick horizontal line */}
              <div
                className="ft-h-line"
                style={{
                  flex: "1 1 0",
                  maxWidth: "18rem",
                  height: "2px",
                  background: "#fff",
                  boxShadow: "0 0 1px rgba(255,255,255,0.3)",
                }}
              />

              <span
                className="ft-label-b"
                style={{
                  fontFamily: "var(--font-geist)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#fff",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.01em",
                }}
              >
                {labelRight}
              </span>
            </div>

            {/* Curved descender — centered, drawing downward */}
            <div className="relative mx-auto mt-3" style={{ width: "10rem", height: "5rem" }}>
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                width="100%"
                height="100%"
                style={{ display: "block", overflow: "visible" }}
                aria-hidden
              >
                <path
                  className="ft-c-line"
                  d="M 50 0 C 50 40, 50 60, 50 100"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
                  pathLength={100}
                  strokeDasharray="100"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* Centered subline */}
            <p
              className="ft-sub text-center mx-auto mt-4"
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "clamp(0.95rem, 1.15vw, 1.125rem)",
                color: "#fff",
                lineHeight: 1.5,
                maxWidth: "44ch",
                fontWeight: 400,
              }}
            >
              {subline}
              {italicTail && (
                <>
                  <br />
                  <span style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "rgba(255,255,255,0.85)" }}>
                    {italicTail}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
