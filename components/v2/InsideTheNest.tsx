"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * InsideTheNest — four rooms, four genuinely different layouts.
 *
 *  Card 1 (Sitting Room) — SPREAD-RIGHT
 *      heading + body + link top-left, small detail bottom-left,
 *      BIG square photo on the right spanning both rows.
 *
 *  Card 2 (Bedroom) — TALL TRIPTYCH
 *      tall portrait photo on the FAR-LEFT, copy in the middle column,
 *      SQUARE photo on the right with a top offset so the three blocks
 *      stagger like a cinematic still strip.
 *
 *  Card 3 (Kitchen) — WIDE BAND + DROP CAP
 *      ultra-wide cinematic photo across the top spanning the whole card
 *      width, then a centred two-column row below: an oversized "K" drop
 *      cap + heading on the left, body + book link on the right.
 *
 *  Card 4 (Shepherd's Hut) — MIRRORED SPREAD WITH OFFSET
 *      BIG portrait photo on the left, copy + link on the right with a
 *      generous top offset, small landscape detail at far-right bottom,
 *      breaking the visual symmetry of card 1.
 *
 * Every photo has a subtle in-frame parallax (yPercent +8 → -8 as the
 * card crosses the viewport) so the imagery isn't static when you scroll.
 */

type SpreadRight = {
  variant: "spread-right";
  name: string;
  body: string;
  photoMain: string;
  photoDetail: string;
};
type TallTriptych = {
  variant: "tall-triptych";
  name: string;
  body: string;
  photoTall: string;
  photoSquare: string;
};
type WideBand = {
  variant: "wide-band";
  name: string;
  initial: string;
  body: string;
  photoWide: string;
};
type SpreadLeft = {
  variant: "spread-left";
  name: string;
  body: string;
  photoMain: string;
  photoDetail: string;
};
type Card = SpreadRight | TallTriptych | WideBand | SpreadLeft;

const ROOMS: Card[] = [
  {
    variant: "spread-right",
    name: "The Bedroom",
    body: "Open-plan, with a super king-size bed. Plenty of room, soft light, and woodland in the window.",
    photoMain: "/images/squirrels-nest/sq-12.jpg",
    photoDetail: "/images/squirrels-nest/sq-30.jpg",
  },
  {
    variant: "tall-triptych",
    name: "The Shower Room",
    body: "A walk-in shower and a pedestal basin. Plenty of hot water, whenever you want it.",
    photoTall: "/images/squirrels-nest/sq-38.jpg",
    photoSquare: "/images/squirrels-nest/sq-39.jpg",
  },
  {
    variant: "wide-band",
    name: "The Kitchen",
    initial: "K",
    body: "Coffee machine, kettle, a little oven and a proper sink. Everything you need to cook in, or just make the morning coffee.",
    photoWide: "/images/squirrels-nest/sq-35.jpg",
  },
  {
    variant: "spread-left",
    name: "The Courtyard",
    body: "Your own enclosed courtyard, with a table and chairs. For morning coffee, or dinner outside.",
    photoMain: "/images/squirrels-nest/sq-08.jpg",
    photoDetail: "/images/squirrels-nest/sq-05.jpg",
  },
];

/* ───────────────── Shared sub-components ───────────────── */

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-display"
      style={{
        fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
        lineHeight: 1.05,
        letterSpacing: "-0.025em",
        color: "var(--v2-ink)",
        fontWeight: 400,
        margin: 0,
        marginBottom: "1.25rem",
      }}
    >
      {children}
    </h3>
  );
}

function Body({ children, maxWidth = "22rem" }: { children: React.ReactNode; maxWidth?: string }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-geist)",
        fontSize: "0.95rem",
        lineHeight: 1.55,
        letterSpacing: "-0.005em",
        color: "var(--v2-ink-soft)",
        margin: 0,
        maxWidth,
      }}
    >
      {children}
    </p>
  );
}

function BookLink() {
  return (
    <a
      href="#reserve"
      style={{
        display: "inline-block",
        marginTop: "1.5rem",
        fontFamily: "var(--font-geist)",
        fontSize: "0.875rem",
        fontWeight: 600,
        letterSpacing: "-0.005em",
        color: "var(--v2-ink)",
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        textDecorationThickness: "1px",
      }}
    >
      Book a stay
    </a>
  );
}

