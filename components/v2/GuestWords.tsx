"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { GUEST_REVIEWS, AIRBNB_RATING } from "@/lib/owner-facts";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

/**
 * Social proof — real guest quotes hand-copied from the Airbnb listing,
 * set as quiet EB Garamond pull-quotes. Sits directly above the
 * ReservationCard so trust lands right before the booking ask.
 *
 * GATED: renders nothing until GUEST_REVIEWS is filled in
 * lib/owner-facts.ts. Never invent a quote.
 */
export function GuestWords() {
  if (GUEST_REVIEWS.length === 0) return null;

  return (
    <section
      className="relative"
      style={{ background: "var(--v2-bg)", paddingBlock: "14vh" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "62rem", paddingInline: "clamp(1.5rem, 4vw, 3.5rem)" }}
      >
        <ScrollReveal>
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
            Guest words
          </p>
        </ScrollReveal>

        <div style={{ marginTop: "3.5rem", display: "grid", gap: "4.5rem" }}>
          {GUEST_REVIEWS.map((r, i) => (
            <ScrollReveal key={i} delay={0.05 * i}>
              <figure
                style={{
                  margin: 0,
                  // Alternate left / right so the column doesn't read as a
                  // testimonial card stack.
                  marginLeft: i % 2 === 1 ? "auto" : 0,
                  maxWidth: "44rem",
                  textAlign: i % 2 === 1 ? "right" : "left",
                }}
              >
                <blockquote
                  className="font-display"
                  style={{
                    margin: 0,
                    fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
                    lineHeight: 1.18,
                    letterSpacing: "-0.025em",
                    fontWeight: 400,
                    color: "var(--v2-ink)",
                  }}
                >
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption
                  style={{
                    marginTop: "1rem",
                    fontFamily: "var(--font-geist)",
                    fontSize: "0.85rem",
                    color: "var(--v2-ink-soft)",
                  }}
                >
                  {r.name}
                  {r.date ? `, ${r.date}` : ""} · stayed via Airbnb
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>

        {AIRBNB_RATING && (
          <ScrollReveal delay={0.15}>
            <p
              style={{
                marginTop: "4rem",
                fontFamily: "var(--font-geist)",
                fontSize: "0.95rem",
                color: "var(--v2-ink-soft)",
              }}
            >
              ★ {AIRBNB_RATING.stars.toFixed(1)} from {AIRBNB_RATING.count}{" "}
              guest reviews —{" "}
              <a
                href={AIRBNB_URL}
                {...EXTERNAL_LINK_PROPS}
                style={{
                  textDecoration: "underline",
                  textUnderlineOffset: "0.3em",
                  textDecorationThickness: "1px",
                }}
              >
                read them all on Airbnb
              </a>
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
