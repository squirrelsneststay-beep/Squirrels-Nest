"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3 backdrop-blur-md" : "py-5"
      )}
      style={{
        background: scrolled
          ? "color-mix(in srgb, var(--lef-cream) 85%, transparent)"
          : "transparent",
      }}
    >
      <div className="lef-container flex items-center justify-between">
        <Link
          href="/"
          className="font-display"
          style={{
            color: "var(--lef-forest)",
            fontSize: "1.15rem",
            letterSpacing: "-0.02em",
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          lane end farm
        </Link>

        <nav
          className="flex items-center gap-8"
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.875rem",
            color: "var(--lef-charcoal)",
          }}
        >
          <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
          <Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link>
          <a
            href="#"
            className="hover:opacity-60 transition-opacity"
            style={{ color: "var(--lef-moss)" }}
          >
            Book ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
