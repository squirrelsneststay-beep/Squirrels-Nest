"use client";

import { Reveal } from "@/components/v2/Reveal";

/**
 * A tight, editorial feature band — the property at a glance, as a row of
 * label/value pairs split by hairlines. Confirmed facts only. Reads like the
 * spec strip on a high-end hotel site.
 */
const STATS = [
  "Sleeps four",
  "Super king bed",
  "Twin shepherd's hut",
  "Private courtyard",
  "Private parking",
];

export function StatBand() {
  return (
    <section
      style={{
        background: "var(--v2-bg)",
        color: "var(--v2-ink)",
        borderTop: "1px solid var(--v2-line)",
        borderBottom: "1px solid var(--v2-line)",
      }}
    >
      <Reveal>
        <div
          className="sb-grid mx-auto"
          style={{
            maxWidth: "84rem",
            display: "grid",
            gridTemplateColumns: `repeat(${STATS.length}, 1fr)`,
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s}
              style={{
                paddingBlock: "clamp(2.25rem, 5vh, 3.5rem)",
                paddingInline: "clamp(1rem, 2vw, 1.75rem)",
                borderLeft: i === 0 ? "none" : "1px solid var(--v2-line)",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                className="font-display"
                style={{
                  margin: 0,
                  fontSize: "clamp(1.05rem, 1.7vw, 1.5rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                  color: "var(--v2-ink)",
                }}
              >
                {s}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
