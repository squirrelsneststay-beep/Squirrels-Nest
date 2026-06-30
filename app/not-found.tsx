import type { Metadata } from "next";
import Link from "next/link";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      style={{
        background: "var(--v2-bg)",
        color: "var(--v2-ink)",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingInline: "clamp(1.5rem, 4vw, 3.5rem)",
      }}
    >
      <div style={{ maxWidth: "34rem" }}>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-geist)",
            fontSize: "0.78rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--v2-mute)",
          }}
        >
          Error 404
        </p>
        <h1
          className="font-display"
          style={{
            margin: "1.1rem 0 0",
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            fontWeight: 400,
          }}
        >
          Lost in{" "}
          <span style={{ fontStyle: "italic", color: "var(--v2-ink-soft)" }}>the woods.</span>
        </h1>
        <p
          style={{
            margin: "1.4rem auto 0",
            maxWidth: "40ch",
            fontFamily: "var(--font-geist)",
            fontSize: "1.08rem",
            lineHeight: 1.65,
            color: "var(--v2-ink-soft)",
          }}
        >
          This page seems to have wandered off the path. Let us get you back to the cabin.
        </p>
        <div
          style={{
            marginTop: "2.2rem",
            display: "flex",
            gap: "0.9rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" className="sv-pill is-inverse">
            Back to the cabin
          </Link>
          <Link href="/journal" className="sv-pill">
            Read the journal
          </Link>
          <a href={AIRBNB_URL} {...EXTERNAL_LINK_PROPS} className="sv-pill">
            Book on Airbnb
          </a>
        </div>
      </div>
    </main>
  );
}
