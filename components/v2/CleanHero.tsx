"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

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
      if (prefersReducedMotion) return;

      // Hero statement rises in, staggered — eyebrow, headline, then CTA.
      gsap.from(".ch-reveal", {
        opacity: 0,
        y: 26,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.45,
        stagger: 0.14,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);


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
        <div className="ch-photo-inner kenburns absolute inset-0" style={{ willChange: "transform" }}>
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
        {/* Cinematic scrim — a soft vignette top + bottom. Darkens just enough
            for the thin editorial wordmark and eyebrow to read cleanly, and
            gives the frame a moodier, more luxury weight. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(28,18,10,0.40) 0%, rgba(28,18,10,0.06) 22%, rgba(28,18,10,0) 50%, rgba(28,18,10,0.30) 78%, rgba(28,18,10,0.62) 100%)",
          }}
        />
      </div>

      {/* Top CTA intentionally removed — the global <FloatingBookButton>
          in layout.tsx is the sole Book CTA across the whole site. */}

      {/* Real page heading for SEO / screen readers — visually hidden, since
          the visible wordmark is the decorative MorphingWordmark overlay. */}
      <h1 className="sr-only">
        Squirrels&apos; Nest — a charming one-bedroom country boutique retreat in the
        heart of Berkshire, near the Hampshire border and the North Wessex Downs
      </h1>

      {/* HERO STATEMENT — bottom-left editorial block, in cream over the
          moody photo. The big line is the first thing that says what this
          place feels like; the nav top-left carries the brand. */}
      <div
        className="absolute z-10"
        style={{
          left: "clamp(1.5rem, 3vw, 3.5rem)",
          right: "clamp(1.5rem, 3vw, 3.5rem)",
          bottom: "clamp(2.25rem, 7vh, 5rem)",
          color: "#f3f0e6",
        }}
      >
        <h2
          className="ch-reveal font-display"
          style={{
            marginTop: 0,
            marginBottom: 0,
            fontSize: "clamp(2.6rem, 7.5vw, 7rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
            fontWeight: 400,
            maxWidth: "16ch",
            textShadow: "0 2px 30px rgba(0,0,0,0.35)",
          }}
        >
          A one-bedroom cabin in the{" "}
          <span style={{ fontStyle: "italic" }}>Berkshire countryside.</span>
        </h2>
        <div
          className="ch-reveal"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginTop: "clamp(1.5rem, 3vh, 2.4rem)",
            flexWrap: "wrap",
          }}
        >
          <a
            href={AIRBNB_URL}
            {...EXTERNAL_LINK_PROPS}
            className="sv-pill is-inverse"
            style={{ boxShadow: "0 10px 30px -12px rgba(0,0,0,0.5)" }}
          >
            <span>Check availability</span>
            <span className="sv-pill-rule" aria-hidden />
            <span>Airbnb</span>
          </a>
        </div>
      </div>
    </section>
  );
}
