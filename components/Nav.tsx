"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Persistent site nav — ALWAYS visible (logo + menu top-left). Over the dark
 * hero and dark pinned sections the text is light (cream); over the cream
 * content it's ink. A faint blurred cream bar fades in once you've scrolled
 * off the hero so the menu stays legible on lighter photography.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(true); // light text (over dark surfaces)
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Light text whenever the nav strip overlaps the hero or any dark section.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const navH = 76;
    const check = () => {
      const heroPresent = !!document.querySelector("[data-hero]");
      const overHero = heroPresent && window.scrollY < window.innerHeight - navH;
      let overDark = overHero;
      if (!overDark) {
        const darks = document.querySelectorAll<HTMLElement>(
          "[data-section-tone='dark']:not([data-hero])"
        );
        for (const s of Array.from(darks)) {
          const r = s.getBoundingClientRect();
          if (r.top < navH && r.bottom > 0) { overDark = true; break; }
        }
      }
      setLight(overDark);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    ScrollTrigger.addEventListener("refresh", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      ScrollTrigger.removeEventListener("refresh", check);
    };
  }, [pathname]);

  const ink = light ? "#f3f0e6" : "var(--v2-ink)";
  const showBar = scrolled && !light;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        paddingBlock: "1.1rem",
        background: showBar
          ? "color-mix(in srgb, var(--v2-bg) 82%, transparent)"
          : "transparent",
        backdropFilter: showBar ? "blur(10px)" : "none",
        WebkitBackdropFilter: showBar ? "blur(10px)" : "none",
        transition: "background 350ms ease, backdrop-filter 350ms ease",
      }}
    >
      <div className="lef-container flex items-center justify-between">
        {/* LEFT — brand + menu, always visible */}
        <nav
          className="flex items-baseline"
          style={{ gap: "clamp(1.1rem, 2.2vw, 2.2rem)" }}
        >
          <Link
            href="/"
            aria-label="Squirrels' Nest — home"
            className="font-display"
            style={{
              color: ink,
              fontSize: "clamp(1.15rem, 1.5vw, 1.45rem)",
              letterSpacing: "-0.01em",
              fontWeight: 400,
              lineHeight: 1,
              textShadow: light ? "0 1px 10px rgba(0,0,0,0.32)" : "none",
              transition: "color 300ms ease",
            }}
          >
            Squirrels&apos; Nest
          </Link>
          <span style={{ display: "flex", gap: "clamp(1.1rem, 2vw, 2rem)" }}>
            <NavLink href="/gallery" ink={ink} light={light}>Gallery</NavLink>
            <NavLink href="/contact" ink={ink} light={light}>Contact</NavLink>
          </span>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  ink,
  light,
  children,
}: {
  href: string;
  ink: string;
  light: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:opacity-60 transition-opacity"
      style={{
        color: ink,
        fontFamily: "var(--font-geist)",
        fontSize: "1.02rem",
        letterSpacing: "0",
        textShadow: light ? "0 1px 8px rgba(0,0,0,0.3)" : "none",
        transition: "color 300ms ease, opacity 200ms ease",
      }}
    >
      {children}
    </Link>
  );
}
