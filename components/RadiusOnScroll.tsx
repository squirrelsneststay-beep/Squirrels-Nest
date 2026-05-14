"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: React.ReactNode;
  /** border-radius at the start of the scroll range (px) */
  startRadius?: number;
  /** border-radius at the end of the scroll range (px) */
  endRadius?: number;
  /** inline padding at the start of the scroll range (px) — pulls element inward from viewport edges */
  startPadding?: number;
  /** inline padding at the end of the scroll range (px) */
  endPadding?: number;
  /** ScrollTrigger start position — see GSAP ScrollTrigger docs. Default "top bottom" */
  start?: string;
  /** ScrollTrigger end position. Default "bottom top" */
  end?: string;
  /** scrub value for smoothness — higher = floatier. Default 1.2 */
  scrub?: number | boolean;
  className?: string;
};

/**
 * Wrap any element. Its border-radius (and optional horizontal padding)
 * interpolates between two values as the element scrolls through the viewport.
 *
 * Technique reference: animating border-radius via scroll progress.
 * This implementation uses GSAP ScrollTrigger (already in the project).
 */
export function RadiusOnScroll({
  children,
  startRadius = 0,
  endRadius = 32,
  startPadding,
  endPadding,
  start = "top bottom",
  end = "bottom top",
  scrub = 1.2,
  className,
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      inner.style.borderRadius = `${endRadius}px`;
      if (endPadding !== undefined) {
        outer.style.paddingLeft = `${endPadding}px`;
        outer.style.paddingRight = `${endPadding}px`;
      }
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { borderRadius: `${startRadius}px` },
        {
          borderRadius: `${endRadius}px`,
          ease: "none",
          scrollTrigger: {
            trigger: outer,
            start,
            end,
            scrub,
          },
        }
      );

      if (startPadding !== undefined && endPadding !== undefined) {
        gsap.fromTo(
          outer,
          { paddingLeft: `${startPadding}px`, paddingRight: `${startPadding}px` },
          {
            paddingLeft: `${endPadding}px`,
            paddingRight: `${endPadding}px`,
            ease: "none",
            scrollTrigger: {
              trigger: outer,
              start,
              end,
              scrub,
            },
          }
        );
      }
    }, outerRef);

    return () => ctx.revert();
  }, [startRadius, endRadius, startPadding, endPadding, start, end, scrub]);

  return (
    <div
      ref={outerRef}
      className={className}
      style={{
        paddingLeft: startPadding !== undefined ? `${startPadding}px` : undefined,
        paddingRight: startPadding !== undefined ? `${startPadding}px` : undefined,
      }}
    >
      <div
        ref={innerRef}
        style={{
          overflow: "hidden",
          borderRadius: `${startRadius}px`,
          willChange: "border-radius",
        }}
      >
        {children}
      </div>
    </div>
  );
}
