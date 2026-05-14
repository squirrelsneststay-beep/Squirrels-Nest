import { PinnedStack } from "@/components/v2/PinnedStack";
import { SnakeGallery } from "@/components/v2/SnakeGallery";
import { WordLineMoment } from "@/components/v2/WordLineMoment";

export default function HomePage() {
  return (
    <div
      className="v2-root"
      style={{ background: "var(--v2-bg)", color: "var(--v2-ink)", minHeight: "100dvh" }}
    >
      {/* HERO — asymmetric split, NOT centered. Variance 8 from design-taste-frontend. */}
      <section
        className="relative grid grid-cols-1 md:grid-cols-12 items-end gap-y-10 md:gap-x-8"
        style={{ minHeight: "100dvh", paddingTop: "12vh", paddingBottom: "8vh" }}
      >
        <div className="v2-container md:col-span-12 md:col-start-1 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8 items-end">
          {/* Left column: headline + body + CTAs */}
          <div className="md:col-span-7 md:col-start-1">
            <span
              className="font-mono-eyebrow block mb-10"
              style={{ color: "var(--v2-mute)" }}
            >
              Lane End Farm — A converted cabin
            </span>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.75rem, 7.5vw, 7rem)",
                color: "var(--v2-ink)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                fontWeight: 400,
                maxWidth: "14ch",
              }}
            >
              A slow stay at the{" "}
              <span
                className="font-display-italic"
                style={{ color: "var(--v2-accent, #4f6b54)" }}
              >
                end
              </span>{" "}
              of the lane.
            </h1>
            <p
              className="mt-10"
              style={{
                fontSize: "1.0625rem",
                color: "var(--v2-ink-soft)",
                lineHeight: 1.6,
                maxWidth: "42ch",
                fontFamily: "var(--font-geist)",
              }}
            >
              Hand-finished. Wood-fired. Set against open English fields and quiet skies.
            </p>
            <div className="mt-14 flex items-center gap-3 flex-wrap">
              <a
                href="#"
                className="lef-pill"
                style={{
                  background: "var(--v2-ink)",
                  color: "var(--v2-bg)",
                }}
              >
                Check availability
              </a>
              <a
                href="#tour"
                className="lef-pill"
                style={{
                  background: "transparent",
                  color: "var(--v2-ink)",
                  border: "1px solid var(--v2-line)",
                }}
              >
                Tour the cabin
              </a>
            </div>
          </div>

          {/* Right column: image placeholder (4/5 portrait) */}
          <div className="md:col-span-5 md:col-start-8 self-end">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "4 / 5",
                background: "#3a463e",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>
      </section>

      {/* Word — line — word moment */}
      <WordLineMoment />

      {/* DEMO 1 — Scroll-pinned image stack */}
      <PinnedStack />

      {/* DEMO 2 — Horizontal snake gallery */}
      <SnakeGallery />

      {/* Final CTA — asymmetric, weighted bottom-right */}
      <section className="relative grid grid-cols-1 md:grid-cols-12 py-32 md:py-48">
        <div className="v2-container md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8 items-end">
          <div className="md:col-span-7 md:col-start-1">
            <span className="font-mono-eyebrow block mb-8" style={{ color: "var(--v2-mute)" }}>
              Bookings
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                color: "var(--v2-ink)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
                fontWeight: 400,
                maxWidth: "14ch",
              }}
            >
              Stay a while.
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:text-right">
            <a
              href="#"
              className="lef-pill"
              style={{ background: "var(--v2-ink)", color: "var(--v2-bg)" }}
            >
              Book on Airbnb ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
