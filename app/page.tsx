"use client";

import { useEffect } from "react";
import { CleanHero } from "@/components/v2/CleanHero";
import { StatementIntro } from "@/components/v2/StatementIntro";
import { StatBand } from "@/components/v2/StatBand";
import { InsideTheNest } from "@/components/v2/InsideTheNest";
import { Amenities } from "@/components/v2/Amenities";
import { CinematicBreak } from "@/components/v2/CinematicBreak";
import { Experiences } from "@/components/v2/Experiences";
import { LocationMap } from "@/components/v2/LocationMap";
import { ShepherdsHut } from "@/components/v2/ShepherdsHut";
import { GalleryTeaser } from "@/components/v2/GalleryTeaser";
import { GuestWords } from "@/components/v2/GuestWords";
import { FaqSection } from "@/components/v2/FaqSection";
import { HostNote } from "@/components/v2/HostNote";
import { ReservationCard } from "@/components/v2/ReservationCard";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="v2-root" style={{ background: "var(--v2-ink)", color: "var(--v2-ink)" }}>
      {/* FIXED HERO — booking-led: name, statement, "Check availability" CTA. */}
      <div style={{ position: "fixed", inset: "0 0 auto 0", height: "100dvh", zIndex: 0, overflow: "hidden" }}>
        <CleanHero />
      </div>
      <div aria-hidden style={{ height: "100dvh" }} />

      {/* CONTENT — a structured, hotel-style flow that lifts over the hero. */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: "var(--v2-bg)",
          borderTopLeftRadius: "clamp(1rem, 3vw, 2.5rem)",
          borderTopRightRadius: "clamp(1rem, 3vw, 2.5rem)",
          boxShadow: "0 -40px 80px -30px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
      >
        <StatementIntro />
        <StatBand />
        <InsideTheNest />
        <Amenities />
        <CinematicBreak />
        <Experiences />
        <LocationMap />
        <ShepherdsHut />
        <GalleryTeaser />
        {/* Gated on owner-facts — appear once Zoe confirms them. */}
        <GuestWords />
        <FaqSection />
        <HostNote />
        <ReservationCard />
      </div>
    </div>
  );
}
