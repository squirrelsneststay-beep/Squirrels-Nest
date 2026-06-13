"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import {
  LOCATION_LINE,
  TRAVEL_TIMES,
  STATION_LINE,
  NEARBY_PLACES,
} from "@/lib/owner-facts";

/**
 * Where the cabin actually is, and what's around it — the two questions a
 * couple comparing Airbnbs asks first and the old page never answered.
 * Split layout: "Finding us" (travel) left, "While you're here" (nearby)
 * right. The exact address stays private, Airbnb-style: area only.
 *
 * GATED: renders nothing until LOCATION_LINE or NEARBY_PLACES is filled in
 * lib/owner-facts.ts. Every entry must be confirmed by Zoe — no invented
 * pub names, no guessed drive times.
 */
export function FindingUs() {
  const hasLocation = Boolean(LOCATION_LINE) || TRAVEL_TIMES.length > 0;
  const hasNearby = NEARBY_PLACES.length > 0;
  if (!hasLocation && !hasNearby) return null;

  return (
    <section
      className="relative"
      style={{ background: "var(--v2-bg)", paddingBlock: "14vh" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "72rem", paddingInline: "clamp(1.5rem, 4vw, 3.5rem)" }}
      >
        <ScrollReveal>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              fontWeight: 400,
              margin: 0,
              color: "var(--v2-ink)",
              maxWidth: "18ch",
            }}
          >
            Out of the way,{" "}
            <span
              style={{
                fontStyle: "italic",
                color: "color-mix(in srgb, var(--v2-ink) 72%, transparent)",
              }}
            >
              not out of reach.
            </span>
          </h2>
        </ScrollReveal>

        <div
          className="fu-cols"
          style={{
            marginTop: "4rem",
            display: "grid",
            gridTemplateColumns: hasLocation && hasNearby ? "1fr 1fr" : "1fr",
            gap: "4rem clamp(3rem, 6vw, 7rem)",
          }}
        >
          {hasLocation && (
            <ScrollReveal>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-geist)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--v2-mute)",
                    margin: 0,
                  }}
                >
                  Finding us
                </p>
                {LOCATION_LINE && (
                  <p
                    style={{
                      marginTop: "1.25rem",
                      fontFamily: "var(--font-geist)",
                      fontSize: "1.05rem",
                      lineHeight: 1.6,
                      color: "var(--v2-ink)",
                      maxWidth: "30rem",
                    }}
                  >
                    {LOCATION_LINE}
                  </p>
                )}
                {TRAVEL_TIMES.length > 0 && (
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "1.5rem 0 0",
                      fontFamily: "var(--font-geist)",
                      fontSize: "0.95rem",
                      lineHeight: 2,
                      color: "var(--v2-ink-soft)",
                    }}
                  >
                    {TRAVEL_TIMES.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                {STATION_LINE && (
                  <p
                    style={{
                      marginTop: "1rem",
                      fontFamily: "var(--font-geist)",
                      fontSize: "0.95rem",
                      color: "var(--v2-ink-soft)",
                    }}
                  >
                    {STATION_LINE}
                  </p>
                )}
                <p
                  style={{
                    marginTop: "1.5rem",
                    fontFamily: "var(--font-geist)",
                    fontSize: "0.85rem",
                    color: "var(--v2-mute)",
                  }}
                >
                  The exact location is shared once you book.
                </p>
              </div>
            </ScrollReveal>
          )}

          {hasNearby && (
            <ScrollReveal delay={0.1}>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-geist)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--v2-mute)",
                    margin: 0,
                  }}
                >
                  While you&apos;re here
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "1.25rem 0 0",
                  }}
                >
                  {NEARBY_PLACES.map((p) => (
                    <li
                      key={p.name}
                      style={{
                        paddingBlock: "1rem",
                        borderBottom: "1px solid var(--v2-line)",
                      }}
                    >
                      <span
                        className="font-display"
                        style={{
                          fontSize: "1.25rem",
                          letterSpacing: "-0.02em",
                          color: "var(--v2-ink)",
                        }}
                      >
                        {p.name}
                      </span>
                      <span
                        style={{
                          display: "block",
                          marginTop: "0.25rem",
                          fontFamily: "var(--font-geist)",
                          fontSize: "0.9rem",
                          color: "var(--v2-ink-soft)",
                        }}
                      >
                        {p.note}
                        {p.distance ? ` · ${p.distance}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
