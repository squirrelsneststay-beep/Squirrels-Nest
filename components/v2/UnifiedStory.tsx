"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * UnifiedStory v3 — Zoe's monologue.
 *
 * One pinned section. A series of MASSIVE serif statements fade in and out
 * one after another over a single scroll window. First-person voice. No
 * line drawings (that was the "dots on the screen" problem). No 3-chapter
 * labels-and-bullets template — just a sequence of declarative beats that
 * each fill the viewport.
 *
 * Photos behind crossfade independently, anchored to the pin.
 *
 * Grammar: short sentences, fragments, italic asides, em-dashes-as-thought-
 * breaks. Wholly different from the previous "From the lane / kettle on /
 * all the way to bed" template.
 */

type Beat = {
  /** Main line. Massive serif. */
  line: string;
  /** Optional italic line under it. */
  italic?: string;
  /** Layer index of the bg photo while this beat is on screen. */
  layer: number;
};

const beats: Beat[] = [
  { line: "I'm Zoe.",                                                       layer: 0 },
  { line: "This took two years.",         italic: "Mostly the upholstery.", layer: 0 },
  { line: "The screens were the worst.",  italic: "Stitched on the floor.", layer: 1 },
  { line: "The kitchen was the easy bit.",                                  layer: 2 },
  { line: "Now it's yours to stay in.",   italic: "For a night, or a week.", layer: 2 },
  { line: "Sit in the chairs.",                                             layer: 3 },
  { line: "Sleep in the linen.",                                            layer: 3 },
  { line: "If something feels right —",   italic: "the lamp, the chair, the tap —", layer: 3 },
  { line: "buy it before you leave.",     italic: "Every piece has a tag.", layer: 3 },
  { line: "Take a piece of it home.",                                       layer: 3 },
];

const PHOTOS = [
  "/images/squirrels-nest/sq-18.jpg",
  "/images/squirrels-nest/sq-30.jpg",
  "/images/squirrels-nest/sq-35.jpg",
  "/images/squirrels-nest/sq-12.jpg",
];

export function UnifiedStory() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const beatEls = gsap.utils.toArray<HTMLElement>(".us-beat");
      const layers = gsap.utils.toArray<HTMLElement>(".us-layer");

      // Initial — all beats hidden, only first photo visible
      gsap.set(beatEls, { opacity: 0, y: 24 });
      layers.forEach((l, i) => gsap.set(l, { opacity: i === 0 ? 1 : 0 }));

      if (prefersReducedMotion) {
        gsap.set(beatEls, { opacity: 1, y: 0 });
        layers.forEach((l) => gsap.set(l, { opacity: 1 }));
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${beats.length * 120}%`,
          pin: ".us-pin",
          scrub: 1.0,
          anticipatePin: 1,
        },
      });

      // Each beat: fade in, hold, fade out. Window per beat = 1 / beats.length.
      // We overlap fades slightly so it never goes fully blank.
      const slotSize = 1 / beats.length;
      const fadeIn = 0.10;   // fraction of slot used to fade in
      const fadeOut = 0.18;  // fraction at end used to fade out

      beats.forEach((beat, i) => {
        const slotStart = i * slotSize;
        const slotEnd = (i + 1) * slotSize;
        // Fade IN at start of slot
        tl.to(beatEls[i], {
          opacity: 1, y: 0, duration: slotSize * fadeIn, ease: "power2.out",
        }, slotStart);
        // Fade OUT before next slot, unless it's the last beat
        if (i < beats.length - 1) {
          tl.to(beatEls[i], {
            opacity: 0, y: -20, duration: slotSize * fadeOut, ease: "power2.in",
          }, slotEnd - slotSize * fadeOut);
        }
      });

      // Photo crossfades — driven by `layer` field on each beat
      let currentLayer = 0;
      beats.forEach((beat, i) => {
        if (beat.layer !== currentLayer) {
          const at = i * slotSize;
          tl.to(layers[currentLayer], { opacity: 0, duration: 0.08, ease: "sine.inOut" }, at);
          tl.to(layers[beat.layer], { opacity: 1, duration: 0.08, ease: "sine.inOut" }, at);
          currentLayer = beat.layer;
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative" data-section-tone="dark">
      <div
        className="us-pin relative w-full overflow-hidden"
        style={{ height: "100dvh", background: "var(--v2-ink)" }}
      >
        {/* Photo layers — anchored to pin, crossfade per beat */}
        {PHOTOS.map((src, i) => (
          <div
            key={src}
            className="us-layer absolute inset-0"
            style={{ willChange: "opacity" }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              style={{ objectFit: "cover" }}
            />
            {/* Soft vignette overlay so cream text stays legible */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.55) 100%)",
              }}
            />
          </div>
        ))}

        {/* Eyebrow */}
        <div className="absolute top-0 inset-x-0 z-30 pt-8">
          <div className="lef-container flex items-center justify-between">
            <span className="sv-eyebrow is-light">A short letter</span>
            <span className="sv-eyebrow is-light">from Zoe</span>
          </div>
        </div>

        {/* Beat stack — each beat absolutely positioned at viewport centre.
            Only one is visible at a time. Massive serif type. */}
        <div className="absolute inset-0 z-20 flex items-center justify-center" style={{ paddingInline: "clamp(1.5rem, 5vw, 5rem)" }}>
          {beats.map((beat, i) => (
            <div
              key={i}
              className="us-beat absolute text-center"
              style={{
                maxWidth: "60rem",
                color: "var(--v2-bg)",
                textShadow: "0 2px 24px rgba(0,0,0,0.45)",
                willChange: "opacity, transform",
              }}
            >
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.035em",
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                {beat.line}
              </h2>
              {beat.italic && (
                <p
                  style={{
                    marginTop: "0.75rem",
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    letterSpacing: "-0.02em",
                    opacity: 0.85,
                    color: "var(--v2-bg)",
                    margin: "0.75rem 0 0",
                  }}
                >
                  {beat.italic}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
