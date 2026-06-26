"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/v2/Reveal";

/**
 * Experiences — the "what a day here feels like" list, in the spirit of
 * Mariven's "Celebrate by the Sea". A column of moments on the left; the one
 * you hover/select expands and crossfades a full-height image on the right.
 * Copy is evocative but grounded only in confirmed facts (courtyard, Downs,
 * kitchen, super king, woodland, the optional hut).
 */
type Moment = { key: string; title: string; when: string; body: string; img: string; alt: string };

const MOMENTS: Moment[] = [
  {
    key: "mornings",
    title: "Mornings in the courtyard",
    when: "Sunrise",
    body: "Coffee outside in your own enclosed courtyard, the day in no hurry to start.",
    img: "/images/squirrels-nest/sq-08.jpg",
    alt: "The private courtyard with its bistro table",
  },
  {
    key: "walks",
    title: "Walks from the door",
    when: "Anytime",
    body: "Open countryside and the North Wessex Downs, straight from the gate.",
    img: "/images/squirrels-nest/sq-03.jpg",
    alt: "Wisteria on the country house, with countryside beyond",
  },
  {
    key: "evenings",
    title: "Slow evenings in",
    when: "Dusk",
    body: "A fully equipped kitchen, a long supper, and a super king to sink into.",
    img: "/images/squirrels-nest/sq-18.jpg",
    alt: "The sitting room with its yellow velvet chairs",
  },
  {
    key: "skies",
    title: "Under dark skies",
    when: "Night",
    body: "Woodland quiet and proper darkness, a long way from the city glow.",
    img: "/images/squirrels-nest/sq-25.jpg",
    alt: "A warm interior detail at dusk",
  },
  {
    key: "hut",
    title: "The shepherd's hut",
    when: "Optional",
    body: "An extra room for two, just across the grounds, whenever you need it.",
    img: "/images/shepherds-hut/hut-5.jpg",
    alt: "The red-and-white shepherd's hut on the grounds",
  },
];

export function Experiences() {
  const [active, setActive] = useState(0);

  return (
    <section
      style={{
        background: "var(--v2-ink)",
        color: "var(--v2-bg)",
        overflow: "hidden",
      }}
    >
      <div
        className="exp-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          minHeight: "min(92vh, 56rem)",
        }}
      >
        {/* LEFT — the list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(4rem, 9vw, 9rem) clamp(1.5rem, 5vw, 6rem)",
          }}
        >
          <Reveal>
            <h2
              className="font-display"
              style={{
                margin: "0 0 2.5rem",
                fontSize: "clamp(2.2rem, 4.4vw, 4rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                maxWidth: "16ch",
              }}
            >
              Days made of{" "}
              <span style={{ fontStyle: "italic", color: "color-mix(in srgb, var(--v2-bg) 78%, transparent)" }}>
                nothing much.
              </span>
            </h2>
          </Reveal>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {MOMENTS.map((m, i) => {
              const on = i === active;
              return (
                <li key={m.key} style={{ borderTop: "1px solid color-mix(in srgb, var(--v2-bg) 18%, transparent)" }}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={on}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "inherit",
                      padding: "1.15rem 0",
                      display: "block",
                    }}
                  >
                    <span
                      className="font-display"
                      style={{
                        display: "block",
                        fontSize: "clamp(1.4rem, 2.4vw, 2.1rem)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                        color: on ? "var(--v2-bg)" : "color-mix(in srgb, var(--v2-bg) 55%, transparent)",
                        transition: "color 350ms var(--ease-out)",
                      }}
                    >
                      {m.title}
                    </span>
                    <span
                      style={{
                        display: "grid",
                        gridTemplateRows: on ? "1fr" : "0fr",
                        transition: "grid-template-rows 450ms var(--ease-out)",
                      }}
                    >
                      <span style={{ overflow: "hidden" }}>
                        <span
                          style={{
                            display: "block",
                            paddingTop: on ? "0.7rem" : 0,
                            maxWidth: "34ch",
                            fontFamily: "var(--font-geist)",
                            fontSize: "0.98rem",
                            lineHeight: 1.6,
                            color: "color-mix(in srgb, var(--v2-bg) 72%, transparent)",
                            transition: "padding 450ms var(--ease-out)",
                          }}
                        >
                          {m.body}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT — full-height crossfading image */}
        <div style={{ position: "relative", minHeight: "min(50vh, 28rem)" }}>
          {MOMENTS.map((m, i) => (
            <div
              key={m.key}
              aria-hidden={i !== active}
              style={{
                position: "absolute",
                inset: 0,
                opacity: i === active ? 1 : 0,
                transition: "opacity 800ms var(--ease-out)",
              }}
            >
              <Image
                src={m.img}
                alt={`${m.alt} — Squirrels' Nest`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
