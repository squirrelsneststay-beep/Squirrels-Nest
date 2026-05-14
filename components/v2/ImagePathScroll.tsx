"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Images travel along a curved SVG path as the user scrolls.
 * Each image is small, positioned at a different point on the path, and moves
 * across the screen with scroll progress. Multiple images visible at once.
 * Inspired by the Framer ImagePathEffect technique.
 */

const images = [
  { src: "/images/squirrels-nest/sq-02.jpg", caption: "Approach" },
  { src: "/images/squirrels-nest/sq-07.jpg", caption: "The lane" },
  { src: "/images/squirrels-nest/sq-12.jpg", caption: "The door" },
  { src: "/images/squirrels-nest/sq-18.jpg", caption: "The kitchen" },
  { src: "/images/squirrels-nest/sq-22.jpg", caption: "The hearth" },
  { src: "/images/squirrels-nest/sq-32.jpg", caption: "The field" },
  { src: "/images/squirrels-nest/sq-38.jpg", caption: "The view" },
];

export function ImagePathScroll() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>(".ips-tile");

      if (prefersReducedMotion) return;

      // Each tile travels along a sine-wave path tied to scroll progress
      tiles.forEach((tile, i) => {
        const phase = (i / tiles.length) * Math.PI * 2;
        const startX = -10 - (i * 8); // offscreen left, staggered
        const endX = 110 + (i * 8); // offscreen right
        const wave = 25; // px amplitude

        gsap.fromTo(
          tile,
          { xPercent: startX, opacity: 0 },
          {
            xPercent: endX,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () => "+=180%",
              scrub: 1.2,
              pin: ".ips-pin",
              anticipatePin: 1,
            },
            keyframes: [
              { xPercent: startX, opacity: 0, y: 0 },
              { xPercent: (startX + endX) * 0.3, opacity: 1, y: Math.sin(phase) * wave },
              { xPercent: (startX + endX) * 0.5, opacity: 1, y: Math.sin(phase + Math.PI / 2) * wave },
              { xPercent: (startX + endX) * 0.7, opacity: 1, y: Math.sin(phase + Math.PI) * wave },
              { xPercent: endX, opacity: 0, y: 0 },
            ],
          }
        );
      });

      // Caption fades in once enough tiles are visible
      gsap.fromTo(
        ".ips-caption",
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => "+=80%",
            scrub: 1,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative">
      <div
        className="ips-pin relative h-screen overflow-hidden"
        style={{ background: "var(--v2-bg)" }}
      >
        {/* Centered caption that stays */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <span
              className="ips-caption block font-display-italic"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                color: "var(--v2-ink)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              The place reveals
              <br />
              itself slowly.
            </span>
          </div>
        </div>

        {/* Image tiles travelling across, layered with mix of vertical positions */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {images.map((img, i) => {
            // Distribute vertically across the viewport with variance
            const top = 15 + ((i * 47) % 70); // 15–85% range
            const size = 11 + (i % 3) * 4; // 11rem, 15rem, 19rem
            return (
              <div
                key={i}
                className="ips-tile absolute"
                style={{
                  top: `${top}%`,
                  left: 0,
                  width: `${size}rem`,
                  aspectRatio: "4 / 5",
                  willChange: "transform, opacity",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "4px",
                    overflow: "hidden",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <span
                  className="block mt-2"
                  style={{
                    fontFamily: "var(--font-geist)",
                    fontSize: "0.75rem",
                    color: "var(--v2-mute)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {img.caption}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
