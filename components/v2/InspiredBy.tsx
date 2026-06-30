"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * InspiredBy — TWO-stage scroll:
 *
 *   Stage 1 (approach, NOT pinned):
 *     start: "top bottom" → end: "top top"
 *     As the user scrolls INTO the section, the frame already starts
 *     shrinking from 100vw/100vh down to a mid-size. No pin yet —
 *     just natural scroll driving the size.
 *
 *   Stage 2 (pinned final):
 *     start: "top top" → end: "+=350%"
 *     Pin engages when section reaches top. Frame continues shrinking
 *     to its final small portrait. Rapid photo flicks happen across
 *     this window. At the end, "Inspired by" and "the English
 *     countryside" fade in around the small framed photo.
 *
 *   The two stages are SEAMLESS — the frame is already mid-shrink when
 *   the pin takes over, so there's no "click" at pin engagement.
 */

const flickPhotos = [
  "/images/squirrels-nest/sq-08.jpg",
  "/images/squirrels-nest/sq-23.jpg",
  "/images/squirrels-nest/sq-22.jpg",
  "/images/squirrels-nest/sq-26.jpg",
  "/images/squirrels-nest/sq-12.jpg",
  "/images/squirrels-nest/sq-04.jpg",
  "/images/squirrels-nest/sq-18.jpg",
  "/images/squirrels-nest/sq-29.jpg",
  "/images/squirrels-nest/sq-15.jpg",
  "/images/squirrels-nest/sq-30.jpg",
  "/images/squirrels-nest/sq-31.jpg",
  "/images/squirrels-nest/sq-32.jpg",
  "/images/squirrels-nest/sq-22.jpg",
  "/images/squirrels-nest/sq-34.jpg",
  "/images/squirrels-nest/sq-06.jpg",
  "/images/squirrels-nest/sq-25.jpg",
  "/images/squirrels-nest/sq-42.jpg",
  "/images/squirrels-nest/sq-36.jpg",
  "/images/squirrels-nest/sq-19.jpg",
  "/images/squirrels-nest/sq-37.jpg",
  "/images/squirrels-nest/sq-13.jpg",
  "/images/squirrels-nest/sq-38.jpg",
  "/images/squirrels-nest/sq-28.jpg",
  "/images/squirrels-nest/sq-41.jpg",
  "/images/squirrels-nest/sq-21.jpg",
  "/images/squirrels-nest/sq-39.jpg",
  "/images/squirrels-nest/sq-33.jpg",
  "/images/squirrels-nest/sq-09.jpg",
  "/images/squirrels-nest/sq-43.jpg",
  "/images/squirrels-nest/sq-40.jpg",
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

      // ───────── STAGE 1: APPROACH SHRINK (no pin) ─────────
      // As the user scrolls INTO the section (top of section enters bottom
      // of viewport → top of section reaches top of viewport), the frame
      // shrinks from full-bleed to mid-size. No pin during this phase, so
      // the user sees normal scroll with the frame already shrinking.
      gsap.to(frame, {
        width: "60vw",
        height: "70vh",
        borderRadius: "2px",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "top top",
          scrub: 0.6,
        },
      });

      // ───────── STAGE 2: PINNED FINAL (continued shrink + flicks + reveal) ─────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=350%",
          pin: ".ib-pin",
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Continue shrink from where stage 1 left off (60vw / 70vh) to final small
      tl.to(
        frame,
        {
          width: "18rem",
          height: "22rem",
          borderRadius: "3px",
          ease: "power2.inOut",
          duration: 0.80,
        },
        0
      );

      // RAPID FLICKS across the same window
      const flickWindow = 0.80;
      const step = flickWindow / (layers.length - 1);
      for (let i = 1; i < layers.length; i++) {
        const at = step * (i - 1);
        tl.to(layers[i - 1], { opacity: 0, duration: 0.025, ease: "none" }, at);
        tl.to(layers[i], { opacity: 1, duration: 0.025, ease: "none" }, at);
      }

      // Headings reveal at the end
      tl.to(headLeft, { opacity: 1, y: 0, ease: "power3.out", duration: 0.10 }, 0.82);
      tl.to(headRight, { opacity: 1, y: 0, ease: "power3.out", duration: 0.10 }, 0.88);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      style={{
        background: "var(--v2-bg)",
        // NO paddingBlock — was creating the cream "white bar at top" the
        // user noticed during scroll-in. Pin handles its own framing.
      }}
    >
      <div
        className="ib-pin relative w-full overflow-hidden flex items-center justify-center"
        style={{
          background: "var(--v2-bg)",
          // Dead-centre vertical centering. Equal flex centering means the
          // frame always sits in the visual middle of the viewport while
          // pinned, both axes.
          height: "100dvh",
        }}
      >
        {/* Headings — appear at end, around the shrunk frame */}
        <h2
          className="ib-head-left font-display absolute"
          style={{
            right: "calc(50% + 11.5rem)",
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
            left: "calc(50% + 11.5rem)",
            top: "56%",
            transform: "translateY(-50%)",
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            color: "var(--v2-ink)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            fontWeight: 400,
            margin: 0,
            fontStyle: "italic",
            maxWidth: "20rem",
            textAlign: "left",
            willChange: "opacity, transform",
          }}
        >
          the{" "}
          <span style={{ color: "var(--v2-ink)" }}>English</span>{" "}
          countryside.
        </h2>

        {/* The shrinking frame — starts full viewport, ends small portrait centre.
            flex parent guarantees dead-centre positioning. */}
        <div
          className="ib-frame relative"
          style={{
            overflow: "hidden",
            boxShadow: "0 40px 80px -30px rgba(0,0,0,0.28)",
            willChange: "width, height, border-radius",
          }}
        >
          {flickPhotos.map((src, i) => (
            <div
              key={i}
              className="ib-layer absolute inset-0"
              style={{ willChange: "opacity" }}
            >
              <Image
                src={src}
                alt={i === 0 ? "Interiors and corners of Squirrels' Nest" : ""}
                fill
                sizes="(max-width: 768px) 80vw, 24rem"
                loading="lazy"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
