"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * CircledWord — wraps a word and draws a rough, hand-drawn circle around it in
 * real time (stroke-dashoffset) when it scrolls into view. Reduced-motion shows
 * the circle already drawn.
 */
export function CircledWord({
  children,
  color = "#103d2e",
  strokeWidth = 3,
}: {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    const path = el.querySelector<SVGPathElement>("path");
    if (!path) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      path.style.strokeDashoffset = "0";
      return;
    }
    path.style.strokeDashoffset = `${len}`;
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.0,
      ease: "power2.inOut",
      scrollTrigger: { trigger: el, start: "top 78%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <span ref={ref} style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
      {children}
      <svg
        viewBox="0 0 200 90"
        preserveAspectRatio="none"
        aria-hidden
        style={{
          position: "absolute",
          left: "-7%",
          top: "-22%",
          width: "114%",
          height: "150%",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        {/* one loose, hand-drawn loop that slightly overshoots itself */}
        <path
          d="M 44 74 C 8 66, 6 26, 64 16 C 132 4, 198 16, 190 46 C 184 70, 116 82, 52 76 C 30 73, 18 66, 40 60"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
