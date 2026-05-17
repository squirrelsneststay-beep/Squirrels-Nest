"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Chapter 1: The journey.
 *
 * Labels DESCEND down the page (never jump back up). Eye is pulled
 * down-and-right, matching scroll direction.
 *
 *   Label A    "From the lane"          ~ (12%, 25%)   ← top-left
 *      ↘ line draws diagonally down-right
 *   Label B    "the kettle on"          ~ (45%, 45%)   ← middle
 *      ↘ longer curve descends
 *   Label C    "all the way to bed."    ~ (62%, 70%)   ← bottom-right
 *               and the door clicks shut. (italic)
 *
 * Lines NEVER cross a label — each line starts after Label A's right edge,
 * ends before Label B's left edge, and same for B → C.
 *
 * Three sharp Pinterest photos crossfade behind. No CSS blur.
 */
export function ChapterJourney() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const labelA = root.querySelector<HTMLElement>(".cj-label-a");
      const labelB = root.querySelector<HTMLElement>(".cj-label-b");
      const labelC = root.querySelector<HTMLElement>(".cj-label-c");
      const labelCSub = root.querySelector<HTMLElement>(".cj-label-c-sub");
      const lineAB = root.querySelector<SVGPathElement>(".cj-line-ab");
      const lineBC = root.querySelector<SVGPathElement>(".cj-line-bc");
      const layers = gsap.utils.toArray<HTMLElement>(".cj-layer");
      const fadeWrap = root.querySelector<HTMLElement>(".cj-fade");

      gsap.set([labelA, labelB, labelC, labelCSub], { opacity: 0, y: 8 });
      [lineAB, lineBC].forEach((p) => {
        if (!p) return;
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
      layers.forEach((l, i) => gsap.set(l, { opacity: i === 0 ? 1 : 0 }));

      if (prefersReducedMotion) {
        gsap.set([labelA, labelB, labelC, labelCSub], { opacity: 1, y: 0 });
        [lineAB, lineBC].forEach((p) => p && (p.style.strokeDashoffset = "0"));
        layers.forEach((l) => gsap.set(l, { opacity: 1 }));
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=380%",
          pin: ".cj-pin",
          scrub: 0.85,
          anticipatePin: 1,
        },
      });

      // ↓ Beat 1: Label A appears (top-left)
      tl.to(labelA, { opacity: 1, y: 0, duration: 0.04 }, 0.04);

      // ↓ Beat 2: photo crossfade 1 → 2, line A→B draws (downward-right)
      tl.to(layers[0], { opacity: 0, duration: 0.18 }, 0.14);
      tl.to(layers[1], { opacity: 1, duration: 0.18 }, 0.14);
      if (lineAB) {
        const len = lineAB.getTotalLength();
        tl.fromTo(lineAB, { strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none", duration: 0.20 }, 0.22);
      }

      // ↓ Beat 3: Label B appears (middle)
      tl.to(labelB, { opacity: 1, y: 0, duration: 0.04 }, 0.42);

      // ↓ Beat 4: photo crossfade 2 → 3, line B→C draws (longer descending curve)
      tl.to(layers[1], { opacity: 0, duration: 0.20 }, 0.52);
      tl.to(layers[2], { opacity: 1, duration: 0.20 }, 0.52);
      if (lineBC) {
        const len = lineBC.getTotalLength();
        tl.fromTo(lineBC, { strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none", duration: 0.24 }, 0.58);
      }

      // ↓ Beat 5: Label C (bottom-right) + italic subline
      tl.to(labelC, { opacity: 1, y: 0, duration: 0.05 }, 0.82);
      tl.to(labelCSub, { opacity: 1, y: 0, duration: 0.05 }, 0.86);

      // ↓ Beat 6: hold, then fade for handoff
      tl.to({}, { duration: 0.06 }, 0.92);
      tl.to(fadeWrap, { opacity: 0, duration: 0.12, ease: "power2.in" }, 0.94);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative" data-section-tone="dark">
      <div className="cj-pin relative h-screen w-full overflow-hidden" style={{ background: "var(--v2-ink)" }}>
        {/* Three SHARP Pinterest countryside photos that crossfade in sequence.
            Light meadow → hazy golden field → aerial dark hedge.
            ChapterAbsence inherits the FINAL photo (zoe-13) so the transition
            between chapters is photo-continuous — no abrupt cut. */}
        <div className="cj-layer absolute inset-0">
          <img src="/images/zoe-09.jpg" alt="" loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div aria-hidden className="absolute inset-0" style={{ background: "rgba(0,0,0,0.30)" }} />
        </div>
        <div className="cj-layer absolute inset-0">
          <img src="/images/zoe-05.jpg" alt="" loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div aria-hidden className="absolute inset-0" style={{ background: "rgba(0,0,0,0.30)" }} />
        </div>
        <div className="cj-layer absolute inset-0">
          <img src="/images/zoe-13.jpg" alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div aria-hidden className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
        </div>

        <div className="absolute top-0 inset-x-0 z-30 pt-8">
          <div className="lef-container flex items-center justify-between">
            <span className="sv-eyebrow is-light">01 — A short journey</span>
            <span className="sv-eyebrow is-light">From the lane to the bed</span>
          </div>
        </div>

        {/* Everything below fades together at handoff */}
        <div className="cj-fade absolute inset-0 z-20">
          {/* Label A — top-left, descending starts here */}
          <span
            className="cj-label-a absolute"
            style={{
              left: "12%",
              top: "25%",
              transform: "translate(0, -50%)",
              fontFamily: "var(--font-geist)",
              fontSize: "1.4rem",
              fontWeight: 400,
              color: "var(--v2-bg)",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            }}
          >
            From the lane
          </span>

          {/* Label B — middle of viewport, eye has dropped */}
          <span
            className="cj-label-b absolute"
            style={{
              left: "45%",
              top: "45%",
              transform: "translate(0, -50%)",
              fontFamily: "var(--font-geist)",
              fontSize: "1.4rem",
              fontWeight: 400,
              color: "var(--v2-bg)",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            }}
          >
            the kettle on
          </span>

          {/* Label C — bottom-right, eye reaches the bottom-of-page */}
          <div
            className="absolute"
            style={{
              left: "62%",
              top: "70%",
              transform: "translate(0, 0)",
              fontFamily: "var(--font-geist)",
              color: "var(--v2-bg)",
              maxWidth: "22rem",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            }}
          >
            <p
              className="cj-label-c"
              style={{ fontSize: "1.4rem", fontWeight: 400, letterSpacing: "-0.01em", margin: 0 }}
            >
              all the way to bed.
            </p>
            <p
              className="cj-label-c-sub"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: "1.6rem",
                fontWeight: 300,
                opacity: 0.92,
                marginTop: "0.4rem",
              }}
            >
              and the door clicks shut.
            </p>
          </div>

          {/* SVG overlay. Lines DESCEND with the eye and NEVER cross a label.
              Coordinates in viewBox 1280×800.
              Label A box ≈ (154,180)-(295,220).  Right edge ≈ x=300.
              Label B box ≈ (576,348)-(750,388).  Left edge ≈ x=570, right ≈ x=755.
              Label C box ≈ (794,544)-(990,584).  Left edge ≈ x=788.
          */}
          <svg
            className="absolute inset-0 pointer-events-none"
            viewBox="0 0 1280 800"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "100%" }}
            aria-hidden
          >
            {/* Line A→B: starts AFTER Label A's right edge (x=310, y=205) and
                ENDS BEFORE Label B's left edge (x=560, y=355). Gentle S-curve
                descending diagonally — eye flows down-right. */}
            <path
              className="cj-line-ab"
              d="M 310 205 C 400 205, 460 280, 560 355"
              stroke="#fff9eb"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Line B→C: starts AFTER Label B's right edge (x=770, y=370) and
                ENDS BEFORE Label C's left edge (x=778, y=540). Longer descending
                arc — bigger downward sweep. */}
            <path
              className="cj-line-bc"
              d="M 770 370 C 880 410, 700 490, 778 540"
              stroke="#fff9eb"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
