"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Snake — one global scroll progress, each image phase-offset along the
 * SAME wave so at any moment the column forms a gentle continuous S-curve.
 * Adjacent images sit at adjacent points of one wave. Eye reads it as
 * ONE flowing snake body, not images fighting each other.
 *
 *   x_i = sin(scrollProgress * 2π + i * PHASE_OFFSET) * amplitude
 */

const snakes = [
  { src: "/images/squirrels-nest/sq-08.jpg", caption: "the cabin"  },
  { src: "/images/squirrels-nest/sq-18.jpg", caption: "the sitting room" },
  { src: "/images/squirrels-nest/sq-22.jpg", caption: "the tap"  },
  { src: "/images/squirrels-nest/sq-12.jpg", caption: "the bed"  },
  { src: "/images/squirrels-nest/sq-35.jpg", caption: "the kitchen"  },
  { src: "/images/squirrels-nest/sq-42.jpg", caption: "the lamps"  },
  { src: "/images/squirrels-nest/sq-28.jpg", caption: "the screen"  },
];

const AMPLITUDE_VW = 14;
const PHASE_OFFSET = 0.32; // small offset between adjacent images
const TWO_PI = Math.PI * 2;

export function VerticalSnake() {
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
      const slots = gsap.utils.toArray<HTMLElement>(".snake-slot");

      // Apply an initial offset BEFORE scroll triggers so the column already
      // forms a wave at rest (looks like a snake even before user moves).
      slots.forEach((slot, i) => {
        const x = Math.sin(i * PHASE_OFFSET) * AMPLITUDE_VW;
        slot.style.transform = `translateX(${x}vw)`;
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.0,
        onUpdate: (self) => {
          const p = self.progress;
          slots.forEach((slot, i) => {
            const x = Math.sin(p * TWO_PI + i * PHASE_OFFSET) * AMPLITUDE_VW;
            slot.style.transform = `translateX(${x}vw)`;
          });
        },
      });

      slots.forEach((slot) => {
        const img = slot.querySelector<HTMLElement>(".snake-img");
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: slot,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.0,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      style={{ background: "var(--v2-bg)", paddingBlock: "14vh", overflow: "hidden" }}
    >
      <div className="lef-container flex items-center justify-between" style={{ marginBottom: "5rem" }}>
        <span className="sv-eyebrow">07 — Inside the cabin</span>
        <span className="sv-eyebrow">Drifts together, top to bottom</span>
      </div>

      <div className="relative mx-auto" style={{ maxWidth: "60rem" }}>
        {snakes.map((s, i) => (
          <div
            key={i}
            className="snake-slot relative mx-auto"
            style={{
              width: "min(20rem, 64vw)",
              aspectRatio: "4 / 5",
              willChange: "transform",
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "2px",
                boxShadow: "0 20px 40px -20px rgba(55,8,8,0.18)",
              }}
            >
              <div
                className="snake-img"
                style={{ position: "absolute", inset: "-15% 0", willChange: "transform" }}
              >
                <img
                  src={s.src}
                  alt={s.caption}
                  loading={i < 2 ? "eager" : "lazy"}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>
            <span
              style={{
                position: "absolute",
                bottom: "0.6rem",
                left: "0.85rem",
                fontFamily: "var(--font-geist)",
                fontSize: "0.78rem",
                color: "var(--v2-bg)",
                letterSpacing: "-0.005em",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                pointerEvents: "none",
              }}
            >
              — {s.caption}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
