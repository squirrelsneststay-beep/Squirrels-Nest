"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

// Hero slideshow: auto-advances every 4 seconds.
// Photos chosen to give a varied tour of the lodge — exterior, sitting
// room, kitchen, bedroom, brass detail, chandelier. All from Zoe's real
// photography (sq-XX confirmed accurate).
const HERO_PHOTOS = [
  { src: "/images/squirrels-nest/sq-18.jpg", alt: "Sitting room with yellow velvet chairs" },
  { src: "/images/squirrels-nest/sq-12.jpg", alt: "Bedroom with red headboard" },
  { src: "/images/squirrels-nest/sq-30.jpg", alt: "Chandelier on a deep-red plaster wall" },
  { src: "/images/squirrels-nest/sq-37.jpg", alt: "Kitchen sink beneath the window" },
  { src: "/images/squirrels-nest/sq-08.jpg", alt: "Lodge exterior" },
  { src: "/images/squirrels-nest/sq-42.jpg", alt: "Lamps and flowers" },
];
const SLIDESHOW_INTERVAL_MS = 4000;

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

/**
 * Hero — Bellevoire-style. Full-bleed sharp moody photo. Small support
 * text and meta in the top zone. GIGANTIC wordmark slammed against the
 * bottom of the viewport, slightly overflowing — the kind of move that
 * a Squarespace template would never let you make.
 *
 * No centred display block. No polite paragraph. No two-button pill row.
 * Just photograph + huge mark + a single Word━Word CTA tucked top-right.
 */
export function CleanHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [slideIdx, setSlideIdx] = useState(0);

  // Auto-advance slideshow every 4s. Skips if prefers-reduced-motion (the
  // user has explicitly asked for fewer auto-changing things).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setSlideIdx((i) => (i + 1) % HERO_PHOTOS.length);
    }, SLIDESHOW_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Photo subtly scales in for fluidity
      gsap.fromTo(
        ".ch-photo-inner",
        { scale: 1.10 },
        { scale: 1.0, duration: 2.0, ease: "power3.out" }
      );
      if (prefersReducedMotion) return;

      // SPLITTEXT on the tagline — faster reveal (was feeling sluggish)
      const taglineEl = root.querySelector<HTMLElement>(".ch-tagline-block");
      if (taglineEl) {
        const split = new SplitText(taglineEl, { type: "lines, chars", linesClass: "ch-tag-line-clip" });
        gsap.from(split.chars, {
          yPercent: 110,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: { each: 0.008, from: "start" },
          delay: 0.25,
        });
      }

      // Bottom wordmark — quicker slide-up
      gsap.from(".ch-mark-row", {
        y: 80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });
      const markEl = root.querySelector<HTMLElement>(".ch-mark");
      if (markEl) {
        const markSplit = new SplitText(markEl, { type: "chars", charsClass: "ch-mark-char" });
        gsap.from(markSplit.chars, {
          yPercent: 110,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: { each: 0.018, from: "start" },
          delay: 0.32,
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Split wordmark into letters for a letter-by-letter rise
  const mark = "Squirrels' Nest";

  return (
    <section
      ref={rootRef}
      data-section-tone="dark"
      className="relative"
      style={{
        minHeight: "100dvh",
        height: "100dvh",
        background: "var(--v2-ink)",
        overflow: "hidden",
      }}
      data-cleanhero
    >
      {/* Full-bleed slideshow — stacked photo layers, only the active one
          at opacity 1. Crossfades via 1.2s CSS opacity transition. First
          photo is LCP-priority + eager, the rest preload lazily so the
          page paints fast then warms the cache as the user reads. */}
      <div className="absolute inset-0" style={{ overflow: "hidden" }}>
        <div className="ch-photo-inner absolute inset-0" style={{ willChange: "transform" }}>
          {HERO_PHOTOS.map((p, i) => (
            <div
              key={p.src}
              aria-hidden={i !== slideIdx}
              style={{
                position: "absolute",
                inset: 0,
                opacity: i === slideIdx ? 1 : 0,
                transition: "opacity 1200ms var(--ease-out)",
                willChange: "opacity",
              }}
            >
              <Image
                src={p.src}
                alt={`${p.alt} — Squirrels' Nest`}
                fill
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        {/* gradient overlay intentionally removed — photo speaks for itself */}
      </div>

      {/* Top CTA intentionally removed — the global <FloatingBookButton>
          in layout.tsx is the sole Book CTA across the whole site. */}

      {/* MID — tagline broken across short lines for visual rhythm */}
      <div
        className="absolute z-10"
        style={{
          top: "30%",
          left: "clamp(1.5rem, 3vw, 3.5rem)",
          right: "clamp(1.5rem, 3vw, 3.5rem)",
          maxWidth: "44rem",
        }}
      >
        <div
          className="ch-tagline-block"
          style={{
            fontFamily: "var(--font-italiana)",
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 2.8vw, 2.9rem)",
            color: "var(--v2-bg)",
            letterSpacing: "-0.02em",
            lineHeight: 1.18,
          }}
        >
          <span style={{ fontStyle: "italic", display: "block" }}>A one-bedroom retreat.</span>
          <span style={{ fontStyle: "italic", display: "block" }}>In the heart of Berkshire.</span>
          <span style={{ display: "block", opacity: 0.88, marginTop: "0.35rem" }}>Woodland all around.</span>
        </div>
      </div>

      {/* GIANT BOTTOM WORDMARK — sits just above the bottom edge */}
      <div
        className="ch-mark-row absolute z-10"
        style={{
          left: 0,
          right: 0,
          bottom: "clamp(1rem, 2.5vh, 2.5rem)",
          padding: "0 clamp(0.5rem, 1.5vw, 1.5rem)",
          textAlign: "center",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <h1
          className="ch-mark font-display"
          aria-label="Squirrels' Nest"
          style={{
            color: "var(--v2-bg)",
            // Brought down from 18vw -> 12vw so the wordmark fits within
            // the viewport at all widths (was overflowing right edge).
            fontSize: "clamp(3.5rem, 12vw, 14rem)",
            lineHeight: 0.84,
            letterSpacing: "-0.045em",
            fontWeight: 400,
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {mark}
        </h1>
      </div>
    </section>
  );
}
