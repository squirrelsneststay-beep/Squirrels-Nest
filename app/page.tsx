"use client";

import { useEffect } from "react";
import { CleanHero } from "@/components/v2/CleanHero";
import { StatementIntro } from "@/components/v2/StatementIntro";
import { StatBand } from "@/components/v2/StatBand";
import { InsideTheNest } from "@/components/v2/InsideTheNest";
import { CinematicBreak } from "@/components/v2/CinematicBreak";
import { ShepherdsHut } from "@/components/v2/ShepherdsHut";
import { Scenery } from "@/components/v2/Scenery";
import { GalleryTeaser } from "@/components/v2/GalleryTeaser";
import { ReservationCard } from "@/components/v2/ReservationCard";
import { HostNote } from "@/components/v2/HostNote";
import { FindingUs } from "@/components/v2/FindingUs";
import { GuestWords } from "@/components/v2/GuestWords";
import { FaqSection } from "@/components/v2/FaqSection";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="v2-root" style={{ background: "var(--v2-ink)", color: "var(--v2-ink)" }}>
      {/* FIXED HERO — pinned to the viewport; the content panel scrolls up over
          it. The giant photo drifts (Ken-Burns) and the slideshow crossfades. */}
      <div style={{ position: "fixed", inset: "0 0 auto 0", height: "100dvh", zIndex: 0, overflow: "hidden" }}>
        <CleanHero />
      </div>

      {/* One-viewport spacer so the first screen IS the hero. */}
      <div aria-hidden style={{ height: "100dvh" }} />

      {/* CONTENT — a single dark panel that lifts up over the fixed hero. */}
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
        <CinematicBreak />
        <ShepherdsHut />
        <Scenery />
        {/* Gated on owner-facts — render nothing until Zoe confirms them. */}
        <FindingUs />
        <HostNote />
        <GuestWords />
        <FaqSection />
        <GalleryTeaser />
        <ReservationCard />
      </div>
    </div>
  );
}
