"use client";

import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

/**
 * Inline Book CTA — a self-contained section that drops between content
 * sections as a hard call-to-action moment. Two visual modes:
 *
 *   "cream" — cream bg + plum pill. Goes between light editorial sections.
 *   "dark"  — plum bg + cream pill. Goes after dark photographic moments
 *             to mirror the section before it without a hard cut.
 *
 * Single line of copy + one big pill. No decoration. Conversion only.
 */

type Tone = "cream" | "dark";

interface Props {
  /** Headline above the pill (one line, short) */
  headline: string;
  /** Sub-line below the headline (optional, italic) */
  sub?: string;
  /** Pill label fragments, joined by the hairline connector */
  ctaLabel?: [string, string];
  tone?: Tone;
}

export function InlineBookCTA({
  headline,
  sub,
  ctaLabel = ["Book", "a night"],
  tone = "cream",
}: Props) {
  const isDark = tone === "dark";
  return (
    <section
      data-section-tone={isDark ? "dark" : undefined}
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        background: isDark ? "var(--v2-ink)" : "var(--v2-bg)",
        color: isDark ? "var(--v2-bg)" : "var(--v2-ink)",
        paddingBlock: "clamp(6rem, 12vh, 10rem)",
        paddingInline: "clamp(1.5rem, 4vw, 4rem)",
      }}
    >
      <h2
        className="font-display"
        style={{
          fontSize: "clamp(2rem, 4.5vw, 4rem)",
          lineHeight: 1.04,
          letterSpacing: "-0.03em",
          fontWeight: 400,
          margin: 0,
          maxWidth: "34ch",
          textWrap: "balance",
        }}
      >
        {headline}
      </h2>
      {sub && (
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(1.25rem, 2vw, 1.8rem)",
            letterSpacing: "-0.02em",
            opacity: 0.78,
            margin: "1rem 0 0",
            maxWidth: "40ch",
          }}
        >
          {sub}
        </p>
      )}
      <a
        href={AIRBNB_URL}
        {...EXTERNAL_LINK_PROPS}
        data-magnetic
        className={`sv-pill ${isDark ? "" : "is-inverse"}`}
        style={{
          marginTop: "2.5rem",
          height: "52px",
          padding: "0 1.8rem",
          fontSize: "0.95rem",
          fontWeight: 500,
          letterSpacing: "0.02em",
          ...(isDark
            ? {
                background: "var(--v2-accent)",
                color: "#103d2e",
                borderColor: "var(--v2-accent)",
              }
            : {}),
        }}
      >
        <span>{ctaLabel[0]}</span>
        <span className="sv-pill-rule" aria-hidden style={{ width: "1.75rem" }} />
        <span>{ctaLabel[1]}</span>
      </a>
    </section>
  );
}