function Frame({
  src,
  alt,
  aspect,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  aspect: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className="itn-frame relative"
      style={{
        aspectRatio: aspect,
        borderRadius: "3px",
        overflow: "hidden",
        background: "var(--v2-line)",
      }}
    >
      <div
        className="itn-img-inner absolute"
        style={{ inset: "-9% 0", willChange: "transform" }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
}

/* ───────────────── Per-variant renderers ───────────────── */

function CardSpreadRight({ r, eager }: { r: SpreadRight; eager: boolean }) {
  return (
    <article
      className="itn-card"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "auto auto",
        columnGap: "clamp(1rem, 2vw, 2rem)",
        rowGap: "clamp(2rem, 4vh, 4rem)",
        alignItems: "start",
      }}
    >
      <div className="itn-card-copy" style={{ gridColumn: "1 / span 4", gridRow: "1", paddingTop: "0.5rem", paddingLeft: "0.5rem" }}>
        <Heading>{r.name}</Heading>
        <Body>{r.body}</Body>
        <BookLink />
      </div>
      <div style={{ gridColumn: "2 / span 3", gridRow: "2" }}>
        <Frame src={r.photoDetail} alt={`${r.name} — detail`} aspect="1.3 / 1" />
      </div>
      <div style={{ gridColumn: "7 / span 6", gridRow: "1 / span 2" }}>
        <Frame src={r.photoMain} alt={r.name} aspect="1.35 / 1" priority={eager} sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
    </article>
  );
}

function CardTallTriptych({ r }: { r: TallTriptych }) {
  return (
    <article
      className="itn-card"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        columnGap: "clamp(1rem, 2.5vw, 2.5rem)",
        alignItems: "start",
      }}
    >
      {/* tall portrait left — full card height */}
      <div style={{ gridColumn: "1 / span 3", gridRow: "1", paddingTop: "2rem" }}>
        <Frame src={r.photoTall} alt={`${r.name} — wall`} aspect="3 / 4" />
      </div>
      {/* copy middle column, vertically centred-ish */}
      <div
        className="itn-card-copy"
        style={{ gridColumn: "5 / span 3", gridRow: "1", paddingTop: "5rem" }}
      >
        <Heading>{r.name}</Heading>
        <Body maxWidth="18rem">{r.body}</Body>
        <BookLink />
      </div>
      {/* square photo right, offset DOWN so the three columns stagger */}
      <div style={{ gridColumn: "9 / span 4", gridRow: "1", paddingTop: "8rem" }}>
        <Frame src={r.photoSquare} alt={r.name} aspect="1.15 / 1" />
      </div>
    </article>
  );
}

function CardWideBand({ r }: { r: WideBand }) {
  return (
    <article className="itn-card" style={{ display: "flex", flexDirection: "column", gap: "clamp(2.5rem, 5vh, 4rem)" }}>
      {/* Ultra-wide cinematic photo across the top — wider so it reads as
          a band, not a square */}
      <Frame src={r.photoWide} alt={r.name} aspect="2.8 / 1" sizes="100vw" />
      {/* Drop-cap + heading + body in a centred two-column row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          columnGap: "clamp(1.5rem, 3vw, 3rem)",
          paddingInline: "clamp(0.5rem, 2vw, 2rem)",
          alignItems: "start",
        }}
      >
        <div style={{ gridColumn: "2 / span 4" }}>
          <Heading>{r.name}</Heading>
        </div>
        <div className="itn-card-copy" style={{ gridColumn: "7 / span 5" }}>
          <Body maxWidth="28rem">{r.body}</Body>
          <BookLink />
        </div>
      </div>
    </article>
  );
}

function CardSpreadLeft({ r }: { r: SpreadLeft }) {
  return (
    <article
      className="itn-card"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "auto auto",
        columnGap: "clamp(1rem, 2vw, 2rem)",
        rowGap: "clamp(2rem, 4vh, 4rem)",
        alignItems: "start",
      }}
    >
      {/* BIG main on the LEFT this time */}
      <div style={{ gridColumn: "1 / span 6", gridRow: "1 / span 2" }}>
        <Frame src={r.photoMain} alt={r.name} aspect="1.35 / 1" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      {/* copy top-right, offset DOWN noticeably so it doesn't mirror card 1 */}
      <div
        className="itn-card-copy"
        style={{ gridColumn: "9 / span 4", gridRow: "1", paddingTop: "5rem" }}
      >
        <Heading>{r.name}</Heading>
        <Body>{r.body}</Body>
        <BookLink />
      </div>
      {/* small detail bottom-right */}
      <div style={{ gridColumn: "9 / span 3", gridRow: "2" }}>
        <Frame src={r.photoDetail} alt={`${r.name} — detail`} aspect="1.3 / 1" />
      </div>
    </article>
  );
}

