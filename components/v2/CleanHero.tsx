"use client";

import { useEffect, useRef } from "react";
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
      style={{ minHeight: "100dvh", background: "var(--v2-ink)", overflow: "hidden" }}
      data-cleanhero
    >
      {/* Full-bleed sharp photo */}
      <div className="absolute inset-0" style={{ overflow: "hidden" }}>
        <div className="ch-photo-inner absolute inset-0" style={{ willChange: "transform" }}>
          <img
            src="/images/squirrels-nest/sq-12.jpg"
            alt="Squirrels' Nest, bedroom with red headboard"
            loading="eager"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        {/* gradient overlay intentionally removed — photo speaks for itself */}
      </div>

      {/* Top CTA pill only — banner tag removed */}
      <div className="absolute top-0 inset-x-0 z-30 pt-7">
        <div
          className="mx-auto flex items-start justify-end"
          style={{ maxWidth: "108rem", paddingInline: "clamp(1.5rem, 3vw, 3.5rem)" }}
        >
          <a href="#book" className="ch-meta sv-pill" style={{ background: "transparent", color: "var(--v2-bg)", borderColor: "rgba(255,249,235,0.4)" }}>
            <span>Reserve</span>
            <span className="sv-pill-rule" aria-hidden />
            <span>a stay</span>
          </a>
        </div>
      </div>

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
          <span style={{ fontStyle: "italic", display: "block" }}>A converted cabin, two bedrooms,</span>
          <span style={{ display: "block", opacity: 0.92 }}>at the end of a long lane.</span>
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
            fontSize: "clamp(5rem, 18vw, 21rem)",
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
