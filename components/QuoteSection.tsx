import { ScrollReveal } from "./ScrollReveal";

export function QuoteSection() {
  return (
    <section className="py-24" style={{ background: "var(--lef-cream-soft)" }}>
      <div className="lef-container">
        <ScrollReveal className="max-w-4xl mx-auto text-center" selector="[data-reveal]" stagger={0.1}>
          <p data-reveal className="font-mono-eyebrow mb-12" style={{ color: "var(--lef-bark)" }}>
            006 / Guests
          </p>
          <blockquote
            data-reveal
            className="font-display-italic"
            style={{
              fontSize: "var(--fs-48)",
              color: "var(--lef-forest)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              fontWeight: 400,
            }}
          >
            <span aria-hidden style={{ color: "var(--lef-moss)" }}>“</span>
            We came for two nights and stayed for four. The fire,
            the silence, the long mornings — everything they say it is,
            and a little more.
            <span aria-hidden style={{ color: "var(--lef-moss)" }}>”</span>
          </blockquote>
          <p data-reveal className="mt-10 font-mono-eyebrow" style={{ color: "var(--lef-charcoal)" }}>
            — Recent guest, autumn stay
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
