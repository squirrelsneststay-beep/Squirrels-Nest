"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Bellevoire-style numbered services list.
 *
 *   "What's inside"                      ← big serif heading
 *   "the cabin"                          ← italic line below
 *
 *   ────────────────────────────────────
 *   01    Hand-finished beds      [photo]
 *   ────────────────────────────────────
 *   02    Wood-fired stove        [photo]
 *   ────────────────────────────────────
 *   03    Window seat over fields [photo]
 *   ────────────────────────────────────
 *   ...
 *
 * Each row animates in on scroll with a stagger. The active photo column
 * swaps between rows as you hover them.
 */

const services = [
  { n: "01", title: "Hand-finished beds", body: "White linen, weighted quilts, a window that opens onto fields.", photo: "/images/squirrels-nest/sq-12.jpg" },
  { n: "02", title: "Wood-fired warmth", body: "A cast-iron stove built into the chimney breast. Logs by the door.", photo: "/images/squirrels-nest/sq-30.jpg" },
  { n: "03", title: "A kitchen for slow meals", body: "Espresso machine, kettle, brass tap. Stock the fridge from the farm.", photo: "/images/squirrels-nest/sq-35.jpg" },
  { n: "04", title: "Yellow velvet & quiet rooms", body: "Two soft chairs, a bookshelf, a record player. No television.", photo: "/images/squirrels-nest/sq-18.jpg" },
  { n: "05", title: "Soft light, hand-finished", body: "Painted screens, lamps with cloth shades, brass fittings throughout.", photo: "/images/squirrels-nest/sq-42.jpg" },
];

export function NumberedServices() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".ns-headline", {
        y: 70,
        opacity: 0,
        duration: 1.3,
        ease: "power4.out",
        stagger: 0.16,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
      gsap.from(".ns-row", {
        opacity: 0,
        y: 30,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".ns-list", start: "top 80%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      style={{ background: "var(--v2-bg)", paddingBlock: "16vh", overflow: "hidden" }}
    >
      <div className="mx-auto" style={{ maxWidth: "82rem", paddingInline: "clamp(1.5rem, 5vw, 4rem)" }}>
        {/* Two-line massive serif heading, italic on line 2 */}
        <h2
          className="font-display text-center"
          style={{
            color: "var(--v2-ink)",
            fontSize: "clamp(2.4rem, 6.5vw, 6rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            fontWeight: 300,
            margin: 0,
            marginBottom: "5rem",
          }}
        >
          <span className="ns-headline block overflow-hidden">
            <span className="block">What&apos;s inside</span>
          </span>
          <span className="ns-headline block overflow-hidden">
            <span
              className="block"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "color-mix(in srgb, var(--v2-ink) 78%, transparent)",
              }}
            >
              the cabin.
            </span>
          </span>
        </h2>

        {/* Numbered list — each row: number / title+body / photo */}
        <div className="ns-list">
          {services.map((s, i) => (
            <div key={i} className="ns-row" style={{ borderTop: "1px solid var(--v2-line)" }}>
              <div
                className="grid grid-cols-12 items-center"
                style={{ gap: "1.5rem", paddingBlock: "clamp(1.75rem, 3vw, 2.75rem)" }}
              >
                {/* Number */}
                <span
                  className="col-span-1"
                  style={{
                    fontFamily: "var(--font-geist)",
                    fontSize: "0.85rem",
                    color: "var(--v2-mute)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {s.n}
                </span>

                {/* Title */}
                <h3
                  className="font-display col-span-4"
                  style={{
                    fontSize: "clamp(1.4rem, 2.4vw, 2.4rem)",
                    color: "var(--v2-ink)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {s.title}
                </h3>

                {/* Body */}
                <p
                  className="col-span-4"
                  style={{
                    fontFamily: "var(--font-geist)",
                    fontSize: "clamp(0.92rem, 1vw, 1rem)",
                    color: "var(--v2-ink-soft)",
                    letterSpacing: "-0.005em",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {s.body}
                </p>

                {/* Photo */}
                <div className="col-span-3">
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "4 / 5",
                      borderRadius: "2px",
                      overflow: "hidden",
                      maxHeight: "11rem",
                    }}
                  >
                    <img
                      src={s.photo}
                      alt={s.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Closing rule */}
          <div style={{ borderTop: "1px solid var(--v2-line)" }} />
        </div>
      </div>
    </section>
  );
}
