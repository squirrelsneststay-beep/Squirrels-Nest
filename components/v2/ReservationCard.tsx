"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";
import { FROM_PRICE_GBP, AIRBNB_RATING } from "@/lib/owner-facts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Bellevoire-style angled reservation card emerging over a moody photo.
 *
 *   [moody photo: cabin interior at dusk, full-bleed]
 *
 *      ┌─────────────────────────────────────┐
 *      │            (small icon)            │
 *      │       Reserve Your Stay            │
 *      │       at Squirrels' Nest           │ ← italic
 *      │                                    │
 *      │   Check-in / Check-out             │
 *      │   ───────────  ───────────         │ ← faux date pickers
 *      │                                    │
 *      │      Book on Airbnb  →             │ ← CTA
 *      └─────────────────────────────────────┘
 *
 * The card animates UP from below as you scroll into the section.
 * Rotates 1.5° for editorial feel.
 */
export function ReservationCard() {
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
      gsap.fromTo(
        ".rc-card",
        { y: 120, opacity: 0, rotate: 0 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 65%", once: true },
        }
      );
      // Photo parallax
      gsap.fromTo(
        ".rc-photo-inner",
        { scale: 1.15, yPercent: -6 },
        {
          scale: 1,
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="reserve"
      data-section-tone="dark"
      className="relative"
      style={{ minHeight: "100dvh", overflow: "hidden", paddingBlock: "12vh", scrollMarginTop: "6rem" }}
    >
      {/* Moody full-bleed photo */}
      <div className="absolute inset-0" style={{ background: "var(--v2-ink)" }}>
        <div className="rc-photo-inner absolute inset-0" style={{ willChange: "transform" }}>
          <Image
            src="/images/squirrels-nest/sq-25.jpg"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.74) 100%)",
          }}
        />
      </div>

      {/* Card */}
      <div
        className="relative z-10 mx-auto flex items-center justify-center"
        style={{ minHeight: "calc(100dvh - 24vh)" }}
      >
        <div
          className="rc-card"
          style={{
            background: "var(--v2-bg)",
            color: "var(--v2-ink)",
            padding: "clamp(2.5rem, 5vw, 4rem)",
            maxWidth: "min(40rem, 90vw)",
            width: "100%",
            borderRadius: "3px",
            boxShadow: "0 60px 120px -30px rgba(0, 0, 0, 0.45)",
            textAlign: "center",
            willChange: "transform, opacity",
          }}
        >
          {/* Decorative star — slow infinite rotation, like a quiet breath. Delight.
              Keyframe lives in globals.css (styled-jsx is not bundled in Next 16 by
              default and was rendering nothing here). */}
          <div
            aria-hidden
            style={{
              width: "1.75rem",
              height: "1.75rem",
              margin: "0 auto 1.5rem",
              color: "var(--v2-ink)",
              animation: "rc-star-spin 18s linear infinite",
            }}
          >
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" aria-hidden>
              <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
            </svg>
          </div>

          <h3
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              margin: 0,
            }}
          >
            Book your stay.
          </h3>

          <p
            style={{
              marginTop: "1.25rem",
              fontFamily: "var(--font-geist)",
              fontSize: "0.82rem",
              letterSpacing: "0.04em",
              color: "var(--v2-ink)",
            }}
          >
            Entire cabin · Sleeps four · Berkshire
          </p>

          {AIRBNB_RATING && (
            <p
              style={{
                marginTop: "0.6rem",
                fontFamily: "var(--font-geist)",
                fontSize: "0.95rem",
                color: "var(--v2-ink)",
              }}
            >
              ★ {AIRBNB_RATING.stars.toFixed(1)} · {AIRBNB_RATING.count} reviews on Airbnb
            </p>
          )}

          <p
            style={{
              marginTop: "1.25rem",
              fontFamily: "var(--font-geist)",
              fontSize: "1rem",
              lineHeight: 1.55,
              color: "var(--v2-ink-soft)",
              maxWidth: "30rem",
            }}
          >
            Live dates, availability and secure booking are all handled on Airbnb.
          </p>

          {/* Price signal — gated on the owner-confirmed from-price. People
              comparing tabs won't click through "just to see". */}
          {FROM_PRICE_GBP !== null && (
            <p
              style={{
                marginTop: "0.75rem",
                fontFamily: "var(--font-geist)",
                fontSize: "0.9rem",
                color: "var(--v2-ink-soft)",
              }}
            >
              From £{FROM_PRICE_GBP} a night.
            </p>
          )}

          <a href={AIRBNB_URL} {...EXTERNAL_LINK_PROPS} className="sv-pill is-inverse" style={{ marginTop: "2rem" }}>
            <span>Book</span>
            <span className="sv-pill-rule" aria-hidden />
            <span>on Airbnb</span>
          </a>
        </div>
      </div>
    </section>
  );
}
