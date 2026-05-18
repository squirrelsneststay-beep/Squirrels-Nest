"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const tiles = [
  { image: "/images/squirrels-nest/sq-02.jpg", caption: "the lane" },
  { image: "/images/squirrels-nest/sq-08.jpg", caption: "the door" },
  { image: "/images/squirrels-nest/sq-15.jpg", caption: "the chair" },
  { image: "/images/squirrels-nest/sq-22.jpg", caption: "the tap" },
  { image: "/images/squirrels-nest/sq-28.jpg", caption: "the bed" },
  { image: "/images/squirrels-nest/sq-35.jpg", caption: "the kitchen" },
  { image: "/images/squirrels-nest/sq-42.jpg", caption: "the lamp" },
];

/**
 * Horizontal snake gallery — section pins, vertical scroll translates a
 * horizontal row of image tiles. Each tile sits at a different Y offset
 * along a sine wave, so the row visually snakes as it passes.
 */
export function SnakeGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = sectionRef.current;
    if (!root) return;
    const track = root.querySelector<HTMLElement>(".sg-track");
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Recompute distance from live measurements on every ScrollTrigger
      // refresh — `invalidateOnRefresh` re-evaluates function values, so the
      // gallery stays correct after window resize or orientation change.
      const distance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: ".sg-pin",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Sine wave Y offset per tile
      const items = gsap.utils.toArray<HTMLElement>(".sg-tile");
      items.forEach((it, i) => {
        const phase = (i / items.length) * Math.PI * 2;
        const yOffset = Math.sin(phase) * 70;
        gsap.set(it, { y: yOffset });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div
        className="sg-pin relative h-screen overflow-hidden flex items-center"
        style={{ background: "var(--v2-bg)" }}
      >
        <div className="absolute top-8 left-0 right-0 z-20 lef-container flex items-center justify-between">
          <span className="sv-eyebrow">05 — The slow tour</span>
          <span className="sv-eyebrow">Scroll →</span>
        </div>

        <div className="sg-track flex items-center gap-14 will-change-transform pl-24 pr-24">
          {tiles.map((t, i) => (
            <div
              key={i}
              className="sg-tile flex-none flex flex-col items-start gap-4"
              style={{ willChange: "transform" }}
            >
              <div
                className="relative"
                style={{
                  width: "26rem",
                  aspectRatio: "4 / 5",
                  borderRadius: "3px",
                  overflow: "hidden",
                  background: "#2a3328",
                }}
              >
                <Image
                  src={t.image}
                  alt={t.caption}
                  fill
                  sizes="26rem"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-geist)",
                  fontSize: "0.85rem",
                  color: "var(--v2-mute)",
                  letterSpacing: "0.01em",
                }}
              >
                — {t.caption}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
