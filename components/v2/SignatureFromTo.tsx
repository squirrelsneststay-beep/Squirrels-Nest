"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Linked frames of the cabin grounds — no chickens, slightly blurred backdrop
const photos = [
  "/images/squirrels-nest/sq-08.jpg",
  "/images/squirrels-nest/sq-22.jpg",
  "/images/squirrels-nest/sq-12.jpg",
];

/**
 * The single signature scroll moment.
 *
 * Pinned. Two short labels at top connected by a HAND-DRAWN CURVED LINE
 * (not straight). A long curved descender drops to a subline below. As the
 * user scrolls, the photo behind crossfades between linked frames of the
 * arrival journey — road → lane → door — so the background tells one
 * continuous story rather than feeling disjointed.
 *
 * The labels and subline use the same Geist sans 0.95rem weight 500 used
 * everywhere else.
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

      gsap.set([lA, lB, sub, subTail], { opacity: 0, y: 12 });
      gsap.set([arc, descender].filter(Boolean), {
        strokeDashoffset: (i, el) => (el as SVGPathElement).getTotalLength?.() ?? 400,
      });
      // First photo visible, rest hidden
      layers.forEach((l, i) => gsap.set(l, { opacity: i === 0 ? 1 : 0 }));

      if (prefersReducedMotion) {
        gsap.set([lA, lB, sub, subTail], { clearProps: "all" });
        gsap.set([arc, descender].filter(Boolean), { strokeDashoffset: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=350%",
          pin: ".sft-pin",
          scrub: 1.4,
          anticipatePin: 1,
        },
      });

      // 1) leading label
      tl.to(lA, { opacity: 1, y: 0, duration: 0.05 }, 0.04);
      // 2) curved arc draws (slowly, scrub-tied)
      if (arc) {
        const len = arc.getTotalLength();
        tl.fromTo(arc, { strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none", duration: 0.25 }, 0.08);
      }
      // 3) trailing label
      tl.to(lB, { opacity: 1, y: 0, duration: 0.05 }, 0.32);
      // 4) photo crossfade 1 → 2
      if (layers[1]) {
        tl.to(layers[0], { opacity: 0, duration: 0.18 }, 0.38);
        tl.to(layers[1], { opacity: 1, duration: 0.18 }, 0.38);
      }
      // 5) curved descender draws
      if (descender) {
        const len = descender.getTotalLength();
        tl.fromTo(descender, { strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none", duration: 0.25 }, 0.46);
      }
      // 6) subline
      tl.to(sub, { opacity: 1, y: 0, duration: 0.06 }, 0.62);
      tl.to(subTail, { opacity: 1, y: 0, duration: 0.06 }, 0.7);
      // 7) photo crossfade 2 → 3 near end
      if (layers[2]) {
        tl.to(layers[1], { opacity: 0, duration: 0.18 }, 0.78);
        tl.to(layers[2], { opacity: 1, duration: 0.18 }, 0.78);
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
            style={{ filter: "blur(8px)", transform: "scale(1.06)" }}
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
          style={{ background: "rgba(0,0,0,0.48)" }}
        />

        {/* Top eyebrow */}
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

        {/* Centered moment */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div
            className="relative w-full mx-auto"
            style={{ maxWidth: "60rem", paddingInline: "clamp(1.5rem, 5vw, 4rem)" }}
          >
            {/* HAND-DRAWN CURVED ARC between labels */}
            <div
              className="relative mx-auto"
              style={{ width: "100%", maxWidth: "44rem", height: "8rem" }}
            >
              <span
                className="sft-label-a absolute"
                style={{
                  left: "0",
                  top: "0",
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
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
                width="100%"
                height="100%"
                style={{ display: "block", overflow: "visible" }}
                aria-hidden
              >
                <path
                  className="sft-arc"
                  d="M 6 8 Q 30 -2, 50 10 T 94 8"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={400}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <span
                className="sft-label-b absolute"
                style={{
                  right: "0",
                  top: "0",
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

            {/* CURVED DESCENDER from end-right of arc, sweeping down to subline */}
            <div
              className="relative ml-auto"
              style={{ width: "70%", height: "8rem", marginTop: "-1rem" }}
            >
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                width="100%"
                height="100%"
                style={{ display: "block", overflow: "visible" }}
                aria-hidden
              >
                <path
                  className="sft-descender"
                  d="M 95 0 C 95 40, 30 60, 30 100"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={400}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* Subline — same font family as labels */}
            <p
              className="text-center mx-auto"
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "clamp(1.05rem, 1.4vw, 1.35rem)",
                color: "#fff",
                lineHeight: 1.55,
                fontWeight: 400,
                maxWidth: "44ch",
              }}
            >
              <span className="sft-sub block">We've spent three years rebuilding this cabin by hand,</span>
              <span
                className="sft-sub-tail block"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.85)",
                  marginTop: "0.4rem",
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
