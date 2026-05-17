"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * InspiredBy — continuous shrink + flick.
 *
 * Pinned section. ONE container that holds all photos starts full-bleed
 * (100% viewport). As you scroll, the container continuously SHRINKS down
 * to a small framed centre photo. WHILE shrinking, the photos inside the
 * container flick through each other VERY FAST (twice the previous speed).
 *
 * At the end of the pin, the container is at its final small size in the
 * middle of the page. Then "Inspired by" and "the English countryside"
 * headings fade in around it.
 */

// Big variety pool — uses 30 of the 58 available photos for the rapid flick.
// Skips sq-01 (chicken — user is sick of chickens) and sq-38 (shower).
const flickPhotos = [
  "/images/squirrels-nest/sq-08.jpg",
  "/images/zoe-09.jpg",
  "/images/squirrels-nest/sq-22.jpg",
  "/images/zoe-13.jpg",
  "/images/squirrels-nest/sq-12.jpg",
  "/images/squirrels-nest/sq-04.jpg",
  "/images/squirrels-nest/sq-18.jpg",
  "/images/zoe-02.jpg",
  "/images/squirrels-nest/sq-15.jpg",
  "/images/squirrels-nest/sq-30.jpg",
  "/images/zoe-11.jpg",
  "/images/squirrels-nest/sq-32.jpg",
  "/images/squirrels-nest/sq-35.jpg",
  "/images/zoe-05.jpg",
  "/images/squirrels-nest/sq-06.jpg",
  "/images/squirrels-nest/sq-25.jpg",
  "/images/squirrels-nest/sq-42.jpg",
  "/images/zoe-08.jpg",
  "/images/squirrels-nest/sq-19.jpg",
  "/images/squirrels-nest/sq-37.jpg",
  "/images/squirrels-nest/sq-13.jpg",
  "/images/zoe-04.jpg",
  "/images/squirrels-nest/sq-28.jpg",
  "/images/squirrels-nest/sq-41.jpg",
  "/images/squirrels-nest/sq-21.jpg",
  "/images/zoe-15.jpg",
  "/images/squirrels-nest/sq-33.jpg",
  "/images/squirrels-nest/sq-09.jpg",
  "/images/squirrels-nest/sq-43.jpg",
  "/images/zoe-12.jpg",
];

export function InspiredBy() {
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
      const frame = root.querySelector<HTMLElement>(".ib-frame");
      const layers = gsap.utils.toArray<HTMLElement>(".ib-layer");
      const headLeft = root.querySelector<HTMLElement>(".ib-head-left");
      const headRight = root.querySelector<HTMLElement>(".ib-head-right");

      // Initial — frame full-bleed, only first layer visible
      gsap.set(frame, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
      });
      layers.forEach((l, i) => gsap.set(l, { opacity: i === 0 ? 1 : 0 }));
      gsap.set([headLeft, headRight], { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=600%",
          pin: ".ib-pin",
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // === CONTINUOUS SHRINK ===
      // Frame size shrinks from full-bleed to a small portrait throughout
      // the SAME scroll range as the flicks.
      tl.to(
        frame,
        {
          width: "18rem",
          height: "22rem",
          borderRadius: "3px",
          ease: "power2.inOut",
          duration: 0.85,
        },
        0
      );

      // === RAPID FLICKS ===
      // Photos crossfade across the SAME scroll window (0 → 0.85).
      // Each flick is very short (duration 0.03) so they feel FAST.
      const flickWindow = 0.85;
      const step = flickWindow / (layers.length - 1);
      for (let i = 1; i < layers.length; i++) {
        const at = step * (i - 1);
        tl.to(layers[i - 1], { opacity: 0, duration: 0.025, ease: "none" }, at);
        tl.to(layers[i], { opacity: 1, duration: 0.025, ease: "none" }, at);
      }

      // === HEADINGS appear at the end, around the small framed photo ===
      tl.to(headLeft, { opacity: 1, y: 0, ease: "power3.out", duration: 0.10 }, 0.86);
      tl.to(headRight, { opacity: 1, y: 0, ease: "power3.out", duration: 0.10 }, 0.92);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative">
      <div
        className="ib-pin relative h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ background: "var(--v2-bg)" }}
      >
        {/* Headings — appear at end, around the shrunk frame */}
        <h2
          className="ib-head-left font-display absolute"
          style={{
            left: "8%",
            top: "44%",
            transform: "translateY(-50%)",
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            color: "var(--v2-ink)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            fontWeight: 400,
            margin: 0,
            textAlign: "right",
            maxWidth: "18rem",
            willChange: "opacity, transform",
          }}
        >
          Inspired by
        </h2>

        <h2
          className="ib-head-right font-display absolute"
          style={{
            right: "6%",
            top: "56%",
            transform: "translateY(-50%)",
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            color: "var(--v2-ink)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            fontWeight: 400,
            margin: 0,
            fontStyle: "italic",
            maxWidth: "26rem",
            textAlign: "left",
            willChange: "opacity, transform",
          }}
        >
          the English countryside.
        </h2>

        {/* The shrinking frame — starts full viewport, ends small portrait centre */}
        <div
          className="ib-frame relative"
          style={{
            overflow: "hidden",
            boxShadow: "0 40px 80px -30px rgba(55,8,8,0.30)",
            willChange: "width, height, border-radius",
          }}
        >
          {flickPhotos.map((src, i) => (
            <div
              key={i}
              className="ib-layer absolute inset-0"
              style={{ willChange: "opacity" }}
            >
              <img
                src={src}
                alt=""
                loading={i < 2 ? "eager" : "lazy"}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
