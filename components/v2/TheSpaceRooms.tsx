"use client";

import Image from "next/image";
import { Reveal } from "@/components/v2/Reveal";

/**
 * The Space — a clean, premium room showcase. Each room is a tidy cluster of
 * three photographs (one large + two stacked) with the name and a single line
 * beside it, alternating sides for rhythm. Intentional grid, never the old
 * scattered/rotated mess. Copy is Zoe's exact wording (confirmed facts).
 */
type Room = { name: string; line?: string; photos: [string, string, string]; alt: string };

const ROOMS: Room[] = [
  { name: "The Bedroom", line: "A thoughtfully designed, open-plan space with a luxurious super king-size bed.", photos: ["sq-12.jpg", "sq-33.jpg", "sq-40.jpg"], alt: "The bedroom" },
  { name: "The Shower Room", line: "A spacious shower room with a modern walk-in shower.", photos: ["sq-38.jpg", "sq-39.jpg", "sq-20.jpg"], alt: "The shower room" },
  { name: "The Kitchen", line: "Fully equipped with small oven, hob, coffee machine and fridge freezer.", photos: ["sq-37.jpg", "sq-24.jpg", "sq-29.jpg"], alt: "The kitchen" },
  { name: "The Courtyard", line: "Your private enclosed courtyard with outdoor seating — ideal for morning coffee, alfresco dining, or unwinding under the stars.", photos: ["sq-08.jpg", "sq-04.jpg", "sq-06.jpg"], alt: "The courtyard" },
];

export function TheSpaceRooms() {
  return (
    <section style={{ background: "var(--v2-bg)", color: "var(--v2-ink)", paddingBlock: "clamp(6rem, 14vh, 12rem)" }}>
      <div className="mx-auto" style={{ maxWidth: "90rem", paddingInline: "clamp(1.5rem, 4vw, 4rem)" }}>
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

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(4.5rem, 10vw, 9rem)" }}>
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
                {/* image cluster: one large + two stacked */}
                <div
                  className="room-cluster"
                  style={{
                    flex: "1 1 60%",
                    display: "grid",
                    gridTemplateColumns: "1.45fr 1fr",
                    gridTemplateRows: "1fr 1fr",
                    gap: "clamp(0.5rem, 1vw, 0.85rem)",
                    aspectRatio: "5 / 4",
                  }}
                >
                  <Frame src={r.photos[0]} alt={`${r.name} at Squirrels' Nest — a one-bedroom cabin in the Berkshire countryside`} style={{ gridColumn: "1", gridRow: "1 / 3" }} />
                  <Frame src={r.photos[1]} alt={`${r.name} — Squirrels' Nest boutique cabin near Newbury, Berkshire`} style={{ gridColumn: "2", gridRow: "1" }} />
                  <Frame src={r.photos[2]} alt={`${r.name} — cosy cabin retreat in the North Wessex Downs, Berkshire`} style={{ gridColumn: "2", gridRow: "2" }} />
                </div>

                <div style={{ flex: "1 1 32%" }}>
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

function Frame({ src, alt, style }: { src: string; alt: string; style: React.CSSProperties }) {
  return (
    <div className="imgwipe" style={{ position: "relative", borderRadius: "4px", overflow: "hidden", ...style }}>
      <Image
        src={`/images/squirrels-nest/${src}`}
        alt={alt}
        fill
        sizes="(max-width: 860px) 100vw, 30vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
