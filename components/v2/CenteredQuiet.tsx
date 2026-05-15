"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  eyebrow?: string;
  body: string;
  italicTail?: string;
  /** background colour — defaults to cream */
  bg?: string;
};

/**
 * A small, centred editorial moment on cream.
 * Used between bigger photo moments to give the eye breathing room.
 * Fades up as it enters viewport.
 */
export function CenteredQuiet({
  eyebrow,
  body,
  italicTail,
  bg = "var(--v2-bg)",
}: Props) {
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
      gsap.from(root.querySelectorAll(".cq-line"), {
        opacity: 0,
        y: 24,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex items-center justify-center"
      style={{ background: bg, minHeight: "70vh", padding: "8vh 1.25rem" }}
    >
      <div className="text-center mx-auto" style={{ maxWidth: "44rem" }}>
        {eyebrow && (
          <>
            <div
              className="cq-line mx-auto"
              style={{
                width: "2rem",
                height: "1px",
                background: "var(--v2-mute)",
                marginBottom: "1.25rem",
              }}
            />
            <p
              className="cq-line"
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "0.75rem",
                color: "var(--v2-mute)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: "1.75rem",
              }}
            >
              {eyebrow}
            </p>
          </>
        )}
        <p
          className="cq-line font-display"
          style={{
            fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
            color: "var(--v2-ink)",
            lineHeight: 1.25,
            letterSpacing: "-0.015em",
            fontWeight: 400,
            maxWidth: "32ch",
            margin: "0 auto",
          }}
        >
          {body}
        </p>
        {italicTail && (
          <p
            className="cq-line font-display-italic"
            style={{
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              color: "var(--v2-ink-soft)",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              maxWidth: "36ch",
              margin: "1rem auto 0",
            }}
          >
            {italicTail}
          </p>
        )}
      </div>
    </section>
  );
}
