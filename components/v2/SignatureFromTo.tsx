"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Signature chained moment — modeled on savor.it's butter → palm oil → "we craft" sequence.
 *
 * Three labels chained over a pinned section:
 *   "From the lane"   → photo 1 (the approach)
 *   "the kettle on"   → photo 2 (the cabin warmth)
 *   "all the way to bed." → photo 3 (rest)
 *
 * Between each pair of labels a clean SVG cubic-bezier line DRAWS via
 * stroke-dashoffset tied to scroll. Photos crossfade between labels.
 *
 * Photos are SHARP (no CSS blur). A subtle bottom-vignette is the only
 * background treatment, so the labels stay readable without washing out
 * the food/cabin macro detail like a blur would.
 */

const photos = [
  { src: "/images/squirrels-nest/sq-08.jpg", alt: "the lane approach" },
  { src: "/images/squirrels-nest/sq-22.jpg", alt: "bronze tap macro" },
  { src: "/images/squirrels-nest/sq-12.jpg", alt: "the bedroom" },
];

const labels = [
  { text: "From the lane", x: "10%", y: "30%" },
  { text: "the kettle on", x: "50%", y: "50%" },
  { text: "all the way to bed.", x: "82%", y: "72%" },
];

export function SignatureFromTo() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const labelEls = gsap.utils.toArray<HTMLElement>(".sft-label");
      const layerEls = gsap.utils.toArray<HTMLElement>(".sft-layer");
      const line1 = root.querySelector<SVGPathElement>(".sft-line-1");
      const line2 = root.querySelector<SVGPathElement>(".sft-line-2");

      // Initial hidden state
      gsap.set(labelEls, { opacity: 0, y: 14 });
      layerEls.forEach((l, i) =>
        gsap.set(l, { opacity: i === 0 ? 1 : 0 })
      );

      // Initialise SVG line draw — start fully hidden (offset = full length)
      [line1, line2].forEach((p) => {
        if (!p) return;
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });

      if (prefersReducedMotion) {
        gsap.set(labelEls, { opacity: 1, y: 0 });
        layerEls.forEach((l) => gsap.set(l, { opacity: 1 }));
        [line1, line2].forEach((p) => p && (p.style.strokeDashoffset = "0"));
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=320%",
          pin: ".sft-pin",
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      // === Beat 1: Label A appears ===
      tl.to(labelEls[0], { opacity: 1, y: 0, duration: 0.08 }, 0.06);

      // === Beat 2: Line 1 draws between A and B ===
      if (line1) {
        const len = line1.getTotalLength();
        tl.fromTo(
          line1,
          { strokeDashoffset: len },
          { strokeDashoffset: 0, ease: "none", duration: 0.22 },
          0.16
        );
      }

      // === Beat 3: Label B appears + photo crossfade 1 → 2 ===
      tl.to(labelEls[1], { opacity: 1, y: 0, duration: 0.08 }, 0.38);
      tl.to(layerEls[0], { opacity: 0, duration: 0.22 }, 0.42);
      tl.to(layerEls[1], { opacity: 1, duration: 0.22 }, 0.42);

      // === Beat 4: Line 2 draws between B and C (curved descender) ===
      if (line2) {
        const len = line2.getTotalLength();
        tl.fromTo(
          line2,
          { strokeDashoffset: len },
          { strokeDashoffset: 0, ease: "none", duration: 0.26 },
          0.62
        );
      }

      // === Beat 5: Label C appears + photo crossfade 2 → 3 ===
      tl.to(labelEls[2], { opacity: 1, y: 0, duration: 0.08 }, 0.86);
      tl.to(layerEls[1], { opacity: 0, duration: 0.18 }, 0.88);
      tl.to(layerEls[2], { opacity: 1, duration: 0.18 }, 0.88);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative" data-section-tone="dark">
      <div className="sft-pin relative h-screen w-full overflow-hidden" style={{ background: "var(--v2-ink)" }}>
        {/* Layered SHARP photos — no CSS blur */}
        {photos.map((p, i) => (
          <div key={i} className="sft-layer absolute inset-0">
            <img
              src={p.src}
              alt={p.alt}
              loading={i === 0 ? "eager" : "lazy"}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Per-photo vignette — keeps labels readable without blurring the image */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.6) 100%)",
              }}
            />
          </div>
        ))}

        {/* Section eyebrow — sentence case, sans, light variant */}
        <div className="absolute top-0 inset-x-0 z-30 pt-8">
          <div className="lef-container flex items-center justify-between">
            <span className="sv-eyebrow is-light">01 — Arrival</span>
            <span className="sv-eyebrow is-light">A short journey</span>
          </div>
        </div>

        {/* The three labels, scattered across the viewport like savor */}
        {labels.map((l, i) => (
          <div
            key={i}
            className="sft-label absolute"
            style={{
              left: l.x,
              top: l.y,
              transform: "translate(-50%, -50%)",
              fontFamily: "var(--font-geist)",
              fontSize: "1rem",
              fontWeight: 400,
              color: "var(--v2-bg)",
              letterSpacing: "-0.005em",
              whiteSpace: "nowrap",
              zIndex: 20,
              textShadow: "0 1px 8px rgba(0,0,0,0.35)",
            }}
          >
            {l.text}
          </div>
        ))}

        {/* SVG overlay — pixel-coord viewBox so stroke-width + dasharray maths
            work cleanly. Scales via preserveAspectRatio=none to fill viewport. */}
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 1280 800"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", zIndex: 15 }}
          aria-hidden
        >
          {/* Line 1: from Label A (10%, 30%) ~ (128, 240) -> Label B (50%, 50%) ~ (640, 400)
              Clean cubic bezier, gentle downward S-curve */}
          <path
            className="sft-line-1"
            d="M 175 240 C 320 240, 440 400, 600 400"
            stroke="#fff9eb"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Line 2: from Label B (50%, 50%) ~ (680, 410) -> Label C (82%, 72%) ~ (1050, 576)
              Curved descender, steeper than Line 1 to give the journey weight */}
          <path
            className="sft-line-2"
            d="M 680 410 C 830 410, 920 576, 1010 576"
            stroke="#fff9eb"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}
