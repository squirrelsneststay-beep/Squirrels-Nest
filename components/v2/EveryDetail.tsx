"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * EveryDetail — pinned section. Centered split-line serif title up top,
 * then a pinned body: a large photograph on the left, a vertical list of
 * "moments" on the right. As the user scrolls through the pin, the active
 * item brightens, the others fade back, and the photo crossfades to match.
 *
 * The list reads like a quiet inventory of small pleasures at the cabin.
 */

type Moment = {
  label: string;
  photo: string;
};

const MOMENTS: Moment[] = [
  { label: "Coffee on the porch", photo: "/images/squirrels-nest/sq-08.jpg" },
  { label: "A long bath",          photo: "/images/squirrels-nest/sq-22.jpg" },
  { label: "The velvet chair",     photo: "/images/squirrels-nest/sq-18.jpg" },
  { label: "Wine at sunset",       photo: "/images/squirrels-nest/sq-42.jpg" },
  { label: "Kitchen at dawn",      photo: "/images/squirrels-nest/sq-35.jpg" },
  { label: "Sleep, soft",          photo: "/images/squirrels-nest/sq-12.jpg" },
];

export function EveryDetail() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.from(".ed-title-line", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });

      if (prefersReducedMotion) return;

      ScrollTrigger.create({
        trigger: ".ed-pin",
        start: "top top",
        end: `+=${MOMENTS.length * 70}%`,
        pin: ".ed-pin",
        scrub: 0.6,
        onUpdate: (self) => {
          const idx = Math.min(
            MOMENTS.length - 1,
            Math.floor(self.progress * MOMENTS.length)
          );
          setActive(idx);
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      style={{ background: "var(--v2-bg)" }}
    >
      <div
        className="mx-auto text-center"
        style={{
          maxWidth: "64rem",
          paddingInline: "clamp(1.5rem, 4vw, 4rem)",
          paddingBlock: "clamp(6rem, 14vh, 12rem)",
        }}
      >
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            color: "var(--v2-ink)",
            fontWeight: 400,
            margin: 0,
          }}
        >
          <span className="ed-title-line block overflow-hidden">
            <span className="block">More than</span>
          </span>
          <span className="ed-title-line block overflow-hidden">
            <span
              className="block"
              style={{
                fontStyle: "italic",
                color: "color-mix(in srgb, var(--v2-ink) 70%, transparent)",
              }}
            >
              a stay.
            </span>
          </span>
        </h2>
        <p
          style={{
            marginTop: "1.5rem",
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)",
            color: "var(--v2-ink-soft)",
            letterSpacing: "-0.015em",
            lineHeight: 1.4,
            maxWidth: "40rem",
            margin: "1.5rem auto 0",
          }}
        >
          Small moments the lodge gives away to anyone who pays attention.
        </p>
      </div>

      <div
        className="ed-pin relative"
        style={{
          minHeight: "100dvh",
          background: "var(--v2-bg)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="mx-auto w-full grid items-center"
          style={{
            maxWidth: "82rem",
            paddingInline: "clamp(1.5rem, 4vw, 4rem)",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
          }}
        >
          <div
            className="relative"
            style={{
              aspectRatio: "4 / 5",
              borderRadius: "3px",
              overflow: "hidden",
              background: "var(--v2-line)",
            }}
          >
            {MOMENTS.map((m, i) => (
              <div
                key={m.photo}
                aria-hidden={i !== active}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === active ? 1 : 0,
                  transition: "opacity 600ms var(--ease-out)",
                }}
              >
                <Image
                  src={m.photo}
                  alt={m.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {MOMENTS.map((m, i) => (
              <li
                key={m.label}
                className="font-display"
                style={{
                  paddingBlock: "clamp(0.9rem, 2.2vh, 1.6rem)",
                  borderBottom: "1px solid var(--v2-line)",
                  fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  color: i === active
                    ? "var(--v2-ink)"
                    : "color-mix(in srgb, var(--v2-ink) 25%, transparent)",
                  transition: "color 450ms var(--ease-out)",
                }}
              >
                {m.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
