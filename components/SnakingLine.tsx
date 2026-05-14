"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed-position SVG that snakes vertically down the right side of the viewport.
 * Draws itself as the user scrolls the page.
 * Always visible (position: fixed) — the content scrolls past it.
 */
export function SnakingLine() {
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

  // S-curve down the right side of the viewport, with 4 bends
  const d =
    "M 80 0 " +
    "C 80 80, 20 130, 20 200 " +
    "C 20 270, 80 320, 80 400 " +
    "C 80 480, 30 520, 30 600 " +
    "C 30 680, 80 720, 80 800 " +
    "C 80 880, 20 920, 20 1000";

  return (
    <div
      aria-hidden
      className="fixed inset-y-0 right-0 pointer-events-none"
      style={{
        zIndex: 4,
        width: "120px",
        height: "100vh",
        mixBlendMode: "difference",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <defs>
          <filter id="snake-jitter-v" x="-20%" y="-2%" width="140%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="6" />
          </filter>
        </defs>
        <path
          ref={pathRef}
          d={d}
          stroke="color-mix(in srgb, #e6dfcb 80%, transparent)"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="6 10"
          filter="url(#snake-jitter-v)"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
