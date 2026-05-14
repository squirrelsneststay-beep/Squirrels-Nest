import { ScrollReveal } from "./ScrollReveal";
import { PlaceholderImage } from "./PlaceholderImage";

export function AboutSection() {
  return (
    <section id="story" className="py-24">
      <div className="lef-container">
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-8 items-center" selector="[data-reveal]" stagger={0.15}>
          <div data-reveal className="md:col-span-5 md:col-start-1">
            <PlaceholderImage label="Working farm — fields" tone="moss" aspect="4 / 5" />
          </div>

          <div data-reveal className="md:col-span-6 md:col-start-7">
            <p className="font-mono-eyebrow mb-8" style={{ color: "var(--lef-bark)" }}>
              003 / Our story
            </p>
            <h2
              className="font-display mb-10"
              style={{
                fontSize: "var(--fs-48)",
                color: "var(--lef-forest)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              The cabin sits at the end of a long lane —
              <span className="italic" style={{ color: "var(--lef-moss)" }}> a working farm, a quieter rhythm.</span>
            </h2>
            <div
              className="space-y-6 max-w-prose"
              style={{
                fontSize: "var(--fs-18)",
                color: "var(--lef-charcoal)",
                lineHeight: 1.6,
              }}
            >
              <p>
                We rebuilt it ourselves — slowly, off the back of the farm —
                using local timber, hand-finished surfaces, and the kind of
                small decisions you only make when nobody is rushing you.
              </p>
              <p>
                What you arrive to is exactly what we wanted for our own breaks:
                a wood-burner, deep silence after dark, a kitchen worth cooking
                in, and a view that resets you within the first morning.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
