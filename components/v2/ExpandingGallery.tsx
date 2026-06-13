"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Expanding image gallery — six cabin photos in a row. Hovering one expands
 * it to fill the available width; others shrink. Smooth 500ms transition.
 *
 * Adapted from a 21st.dev-style component into the Squirrels' Nest palette
 * (cream + plum-red), serif heading + sans body, and project-local cabin
 * photos. Slots into the page below InspiredBy / above the Reservation card.
 */

const photos = [
  { src: "/images/squirrels-nest/sq-08.jpg", caption: "the courtyard" },
  { src: "/images/squirrels-nest/sq-15.jpg", caption: "the chair" },
  { src: "/images/squirrels-nest/sq-18.jpg", caption: "the living space" },
  { src: "/images/squirrels-nest/sq-22.jpg", caption: "the brass tap" },
  { src: "/images/squirrels-nest/sq-25.jpg", caption: "a detail" },
  { src: "/images/squirrels-nest/sq-12.jpg", caption: "the bedroom" },
  { src: "/images/squirrels-nest/sq-32.jpg", caption: "the pillow" },
  { src: "/images/squirrels-nest/sq-37.jpg", caption: "the kitchen window" },
  { src: "/images/squirrels-nest/sq-30.jpg", caption: "the chandelier" },
  { src: "/images/squirrels-nest/sq-42.jpg", caption: "the lamps" },
];

export function ExpandingGallery() {
  const rootRef = useRef<HTMLDivElement>(null);
  // Which tile is expanded. Hover on pointer devices, tap on touch (tap
  // again to collapse), Enter/Space on keyboard — the old mouseenter-only
  // version was inert on the phones most guests browse on.
  const [active, setActive] = useState<number | null>(null);
  // Touch browsers fire a synthetic mouseenter before click, which would
  // set-then-toggle-off in one tap. Gate each input path on device
  // capability: hover handles hover devices, click handles the rest
  // (keyboard "clicks" arrive with detail === 0 and always toggle).
  const hoverable = useRef(false);
  useEffect(() => {
    hoverable.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".eg-headline", {
        y: 60,
        opacity: 0,
        duration: 1.3,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
      gsap.from(".eg-body", {
        opacity: 0,
        y: 14,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.5,
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
      gsap.from(".eg-tile", {
        opacity: 0,
        y: 30,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".eg-row", start: "top 80%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      style={{ background: "var(--v2-bg)", paddingBlock: "14vh", overflow: "hidden" }}
    >
      {/* Editorial heading + body */}
      <div
        className="mx-auto text-center"
        style={{ maxWidth: "72rem", paddingInline: "clamp(1.5rem, 4vw, 3.5rem)", marginBottom: "4rem" }}
      >
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4.4rem)",
            color: "var(--v2-ink)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            fontWeight: 400,
            margin: 0,
          }}
        >
          <span className="eg-headline block overflow-hidden">
            <span className="block">A closer look,</span>
          </span>
          <span className="eg-headline block overflow-hidden">
            <span
              className="block"
              style={{
                fontStyle: "italic",
                color: "color-mix(in srgb, var(--v2-ink) 72%, transparent)",
              }}
            >
              one room at a time.
            </span>
          </span>
        </h2>
        <p
          className="eg-body mx-auto"
          style={{
            marginTop: "1.5rem",
            maxWidth: "34rem",
            fontFamily: "var(--font-geist)",
            fontSize: "0.95rem",
            color: "var(--v2-ink-soft)",
            letterSpacing: "-0.005em",
            lineHeight: 1.6,
          }}
        >
          Tap or hover any photo to see it in full.
        </p>
      </div>

      {/* The expanding row. On mobile the 10 tiles exceed the viewport, so
          the row scrolls horizontally (the old clipped version hid all but
          the first four photos on a phone). */}
      <div
        className="eg-row mx-auto flex items-stretch"
        style={{
          maxWidth: "84rem",
          paddingInline: "clamp(1rem, 3vw, 3rem)",
          gap: "0.5rem",
          height: "clamp(22rem, 60vh, 32rem)",
        }}
      >
        {photos.map((p, i) => (
          <button
            key={i}
            type="button"
            aria-label={`View photo: ${p.caption}`}
            aria-expanded={active === i}
            data-active={active === i}
            className="eg-tile relative group rounded-md overflow-hidden h-full"
            style={{
              cursor: "pointer",
              border: "none",
              padding: 0,
              background: "transparent",
            }}
            data-cursor="grow"
            onMouseEnter={() => {
              if (hoverable.current) setActive(i);
            }}
            onMouseLeave={() => {
              if (hoverable.current) setActive(null);
            }}
            onClick={(e) => {
              if (e.detail === 0 || !hoverable.current) {
                setActive(active === i ? null : i);
              }
            }}
          >
            <Image
              src={p.src}
              alt={`${p.caption} — Squirrels' Nest, a luxury cabin retreat in Berkshire`}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              loading="lazy"
              className="object-cover object-center"
              style={{ transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)" }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
