"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Full-bleed photographic hero — single image fills the viewport with
 * rounded corners and inset margin. Headline overlays bottom-left in white
 * serif. Small floating thumbnail bottom-right with caption.
 *
 * Pattern reference: editorial agency sites with image-forward heroes.
 */
export function HeroFullBleed() {
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
      // Entrance
      gsap.from(".hfb-img", { scale: 1.06, opacity: 0, duration: 2, ease: "power3.out" });
      gsap.from(".hfb-line", { y: 80, opacity: 0, duration: 1.4, ease: "power4.out", stagger: 0.12, delay: 0.2 });
      gsap.from(".hfb-eyebrow, .hfb-thumb, .hfb-pill", { opacity: 0, y: 14, duration: 1, ease: "power3.out", stagger: 0.08, delay: 0.8 });

      // Continuous scroll-driven scale on image
      gsap.to(".hfb-img", {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative" style={{ background: "var(--v2-bg)" }}>
      <div
        className="relative mx-auto"
        style={{
          padding: "clamp(0.5rem, 1.2vw, 1rem)",
          paddingTop: "5rem",
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "6px",
            aspectRatio: "16 / 10",
            minHeight: "72vh",
            maxHeight: "88vh",
          }}
        >
          {/* Background image */}
          <div className="hfb-img absolute inset-0" style={{ willChange: "transform" }}>
            <img
              src="/images/squirrels-nest/sq-01.jpg"
              alt="Lane End Farm — the garden path"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Bottom-up gradient for headline legibility */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 28%, transparent 60%)",
            }}
          />

          {/* Bottom-left only — minimal: tiny headline + 2 small CTAs */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-14">
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 3.5rem)",
                color: "#fff",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                fontWeight: 400,
                maxWidth: "14ch",
              }}
            >
              <span className="block overflow-hidden"><span className="hfb-line block">A slow stay</span></span>
              <span className="block overflow-hidden"><span className="hfb-line block font-display-italic">where the lane runs out.</span></span>
            </h1>

            <div className="hfb-pill mt-6 flex flex-wrap gap-2">
              <a
                href="#"
                className="lef-pill-sm"
                style={{ background: "#fff", color: "#1a1a1a" }}
              >
                Check availability
              </a>
              <a
                href="#tour"
                className="lef-pill-sm"
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid color-mix(in srgb, white 40%, transparent)",
                }}
              >
                Tour the cabin
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
