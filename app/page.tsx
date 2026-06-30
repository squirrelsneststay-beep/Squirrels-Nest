"use client";

import { useEffect } from "react";
import { CleanHero } from "@/components/v2/CleanHero";
import { StatementIntro } from "@/components/v2/StatementIntro";
import { StatBand } from "@/components/v2/StatBand";
import { TheSpaceRooms } from "@/components/v2/TheSpaceRooms";
import { Amenities } from "@/components/v2/Amenities";
import { CinematicBreak } from "@/components/v2/CinematicBreak";
import { Experiences } from "@/components/v2/Experiences";
import { LocationMap } from "@/components/v2/LocationMap";
import { ShepherdsHut } from "@/components/v2/ShepherdsHut";
import { BookCTA } from "@/components/v2/BookCTA";
import { InspiredBy } from "@/components/v2/InspiredBy";
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
      {/* FIXED HERO */}
      <div style={{ position: "fixed", inset: "0 0 auto 0", height: "100dvh", zIndex: 0, overflow: "hidden" }}>
        <CleanHero />
      </div>
      <div aria-hidden style={{ height: "100dvh" }} />

      {/* TOP PANEL — clipped (rounded top) panel that lifts over the hero. */}
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
        <TheSpaceRooms />
        <Amenities />
        <BookCTA line="Book your stay." />
        <CinematicBreak />
        <Experiences />
        <LocationMap />
        <ShepherdsHut />
        <BookCTA line="A weekend in Berkshire awaits." />
      </div>

      {/* LOWER PANEL — NOT clipped, so InspiredBy's pinned scroll works. */}
      <div style={{ position: "relative", zIndex: 2, background: "var(--v2-bg)" }}>
        <InspiredBy />
        <GalleryTeaser />
        {/* Gated on owner-facts. */}
        <GuestWords />
        <FaqSection />
        <HostNote />
        <ReservationCard />
      </div>
    </div>
  );
}
