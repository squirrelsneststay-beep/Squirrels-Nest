"use client";

import { useEffect } from "react";
import { CleanHero } from "@/components/v2/CleanHero";
import { SignatureFromTo } from "@/components/v2/SignatureFromTo";
import { CardDeckStack } from "@/components/v2/CardDeckStack";
import { MultiPhotoGrid } from "@/components/v2/MultiPhotoGrid";
import { VerticalStackReveal } from "@/components/v2/VerticalStackReveal";
import { SnakeGallery } from "@/components/v2/SnakeGallery";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="v2-root" style={{ background: "var(--v2-bg)", color: "var(--v2-ink)" }}>
      {/* 1. Clean typographic hero — big "Squirrels' Nest" + two small floating photos */}
      <CleanHero />

      {/* 2. ONE signature From → To moment — curved hand-drawn line, BLURRED photo backdrop */}
      <SignatureFromTo />

      {/* 3. Card-deck stack — images flip over each other (saltsaun pattern) */}
      <CardDeckStack />

      {/* 4. Multi-photo grid — multiple small/medium centered photos, not full-bleed */}
      <MultiPhotoGrid />

      {/* 5. Without traffic / signal / noise — small sans, dark BLURRED photo */}
      <VerticalStackReveal />

      {/* 6. Snake horizontal gallery */}
      <SnakeGallery />

      {/* 7. Final centered CTA */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{ background: "var(--v2-bg)", minHeight: "70vh", paddingBlock: "12vh" }}
      >
        <div
          className="mx-auto"
          style={{
            width: "2rem",
            height: "1px",
            background: "var(--v2-mute)",
            marginBottom: "1.25rem",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.75rem",
            color: "var(--v2-mute)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          06 — Bookings
        </span>
        <h2
          className="font-display mb-10"
          style={{
            fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
            color: "var(--v2-ink)",
            lineHeight: 1,
            letterSpacing: "-0.025em",
            fontWeight: 400,
            maxWidth: "16ch",
          }}
        >
          Stay a while.
        </h2>
        <a
          href="#"
          className="lef-pill-sm"
          style={{ background: "var(--v2-ink)", color: "var(--v2-bg)" }}
        >
          Book on Airbnb ↗
        </a>
      </section>
    </div>
  );
}
