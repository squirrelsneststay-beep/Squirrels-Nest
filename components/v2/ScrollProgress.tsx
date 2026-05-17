"use client";

import { useEffect, useRef } from "react";

/**
 * Top-edge hairline that fills left-to-right as you scroll the page.
 * Read-only progress indicator — premium-site signal that costs nothing.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const bar = barRef.current;
    if (!bar) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 100,
        pointerEvents: "none",
        background: "color-mix(in srgb, var(--v2-ink) 8%, transparent)",
      }}
    >
      <div
        ref={barRef}
        style={{
          width: "100%",
          height: "100%",
          background: "var(--v2-ink)",
          transform: "scaleX(0)",
          transformOrigin: "left center",
          willChange: "transform",
        }}
      />
    </div>
  );
}
