"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed-position vertical SVG line down the center of the page.
 * Draws itself as the user scrolls the entire document.
 * Slight wave + hand-drawn jitter via feTurbulence.
 */
export function MorphingLine() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = pathRef.current;
    if (!path) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    if (prefersReducedMotion) {
      path.style.strokeDashoffset = "0";
      return;
    }

    let ticking = false;
    const update = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docH > 0 ? Math.min(Math.max(window.scrollY / docH, 0), 1) : 0;
      path.style.strokeDashoffset = `${length * (1 - progress)}`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-y-0 left-1/2 -translate-x-1/2 pointer-events-none"
      style={{ zIndex: 3, width: "80px", height: "100vh" }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <defs>
          <filter id="v2-line-jitter" x="-15%" y="-2%" width="130%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="2" seed="11" />
            <feDisplacementMap in="SourceGraphic" scale="4" />
          </filter>
        </defs>
        <path
          ref={pathRef}
          d="M 50 0 C 50 200, 30 400, 50 600 C 70 800, 50 900, 50 1000"
          stroke="rgba(40,40,40,0.18)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="3 6"
          filter="url(#v2-line-jitter)"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
