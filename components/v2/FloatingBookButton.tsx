"use client";

import { useEffect, useState } from "react";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

/**
 * Persistent "Book Now" CTA, always visible top-right of the viewport.
 *
 * BLENDS with the section beneath it: when scrolled over a section marked
 * `data-section-tone="dark"`, the pill flips to a CREAM fill on transparent
 * border so it stays legible on dark photographic backgrounds. Over light
 * sections, the pill is plum-fill on cream — same affordance, inverted.
 *
 * Decoupled from the Nav (which fades to opacity 0 over dark sections so
 * it doesn't pollute pinned photographic moments). This button is the
 * exception: it stays visible everywhere because conversion matters.
 */
export function FloatingBookButton() {
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Match where the button visually lives (~ top: 1.25rem + height ≈ 80px)
    const probeY = 80;
    const check = () => {
      const sections = document.querySelectorAll<HTMLElement>(
        "[data-section-tone='dark']"
      );
      let touchingDark = false;
      for (const s of Array.from(sections)) {
        const r = s.getBoundingClientRect();
        if (r.top < probeY && r.bottom > 0) {
          touchingDark = true;
          break;
        }
      }
      setOverDark(touchingDark);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    // Pinned GSAP sections re-layout — re-check periodically so the colour
    // stays in sync even when the user is mid-pin and the visible section
    // changes without a scroll event.
    const id = window.setInterval(check, 250);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.clearInterval(id);
    };
  }, []);

  // Two visual modes — one for each underlying tone.
  // Both rely on the same `.sv-pill` class for shape + transitions.
  const darkMode = {
    background: "transparent",
    color: "var(--v2-bg)",
    borderColor: "rgba(255, 249, 235, 0.55)",
  };
  const lightMode = {
    background: "var(--v2-ink)",
    color: "var(--v2-bg)",
    borderColor: "var(--v2-ink)",
  };

  return (
    <a
      href={AIRBNB_URL}
      {...EXTERNAL_LINK_PROPS}
      className="sv-pill fbb-pulse"
      style={{
        position: "fixed",
        top: "1.25rem",
        right: "clamp(1rem, 2.5vw, 2.5rem)",
        zIndex: 60,
        // LOUDER: bigger height + bolder type + tighter letter-spacing
        // so it reads as a real CTA, not a decorative pill.
        height: "52px",
        padding: "0 1.8rem",
        fontSize: "0.95rem",
        fontWeight: 500,
        letterSpacing: "0.02em",
        transition:
          "background-color 320ms var(--ease-out)," +
          " color 320ms var(--ease-out)," +
          " border-color 320ms var(--ease-out)," +
          " transform var(--dur-press) var(--ease-out)",
        ...(overDark ? darkMode : lightMode),
      }}
    >
      <span>Book</span>
      <span className="sv-pill-rule" aria-hidden style={{ width: "1.75rem" }} />
      <span>now</span>
      <style jsx>{`
        /* Subtle attention pulse — 3% scale + opacity nudge every 3.6s.
           Easy to spot, not distracting. */
        @keyframes fbb-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.035); }
        }
        .fbb-pulse { animation: fbb-pulse 3.6s ease-in-out infinite; }
        .fbb-pulse:hover, .fbb-pulse:active { animation: none; }
        @media (prefers-reduced-motion: reduce) {
          .fbb-pulse { animation: none; }
        }
      `}</style>
    </a>
  );
}
