"use client";

import { useEffect, useState } from "react";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

/**
 * Persistent "Book" CTA — a see-through (outline) pill, fixed on every page.
 * Desktop: top-right. Mobile (<768px): docked bottom-right, hidden over the
 * hero so it doesn't cover the headline, fading in on scroll.
 *
 * It adapts to what's behind it: cream outline over the dark hero / dark
 * sections, espresso-brown outline over the cream content. A faint blur keeps
 * it legible over photography.
 */
export function FloatingBookButton() {
  const [shown, setShown] = useState(false);
  const [light, setLight] = useState(true); // light outline over dark surfaces

  useEffect(() => {
    const update = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const heroPresent = !!document.querySelector("[data-hero]");
      const vh = window.innerHeight;
      setShown(!isMobile || !heroPresent || window.scrollY > vh * 0.6);

      // Light when the pill sits over the hero or any dark-toned section.
      const y = 48; // pill's vertical centre-ish on desktop
      let overDark = heroPresent && window.scrollY < vh - 90;
      if (!overDark) {
        for (const s of document.querySelectorAll<HTMLElement>("[data-section-tone='dark']:not([data-hero])")) {
          const r = s.getBoundingClientRect();
          // mobile pill is near the bottom; desktop near the top
          const probe = isMobile ? vh - 60 : y;
          if (r.top < probe && r.bottom > probe) { overDark = true; break; }
        }
      }
      setLight(overDark);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const tone = light ? "#f3f0e6" : "var(--v2-ink)";

  return (
    <a
      href={AIRBNB_URL}
      {...EXTERNAL_LINK_PROPS}
      aria-label="Book on Airbnb"
      data-magnetic
      className="fbb-pos"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.9rem",
        height: "50px",
        padding: "0 1.6rem",
        borderRadius: "9999px",
        fontFamily: "var(--font-geist)",
        fontSize: "0.86rem",
        fontWeight: 500,
        letterSpacing: "0.02em",
        textDecoration: "none",
        background: light ? "rgba(0,0,0,0.10)" : "transparent",
        backdropFilter: light ? "blur(6px)" : "none",
        WebkitBackdropFilter: light ? "blur(6px)" : "none",
        color: tone,
        border: `1px solid ${tone}`,
        opacity: shown ? 1 : 0,
        pointerEvents: shown ? "auto" : "none",
        transition:
          "color 300ms ease, border-color 300ms ease, background 300ms ease, opacity 300ms ease, transform var(--dur-press) var(--ease-out)",
      }}
    >
      <span>Book</span>
      <span aria-hidden style={{ width: "1.4rem", height: "1px", background: "currentColor", opacity: 0.5 }} />
      <span>now</span>
    </a>
  );
}
