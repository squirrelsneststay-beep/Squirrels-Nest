"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Persistent "Book Now" CTA, top-right of the viewport on every page.
 *
 * Blends with the section beneath it: when the button sits over a section
 * marked `data-section-tone="dark"`, it flips to a CREAM-on-transparent
 * variant so it stays legible on dark photographic backgrounds. Over light
 * sections, it's plum-on-cream.
 *
 * Decoupled from <Nav>, which fades to opacity 0 over pinned dark moments;
 * this button stays visible everywhere because conversion matters more than
 * compositional purity.
 *
 * Tone-detection is driven by scroll + resize + ScrollTrigger's "refresh"
 * event (which fires whenever a pinned timeline re-lays-out). No setInterval
 * poll — that was a 4 Hz forced reflow on mobile and a battery cost.
 */
export function FloatingBookButton() {
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

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
    ScrollTrigger.addEventListener("refresh", check);
    ScrollTrigger.addEventListener("refreshInit", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      ScrollTrigger.removeEventListener("refresh", check);
      ScrollTrigger.removeEventListener("refreshInit", check);
    };
  }, []);

  // Over dark (near-black) sections: gold outline on transparent.
  const darkMode = {
    background: "transparent",
    color: "var(--v2-accent)",
    borderColor: "var(--v2-accent)",
  };
  // Over white sections: solid gold pill with near-black text.
  const lightMode = {
    background: "var(--v2-accent)",
    color: "#0e0e0e",
    borderColor: "var(--v2-accent)",
  };

  return (
    <a
      href={AIRBNB_URL}
      {...EXTERNAL_LINK_PROPS}
      aria-label="Book on Airbnb"
      className="sv-pill fbb-pulse"
      style={{
        position: "fixed",
        top: "1.25rem",
        right: "clamp(1rem, 2.5vw, 2.5rem)",
        zIndex: 60,
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
    </a>
  );
}
