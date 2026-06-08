"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hand-drawn annotation kit — underlines, circles and arrows that draw
 * themselves in real time (stroke-dashoffset) when scrolled into view.
 * Reduced-motion shows them already drawn.
 */
function useDraw<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    const paths = el.querySelectorAll<SVGPathElement>("path");
    if (!paths.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tweens: gsap.core.Tween[] = [];
    paths.forEach((path, i) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      if (reduced) {
        path.style.strokeDashoffset = "0";
        return;
      }
      path.style.strokeDashoffset = `${len}`;
      tweens.push(
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: "power2.inOut",
          delay: i * 0.14,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        })
      );
    });
    return () => tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
  }, []);
  return ref;
}

/** A loose hand-drawn underline beneath a word. */
export function HandUnderline({
  children,
  color = "var(--v2-accent)",
  strokeWidth = 4,
}: {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
}) {
  const ref = useDraw<HTMLSpanElement>();
  return (
    <span ref={ref} style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
      {children}
      <svg
        viewBox="0 0 200 16"
        preserveAspectRatio="none"
        aria-hidden
        style={{ position: "absolute", left: 0, bottom: "-0.24em", width: "100%", height: "0.5em", overflow: "visible", pointerEvents: "none" }}
      >
        <path
          d="M 3 9 C 38 3, 92 15, 138 8 C 168 4, 184 11, 197 6"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** A rough circle looped around a word. */
export function CircledWord({
  children,
  color = "#08351c",
  strokeWidth = 3,
}: {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
}) {
  const ref = useDraw<HTMLSpanElement>();
  return (
    <span ref={ref} style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
      {children}
      <svg
        viewBox="0 0 200 90"
        preserveAspectRatio="none"
        aria-hidden
        style={{ position: "absolute", left: "-7%", top: "-22%", width: "114%", height: "150%", overflow: "visible", pointerEvents: "none" }}
      >
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

/** A standalone curved hand-drawn arrow that draws in. Drop it next to a thing. */
export function HandArrow({
  color = "var(--v2-accent)",
  strokeWidth = 3,
  size = 84,
  flip = false,
  rotate = 0,
  style,
}: {
  color?: string;
  strokeWidth?: number;
  size?: number;
  flip?: boolean;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  const ref = useDraw<HTMLSpanElement>();
  return (
    <span ref={ref} aria-hidden style={{ display: "inline-block", lineHeight: 0, ...style }}>
      <svg
        width={size}
        height={size * 0.78}
        viewBox="0 0 90 70"
        style={{ overflow: "visible", transform: `${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg)` }}
      >
        <path d="M 8 8 C 42 4, 72 16, 76 50" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M 60 42 L 77 55 L 86 37" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
