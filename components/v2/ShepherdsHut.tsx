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
const HUT_PHOTO_MAIN = "/images/shepherds-hut/hut-1.jpg"; // the striped hut exterior
const HUT_PHOTO_DETAIL = "/images/shepherds-hut/hut-3.jpg"; // twin beds through the open door

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
          And a shepherd&apos;s hut, just across the grounds.
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
          For a little more room, a charming shepherd&apos;s hut sits on the
          grounds — optional, and all your own. It sleeps two more: perfect for
          friends, or family travelling with you. Its own door, the same quiet.
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
          Lodge sleeps two. Hut sleeps two more. Four, in all.
        </p>
      </div>

      {/* Two contained photos, varied size, centred — not full-bleed. */}
      <div
        className="sh-reveal mx-auto"
        style={{
          marginTop: "clamp(3rem, 7vh, 5rem)",
          maxWidth: "62rem",
          paddingInline: "clamp(1.5rem, 4vw, 3rem)",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: "clamp(1rem, 2.5vw, 2rem)",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "min(26rem, 70vw)",
            aspectRatio: "4 / 5",
            borderRadius: "3px",
            overflow: "hidden",
            background: "var(--v2-line)",
          }}
        >
          <Image
            src={HUT_PHOTO_MAIN}
            alt="The red-and-white striped shepherd's hut at Squirrels' Nest"
            fill
            sizes="(max-width: 768px) 70vw, 26rem"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            position: "relative",
            width: "min(18rem, 50vw)",
            aspectRatio: "3 / 4",
            borderRadius: "3px",
            overflow: "hidden",
            background: "var(--v2-line)",
          }}
        >
          <Image
            src={HUT_PHOTO_DETAIL}
            alt="Inside the shepherd's hut — twin beds with striped linen"
            fill
            sizes="(max-width: 768px) 50vw, 18rem"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
