"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { FAQS } from "@/lib/owner-facts";

/**
 * The practical answers a guest needs before committing: check-in, dogs,
 * the hut, parking, wifi. Native <details>/<summary> — keyboard and screen
 * reader accessible with zero JS, styled to the site's hairline language.
 * Sits right above the ReservationCard so objections die before the ask.
 *
 * GATED: renders nothing until FAQS is filled in lib/owner-facts.ts with
 * Zoe's real answers.
 */
export function FaqSection() {
  if (FAQS.length === 0) return null;

  return (
    <section
      className="relative"
      style={{ background: "var(--v2-bg)", paddingBlock: "12vh" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "46rem", paddingInline: "clamp(1.5rem, 4vw, 3.5rem)" }}
      >
        <ScrollReveal>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              margin: 0,
              color: "var(--v2-ink)",
            }}
          >
            Good to know.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div style={{ marginTop: "3rem", borderTop: "1px solid var(--v2-line)" }}>
            {FAQS.map((f) => (
              <details
                key={f.question}
                className="faq-item"
                style={{ borderBottom: "1px solid var(--v2-line)" }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "1.5rem",
                    paddingBlock: "1.25rem",
                    fontFamily: "var(--font-geist)",
                    fontSize: "1rem",
                    color: "var(--v2-ink)",
                  }}
                >
                  <span>{f.question}</span>
                  <span
                    aria-hidden
                    className="faq-marker"
                    style={{ color: "var(--v2-mute)", fontSize: "1.1rem" }}
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    margin: 0,
                    paddingBottom: "1.5rem",
                    fontFamily: "var(--font-geist)",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    color: "var(--v2-ink-soft)",
                    maxWidth: "38rem",
                  }}
                >
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
