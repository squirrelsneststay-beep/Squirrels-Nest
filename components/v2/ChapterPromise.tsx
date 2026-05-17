"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Chapter 3: The promise.
 *
 * Top-to-bottom descent:
 *
 *   LEAD   "What we're offering is a stay…"     ~ (50%, 18%) — top
 *      ↘ curving line descends down-left
 *   SUB-1  "that asks nothing of you."          ~ (28%, 50%)
 *      ↓
 *   SUB-2  "Eat slow. Sleep deep."              ~ (28%, 60%)
 *      ↓
 *   CLOSE  "Leave a little lighter."  (italic)  ~ (28%, 75%) — bottom
 */
export function ChapterPromise() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const lead = root.querySelector<HTMLElement>(".cp-lead");
      const sub1 = root.querySelector<HTMLElement>(".cp-sub1");
      const sub2 = root.querySelector<HTMLElement>(".cp-sub2");
      const close = root.querySelector<HTMLElement>(".cp-close");
      const curve = root.querySelector<SVGPathElement>(".cp-curve");
      const fadeWrap = root.querySelector<HTMLElement>(".cp-fade");

      gsap.set([lead, sub1, sub2, close], { opacity: 0, y: 10 });
      if (curve) {
        const len = curve.getTotalLength();
        curve.style.strokeDasharray = `${len}`;
        curve.style.strokeDashoffset = `${len}`;
      }

      if (prefersReducedMotion) {
        gsap.set([lead, sub1, sub2, close], { opacity: 1, y: 0 });
        if (curve) curve.style.strokeDashoffset = "0";
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=320%",
          pin: ".cp-pin",
          scrub: 0.85,
          anticipatePin: 1,
        },
      });

      // ↓ Lead at top
      tl.to(lead, { opacity: 1, y: 0, duration: 0.06 }, 0.06);

      // ↓ Curve descends from below the lead toward sub-1
      if (curve) {
        const len = curve.getTotalLength();
        tl.to(curve, { strokeDashoffset: 0, ease: "none", duration: 0.30 }, 0.18);
      }

      // ↓ Sub-1, sub-2 follow the curve down
      tl.to(sub1, { opacity: 1, y: 0, duration: 0.06 }, 0.50);
      tl.to(sub2, { opacity: 1, y: 0, duration: 0.06 }, 0.62);
      tl.to(close, { opacity: 1, y: 0, duration: 0.08 }, 0.76);

      tl.to({}, { duration: 0.08 }, 0.86);
      tl.to(fadeWrap, { opacity: 0, duration: 0.14, ease: "power2.in" }, 0.88);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative" data-section-tone="dark">
      <div className="cp-pin relative h-screen w-full overflow-hidden" style={{ background: "var(--v2-ink)" }}>
        {/* Inherits zoe-13 too — same scene continues. Slightly darker overlay
            so it FEELS like time passing, the last moment before the cabin. */}
        <div className="absolute inset-0">
          <img src="/images/zoe-13.jpg" alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div aria-hidden className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />
        </div>

        <div className="absolute top-0 inset-x-0 z-30 pt-8">
          <div className="lef-container flex items-center justify-between">
            <span className="sv-eyebrow is-light">03 — What we&apos;re offering</span>
            <span className="sv-eyebrow is-light">A short promise</span>
          </div>
        </div>

        <div className="cp-fade absolute inset-0 z-20">
          {/* LEAD — top, centred */}
          <div
            className="cp-lead absolute"
            style={{
              left: "50%",
              top: "20%",
              transform: "translate(-50%, -50%)",
              maxWidth: "30rem",
              textAlign: "center",
              fontFamily: "var(--font-geist)",
              color: "var(--v2-bg)",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            }}
          >
            <p style={{ fontSize: "1.35rem", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.4, margin: 0 }}>
              What we&apos;re offering is a stay
            </p>
          </div>

          {/* SVG curve descending from beneath the lead, sweeping down-left
              to where the sublines will appear. Pixel coords in viewBox 1280x800.
              Start near LEAD (640, 200), end above SUB-1 (340, 460). */}
          <svg
            className="absolute inset-0 pointer-events-none"
            viewBox="0 0 1280 800"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "100%" }}
            aria-hidden
          >
            <path
              className="cp-curve"
              d="M 640 200 C 700 280, 350 320, 340 460"
              stroke="#fff9eb"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* SUB-1 — descending position, left-of-centre */}
          <div
            className="cp-sub1 absolute"
            style={{
              left: "28%",
              top: "60%",
              transform: "translate(0, -50%)",
              fontFamily: "var(--font-geist)",
              fontSize: "1.35rem",
              fontWeight: 400,
              color: "var(--v2-bg)",
              letterSpacing: "-0.005em",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            that asks nothing of you.
          </div>

          {/* SUB-2 — slightly lower */}
          <div
            className="cp-sub2 absolute"
            style={{
              left: "28%",
              top: "68%",
              transform: "translate(0, -50%)",
              fontFamily: "var(--font-geist)",
              fontSize: "1.35rem",
              fontWeight: 400,
              color: "var(--v2-bg)",
              letterSpacing: "-0.005em",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            Eat slow. Sleep deep.
          </div>

          {/* CLOSE — italic, bottom */}
          <div
            className="cp-close absolute"
            style={{
              left: "28%",
              top: "82%",
              transform: "translate(0, -50%)",
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "1.9rem",
              fontWeight: 300,
              color: "var(--v2-bg)",
              letterSpacing: "-0.02em",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            Leave a little lighter.
          </div>
        </div>
      </div>
    </section>
  );
}
