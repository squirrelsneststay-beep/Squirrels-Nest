"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const photos = [
  "/images/squirrels-nest/sq-08.jpg",
  "/images/squirrels-nest/sq-22.jpg",
  "/images/squirrels-nest/sq-12.jpg",
];

/**
 * The single signature scroll moment — all text + lines grouped tightly,
 * one block of writing on a softly-blurred photo backdrop. The lines
 * actually draw themselves as the user scrolls (stroke-dashoffset tied to
 * scroll progress, not just sitting there).
 */
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
      const lA = root.querySelector(".sft-label-a");
      const lB = root.querySelector(".sft-label-b");
      const arc = root.querySelector<SVGPathElement>(".sft-arc");
      const descender = root.querySelector<SVGPathElement>(".sft-descender");
      const sub = root.querySelector(".sft-sub");
      const subTail = root.querySelector(".sft-sub-tail");
      const layers = gsap.utils.toArray<HTMLElement>(".sft-layer");

      // Hard reset visible elements
      gsap.set([lA, lB, sub, subTail], { opacity: 0, y: 12 });

      // PROPERLY initialise both dasharray AND dashoffset so the line is invisible at start
      [arc, descender].forEach((p) => {
        if (!p) return;
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });

      // First photo visible, rest hidden
      layers.forEach((l, i) => gsap.set(l, { opacity: i === 0 ? 1 : 0 }));

      if (prefersReducedMotion) {
        gsap.set([lA, lB, sub, subTail], { clearProps: "all" });
        [arc, descender].forEach((p) => p && (p.style.strokeDashoffset = "0"));
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=300%",
          pin: ".sft-pin",
          scrub: 1.4,
          anticipatePin: 1,
        },
      });

      // Sequence — all reveals are tight, in one tight block of writing
      tl.to(lA, { opacity: 1, y: 0, duration: 0.05 }, 0.06);

      // Arc DRAWS — animate stroke-dashoffset from full length to 0
      if (arc) {
        const len = arc.getTotalLength();
        tl.fromTo(
          arc,
          { strokeDashoffset: len },
          { strokeDashoffset: 0, ease: "none", duration: 0.22 },
          0.1
        );
      }

      tl.to(lB, { opacity: 1, y: 0, duration: 0.05 }, 0.34);

      // Photo cross-fade 1 → 2 mid-way
      if (layers[1]) {
        tl.to(layers[0], { opacity: 0, duration: 0.16 }, 0.42);
        tl.to(layers[1], { opacity: 1, duration: 0.16 }, 0.42);
      }

      // Descender DRAWS
      if (descender) {
        const len = descender.getTotalLength();
        tl.fromTo(
          descender,
          { strokeDashoffset: len },
          { strokeDashoffset: 0, ease: "none", duration: 0.24 },
          0.5
        );
      }

      // Subline + tail
      tl.to(sub, { opacity: 1, y: 0, duration: 0.06 }, 0.66);
      tl.to(subTail, { opacity: 1, y: 0, duration: 0.06 }, 0.74);

      // Photo cross-fade 2 → 3 near end
      if (layers[2]) {
        tl.to(layers[1], { opacity: 0, duration: 0.18 }, 0.84);
        tl.to(layers[2], { opacity: 1, duration: 0.18 }, 0.84);
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative">
      <div className="sft-pin relative h-screen overflow-hidden">
        {/* Linked photo layers — softly blurred so the text reads clean */}
        {photos.map((src, i) => (
          <div
            key={i}
            className="sft-layer absolute inset-0"
            style={{ filter: "blur(10px)", transform: "scale(1.08)" }}
          >
            <img
              src={src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.5)" }}
        />

        {/* Tiny top eyebrow */}
        <div className="absolute top-0 inset-x-0 z-30 pt-8">
          <div className="lef-container flex items-center justify-between">
            <span
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              01 — Arrival
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              A short journey
            </span>
          </div>
        </div>

        {/* THE TIGHT BLOCK OF WRITING — one centred composition, no large gaps */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div
            className="relative text-center"
            style={{ width: "min(36rem, 90vw)" }}
          >
            {/* Row 1: "From the road  ━━━━  to the cabin" — all on one line */}
            <div className="flex items-center justify-center gap-4">
              <span
                className="sft-label-a"
                style={{
                  fontFamily: "var(--font-geist)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#fff",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                From the road
              </span>

              <svg
                width="120"
                height="20"
                viewBox="0 0 120 20"
                preserveAspectRatio="none"
                style={{ overflow: "visible", display: "block" }}
                aria-hidden
              >
                <path
                  className="sft-arc"
                  d="M 0 12 Q 30 -2, 60 10 T 120 12"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <span
                className="sft-label-b"
                style={{
                  fontFamily: "var(--font-geist)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#fff",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                to the cabin
              </span>
            </div>

            {/* Row 2: curved descender — short, sits right below row 1 */}
            <div
              className="relative mx-auto"
              style={{ width: "70%", height: "4.5rem", marginTop: "0.5rem" }}
            >
              <svg
                viewBox="0 0 100 60"
                preserveAspectRatio="none"
                width="100%"
                height="100%"
                style={{ overflow: "visible", display: "block" }}
                aria-hidden
              >
                <path
                  className="sft-descender"
                  d="M 80 0 C 80 30, 30 35, 30 58"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* Row 3: subline — sits right below descender, one tight block */}
            <p
              className="text-center mx-auto"
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "clamp(0.95rem, 1.1vw, 1.0625rem)",
                color: "#fff",
                lineHeight: 1.5,
                fontWeight: 400,
                maxWidth: "30ch",
              }}
            >
              <span className="sft-sub block">We've spent three years rebuilding this cabin by hand,</span>
              <span
                className="sft-sub-tail block"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "1.1em",
                  marginTop: "0.35rem",
                }}
              >
                for the kind of stay we wanted ourselves.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
