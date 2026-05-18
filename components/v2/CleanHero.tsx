"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

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

      gsap.from(".ch-meta", {
        opacity: 0,
        y: 12,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.2,
      });

      // SPLITTEXT on the tagline — each line splits into chars, animated
      // with mask-up reveal. Better than a single y/opacity tween.
      const taglineEl = root.querySelector<HTMLElement>(".ch-tagline-block");
      if (taglineEl) {
        const split = new SplitText(taglineEl, { type: "lines, chars", linesClass: "ch-tag-line-clip" });
        gsap.from(split.chars, {
          yPercent: 110,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: { each: 0.012, from: "start" },
          delay: 0.55,
        });
      }

      // Massive bottom wordmark — slides up + char stagger via SplitText
      gsap.from(".ch-mark-row", {
        y: 120,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.5,
      });
      const markEl = root.querySelector<HTMLElement>(".ch-mark");
      if (markEl) {
        const markSplit = new SplitText(markEl, { type: "chars", charsClass: "ch-mark-char" });
        gsap.from(markSplit.chars, {
          yPercent: 110,
          opacity: 0,
          duration: 1.3,
          ease: "power4.out",
          stagger: { each: 0.025, from: "random" },
          delay: 0.65,
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
      {/* Full-bleed sharp photo — this is the LCP image, so use next/image
          with `priority` to preload + serve AVIF/WebP from Vercel's image
          optimizer. GSAP scale animates the wrapper div, which still scales
          the rendered <img> proportionally. */}
      <div className="absolute inset-0" style={{ overflow: "hidden" }}>
        <div className="ch-photo-inner absolute inset-0" style={{ willChange: "transform" }}>
          <Image
            src="/images/squirrels-nest/sq-18.jpg"
            alt="Squirrels' Nest, sitting room with yellow velvet chairs"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        {/* gradient overlay intentionally removed — photo speaks for itself */}
      </div>

      {/* Top CTA intentionally removed — the global <FloatingBookButton>
          in layout.tsx is the sole Book CTA across the whole site. */}

      {/* MID — short tagline left-aligned, generous space (SplitText animated) */}
      <div
        className="absolute z-10"
        style={{
          top: "32%",
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
            fontSize: "clamp(1.6rem, 2.6vw, 2.6rem)",
            color: "var(--v2-bg)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          <span style={{ fontStyle: "italic", display: "block" }}>A one-room lodge and a shepherd&apos;s hut.</span>
          <span style={{ display: "block", opacity: 0.92 }}>On a working farm in West Berkshire.</span>
        </div>
      </div>

      {/* GIANT BOTTOM WORDMARK — overflows slightly, letter-by-letter reveal */}
      <div
        className="ch-mark-row absolute z-10"
        style={{
          left: 0,
          right: 0,
          bottom: "-1vw",
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
