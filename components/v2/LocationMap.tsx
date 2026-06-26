"use client";

import { Reveal } from "@/components/v2/Reveal";
import { LOCATION_LINE, TRAVEL_TIMES, STATION_LINE } from "@/lib/owner-facts";

/**
 * Location — a professional "where you'll be" section: a framed area map
 * beside the setting and (once Zoe confirms them) travel times + nearest
 * station. The map shows the wider countryside, never the exact house — the
 * precise location is shared on booking, Airbnb-style.
 */

// Centred on the RG20 postcode area (west Berkshire / North Wessex Downs,
// on the Hampshire border) with a marker — precise enough to show where you
// are, but RG20 covers a wide rural district, so it never pins the door.
// Exact address is shared on booking.
const MAP_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=-1.56%2C51.28%2C-1.08%2C51.50&layer=mapnik&marker=51.385%2C-1.32";

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
            <p style={labelStyle}>Location</p>
            <h2 className="font-display" style={titleStyle}>
              In the Berkshire countryside,{" "}
              <span style={{ fontStyle: "italic", color: "var(--v2-ink-soft)" }}>
                on the edge of the Downs.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              style={{
                marginTop: "1.75rem",
                maxWidth: "40ch",
                fontFamily: "var(--font-geist)",
                fontSize: "1.0625rem",
                lineHeight: 1.7,
                color: "var(--v2-ink-soft)",
              }}
            >
              {LOCATION_LINE ??
                "Tucked into the grounds of a country house in west Berkshire, near the North Wessex Downs and the Hampshire border. Open countryside, quiet lanes, and good walking from the door."}
            </p>
          </Reveal>

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

          <Reveal delay={0.22}>
            <p
              style={{
                marginTop: "1.5rem",
                fontFamily: "var(--font-geist)",
                fontSize: "0.82rem",
                color: "var(--v2-mute)",
              }}
            >
              The exact address is shared once your stay is booked.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            style={{
              position: "relative",
              borderRadius: "6px",
              overflow: "hidden",
              border: "1px solid var(--v2-line)",
              aspectRatio: "4 / 3",
              background: "#f1ebe0",
            }}
          >
            <iframe
              src={MAP_SRC}
              title="Map of the RG20 area — west Berkshire / North Wessex Downs, on the Hampshire border"
              loading="lazy"
              // Warm the standard map toward the cream + brown palette.
              style={{ width: "100%", height: "100%", border: 0, filter: "sepia(0.42) saturate(0.8) brightness(1.04) contrast(0.93)" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-geist)",
  fontSize: "0.72rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--v2-mute)",
};

const titleStyle: React.CSSProperties = {
  margin: "1.5rem 0 0",
  fontSize: "clamp(2rem, 4vw, 3.6rem)",
  lineHeight: 1.04,
  letterSpacing: "-0.03em",
  fontWeight: 400,
  maxWidth: "16ch",
};
