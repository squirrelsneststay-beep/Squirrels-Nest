import { ScrollReveal } from "./ScrollReveal";
import { PlaceholderImage } from "./PlaceholderImage";

const places = [
  { kind: "Walk",     name: "The river path",          dist: "From the door" },
  { kind: "Pub",      name: "The village inn",         dist: "10 min walk" },
  { kind: "Town",     name: "Market town",             dist: "15 min drive" },
  { kind: "View",     name: "Beacon hill",             dist: "25 min drive" },
];

export function AreaGuide() {
  return (
    <section id="area" className="py-24">
      <div className="lef-container">
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-8" selector="[data-reveal]" stagger={0.12}>
          <div data-reveal className="md:col-span-7">
            <p className="font-mono-eyebrow mb-8" style={{ color: "var(--lef-bark)" }}>
              005 / The area
            </p>
            <h2
              className="font-display mb-12"
              style={{
                fontSize: "var(--fs-64)",
                color: "var(--lef-forest)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              Country lanes,
              <span className="italic block" style={{ color: "var(--lef-moss)" }}>
                a slower kind of map.
              </span>
            </h2>

            <ul className="divide-y" style={{ borderColor: "var(--lef-stone)" }}>
              {places.map((p) => (
                <li
                  key={p.name}
                  className="py-6 grid grid-cols-12 items-baseline gap-4"
                  style={{ borderTop: "1px solid var(--lef-stone)" }}
                >
                  <span className="col-span-3 font-mono-eyebrow" style={{ color: "var(--lef-bark)" }}>
                    {p.kind}
                  </span>
                  <span
                    className="col-span-6 font-display"
                    style={{ fontSize: "var(--fs-28)", color: "var(--lef-forest)" }}
                  >
                    {p.name}
                  </span>
                  <span className="col-span-3 text-right font-mono-eyebrow" style={{ color: "var(--lef-charcoal)" }}>
                    {p.dist}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="md:col-span-5 md:sticky md:top-32 self-start">
            <PlaceholderImage label="Local — the river" tone="moss" aspect="3 / 4" />
            <p
              className="mt-6 font-mono-eyebrow"
              style={{ color: "var(--lef-bark)" }}
            >
              A printed guide is left in the cabin.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
