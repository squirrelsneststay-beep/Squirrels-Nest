"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const flickFrames = [
  "/images/squirrels-nest/sq-12.jpg",
  "/images/squirrels-nest/sq-18.jpg",
  "/images/squirrels-nest/sq-22.jpg",
  "/images/squirrels-nest/sq-28.jpg",
  "/images/squirrels-nest/sq-35.jpg",
  "/images/squirrels-nest/sq-42.jpg",
];

/**
 * Flicking image stack that shrinks until it reveals a phrase.
 *
 * Pinned section. A single centered image frame cycles rapidly through 6
 * cabin photos (no fades — hard cuts / flicks). Across the same scroll, the
 * image scales DOWN from full-bleed toward a small contained card. Once it
 * reaches its smallest size the image fades out entirely and the surrounding
 * phrase appears in its place.
 *
 * One technique. Not the line pattern. Used once.
 */
export function FlickingImageStack() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const frame = root.querySelector<HTMLElement>(".fis-frame");
      const layers = gsap.utils.toArray<HTMLElement>(".fis-layer");
      const phraseA = root.querySelector(".fis-phrase-a");
      const phraseB = root.querySelector(".fis-phrase-b");

      // Initial: large, first layer visible
      gsap.set(frame, { width: "94vw", height: "82vh", borderRadius: "4px" });
      layers.forEach((l, i) => gsap.set(l, { opacity: i === 0 ? 1 : 0 }));
      gsap.set([phraseA, phraseB], { opacity: 0, y: 18 });

      if (prefersReducedMotion) {
        gsap.set([phraseA, phraseB], { clearProps: "all" });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=350%",
          pin: ".fis-pin",
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Phase A: flick through frames fast (cuts, not fades)
      // We distribute 5 transitions across t=0.05 → t=0.5
      const flickSegment = 0.45 / (flickFrames.length - 1);
      for (let i = 1; i < flickFrames.length; i++) {
        const at = 0.05 + flickSegment * (i - 1);
        tl.to(layers[i - 1], { opacity: 0, duration: 0.001 }, at);
        tl.to(layers[i], { opacity: 1, duration: 0.001 }, at);
      }

      // Phase B: continuous shrink throughout
      tl.to(
        frame,
        {
          width: "18vw",
          height: "22vh",
          borderRadius: "3px",
          ease: "power2.inOut",
          duration: 0.7,
        },
        0
      );

      // Phase C: at end, fade image out and bring phrase in
      tl.to(layers[flickFrames.length - 1], { opacity: 0, duration: 0.06 }, 0.78);
      tl.to(frame, { opacity: 0, duration: 0.06 }, 0.82);
      tl.to(phraseA, { opacity: 1, y: 0, duration: 0.08 }, 0.84);
      tl.to(phraseB, { opacity: 1, y: 0, duration: 0.08 }, 0.92);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative">
      <div
        className="fis-pin relative h-screen overflow-hidden flex items-center justify-center"
        style={{ background: "var(--v2-bg)" }}
      >
        <span
          className="absolute top-8 left-1/2 -translate-x-1/2"
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.75rem",
            color: "var(--v2-mute)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          02 — Inside
        </span>

        {/* The shrinking flicking frame */}
        <div
          className="fis-frame relative overflow-hidden"
          style={{ willChange: "width, height, opacity" }}
        >
          {flickFrames.map((src, i) => (
            <div
              key={i}
              className="fis-layer absolute inset-0"
              style={{ willChange: "opacity" }}
            >
              <img
                src={src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                loading={i < 2 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Centered phrase — appears once the image has shrunk and faded */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-center mx-auto" style={{ maxWidth: "32ch" }}>
            <span
              className="fis-phrase-a block font-display"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                color: "var(--v2-ink)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                fontWeight: 400,
              }}
            >
              Built honestly,
            </span>
            <span
              className="fis-phrase-b block font-display-italic"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                color: "var(--v2-ink-soft)",
                lineHeight: 1.2,
                letterSpacing: "-0.015em",
                marginTop: "0.5rem",
              }}
            >
              one piece of timber at a time.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
