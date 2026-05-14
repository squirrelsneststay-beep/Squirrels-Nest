import { ScrollReveal } from "./ScrollReveal";

const amenities = [
  { n: "01", title: "Wood-burning stove",      copy: "Logs included. Lit and warm within twenty minutes of arrival." },
  { n: "02", title: "Full kitchen",            copy: "Gas hob, oven, Nespresso, cast iron, knives that actually cut." },
  { n: "03", title: "Two bedrooms",            copy: "King in the main, twin in the second. Linen pressed and changed." },
  { n: "04", title: "Outdoor seating",         copy: "Sheltered table, fire pit, uninterrupted view across the field." },
  { n: "05", title: "Working farm access",     copy: "Walk the lanes, meet the animals, lend a hand if you'd like to." },
  { n: "06", title: "Pet-friendly",            copy: "Dogs welcome. Towels by the door, water bowls in the kitchen." },
];

export function AmenitiesGrid() {
  return (
    <section className="py-24" style={{ background: "var(--lef-forest)", color: "var(--lef-cream)" }}>
      <div className="lef-container">
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 mb-20" selector="[data-reveal]">
          <p data-reveal className="md:col-span-3 font-mono-eyebrow self-start pt-4" style={{ color: "var(--lef-stone)" }}>
            004 / What's inside
          </p>
          <h2
            data-reveal
            className="md:col-span-9 font-display"
            style={{
              fontSize: "var(--fs-64)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            Everything you need.
            <span className="italic block" style={{ color: "color-mix(in srgb, var(--lef-moss) 70%, var(--lef-cream))" }}>
              Nothing you don't.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-12" selector="[data-reveal]" stagger={0.1}>
          {amenities.map((a) => (
            <div key={a.n} data-reveal className="border-t pt-8" style={{ borderColor: "color-mix(in srgb, var(--lef-stone) 25%, transparent)" }}>
              <p className="font-mono-eyebrow mb-6" style={{ color: "var(--lef-stone)" }}>
                {a.n}
              </p>
              <h3
                className="font-display mb-4"
                style={{
                  fontSize: "var(--fs-36)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                }}
              >
                {a.title}
              </h3>
              <p style={{ fontSize: "var(--fs-16)", color: "var(--lef-stone)", lineHeight: 1.6 }}>
                {a.copy}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
