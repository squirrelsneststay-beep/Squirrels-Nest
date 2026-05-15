"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Clean typographic hero — large "Squirrels' Nest" wordmark on cream,
 * with two small offset photos floating at the corners. NOT a full-bleed
 * photographic hero. Multiple photos visible at once, none dominating.
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
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".ch-mark-line", {
        y: 90,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.14,
        delay: 0.2,
      });
      gsap.from(".ch-eyebrow", {
        y: 10,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.from(".ch-photo", {
        opacity: 0,
        y: 20,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.9,
      });
      gsap.from(".ch-caption", {
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.4,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      style={{ background: "var(--v2-bg)", minHeight: "100dvh" }}
    >
      {/* Top-left wordmark — sits in the nav row */}
      {/* (Nav already handles this; left intentionally empty here) */}

      {/* Floating photo top-right (small) */}
      <div
        className="ch-photo absolute"
        style={{
          top: "16vh",
          right: "8vw",
          width: "12rem",
          aspectRatio: "4 / 5",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/squirrels-nest/sq-15.jpg"
          alt="Inside Squirrels' Nest"
          loading="eager"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Floating photo bottom-left (small + medium) */}
      <div
        className="ch-photo absolute"
        style={{
          bottom: "12vh",
          left: "6vw",
          width: "14rem",
          aspectRatio: "4 / 5",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/squirrels-nest/sq-12.jpg"
          alt="The bedroom at Squirrels' Nest"
          loading="eager"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Centered wordmark */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
        style={{ paddingInline: "1.5rem" }}
      >
        <div
          className="ch-eyebrow mb-8"
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.75rem",
            color: "var(--v2-mute)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          A converted cabin — the english countryside
        </div>
        <h1
          className="font-display"
          style={{
            color: "var(--v2-ink)",
            fontSize: "clamp(3.5rem, 10vw, 11rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.025em",
            fontWeight: 400,
            maxWidth: "14ch",
          }}
        >
          <span className="block overflow-hidden">
            <span className="ch-mark-line block">Squirrels'</span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="ch-mark-line block font-display-italic"
              style={{ color: "#4f6b54" }}
            >
              Nest
            </span>
          </span>
        </h1>

        <p
          className="ch-caption mt-12"
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.95rem",
            color: "var(--v2-ink-soft)",
            lineHeight: 1.5,
            maxWidth: "30ch",
            fontWeight: 400,
          }}
        >
          Hand-finished. Wood-fired. Set against open English fields and quiet skies.
        </p>

        <div
          className="ch-caption mt-10 flex flex-wrap items-center justify-center gap-3 pointer-events-auto"
        >
          <a
            href="#"
            className="lef-pill-sm"
            style={{ background: "var(--v2-ink)", color: "var(--v2-bg)" }}
          >
            Check availability
          </a>
          <a
            href="#tour"
            className="lef-pill-sm"
            style={{
              background: "transparent",
              color: "var(--v2-ink)",
              border: "1px solid var(--v2-line)",
            }}
          >
            Tour the cabin
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="ch-caption absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ color: "var(--v2-mute)" }}
      >
        <span style={{ fontFamily: "var(--font-geist)", fontSize: "0.7rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          scroll
        </span>
        <div style={{ width: "1px", height: "32px", background: "var(--v2-mute)" }} />
      </div>
    </section>
  );
}
