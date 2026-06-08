"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AIRBNB_URL, INSTAGRAM_URL, EXTERNAL_LINK_PROPS, BRAND, emailComposeUrl } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Footer — colossal lowercase wordmark filling the bottom of the page
 * + Zoe's animated SVG signature drawing itself in on scroll + minimal
 * three-column meta + copyright row.
 *
 * Bellevoire-scale closer. The wordmark touches the bottom edge.
 */
export function BigFooter() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Letter rise on big wordmark
      gsap.from(".bf-letter", {
        yPercent: 110,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.035,
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
      gsap.from(".bf-link, .bf-meta", {
        y: 14,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const mark = "squirrels' nest";

  return (
    <footer
      ref={rootRef}
      data-section-tone="dark"
      className="relative"
      style={{
        background: "var(--v2-ink)",
        color: "var(--v2-bg)",
        paddingTop: "8rem",
        overflow: "hidden",
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "108rem", paddingInline: "clamp(1.5rem, 3vw, 3.5rem)" }}
      >
        {/* Top meta row */}
        <div className="bf-meta flex items-end justify-between flex-wrap gap-y-8" style={{ marginBottom: "5rem" }}>
          <div>
            <p
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontStyle: "italic",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                margin: 0,
                maxWidth: "26ch",
              }}
            >
              Stay a while<span style={{ color: "var(--v2-accent)" }}>.</span>
            </p>
            <p
              style={{
                marginTop: "1rem",
                maxWidth: "26rem",
                fontFamily: "var(--font-geist)",
                fontSize: "0.95rem",
                opacity: 0.7,
                lineHeight: 1.55,
              }}
            >
              A two-bedroom boutique retreat in the Berkshire countryside, sleeping
              four. Woodland views, a private courtyard, and a shepherd&apos;s hut
              across the garden.
            </p>
            <a
              href={emailComposeUrl()}
              {...EXTERNAL_LINK_PROPS}
              className="bf-link inline-block"
              style={{
                marginTop: "1.5rem",
                fontFamily: "var(--font-geist)",
                fontSize: "0.85rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                textDecoration: "underline",
                textUnderlineOffset: "0.45em",
                textDecorationThickness: "1px",
              }}
            >
              {BRAND.email}
            </a>
          </div>

          <div className="flex flex-wrap gap-12">
            <div>
              <p className="bf-meta" style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.55, marginBottom: "1rem", fontFamily: "var(--font-geist)" }}>
                Find
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: "var(--font-geist)", fontSize: "1rem" }}>
                <li className="bf-link" style={{ paddingBlock: "0.35rem" }}><a href="/" className="hover:opacity-70 transition-opacity">Home</a></li>
                <li className="bf-link" style={{ paddingBlock: "0.35rem" }}><a href="/contact" className="hover:opacity-70 transition-opacity">Contact</a></li>
                <li className="bf-link" style={{ paddingBlock: "0.35rem" }}><a href={AIRBNB_URL} {...EXTERNAL_LINK_PROPS} className="hover:opacity-70 transition-opacity">Book on Airbnb</a></li>
                {INSTAGRAM_URL && (
                  <li className="bf-link" style={{ paddingBlock: "0.35rem" }}><a href={INSTAGRAM_URL} {...EXTERNAL_LINK_PROPS} className="hover:opacity-70 transition-opacity">Instagram</a></li>
                )}
              </ul>
            </div>
            <div>
              <p className="bf-meta" style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.55, marginBottom: "1rem", fontFamily: "var(--font-geist)" }}>
                Practical
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: "var(--font-geist)", fontSize: "1rem" }}>
                <li className="bf-link" style={{ paddingBlock: "0.35rem" }}>Sleeps four · two bedrooms</li>
                <li className="bf-link" style={{ paddingBlock: "0.35rem" }}>Three beds: one super king, two singles</li>
                <li className="bf-link" style={{ paddingBlock: "0.35rem" }}>Open-plan, fully equipped kitchen</li>
                <li className="bf-link" style={{ paddingBlock: "0.35rem" }}>Large walk-in shower room</li>
                <li className="bf-link" style={{ paddingBlock: "0.35rem" }}>Private enclosed courtyard</li>
                <li className="bf-link" style={{ paddingBlock: "0.35rem" }}>WiFi, TV &amp; central heating</li>
                <li className="bf-link" style={{ paddingBlock: "0.35rem" }}>Private parking</li>
                <li className="bf-link" style={{ paddingBlock: "0.35rem" }}>Woodland views, in Berkshire</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* COLOSSAL wordmark — touches the very bottom of the page */}
      <div
        style={{
          width: "100%",
          padding: "0 clamp(0.5rem, 1.2vw, 1.2rem)",
          paddingBottom: "0",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <h2
          className="font-display"
          aria-hidden
          style={{
            fontSize: "clamp(5rem, 22vw, 26rem)",
            lineHeight: 0.78,
            letterSpacing: "-0.05em",
            fontWeight: 400,
            margin: 0,
            color: "var(--v2-bg)",
            opacity: 0.96,
            whiteSpace: "nowrap",
          }}
        >
          {Array.from(mark).map((ch, i) => (
            <span key={i} className="bf-letter" style={{ display: "inline-block" }}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </h2>
      </div>

      {/* tiny bottom rule + copyright */}
      <div
        className="bf-meta"
        style={{
          borderTop: "1px solid color-mix(in srgb, var(--v2-bg) 18%, transparent)",
          paddingBlock: "1.25rem",
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-geist)",
          fontSize: "0.7rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          opacity: 0.55,
          paddingInline: "clamp(1.5rem, 3vw, 3.5rem)",
        }}
      >
        <span>© 2026 {BRAND.name}</span>
        <span>Built slowly, in the countryside</span>
      </div>
    </footer>
  );
}
