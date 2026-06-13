"use client";

import { useEffect, useState } from "react";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

/**
 * Persistent "Book now" CTA — a SOLID yellow pill, fixed on every page.
 * Desktop: top-right, above the nav, so it stays visible even where the nav
 * fades over dark pinned sections. Mobile (<768px): docked bottom-right —
 * top-right covered the Home/Contact nav links and the morphing wordmark,
 * and sat outside one-handed thumb reach. Positioning lives in the
 * `.fbb-pos` class (globals.css) because inline styles can't carry the
 * breakpoint.
 */
export function FloatingBookButton() {
  // Mobile only: stay hidden over the hero, where the bottom-docked pill
  // would sit on top of the giant wordmark — the first thing a visitor
  // sees. Fades in as soon as they scroll. Desktop is always visible.
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const update = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const heroPresent = !!document.querySelector("[data-hero]");
      setShown(
        !isMobile || !heroPresent || window.scrollY > window.innerHeight * 0.6
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <a
      href={AIRBNB_URL}
      {...EXTERNAL_LINK_PROPS}
      aria-label="Book on Airbnb"
      data-magnetic
      className="sv-pill fbb-pulse fbb-pos"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      style={{
        height: "52px",
        padding: "0 1.8rem",
        fontSize: "0.95rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        background: "var(--v2-accent)",
        color: "#08351c",
        borderColor: "var(--v2-accent)",
        opacity: shown ? 1 : 0,
        pointerEvents: shown ? "auto" : "none",
        transition:
          "transform var(--dur-press) var(--ease-out), opacity 300ms ease",
      }}
    >
      <span>Book</span>
      <span className="sv-pill-rule" aria-hidden style={{ width: "1.75rem" }} />
      <span>now</span>
    </a>
  );
}
