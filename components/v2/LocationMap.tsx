"use client";

import { Reveal } from "@/components/v2/Reveal";
import { ScrollType } from "@/components/v2/ScrollType";
import { LOCATION_LINE, TRAVEL_TIMES, STATION_LINE } from "@/lib/owner-facts";

/**
 * Location — a professional "where you'll be" section: a framed area map
 * beside the setting and (once Zoe confirms them) travel times + nearest
 * station. The map shows the wider countryside, never the exact house — the
 * precise location is shared on booking, Airbnb-style.
 */

// Google satellite view centred on the real location
// (51°21'47.7"N 1°17'24.9"W = 51.36325, -1.29025), RG20 / North Wessex Downs.
// Satellite reads far nicer than the flat OS map and shows the real setting.
const MAP_SRC =
  "https://maps.google.com/maps?q=51.36325,-1.29025&t=k&z=15&output=embed";

export function LocationMap() {
  return (
    <section
      id="location"
      style={{
        background: "var(--v2-bg)",
        color: "var(--v2-ink)",
        paddingBlock: "clamp(6rem, 15vh, 12rem)",
        borderTop: "1px solid var(--v2-line)",
        scrollMarginTop: "5rem",
      }}
    >
      <div
        className="loc-grid mx-auto"
        style={{
          maxWidth: "80rem",
          paddingInline: "clamp(1.5rem, 4vw, 4rem)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
          gap: "clamp(2.5rem, 5vw, 5rem)",
          alignItems: "center",
        }}
      >
        <div>
          <Reveal>
            <h2 className="font-display" style={titleStyle}>
              Where it{" "}
              <span style={{ fontStyle: "italic", color: "var(--v2-ink-soft)" }}>
                is.
              </span>
            </h2>
          </Reveal>

          <ScrollType
            text={
              LOCATION_LINE ??
              "In the grounds of a country house in west Berkshire, near Newbury and the North Wessex Downs, close to the Hampshire border. The exact address is sent when you book."
            }
            style={{
              marginTop: "1.75rem",
              maxWidth: "32ch",
              fontFamily: "var(--font-geist)",
              fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
              lineHeight: 1.55,
              color: "var(--v2-ink)",
            }}
          />

          {(TRAVEL_TIMES.length > 0 || STATION_LINE) && (
            <Reveal delay={0.16}>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "1.75rem 0 0",
                  fontFamily: "var(--font-geist)",
                  fontSize: "0.98rem",
                  lineHeight: 2,
                  color: "var(--v2-ink)",
                }}
              >
                {TRAVEL_TIMES.map((t) => (
                  <li key={t} style={{ borderBottom: "1px solid var(--v2-line)", paddingBlock: "0.5rem" }}>{t}</li>
                ))}
                {STATION_LINE && (
                  <li style={{ borderBottom: "1px solid var(--v2-line)", paddingBlock: "0.5rem" }}>{STATION_LINE}</li>
                )}
              </ul>
            </Reveal>
          )}

        </div>

        <Reveal delay={0.1}>
          <div
            style={{
              position: "relative",
              borderRadius: "6px",
              overflow: "hidden",
              border: "1px solid var(--v2-line)",
              aspectRatio: "4 / 3",
              background: "#1a1a1a",
            }}
          >
            <iframe
              src={MAP_SRC}
              title="Satellite map of the area — RG20, west Berkshire / North Wessex Downs"
              loading="lazy"
              style={{ width: "100%", height: "100%", border: 0 }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const titleStyle: React.CSSProperties = {
  margin: "1.5rem 0 0",
  fontSize: "clamp(2rem, 4vw, 3.6rem)",
  lineHeight: 1.04,
  letterSpacing: "-0.03em",
  fontWeight: 400,
  maxWidth: "16ch",
};
