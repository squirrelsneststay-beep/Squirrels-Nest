"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ONE pinned section. All small-word + line moments glued into one
 * flowing animated sequence. Everything centred in a single narrow
 * column — labels in rows, hairlines as their own rows between labels
 * so they NEVER overlap text.
 *
 * Three chapters in one scroll:
 *   1. The journey  — From the lane → the kettle on → all the way to bed.
 *   2. The absence  — Without: traffic, signal, neighbours, schedules, rushing.
 *   3. The close    — Just rest.
 */

const photos = [
  "/images/squirrels-nest/sq-08.jpg", // cabin exterior — chapter 1
  "/images/squirrels-nest/sq-30.jpg", // chandelier on red — chapter 2
  "/images/squirrels-nest/sq-28.jpg", // bedroom red velvet — chapter 3
];

export function UnifiedWordMoment() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const beats = gsap.utils.toArray<HTMLElement>(".wm-beat");
      const rules = gsap.utils.toArray<HTMLElement>(".wm-rule");
      const layers = gsap.utils.toArray<HTMLElement>(".wm-layer");

      gsap.set(beats, { opacity: 0, y: 12 });
      gsap.set(rules, { scaleX: 0, transformOrigin: "center" });
      layers.forEach((l, i) => gsap.set(l, { opacity: i === 0 ? 1 : 0 }));

      if (prefersReducedMotion) {
        gsap.set(beats, { opacity: 1, y: 0 });
        gsap.set(rules, { scaleX: 1 });
        layers.forEach((l) => gsap.set(l, { opacity: 1 }));
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=600%",
          pin: ".wm-pin",
          scrub: 0.9,
          anticipatePin: 1,
        },
      });

      // Reveal helper — each beat fades up, each rule draws from centre
      const showBeat = (i: number, at: number) =>
        tl.to(beats[i], { opacity: 1, y: 0, duration: 0.04, ease: "power2.out" }, at);
      const drawRule = (i: number, at: number) =>
        tl.to(rules[i], { scaleX: 1, duration: 0.06, ease: "none" }, at);

      // Indices map to the order of .wm-beat / .wm-rule below.
      // Chapter 1 — journey  (beats 0..2, rules 0..1)
      showBeat(0, 0.02);
      drawRule(0, 0.06);
      showBeat(1, 0.10);
      drawRule(1, 0.14);
      showBeat(2, 0.18);
      drawRule(2, 0.22);          // closing rule under chapter 1
      showBeat(3, 0.26);          // "and the door clicks shut." (italic afterword)

      // photo crossfade 1 → 2
      tl.to(layers[0], { opacity: 0, duration: 0.10 }, 0.32);
      tl.to(layers[1], { opacity: 1, duration: 0.10 }, 0.32);

      // Chapter 2 — absence (beats 4..9)
      showBeat(4, 0.36);          // "Without"
      drawRule(3, 0.40);          // tiny mark under "Without"
      showBeat(5, 0.44);          // traffic.
      showBeat(6, 0.49);          // signal.
      showBeat(7, 0.54);          // neighbours.
      showBeat(8, 0.59);          // schedules.
      showBeat(9, 0.64);          // rushing.

      // photo crossfade 2 → 3
      tl.to(layers[1], { opacity: 0, duration: 0.12 }, 0.72);
      tl.to(layers[2], { opacity: 1, duration: 0.12 }, 0.72);

      // Chapter 3 — close (beats 10..11)
      drawRule(4, 0.76);          // a final mark above the close
      showBeat(10, 0.80);         // "Just rest."
      showBeat(11, 0.86);         // small caption beneath

      // hold then unpin
      tl.to({}, { duration: 0.10 }, 0.90);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative" data-section-tone="dark">
      <div className="wm-pin relative h-screen w-full overflow-hidden" style={{ background: "var(--v2-ink)" }}>
        {/* Layered SHARP photos — no CSS blur */}
        {photos.map((src, i) => (
          <div key={i} className="wm-layer absolute inset-0">
            <img
              src={src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.82) 100%)",
              }}
            />
          </div>
        ))}

        {/* Section eyebrow */}
        <div className="absolute top-0 inset-x-0 z-30 pt-8">
          <div className="lef-container flex items-center justify-between">
            <span className="sv-eyebrow is-light">01 — A short journey</span>
            <span className="sv-eyebrow is-light">and what you leave behind</span>
          </div>
        </div>

        {/* THE CENTRED COLUMN — narrower (max 22rem) so it never feels spread out */}
        <div className="absolute inset-0 z-20 flex items-center justify-center" style={{ paddingInline: "1.5rem" }}>
          <div
            className="text-center mx-auto flex flex-col items-center"
            style={{
              width: "min(22rem, 88vw)",
              color: "var(--v2-bg)",
              fontFamily: "var(--font-geist)",
              gap: "0.95rem",
            }}
          >
            {/* === Chapter 1: the journey === */}
            <span className="wm-beat" style={{ fontSize: "1.3rem", fontWeight: 400, letterSpacing: "-0.01em" }}>
              From the lane
            </span>
            <span className="wm-rule block" aria-hidden style={{ width: "4rem", height: "1px", background: "var(--v2-bg)" }} />

            <span className="wm-beat" style={{ fontSize: "1.3rem", fontWeight: 400, letterSpacing: "-0.01em" }}>
              the kettle on
            </span>
            <span className="wm-rule block" aria-hidden style={{ width: "4rem", height: "1px", background: "var(--v2-bg)" }} />

            <span className="wm-beat" style={{ fontSize: "1.3rem", fontWeight: 400, letterSpacing: "-0.01em" }}>
              all the way to bed.
            </span>
            <span className="wm-rule block" aria-hidden style={{ width: "2.5rem", height: "1px", background: "var(--v2-bg)", opacity: 0.6 }} />

            <span
              className="wm-beat"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "1.35rem",
                letterSpacing: "-0.01em",
                color: "var(--v2-bg)",
                opacity: 0.88,
              }}
            >
              and the door clicks shut.
            </span>

            {/* spacer before chapter 2 */}
            <span aria-hidden style={{ height: "2.5rem", display: "block" }} />

            {/* === Chapter 2: the absence === */}
            <span
              className="wm-beat"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "1.6rem",
                letterSpacing: "-0.015em",
                color: "var(--v2-bg)",
              }}
            >
              Without
            </span>
            <span className="wm-rule block" aria-hidden style={{ width: "2rem", height: "1px", background: "var(--v2-bg)", opacity: 0.55 }} />

            <span className="wm-beat" style={{ fontSize: "1.25rem", fontWeight: 400, letterSpacing: "-0.005em" }}>
              traffic.
            </span>
            <span className="wm-beat" style={{ fontSize: "1.25rem", fontWeight: 400, letterSpacing: "-0.005em" }}>
              signal.
            </span>
            <span className="wm-beat" style={{ fontSize: "1.25rem", fontWeight: 400, letterSpacing: "-0.005em" }}>
              neighbours.
            </span>
            <span className="wm-beat" style={{ fontSize: "1.25rem", fontWeight: 400, letterSpacing: "-0.005em" }}>
              schedules.
            </span>
            <span className="wm-beat" style={{ fontSize: "1.25rem", fontWeight: 400, letterSpacing: "-0.005em" }}>
              rushing.
            </span>

            {/* spacer before close */}
            <span aria-hidden style={{ height: "2.2rem", display: "block" }} />

            {/* === Chapter 3: the close === */}
            <span className="wm-rule block" aria-hidden style={{ width: "3rem", height: "1px", background: "var(--v2-bg)", opacity: 0.7 }} />

            <span
              className="wm-beat"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "2.4rem",
                letterSpacing: "-0.02em",
                color: "var(--v2-bg)",
                lineHeight: 1,
              }}
            >
              Just rest.
            </span>

            <span
              className="wm-beat sv-eyebrow is-light"
              style={{ marginTop: "0.5rem" }}
            >
              That&apos;s all we&apos;re offering.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
