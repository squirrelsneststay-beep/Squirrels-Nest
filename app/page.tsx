"use client";

import { useEffect } from "react";
import { CleanHero } from "@/components/v2/CleanHero";
import { EditorialWelcome } from "@/components/v2/EditorialWelcome";
import { InsideTheNest } from "@/components/v2/InsideTheNest";
import { TheSpace } from "@/components/v2/TheSpace";
import { ShepherdsHut } from "@/components/v2/ShepherdsHut";
import { InspiredBy } from "@/components/v2/InspiredBy";
import { Scenery } from "@/components/v2/Scenery";
import { ExpandingGallery } from "@/components/v2/ExpandingGallery";
import { ReservationCard } from "@/components/v2/ReservationCard";
import { InlineBookCTA } from "@/components/v2/InlineBookCTA";
import { HostNote } from "@/components/v2/HostNote";
import { FindingUs } from "@/components/v2/FindingUs";
import { GuestWords } from "@/components/v2/GuestWords";
import { FaqSection } from "@/components/v2/FaqSection";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // Forest base so any gap between fixed hero and the lifting panel reads green.
    <div className="v2-root" style={{ background: "var(--v2-ink)", color: "var(--v2-ink)" }}>
      {/* FIXED HERO — stays pinned to the viewport. The content panel below
          scrolls UP and lays over it (you're "on top" of the home image), and
          the giant wordmark lifts off and flies to the nav (MorphingWordmark).
          z-index 0 keeps it behind everything; the content panels are z-2. */}
      <div
        style={{
          position: "fixed",
          inset: "0 0 auto 0",
          height: "100dvh",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <CleanHero />
      </div>

      {/* Spacer — one viewport tall, so the first screen is the fixed hero and
          the content begins exactly at the fold. */}
      <div aria-hidden style={{ height: "100dvh" }} />

      {/* TOP FOLD — rounded white panel that lifts up over the fixed hero. */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: "var(--v2-bg)",
          borderTopLeftRadius: "clamp(1rem, 3vw, 2.5rem)",
          borderTopRightRadius: "clamp(1rem, 3vw, 2.5rem)",
          boxShadow: "0 -38px 80px -30px rgba(4, 30, 16, 0.55)",
          overflow: "hidden",
        }}
      >
        <EditorialWelcome />
        <InsideTheNest />
        <TheSpace />

        <InlineBookCTA
          headline="A romantic escape, or a quiet one."
          sub="Book direct on Airbnb."
          ctaLabel={["Book", "now"]}
        />

        <ShepherdsHut />
      </div>

      {/* Lower half — kept OUT of the overflow:hidden wrapper so InspiredBy's
          pinned scroll animation works correctly. */}
      <div style={{ position: "relative", zIndex: 2, background: "var(--v2-bg)" }}>
        <Scenery />
        {/* The four sections below are GATED on lib/owner-facts.ts — each
            renders nothing until its facts are confirmed by Zoe, so this
            order ships dark and lights up section by section. Trust
            sequence: place → host → guest proof → objections → the ask. */}
        <FindingUs />
        <HostNote />
        <InspiredBy />
        <ExpandingGallery />
        <GuestWords />
        <FaqSection />
        <ReservationCard />
      </div>
    </div>
  );
}
