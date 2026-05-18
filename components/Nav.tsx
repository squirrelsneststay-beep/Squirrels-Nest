"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { LiveTimeBadge } from "@/components/v2/LiveTimeBadge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Site nav. Three states:
 *  - "transparent" — top of page, no background
 *  - "cream"       — has scrolled, sits on cream content
 *  - "dark"        — currently over a section that has `data-section-tone="dark"`,
 *                    the nav fades to almost transparent so it doesn't pollute
 *                    pinned photographic moments.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detect when the nav's top strip overlaps a "dark" section. Driven by
  // scroll/resize plus ScrollTrigger's `refresh` event (fires whenever a
  // pinned timeline re-lays-out). Replaces the previous 4 Hz setInterval
  // poll, which was a continuous forced reflow + battery cost on mobile.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const navHeight = 80;
    const check = () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-section-tone='dark']");
      let touchingDark = false;
      for (const s of Array.from(sections)) {
        const r = s.getBoundingClientRect();
        if (r.top < navHeight && r.bottom > 0) {
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

  const mode = overDark ? "dark" : scrolled ? "cream" : "transparent";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        mode === "cream" ? "py-3" : "py-5"
      )}
      style={{
        background:
          mode === "cream"
            ? "color-mix(in srgb, var(--v2-bg) 85%, transparent)"
            : "transparent",
        backdropFilter: mode === "cream" ? "blur(8px)" : "none",
        WebkitBackdropFilter: mode === "cream" ? "blur(8px)" : "none",
        opacity: mode === "dark" ? 0 : 1,
        pointerEvents: mode === "dark" ? "none" : "auto",
        transition: "opacity 300ms ease, background 300ms ease, padding 300ms ease",
      }}
    >
      <div className="lef-container flex items-center justify-between">
        <Link
          href="/"
          className="font-display"
          style={{
            color: "var(--v2-ink)",
            fontSize: "1.15rem",
            letterSpacing: "-0.02em",
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          squirrels&apos; nest
        </Link>

        <div className="hidden md:block">
          <LiveTimeBadge />
        </div>

        <nav
          className="flex items-center gap-8"
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.875rem",
            color: "var(--v2-ink)",
            letterSpacing: "-0.005em",
          }}
        >
          <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
          <Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link>
          {/* Book CTA lives in <FloatingBookButton> (mounted in layout.tsx)
              so it remains visible even when this nav is hidden over dark
              pinned sections. */}
        </nav>
      </div>
    </header>
  );
}
