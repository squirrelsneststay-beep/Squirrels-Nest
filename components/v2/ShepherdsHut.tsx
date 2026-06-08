"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ShepherdsHut — a quiet second moment, separate from the lodge rooms.
 *
 * The lodge sleeps two; a separate shepherd's hut across the garden sleeps two
 * more (two single beds), so the whole stay sleeps four. Confirmed facts only
 * — see FACTS.md. Centred, two contained photos of varied size: deliberately a
 * different composition from the InsideTheNest room grid (section variety).
 *
 * ⚠ PLACEHOLDER PHOTOS. There are no real shepherd's-hut photos in the project
 * yet — every `squirrels-nest/sq-XX.jpg` is the lodge. The two images below are
 * lodge stand-ins so the section isn't empty. Drop real hut photos into
 * `public/images/shepherds-hut/` and swap the two constants below. See that
 * folder's README.md.
 */
const HUT_GALLERY = [
  { src: "/images/shepherds-hut/hut-5.jpg", alt: "The red-and-white striped shepherd's hut on the grounds", width: "min(32rem, 88vw)", aspect: "3 / 2" },
  { src: "/images/shepherds-hut/hut-1.jpg", alt: "The hut's painted door and porthole window", width: "min(17rem, 42vw)", aspect: "3 / 4" },
  { src: "/images/shepherds-hut/hut-3.jpg", alt: "Twin beds through the open door", width: "min(16rem, 42vw)", aspect: "3 / 4" },
  { src: "/images/shepherds-hut/hut-7.jpg", alt: "Inside the hut — twin beds with striped linen", width: "min(28rem, 88vw)", aspect: "3 / 2" },
  { src: "/images/shepherds-hut/hut-2.jpg", alt: "The twin beds, made up", width: "min(17rem, 42vw)", aspect: "3 / 4" },
  { src: "/images/shepherds-hut/hut-9.jpg", alt: "A quiet corner of the shepherd's hut", width: "min(18rem, 48vw)", aspect: "1 / 1" },
  { src: "/images/shepherds-hut/hut-6.jpg", alt: "The shepherd's hut on the grounds", width: "min(26rem, 70vw)", aspect: "3 / 2" },
  { src: "/images/shepherds-hut/hut-8.jpg", alt: "A detail of the shepherd's hut", width: "min(16rem, 44vw)", aspect: "3 / 4" },
];

export function ShepherdsHut() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".sh-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".sh-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      style={{
        background: "var(--v2-bg)",
        paddingBlock: "clamp(5rem, 12vh, 10rem)",
      }}
    >
      <div
        className="mx-auto text-center"
        style={{ maxWidth: "62rem", paddingInline: "clamp(1.5rem, 4vw, 3rem)" }}
      >
        <p
          className="sh-reveal"
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.95rem",
            fontWeight: 500,
            letterSpacing: "-0.005em",
            color: "var(--v2-mute)",
            margin: 0,
          }}
        >
          The shepherd&apos;s hut
        </p>

        <h2
          className="sh-reveal font-display"
          style={{
            marginTop: "1.25rem",
            marginInline: "auto",
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
            color: "var(--v2-ink)",
            fontWeight: 400,
            maxWidth: "20ch",
          }}
        >
          And a shepherd&apos;s hut, just across the grounds<span style={{ color: "var(--v2-accent)" }}>.</span>
        </h2>

        <p
          className="sh-reveal"
          style={{
            marginTop: "1.75rem",
            marginInline: "auto",
            maxWidth: "34rem",
            fontFamily: "var(--font-geist)",
            fontSize: "1.0625rem",
            lineHeight: 1.6,
            color: "var(--v2-ink-soft)",
          }}
        >
          The second bedroom is a charming shepherd&apos;s hut across the grounds,
          with two single beds and its own door. Perfect for children, friends or
          family travelling with you — a little space of their own, the same quiet.
        </p>

        <p
          className="sh-reveal font-display"
          style={{
            marginTop: "1.5rem",
            fontStyle: "italic",
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.35rem",
            color: "var(--v2-mute)",
            letterSpacing: "-0.01em",
          }}
        >
          Two bedrooms, three beds. Sleeps four, in all.
        </p>
      </div>

      {/* The hut, in full — a staggered set of photos that reveal as you reach it. */}
      <div
        className="mx-auto"
        style={{
          marginTop: "clamp(3rem, 7vh, 5rem)",
          maxWidth: "74rem",
          paddingInline: "clamp(1.5rem, 4vw, 3rem)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: "clamp(0.85rem, 1.8vw, 1.5rem)",
        }}
      >
        {HUT_GALLERY.map((ph) => (
          <div
            key={ph.src}
            className="sh-reveal"
            style={{
              position: "relative",
              width: ph.width,
              aspectRatio: ph.aspect,
              borderRadius: "3px",
              overflow: "hidden",
              background: "var(--v2-line)",
            }}
          >
            <Image
              src={ph.src}
              alt={ph.alt}
              fill
              sizes="(max-width: 768px) 88vw, 30rem"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
