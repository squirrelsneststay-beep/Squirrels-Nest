"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { LiveTimeBadge } from "@/components/v2/LiveTimeBadge";
import { ThemeToggle } from "@/components/v2/ThemeToggle";

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
  const [inHero, setInHero] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Only the home page has the fixed hero. On pages WITHOUT one
      // (/contact, /privacy, …) the nav must show normally — otherwise it would
      // be hidden at the top of every page. Gate the "in hero" state on the
      // hero actually being present.
      const heroPresent = !!document.querySelector("[data-hero]");
      setInHero(heroPresent && window.scrollY < window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Detect when the nav's top strip overlaps a "dark" section. Driven by
  // scroll/resize plus ScrollTrigger's `refresh` event (fires whenever a
  // pinned timeline re-lays-out). Replaces the previous 4 Hz setInterval
  // poll, which was a continuous forced reflow + battery cost on mobile.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const navHeight = 80;
    const check = () => {
      // Exclude the pinned hero ([data-hero]) — it is fixed at the top forever,
      // so it must not count as "a dark section under the nav".
      const sections = document.querySelectorAll<HTMLElement>(
        "[data-section-tone='dark']:not([data-hero])"
      );
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
  }, [pathname]);

  // Hidden over the hero (inHero) and over lower dark sections (overDark).
  const hidden = inHero || overDark;
  const mode = hidden ? "dark" : scrolled ? "cream" : "transparent";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 py-4"
      style={{
        background:
          mode === "cream"
            ? "color-mix(in srgb, var(--v2-bg) 85%, transparent)"
            : "transparent",
        backdropFilter: mode === "cream" ? "blur(8px)" : "none",
        WebkitBackdropFilter: mode === "cream" ? "blur(8px)" : "none",
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        transition: "opacity 300ms ease, background 300ms ease",
      }}
    >
      <div className="lef-container flex items-center justify-between">
        {/* LEFT CLUSTER — logo (the landing spot for the flying hero wordmark),
            then the page links. The logo starts invisible; MorphingWordmark
            fades it in as the hero wordmark finishes flying up to it. */}
        <nav
          className="flex items-center gap-7"
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.875rem",
            color: "var(--v2-ink)",
            letterSpacing: "-0.005em",
          }}
        >
          <Link
            href="/"
            id="nav-logo"
            aria-label="Squirrels' Nest — home"
            className="font-display"
            style={{
              color: "var(--v2-ink)",
              fontSize: "1.15rem",
              letterSpacing: "-0.02em",
              fontWeight: 500,
              opacity: 0,
              marginRight: "0.5rem",
            }}
          >
            Squirrels&apos; Nest
          </Link>
          <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
          <Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link>
          <ThemeToggle />
        </nav>

        <div className="hidden md:block">
          <LiveTimeBadge />
        </div>

        {/* RIGHT — intentionally empty. The Book CTA is <FloatingBookButton>
            (mounted in layout.tsx), fixed top-right, so it stays visible even
            when this nav fades out over dark pinned sections. */}
        <span aria-hidden style={{ width: "1px" }} />
      </div>
    </header>
  );
}
