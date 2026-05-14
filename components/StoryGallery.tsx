import { ScrollReveal } from "./ScrollReveal";
import { PlaceholderImage } from "./PlaceholderImage";

export function StoryGallery() {
  return (
    <section id="property" className="pt-16 pb-24" style={{ background: "var(--lef-cream-soft)" }}>
      <div className="lef-container">
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-8 mb-20" selector="[data-reveal]">
          <p
            data-reveal
            className="md:col-span-3 font-mono-eyebrow self-start pt-4"
            style={{ color: "var(--lef-bark)" }}
          >
            002 / The Property
          </p>
          <h2
            data-reveal
            className="md:col-span-9 font-display"
            style={{
              fontSize: "var(--fs-64)",
              color: "var(--lef-forest)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            Built honestly,
            <span className="italic block" style={{ color: "var(--lef-moss)" }}>
              one piece of timber at a time.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal className="grid grid-cols-1 md:grid-cols-12 gap-6" selector="[data-reveal]" stagger={0.12}>
          <div data-reveal className="md:col-span-7">
            <PlaceholderImage label="Exterior — wide" tone="forest" aspect="16 / 11" />
          </div>
          <div data-reveal className="md:col-span-5 self-end">
            <PlaceholderImage label="Detail — fireplace" tone="bark" aspect="4 / 5" />
          </div>
          <div data-reveal className="md:col-span-4 md:col-start-2 mt-16">
            <PlaceholderImage label="Interior — kitchen" tone="stone" aspect="4 / 5" />
          </div>
          <div data-reveal className="md:col-span-6 md:col-start-7 mt-16">
            <PlaceholderImage label="Interior — wide" tone="moss" aspect="16 / 11" />
          </div>
          <div data-reveal className="md:col-span-5 md:col-start-3 mt-16">
            <PlaceholderImage label="Bedroom — soft light" tone="rust" aspect="3 / 4" />
          </div>
          <div data-reveal className="md:col-span-4 md:col-start-9 mt-16">
            <PlaceholderImage label="Outdoor — table" tone="forest" aspect="3 / 4" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
