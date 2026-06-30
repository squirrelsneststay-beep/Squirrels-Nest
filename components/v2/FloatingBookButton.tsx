"use client";

import { useEffect, useState } from "react";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

/**
 * Persistent "Book now" CTA — a see-through outline pill, in the Playfair
 * display face to match the nav. Fixed top-right (desktop) / bottom-right
 * (mobile). Adapts light over dark surfaces, ink over cream. Fills solid
 * (cognac) on hover, and slides away on scroll-down / returns on scroll-up,
 * in step with the nav.
 */
export function FloatingBookButton() {
  const [shown, setShown] = useState(false);
  const [light, setLight] = useState(true);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const update = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const heroPresent = !!document.querySelector("[data-hero]");
      const vh = window.innerHeight;
      const y = window.scrollY;
      setShown(!isMobile || !heroPresent || y > vh * 0.6);

      // Scroll-direction: hide on the way down, show on the way up.
      if (y < 90) setHiddenByScroll(false);
      else if (y > lastY + 5) setHiddenByScroll(true);
      else if (y < lastY - 5) setHiddenByScroll(false);
      lastY = y;

      // Light when the pill sits over the hero or a dark-toned section.
      let overDark = heroPresent && y < vh - 90;
      if (!overDark) {
        for (const s of document.querySelectorAll<HTMLElement>("[data-section-tone='dark']:not([data-hero])")) {
          const r = s.getBoundingClientRect();
          const probe = isMobile ? vh - 60 : 48;
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
  const visible = shown && !hiddenByScroll;

  return (
    <a
      href={AIRBNB_URL}
      {...EXTERNAL_LINK_PROPS}
      aria-label="Book on Airbnb"
      data-magnetic
      className="fbb-pos fbb-cta"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: "50px",
        padding: "0 1.7rem",
        borderRadius: "9999px",
        fontFamily: "var(--font-italiana)",
        fontSize: "1.18rem",
        fontWeight: 400,
        letterSpacing: "-0.005em",
        textDecoration: "none",
        background: light ? "rgba(0,0,0,0.10)" : "transparent",
        backdropFilter: light ? "blur(6px)" : "none",
        WebkitBackdropFilter: light ? "blur(6px)" : "none",
        color: tone,
        border: `1px solid ${tone}`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: hiddenByScroll ? "translateY(-12px)" : "translateY(0)",
        transition:
          "color 300ms ease, border-color 300ms ease, background 200ms ease, opacity 350ms ease, transform 350ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      Book now
    </a>
  );
}
