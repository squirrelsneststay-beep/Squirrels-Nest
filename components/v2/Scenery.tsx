"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Wider scenery / outdoor shots — the grounds and the garden.
const GROUNDS = [
  { src: "/images/squirrels-nest/sq-03.jpg", alt: "Wisteria climbing the timber-clad country house", w: "min(40rem, 92vw)", aspect: "3 / 2" },
  { src: "/images/squirrels-nest/sq-01.jpg", alt: "The garden and its hedgerows", w: "min(24rem, 56vw)", aspect: "3 / 2" },
  { src: "/images/squirrels-nest/sq-02.jpg", alt: "A path winding through the planting", w: "min(20rem, 48vw)", aspect: "3 / 4" },
  { src: "/images/squirrels-nest/sq-05.jpg", alt: "The gravel path through the grounds", w: "min(26rem, 64vw)", aspect: "3 / 2" },
];

/**
 * Scenery — "The grounds": wider outdoor frames of the setting, garden and
 * animals. Image-forward, varied sizes, reveals on scroll.
 */
export function Scenery() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.from(".sc-head", {
        y: 28,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });
      gsap.from(".sc-shot", {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".sc-grid", start: "top 85%", once: true },
      });
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>(".sc-inner").forEach((inner) => {
        gsap.fromTo(
          inner,
          { yPercent: 6 },
          {
            yPercent: -6,
            ease: "none",
            scrollTrigger: { trigger: inner, start: "top bottom", end: "bottom top", scrub: 1 },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} style={{ background: "var(--v2-bg)", paddingBlock: "clamp(5rem, 13vh, 11rem)" }}>
      <div
        className="mx-auto"
        style={{ maxWidth: "82rem", paddingInline: "clamp(1.5rem, 4vw, 4rem)", marginBottom: "clamp(2.5rem, 6vh, 4.5rem)" }}
      >
        <p
          className="sc-head"
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--v2-mute)",
            margin: 0,
          }}
        >
          The grounds
        </p>
        <h2
          className="sc-head font-display"
          style={{
            marginTop: "1.1rem",
            fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            color: "var(--v2-ink)",
            fontWeight: 600,
            maxWidth: "18ch",
          }}
        >
          Woodland, garden, and a few friendly faces.
        </h2>
      </div>

      <div
        className="sc-grid mx-auto"
        style={{
          maxWidth: "84rem",
          paddingInline: "clamp(1rem, 3vw, 3rem)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(0.85rem, 1.8vw, 1.5rem)",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        {GROUNDS.map((g) => (
          <div
            key={g.src}
            className="sc-shot"
            style={{
              position: "relative",
              width: g.w,
              aspectRatio: g.aspect,
              borderRadius: "3px",
              overflow: "hidden",
              background: "var(--v2-line)",
            }}
          >
            <div className="sc-inner absolute" style={{ inset: "-7% 0", willChange: "transform" }}>
              <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 92vw, 40rem" style={{ objectFit: "cover" }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
