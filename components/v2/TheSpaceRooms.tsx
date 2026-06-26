"use client";

import Image from "next/image";
import { Reveal } from "@/components/v2/Reveal";

/**
 * The Space — a clean, premium room showcase. Each room is one large
 * photograph with the name and a single line beside it, alternating sides for
 * rhythm. No scattered/rotated photos, no tiny captions. Copy is Zoe's exact
 * wording (confirmed facts).
 */
type Room = { name: string; line?: string; img: string; alt: string };

const ROOMS: Room[] = [
  { name: "The Bedroom", line: "A beautiful super king-sized bed.", img: "sq-12.jpg", alt: "The super king bed with its red scalloped headboard" },
  { name: "The Shower Room", img: "sq-38.jpg", alt: "The large walk-in shower" },
  { name: "The Kitchen", line: "Fully equipped with small oven, hob, coffee machine and fridge freezer.", img: "sq-37.jpg", alt: "The kitchen sink beneath the window" },
  { name: "The Courtyard", line: "Your own enclosed courtyard, with a table and chairs.", img: "sq-08.jpg", alt: "The private enclosed courtyard with its bistro table" },
];

export function TheSpaceRooms() {
  return (
    <section
      style={{
        background: "var(--v2-bg)",
        color: "var(--v2-ink)",
        paddingBlock: "clamp(6rem, 14vh, 12rem)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "88rem", paddingInline: "clamp(1.5rem, 4vw, 4rem)" }}>
        <Reveal>
          <h2
            className="font-display"
            style={{
              margin: "0 0 clamp(3rem, 7vw, 6rem)",
              fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontWeight: 400,
            }}
          >
            The space.
          </h2>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(4rem, 9vw, 8rem)" }}>
          {ROOMS.map((r, i) => (
            <Reveal key={r.name}>
              <div
                className="space-row"
                style={{
                  display: "flex",
                  flexDirection: i % 2 === 1 ? "row-reverse" : "row",
                  alignItems: "center",
                  gap: "clamp(2rem, 5vw, 5rem)",
                }}
              >
                <div className="imgwipe" style={{ flex: "1 1 56%", borderRadius: "5px" }}>
                  <span style={{ position: "relative", display: "block", aspectRatio: "3 / 2", borderRadius: "5px", overflow: "hidden" }}>
                    <Image
                      src={`/images/squirrels-nest/${r.img}`}
                      alt={`${r.alt} — Squirrels' Nest`}
                      fill
                      sizes="(max-width: 860px) 100vw, 52vw"
                      style={{ objectFit: "cover" }}
                    />
                  </span>
                </div>
                <div style={{ flex: "1 1 44%" }}>
                  <h3
                    className="font-display"
                    style={{
                      margin: 0,
                      fontSize: "clamp(1.8rem, 3.4vw, 3rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      fontWeight: 400,
                    }}
                  >
                    {r.name}
                  </h3>
                  {r.line && (
                    <p
                      style={{
                        margin: "1.1rem 0 0",
                        maxWidth: "32ch",
                        fontFamily: "var(--font-geist)",
                        fontSize: "1.0625rem",
                        lineHeight: 1.65,
                        color: "var(--v2-ink-soft)",
                      }}
                    >
                      {r.line}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
