"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderImage } from "./PlaceholderImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hero with the headline BROKEN APART across the image —
 * different words positioned at different points and sizes,
 * not a centered block. Continuous scroll-driven parallax.
 */
export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Entrance
      gsap.from(".h2-img-inner", {
        scale: 1.12,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
      });
      gsap.from(".h2-word", {
        y: 90,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.18,
        delay: 0.2,
      });
      gsap.from(".h2-eyebrow", {
        opacity: 0,
        y: 10,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.6,
      });
      gsap.from(".h2-pill", {
        opacity: 0,
        y: 16,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 1,
      });

      if (prefersReducedMotion) return;

      // Continuous scroll-driven parallax — image scales, text drifts
      gsap.to(".h2-img-inner", {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".h2-word-a", {
        y: -60,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.to(".h2-word-b", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.to(".h2-word-c", {
        y: -160,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Radius-on-scroll: image morphs from nearly-sharp to softly rounded
      // as the hero scrolls out of view. Same technique as the Framer
      // RadiusOnScroll component, implemented with GSAP ScrollTrigger.
      gsap.fromTo(
        ".h2-img",
        { borderRadius: "4px" },
        {
          borderRadius: "40px",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // Optional: horizontal padding tightens as you scroll, pulling the
      // image inward from the viewport edges.
      gsap.fromTo(
        root,
        { paddingLeft: "0rem", paddingRight: "0rem" },
        {
          paddingLeft: "2.5rem",
          paddingRight: "2.5rem",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative" style={{ background: "var(--lef-cream)" }}>
      <div
        className="mx-auto"
        style={{
          width: "100%",
          maxWidth: "144rem",
          paddingInline: "clamp(0.75rem, 2vw, 2rem)",
          paddingBottom: "8rem",
        }}
      >
        <div
          className="h2-img relative overflow-hidden"
          style={{
            borderRadius: "6px",
            aspectRatio: "16 / 10",
            minHeight: "72vh",
            maxHeight: "88vh",
          }}
        >
          <div className="h2-img-inner absolute inset-0" style={{ willChange: "transform" }}>
            <PlaceholderImage tone="forest" aspect="auto" className="!h-full" />
          </div>

          {/* Soft top + bottom gradients */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in srgb, var(--lef-charcoal) 35%, transparent) 0%, transparent 25%, transparent 60%, color-mix(in srgb, var(--lef-charcoal) 50%, transparent) 100%)",
            }}
          />

          {/* Eyebrows */}
          <span
            className="h2-eyebrow absolute top-6 left-6 md:top-10 md:left-12 font-mono-eyebrow"
            style={{ color: "color-mix(in srgb, var(--lef-cream) 60%, transparent)" }}
          >
            Lane End Farm · est. autumn
          </span>
          <span
            className="h2-eyebrow absolute top-6 right-6 md:top-10 md:right-12 font-mono-eyebrow"
            style={{ color: "color-mix(in srgb, var(--lef-cream) 60%, transparent)" }}
          >
            A converted cabin
          </span>

          {/* Broken headline — three positioned chunks */}
          <span
            className="h2-word h2-word-a font-display absolute"
            style={{
              top: "22%",
              left: "8%",
              fontSize: "clamp(2.5rem, 7vw, 7rem)",
              color: "var(--lef-cream)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            A slow
          </span>

          <span
            className="h2-word h2-word-b font-display-italic absolute"
            style={{
              top: "44%",
              right: "8%",
              fontSize: "clamp(2.75rem, 8vw, 8rem)",
              color: "var(--lef-cream)",
              lineHeight: 1,
              letterSpacing: "-0.015em",
            }}
          >
            stay,
          </span>

          <span
            className="h2-word h2-word-c font-display-italic absolute"
            style={{
              bottom: "12%",
              left: "10%",
              fontSize: "clamp(1.5rem, 3.6vw, 3.5rem)",
              color: "color-mix(in srgb, var(--lef-cream) 88%, transparent)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              maxWidth: "20ch",
            }}
          >
            where the lane runs out.
          </span>

          {/* Pills bottom-right */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-12 flex gap-3">
            <a
              href="#"
              className="h2-pill inline-flex items-center px-5 py-2.5 rounded-full transition-colors"
              style={{
                background: "var(--lef-cream)",
                color: "var(--lef-forest)",
                fontFamily: "var(--font-geist)",
                fontSize: "0.875rem",
              }}
            >
              Check availability
            </a>
            <a
              href="#"
              className="h2-pill inline-flex items-center px-5 py-2.5 rounded-full transition-colors"
              style={{
                background: "transparent",
                color: "var(--lef-cream)",
                border: "1px solid color-mix(in srgb, var(--lef-cream) 35%, transparent)",
                fontFamily: "var(--font-geist)",
                fontSize: "0.875rem",
              }}
            >
              Tour the cabin
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
