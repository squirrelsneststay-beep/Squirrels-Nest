"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/v2/Reveal";

/**
 * A teaser for the full gallery — a few frames in a staggered editorial row
 * with a large invitation to see the rest. Each frame wipes in on scroll.
 */
const TEASER = [
  { src: "sq-12.jpg", alt: "The super king bed with its red headboard", tall: true },
  { src: "sq-08.jpg", alt: "The private courtyard with its bistro table", tall: false },
  { src: "sq-30.jpg", alt: "The chandelier against deep-red plaster", tall: true },
  { src: "sq-18.jpg", alt: "The sitting room with yellow velvet chairs", tall: false },
  { src: "sq-37.jpg", alt: "The kitchen window", tall: true },
  { src: "sq-20.jpg", alt: "Brass taps and a fresh flower", tall: false },
];

export function GalleryTeaser() {
  return (
    <section
      style={{
        background: "var(--v2-bg)",
        color: "var(--v2-ink)",
        paddingBlock: "clamp(6rem, 15vh, 13rem)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "84rem", paddingInline: "clamp(1.5rem, 4vw, 4rem)" }}>
        <Reveal>
          <div
            className="gt-head"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
              marginBottom: "clamp(2.5rem, 5vw, 4rem)",
              flexWrap: "wrap",
            }}
          >
            <h2
              className="font-display"
              style={{
                margin: 0,
                fontSize: "clamp(2.2rem, 5vw, 4.6rem)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                maxWidth: "14ch",
              }}
            >
              Have a{" "}
              <span style={{ fontStyle: "italic", color: "var(--v2-ink-soft)" }}>
                look around.
              </span>
            </h2>
            <Link
              href="/gallery"
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "0.84rem",
                letterSpacing: "0.04em",
                color: "var(--v2-ink)",
                textDecoration: "none",
                borderBottom: "1px solid color-mix(in srgb, var(--v2-ink) 40%, transparent)",
                paddingBottom: "0.25rem",
                whiteSpace: "nowrap",
              }}
            >
              See the full gallery &rarr;
            </Link>
          </div>
        </Reveal>

        <div
          className="gt-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
            alignItems: "start",
          }}
        >
          {TEASER.map((p, i) => (
            <Reveal
              key={p.src}
              imgWipe
              delay={i * 0.08}
              style={{
                borderRadius: "4px",
                marginTop: i % 2 === 1 ? "clamp(1.5rem, 5vw, 4rem)" : 0,
              }}
            >
              <span style={{ position: "relative", display: "block", aspectRatio: p.tall ? "3 / 4" : "1 / 1", borderRadius: "4px", overflow: "hidden" }}>
                <Image
                  src={`/images/squirrels-nest/${p.src}`}
                  alt={`${p.alt} — Squirrels' Nest`}
                  fill
                  sizes="(max-width: 880px) 50vw, 22vw"
                  style={{ objectFit: "cover" }}
                />
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
