import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PinnedStack } from "@/components/v2/PinnedStack";
import { SnakeGallery } from "@/components/v2/SnakeGallery";
import { WordLineMoment } from "@/components/v2/WordLineMoment";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

// `/v2` is an internal design-exploration route. Block it from indexing so
// it can't compete with `/` in search results or dilute SEO. Robots.ts also
// disallows the path at the crawler level for double-belt-and-braces.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function V2Page() {
  // Dev-only: a stale design draft must not be publicly reachable on the
  // production domain, noindex or not — anyone with the URL could share it
  // as if it were the real site.
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  return (
    <div className="v2-root" style={{ background: "var(--v2-bg)", color: "var(--v2-ink)", minHeight: "100vh" }}>

      {/* Intro hero — minimal, center-aligned, generous whitespace */}
      <section className="relative flex items-center justify-center" style={{ minHeight: "100vh" }}>
        <div className="v2-container text-center">
          <span className="font-mono-eyebrow block mb-12" style={{ color: "var(--v2-mute)" }}>
            Squirrels&apos; Nest — A converted cabin
          </span>
          <h1
            className="font-display mx-auto"
            style={{
              fontSize: "clamp(3rem, 7vw, 7rem)",
              color: "var(--v2-ink)",
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              fontWeight: 400,
              maxWidth: "16ch",
            }}
          >
            A slow stay at the end of the lane.
          </h1>
          <p
            className="mx-auto mt-12"
            style={{
              fontSize: "1.0625rem",
              color: "var(--v2-ink-soft)",
              lineHeight: 1.55,
              maxWidth: "40ch",
              fontFamily: "var(--font-geist)",
            }}
          >
            Hand-finished. Wood-fired. Set against open English fields and quiet skies.
          </p>

          <div className="mt-16 flex items-center justify-center gap-3">
            <a
              href={AIRBNB_URL}
              {...EXTERNAL_LINK_PROPS}
              className="inline-flex items-center px-6 py-3 rounded-full transition-colors"
              style={{
                background: "var(--v2-ink)",
                color: "var(--v2-bg)",
                fontFamily: "var(--font-geist)",
                fontSize: "0.875rem",
              }}
            >
              Check availability
            </a>
            <a
              href="#tour"
              className="inline-flex items-center px-6 py-3 rounded-full transition-colors"
              style={{
                background: "transparent",
                color: "var(--v2-ink)",
                border: "1px solid var(--v2-line)",
                fontFamily: "var(--font-geist)",
                fontSize: "0.875rem",
              }}
            >
              Tour the cabin
            </a>
          </div>
        </div>
      </section>

      {/* Word — line — word moment */}
      <div id="tour" style={{ scrollMarginTop: "6rem" }}>
        <WordLineMoment />
      </div>

      {/* DEMO 1 — Scroll-pinned image stack */}
      <PinnedStack />

      {/* DEMO 2 — Horizontal snake gallery */}
      <SnakeGallery />

      {/* Final CTA — minimal, center-aligned */}
      <section className="relative flex items-center justify-center py-32">
        <div className="v2-container text-center">
          <h2
            className="font-display mx-auto mb-10"
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
          <a
            href={AIRBNB_URL}
            {...EXTERNAL_LINK_PROPS}
            className="inline-flex items-center px-7 py-3.5 rounded-full"
            style={{
              background: "var(--v2-ink)",
              color: "var(--v2-bg)",
              fontFamily: "var(--font-geist)",
              fontSize: "0.875rem",
            }}
          >
            Book on Airbnb ↗
          </a>
        </div>
      </section>
    </div>
  );
}
