"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Chapter 2: The absence.
 *
 * Top-to-bottom descent within the pinned view:
 *
 *   LEAD               "We've left everything else…"   ~ y=18%
 *      ↓
 *   PREFIX "Without:"                                   ~ y=38%
 *      ↓
 *   STACK   traffic.                                    ~ y=45%
 *           signal.                                     ~ y=53%
 *           neighbours.                                 ~ y=61%
 *           schedules.                                  ~ y=69%
 *           or rushing.                                 ~ y=77%
 *
 * Items spell out one by one while page stays pinned (frozen).
 * Inherits zoe-13 background from ChapterJourney for photo continuity.
 */
export function ChapterAbsence() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const lead = root.querySelector<HTMLElement>(".ca-lead");
      const prefix = root.querySelector<HTMLElement>(".ca-prefix");
      const items = gsap.utils.toArray<HTMLElement>(".ca-item");
      const fadeWrap = root.querySelector<HTMLElement>(".ca-fade");

      gsap.set([lead, prefix, ...items], { opacity: 0, y: 10 });

      if (prefersReducedMotion) {
        gsap.set([lead, prefix, ...items], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=360%",
          pin: ".ca-pin",
          scrub: 0.85,
          anticipatePin: 1,
        },
      });

      // ↓ Lead appears at TOP, holds for the entire spell-out
      tl.to(lead, { opacity: 1, y: 0, duration: 0.05 }, 0.04);

      // ↓ Prefix "Without:" appears, eye descends slightly
      tl.to(prefix, { opacity: 1, y: 0, duration: 0.05 }, 0.18);

      // ↓ Items descend top→bottom, one by one, page held
      items.forEach((it, i) => {
        tl.to(it, { opacity: 1, y: 0, duration: 0.05 }, 0.28 + i * 0.10);
      });

      // ↓ Hold, then fade for handoff
      tl.to({}, { duration: 0.08 }, 0.86);
      tl.to(fadeWrap, { opacity: 0, duration: 0.14, ease: "power2.in" }, 0.88);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative" data-section-tone="dark">
      <div className="ca-pin relative h-screen w-full overflow-hidden" style={{ background: "var(--v2-ink)" }}>
        {/* Same dark hedge photo as ChapterJourney's ending — visual continuity */}
        <div className="absolute inset-0">
          <img
            src="/images/zoe-13.jpg"
            alt=""
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div aria-hidden className="absolute inset-0" style={{ background: "rgba(0,0,0,0.45)" }} />
        </div>

        <div className="absolute top-0 inset-x-0 z-30 pt-8">
          <div className="lef-container flex items-center justify-between">
            <span className="sv-eyebrow is-light">02 — What you leave behind</span>
            <span className="sv-eyebrow is-light">A short list</span>
          </div>
        </div>

        <div className="ca-fade absolute inset-0 z-20">
          {/* LEAD — top, centred. Eye STARTS here. */}
          <div
            className="ca-lead absolute"
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
            <p style={{ fontSize: "1.35rem", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.45, margin: 0 }}>
              We&apos;ve left everything else somewhere
              <br />
              down the lane.
            </p>
          </div>

          {/* PREFIX "Without:" — below the lead, eye descends */}
          <div
            className="ca-prefix absolute"
            style={{
              left: "50%",
              top: "42%",
              transform: "translate(-50%, -50%)",
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "1.8rem",
              fontWeight: 300,
              color: "var(--v2-bg)",
              letterSpacing: "-0.015em",
              opacity: 0.95,
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            }}
          >
            Without:
          </div>

          {/* STACK — descends from y=50% to y=78%, centred horizontally */}
          <ul
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, 0)",
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontFamily: "var(--font-geist)",
              color: "var(--v2-bg)",
              textAlign: "center",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            }}
          >
            {["traffic.", "signal.", "neighbours.", "schedules.", "or rushing."].map((w) => (
              <li
                key={w}
                className="ca-item"
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 400,
                  letterSpacing: "-0.005em",
                  lineHeight: 1.7,
                }}
              >
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
