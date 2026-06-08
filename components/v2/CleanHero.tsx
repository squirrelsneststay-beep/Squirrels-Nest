"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

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

      // Small eyebrow fades up. The giant wordmark is rendered by the
      // MorphingWordmark overlay so it can fly to the nav on scroll; here we
      // only keep an invisible anchor (.ch-mark-anchor) to measure its start.
      gsap.from(".ch-eyebrow", {
        opacity: 0,
        y: 14,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.35,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

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
      data-hero
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
                alt={`${p.alt} — Squirrels' Nest, a luxury cabin retreat in the Berkshire countryside`}
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

      {/* Real page heading for SEO / screen readers — visually hidden, since
          the visible wordmark is the decorative MorphingWordmark overlay. */}
      <h1 className="sr-only">
        Squirrels&apos; Nest — a charming one-bedroom country boutique retreat in the
        heart of Berkshire, near the Hampshire border and the North Wessex Downs
      </h1>

      {/* EYEBROW — a small, plain location line, top-left */}
      <div
        className="ch-eyebrow absolute z-10"
        style={{
          top: "clamp(7rem, 16vh, 11rem)",
          left: "clamp(1.5rem, 3vw, 3.5rem)",
          fontFamily: "var(--font-geist)",
          fontSize: "0.72rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--v2-bg)",
          opacity: 0.92,
          textShadow: "0 1px 6px rgba(0,0,0,0.35)",
        }}
      >
        Berkshire · England
      </div>

      {/* BOTTOM WORDMARK ANCHOR — invisible. The visible, flying wordmark is
          <MorphingWordmark>; this span only fixes its START position + size. */}
      <div
        className="absolute z-10"
        style={{
          left: 0,
          right: 0,
          bottom: "clamp(1rem, 2.5vh, 2.5rem)",
          padding: "0 clamp(0.5rem, 1.5vw, 1.5rem)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <span
          id="hero-mark-anchor"
          aria-hidden
          className="font-display"
          style={{
            display: "inline-block",
            visibility: "hidden",
            fontSize: "clamp(3.5rem, 12vw, 14rem)",
            lineHeight: 0.84,
            letterSpacing: "-0.045em",
            fontWeight: 400,
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {mark}
        </span>
      </div>
    </section>
  );
}
