"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Bellevoire-style centered massive serif quote paragraph.
 *
 *   "Your comfort and pace shape every detail of your stay.
 *    Whether you're eager to walk for miles, or to do nothing
 *    at all."                                                  ← big serif
 *
 *   VIEW THE COTTAGE                                            ← underlined
 *
 * Words reveal line-by-line on scroll, then the link fades in last.
 */
export function QuoteParagraph() {
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
      gsap.from(".qp-line", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.14,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
      gsap.from(".qp-link", {
        opacity: 0,
        y: 8,
        duration: 1,
        ease: "power3.out",
        delay: 1.0,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      style={{ background: "var(--v2-bg)", paddingBlock: "20vh", overflow: "hidden" }}
    >
      <div
        className="mx-auto text-center"
        style={{ maxWidth: "72rem", paddingInline: "clamp(1.5rem, 5vw, 4rem)" }}
      >
        <p
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 4.25rem)",
            color: "var(--v2-ink)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            fontWeight: 300,
            margin: 0,
          }}
        >
          <span className="qp-line block overflow-hidden">
            <span className="block">Your comfort and pace shape</span>
          </span>
          <span className="qp-line block overflow-hidden">
            <span className="block">every detail of your stay.</span>
          </span>
          <span className="qp-line block overflow-hidden">
            <span
              className="block"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "color-mix(in srgb, var(--v2-ink) 75%, transparent)",
              }}
            >
              Walk for miles. Do nothing at all.
            </span>
          </span>
        </p>

        <a
          href="#book"
          className="qp-link inline-block"
          style={{
            marginTop: "3rem",
            fontFamily: "var(--font-geist)",
            fontSize: "0.85rem",
            color: "var(--v2-ink)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "underline",
            textUnderlineOffset: "0.4em",
            textDecorationThickness: "1px",
          }}
        >
          View the cottage
        </a>
      </div>
    </section>
  );
}