/* ───────────────── Main component ───────────────── */

export function InsideTheNest() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.from(".itn-title-line", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });
      gsap.utils.toArray<HTMLElement>(".itn-card").forEach((card) => {
        const copy = card.querySelector(".itn-card-copy");
        if (copy) {
          gsap.from(copy, {
            y: 32,
            opacity: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 78%", once: true },
          });
        }
      });

      if (prefersReducedMotion) {
        // Snap photos to visible state for users who prefer reduced motion
        gsap.set(".itn-frame", { opacity: 1, y: 0 });
        return;
      }

      // Scroll-driven photo fade. Each photo starts fully invisible + nudged
      // down, then opacity + y scrub up to fully visible as the card crosses
      // from the bottom of the viewport to roughly the middle. This ties the
      // appearance to scroll velocity — slow scroll, slow fade; fast scroll,
      // fast fade — and matches the user's "as you scroll, they fade in".
      gsap.utils.toArray<HTMLElement>(".itn-card").forEach((card) => {
        const photos = card.querySelectorAll<HTMLElement>(".itn-frame");
        if (!photos.length) return;
        gsap.fromTo(
          photos,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            stagger: 0.04,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top 55%",
              scrub: 0.8,
            },
          }
        );
      });

      // In-frame parallax — runs in parallel with the fade. Targets the
      // inner wrapper (different element from .itn-frame) so the two tweens
      // don't fight over the same transform.
      gsap.utils.toArray<HTMLElement>(".itn-card").forEach((card) => {
        card.querySelectorAll<HTMLElement>(".itn-img-inner").forEach((inner) => {
          gsap.fromTo(
            inner,
            { yPercent: 8 },
            {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.0,
              },
            }
          );
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      style={{
        background: "var(--v2-bg)",
        paddingBlock: "clamp(6rem, 14vh, 12rem)",
      }}
    >
      <h2
        className="font-display mx-auto text-center"
        style={{
          maxWidth: "80rem",
          paddingInline: "clamp(1.5rem, 4vw, 4rem)",
          fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.025em",
          color: "var(--v2-ink)",
          fontWeight: 400,
          margin: "0 auto clamp(4rem, 10vh, 8rem)",
        }}
      >
        <span className="itn-title-line block overflow-hidden">
          <span className="block">Look Inside</span>
        </span>
        <span className="itn-title-line block overflow-hidden">
          <span
            className="block"
            style={{
              fontStyle: "italic",
              color: "color-mix(in srgb, var(--v2-ink) 70%, transparent)",
            }}
          >
            the Nest.
          </span>
        </span>
      </h2>

      <div
        className="mx-auto"
        style={{
          maxWidth: "90rem",
          paddingInline: "clamp(1.5rem, 3vw, 3rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(5rem, 12vh, 10rem)",
        }}
      >
        {ROOMS.map((r, i) => {
          switch (r.variant) {
            case "spread-right":
              return <CardSpreadRight key={r.name} r={r} eager={i === 0} />;
            case "tall-triptych":
              return <CardTallTriptych key={r.name} r={r} />;
            case "wide-band":
              return <CardWideBand key={r.name} r={r} />;
            case "spread-left":
              return <CardSpreadLeft key={r.name} r={r} />;
          }
        })}
      </div>
    </section>
  );
}
