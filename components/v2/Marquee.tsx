"use client";

import { useEffect, useRef } from "react";

/**
 * Endless horizontal marquee — runs forever using a duplicated track and
 * CSS keyframes. Big serif type, slow speed. Sits between sections as a
 * tonal break and adds constant kinetic energy to the page.
 */

const ITEMS = [
  "Available May—Aug",
  "Sleeps four",
  "Two bedrooms",
  "Wood-fired stove",
  "Pet friendly",
  "No Wi-Fi by design",
  "On a working farm",
  "Hand-finished by Zoe",
];

const STAR = "✦";

export function Marquee({ tone = "light" }: { tone?: "light" | "dark" }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const track = trackRef.current;
    if (!track) return;
    // Animation runs purely via CSS — nothing to set up.
  }, []);

  const isLight = tone === "light";

  return (
    <section
      aria-hidden
      style={{
        background: isLight ? "var(--v2-bg)" : "var(--v2-ink)",
        color: isLight ? "var(--v2-ink)" : "var(--v2-bg)",
        overflow: "hidden",
        borderTop: isLight ? "1px solid var(--v2-line)" : "none",
        borderBottom: isLight ? "1px solid var(--v2-line)" : "none",
        paddingBlock: "1.75rem",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "3rem",
          width: "max-content",
          animation: "marquee-scroll 38s linear infinite",
          fontFamily: "var(--font-italiana)",
          fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
        }}
      >
        {/* Duplicate the items twice for seamless loop */}
        {[0, 1].map((set) => (
          <div key={set} style={{ display: "flex", gap: "3rem" }}>
            {ITEMS.map((it, i) => (
              <span key={`${set}-${i}`} style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
                <span>{it}</span>
                <span style={{ opacity: 0.4, fontSize: "0.7em" }}>{STAR}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
