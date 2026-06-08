"use client";

import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

/**
 * Persistent "Book now" CTA — a SOLID yellow pill, fixed top-right on every
 * page. Always the same solid treatment (no transparent/outline variant), so
 * it reads as one consistent, high-contrast call to action everywhere. Sits
 * above the nav so it stays visible even where the nav fades over dark
 * pinned sections.
 */
export function FloatingBookButton() {
  return (
    <a
      href={AIRBNB_URL}
      {...EXTERNAL_LINK_PROPS}
      aria-label="Book on Airbnb"
      data-magnetic
      className="sv-pill fbb-pulse"
      style={{
        position: "fixed",
        top: "1.25rem",
        right: "clamp(1rem, 2.5vw, 2.5rem)",
        zIndex: 60,
        height: "52px",
        padding: "0 1.8rem",
        fontSize: "0.95rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        background: "var(--v2-accent)",
        color: "#08351c",
        borderColor: "var(--v2-accent)",
        transition: "transform var(--dur-press) var(--ease-out)",
      }}
    >
      <span>Book</span>
      <span className="sv-pill-rule" aria-hidden style={{ width: "1.75rem" }} />
      <span>now</span>
    </a>
  );
}
