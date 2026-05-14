import { ScrollReveal } from "./ScrollReveal";
import { Button } from "./Button";

export function BookCTA() {
  return (
    <section
      id="book"
      className="py-40"
      style={{ background: "var(--lef-rust)", color: "var(--lef-cream)" }}
    >
      <div className="lef-container">
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8 items-end" selector="[data-reveal]" stagger={0.1}>
          <div data-reveal className="md:col-span-8">
            <p className="font-mono-eyebrow mb-8" style={{ color: "color-mix(in srgb, var(--lef-cream) 70%, transparent)" }}>
              007 / Book a stay
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "var(--fs-96)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              Two nights,
              <span className="italic block">a lot less to think about.</span>
            </h2>
          </div>

          <div data-reveal className="md:col-span-4 md:pb-6">
            <p
              className="mb-8"
              style={{
                fontSize: "var(--fs-18)",
                color: "color-mix(in srgb, var(--lef-cream) 85%, transparent)",
                lineHeight: 1.55,
              }}
            >
              Availability is managed on Airbnb. Tap through to see live dates,
              pricing, and to confirm your stay.
            </p>
            <Button
              variant="forest"
              href="https://www.airbnb.co.uk/"
              className="!bg-[var(--lef-forest)] !text-[var(--lef-cream)] hover:!bg-[var(--lef-charcoal)]"
            >
              Book on Airbnb ↗
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
