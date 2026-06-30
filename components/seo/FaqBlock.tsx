import { Reveal } from "@/components/v2/Reveal";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * A visible FAQ that also emits FAQPage structured data, so the questions can
 * appear as rich results in Google. Keep answers factual and evergreen — this
 * is public-facing and indexed.
 */
export function FaqBlock({ heading = "Good to know", items }: { heading?: string; items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section style={{ marginTop: "clamp(3.5rem, 9vh, 6rem)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <Reveal>
        <h2
          className="font-display"
          style={{
            margin: 0,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontWeight: 400,
          }}
        >
          {heading}
        </h2>
      </Reveal>
      <dl style={{ margin: "clamp(1.8rem, 4vh, 2.6rem) 0 0" }}>
        {items.map((it, i) => (
          <Reveal key={it.q} delay={0.04 * i}>
            <div
              style={{
                paddingBlock: "clamp(1.2rem, 3vh, 1.8rem)",
                borderTop: "1px solid var(--v2-line)",
              }}
            >
              <dt
                className="font-display"
                style={{
                  margin: 0,
                  fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
                  letterSpacing: "-0.015em",
                  fontWeight: 400,
                  color: "var(--v2-ink)",
                }}
              >
                {it.q}
              </dt>
              <dd
                style={{
                  margin: "0.6rem 0 0",
                  fontFamily: "var(--font-geist)",
                  fontSize: "1.04rem",
                  lineHeight: 1.65,
                  color: "var(--v2-ink-soft)",
                }}
              >
                {it.a}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
