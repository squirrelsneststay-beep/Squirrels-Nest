"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "About" — asymmetric split. Photo column LEFT, full-height with parallax.
 * Text column RIGHT, smaller, sparse. Big numerical chapter mark ("I.") on
 * top-left of text column. Headline is two-line serif with italic accent,
 * NOT centered. Body paragraph is short. The CTA is a Word━Word pill, not
 * the worn underlined link.
 *
 * Section sits next to the hero — feels like the inside cover of a book,
 * not a Squarespace block.
 */
export function EditorialWelcome() {
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
      // Photo parallax (image moves slower than scroll)
      gsap.fromTo(
        ".ew-photo-inner",
        { yPercent: -10, scale: 1.10 },
        {
          yPercent: 10,
          scale: 1.0,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 },
        }
      );
      // Headline reveal
      gsap.from(".ew-line", {
        y: 70,
        opacity: 0,
        duration: 1.3,
        ease: "power4.out",
        stagger: 0.16,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
      gsap.from(".ew-meta", {
        opacity: 0,
        y: 8,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
      gsap.from(".ew-body, .ew-cta", {
        opacity: 0,
        y: 18,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.55,
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      style={{ background: "var(--v2-bg)", overflow: "hidden" }}
    >
      <div
        className="mx-auto grid"
        style={{
          maxWidth: "100rem",
          paddingInline: "clamp(1.5rem, 3vw, 3.5rem)",
          paddingBlock: "clamp(6rem, 10vh, 10rem)",
          gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
          gap: "clamp(3rem, 6vw, 7rem)",
          alignItems: "stretch",
        }}
      >
        {/* PHOTO COLUMN — full-height portrait, no rounded corners (premium feel) */}
        <div
          className="relative"
          style={{
            minHeight: "clamp(28rem, 70vh, 44rem)",
            overflow: "hidden",
            background: "var(--v2-ink)",
          }}
        >
          <div className="ew-photo-inner absolute inset-0" style={{ willChange: "transform" }}>
            <img
              src="/images/squirrels-nest/sq-15.jpg"
              alt="Inside Squirrels' Nest"
              loading="lazy"
              style={{ width: "100%", height: "120%", objectFit: "cover", display: "block" }}
            />
          </div>
          {/* small bottom-left caption inside photo */}
          <span
            style={{
              position: "absolute",
              left: "1.25rem",
              bottom: "1rem",
              fontFamily: "var(--font-geist)",
              fontSize: "0.7rem",
              color: "var(--v2-bg)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              opacity: 0.85,
            }}
          >
            Plate I — The Cabin at Dusk
          </span>
        </div>

        {/* TEXT COLUMN — sparse, asymmetric, no underlined cliché link */}
        <div className="flex flex-col" style={{ paddingTop: "clamp(1rem, 4vh, 5rem)" }}>
          {/* Chapter mark "I." + meta */}
          <div className="ew-meta flex items-center gap-4" style={{ marginBottom: "2rem" }}>
            <span
              className="font-display"
              style={{
                fontSize: "1.8rem",
                color: "var(--v2-ink)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              I.
            </span>
            <span
              style={{
                flex: 1,
                height: "1px",
                background: "var(--v2-line)",
              }}
            />
            <span
              className="ew-meta"
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "0.7rem",
                color: "var(--v2-mute)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              About the place
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              color: "var(--v2-ink)",
              fontSize: "clamp(2.4rem, 5vw, 4.6rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              fontWeight: 400,
              margin: 0,
            }}
          >
            <span className="ew-line block overflow-hidden">
              <span className="block">Two slow years</span>
            </span>
            <span className="ew-line block overflow-hidden">
              <span
                className="block"
                style={{
                  fontStyle: "italic",
                  color: "color-mix(in srgb, var(--v2-ink) 70%, transparent)",
                }}
              >
                of stripping it back.
              </span>
            </span>
          </h2>

          {/* Body / CTA / bottom meta intentionally removed — just the headline now. */}
        </div>
      </div>
    </section>
  );
}
