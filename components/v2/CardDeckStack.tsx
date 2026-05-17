"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cards = [
  { src: "/images/squirrels-nest/sq-12.jpg", caption: "the bedroom" },
  { src: "/images/squirrels-nest/sq-18.jpg", caption: "the sitting room" },
  { src: "/images/squirrels-nest/sq-22.jpg", caption: "the tap" },
  { src: "/images/squirrels-nest/sq-35.jpg", caption: "the kitchen" },
  { src: "/images/squirrels-nest/sq-42.jpg", caption: "the lamp" },
];

/**
 * Card-deck stack — pinned section where a stack of images sits centred
 * and the user scrolls to flip the top card off, revealing the next.
 * Each flip combines translateY + rotate + opacity for a card feel.
 *
 * Inspired by the saltsaun.com pattern (their card-stack scroll moment).
 */
export function CardDeckStack() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".cds-card");

      if (prefersReducedMotion) {
        cardEls.forEach((c, i) => {
          gsap.set(c, { opacity: i === cardEls.length - 1 ? 1 : 0 });
        });
        return;
      }

      // Set initial stacked state — each card slightly rotated, behind the next
      cardEls.forEach((c, i) => {
        const rotation = (i - 2) * 1.5; // small variance
        gsap.set(c, {
          rotation,
          y: (cardEls.length - 1 - i) * 6,
          zIndex: i + 1,
          transformOrigin: "center bottom",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${cards.length * 80}%`,
          pin: ".cds-pin",
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Flip each top card off — except the last one which stays
      for (let i = cardEls.length - 1; i > 0; i--) {
        const card = cardEls[i];
        const at = (cardEls.length - 1 - i) / (cardEls.length - 1);
        tl.to(
          card,
          {
            y: "-=120vh",
            rotation: "+=10",
            opacity: 0,
            duration: 0.18,
            ease: "power2.in",
          },
          at
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative">
      <div
        className="cds-pin relative h-screen overflow-hidden flex items-center justify-center"
        style={{ background: "var(--v2-bg)" }}
      >
        <div className="absolute top-8 left-0 right-0 z-30 lef-container flex items-center justify-between">
          <span className="sv-eyebrow">02 — Inside</span>
          <span className="sv-eyebrow">Scroll to flip ↓</span>
        </div>

        <div className="relative" style={{ width: "min(28rem, 80vw)", aspectRatio: "4 / 5" }}>
          {cards.map((c, i) => (
            <div
              key={i}
              className="cds-card absolute inset-0"
              style={{
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
                willChange: "transform, opacity",
                background: "#222",
              }}
            >
              <img
                src={c.src}
                alt={c.caption}
                loading={i === cards.length - 1 ? "eager" : "lazy"}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <span
                className="absolute bottom-3 left-4"
                style={{
                  fontFamily: "var(--font-geist)",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.85)",
                  letterSpacing: "0.02em",
                  textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                }}
              >
                — {c.caption}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
