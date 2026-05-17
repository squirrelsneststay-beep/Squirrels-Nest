"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Stacking cards — replaces the boring NumberedServices list.
 *
 * Pinned section. As you scroll, each card slides up from below and STACKS
 * on top of the previous one. Earlier cards push slightly back (scale +
 * y-offset) so the stack reads as physical depth. Five cards total.
 *
 * Each card: large number, big serif title, body, room photo.
 */

const cards = [
  {
    n: "01",
    title: "Hand-finished beds",
    body: "White linen, weighted quilts, a window that opens onto fields.",
    photo: "/images/squirrels-nest/sq-12.jpg",
  },
  {
    n: "02",
    title: "Wood-fired warmth",
    body: "A cast-iron stove built into the chimney breast. Logs by the door.",
    photo: "/images/squirrels-nest/sq-30.jpg",
  },
  {
    n: "03",
    title: "A kitchen for slow meals",
    body: "Espresso machine, kettle, brass tap. Stock the fridge from the farm.",
    photo: "/images/squirrels-nest/sq-35.jpg",
  },
  {
    n: "04",
    title: "Yellow velvet, quiet rooms",
    body: "Two soft chairs, a bookshelf, a record player. No television.",
    photo: "/images/squirrels-nest/sq-18.jpg",
  },
  {
    n: "05",
    title: "Soft light, hand-finished",
    body: "Painted screens, lamps with cloth shades, brass fittings throughout.",
    photo: "/images/squirrels-nest/sq-42.jpg",
  },
  {
    n: "06",
    title: "Painted screens, red walls",
    body: "Velvet folding screens, hand-painted detailing, layered antique mirrors.",
    photo: "/images/squirrels-nest/sq-28.jpg",
  },
  {
    n: "07",
    title: "Found details everywhere",
    body: "Brass fittings sourced from Suffolk scrapyards, fittings stripped and re-finished.",
    photo: "/images/squirrels-nest/sq-22.jpg",
  },
  {
    n: "08",
    title: "Open onto the lane",
    body: "Bistro chairs, an outdoor table under the wall lamp. Breakfast in the open.",
    photo: "/images/squirrels-nest/sq-08.jpg",
  },
];

export function StackingCards() {
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
      const cardEls = gsap.utils.toArray<HTMLElement>(".sc-card");

      // Initial state — all cards CENTERED (top:50% + translate-50%), only first visible.
      // Subsequent cards offset BELOW by translating Y in percentage of viewport.
      cardEls.forEach((c, i) => {
        gsap.set(c, {
          y: i === 0 ? 0 : window.innerHeight,
          scale: 1,
          zIndex: i + 1,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${cardEls.length * 90}%`,
          pin: ".sc-pin",
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Each subsequent card slides up from below and stacks. Previous card
      // recedes (scale down + small upward offset + dimmed).
      for (let i = 1; i < cardEls.length; i++) {
        const at = (i - 1) / (cardEls.length - 1);
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          tl.to(
            cardEls[j],
            {
              scale: 1 - depth * 0.04,
              y: -depth * 24,
              filter: `brightness(${1 - depth * 0.1})`,
              duration: 0.18,
              ease: "power2.out",
            },
            at
          );
        }
        tl.to(
          cardEls[i],
          { y: 0, duration: 0.20, ease: "power2.out" },
          at
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      style={{ background: "var(--v2-bg)", paddingBlock: "8vh" }}
    >
      <div
        className="sc-pin relative min-h-[100dvh] w-full overflow-hidden flex flex-col"
        style={{ background: "var(--v2-bg)" }}
      >
        {/* Header */}
        <div
          className="mx-auto text-center"
          style={{
            maxWidth: "62rem",
            paddingInline: "clamp(1.5rem, 4vw, 3.5rem)",
            paddingTop: "clamp(2rem, 6vh, 5rem)",
            marginBottom: "clamp(2rem, 4vh, 4rem)",
          }}
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
            What&apos;s inside
            <span
              style={{
                fontStyle: "italic",
                color: "color-mix(in srgb, var(--v2-ink) 72%, transparent)",
              }}
            >
              {" "}
              the cabin.
            </span>
          </h2>
        </div>

        {/* Stacked cards container — cards centred vertically within the remaining viewport */}
        <div
          className="relative flex-1 mx-auto w-full flex items-center justify-center"
          style={{
            maxWidth: "76rem",
            paddingInline: "clamp(1rem, 3vw, 3rem)",
          }}
        >
          {cards.map((c, i) => (
            <div
              key={i}
              className="sc-card absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                maxWidth: "62rem",
                marginInline: "auto",
                background: "var(--v2-bg)",
                borderRadius: "4px",
                boxShadow: "0 40px 80px -30px rgba(55,8,8,0.20), 0 0 0 1px var(--v2-line)",
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                willChange: "transform, filter",
                height: "clamp(20rem, 56vh, 28rem)",
                transformOrigin: "center center",
              }}
            >
              <div
                className="grid h-full"
                style={{
                  gridTemplateColumns: "auto 1fr 1.2fr",
                  gap: "clamp(1.5rem, 3vw, 3rem)",
                  alignItems: "stretch",
                }}
              >
                {/* Number */}
                <span
                  className="font-display"
                  style={{
                    fontSize: "clamp(2.5rem, 4vw, 4rem)",
                    color: "var(--v2-mute)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {c.n}
                </span>

                {/* Title + body */}
                <div className="flex flex-col justify-center" style={{ maxWidth: "26rem" }}>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                      color: "var(--v2-ink)",
                      lineHeight: 1.0,
                      letterSpacing: "-0.03em",
                      fontWeight: 400,
                      margin: 0,
                      marginBottom: "1rem",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-geist)",
                      fontSize: "0.95rem",
                      color: "var(--v2-ink-soft)",
                      letterSpacing: "-0.005em",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {c.body}
                  </p>
                </div>

                {/* Photo wrapper — cream bg (not dark ink) so any 1-frame
                    photo-loading state stays in-palette, never flashes dark. */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "3px",
                    overflow: "hidden",
                    background: "var(--v2-bg)",
                  }}
                >
                  <img
                    src={c.photo}
                    alt={c.title}
                    loading={i < 2 ? "eager" : "lazy"}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
