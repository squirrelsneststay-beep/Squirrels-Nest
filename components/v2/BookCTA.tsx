"use client";

import { Reveal } from "@/components/v2/Reveal";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

/**
 * A simple, centred "Book now" call-to-action band, dropped between sections
 * to keep the booking prompt within reach as you scroll. Outline pill in the
 * Playfair display face, matching the floating CTA.
 */
export function BookCTA({ line }: { line: string }) {
  return (
    <section style={{ background: "var(--v2-bg)", color: "var(--v2-ink)", paddingBlock: "clamp(4rem, 10vh, 8rem)" }}>
      <Reveal>
        <div className="mx-auto text-center" style={{ maxWidth: "40rem", paddingInline: "clamp(1.5rem, 4vw, 3.5rem)" }}>
          <h2
            className="font-display"
            style={{
              margin: 0,
              fontSize: "clamp(1.8rem, 3.6vw, 3rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              fontWeight: 400,
            }}
          >
            {line}
          </h2>
          <a
            href={AIRBNB_URL}
            {...EXTERNAL_LINK_PROPS}
            className="sv-pill is-inverse"
            style={{ marginTop: "1.75rem" }}
          >
            Book now
          </a>
        </div>
      </Reveal>
    </section>
  );
}
