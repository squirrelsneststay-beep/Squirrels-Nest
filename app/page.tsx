"use client";

import { useEffect } from "react";
import { CleanHero } from "@/components/v2/CleanHero";
import { EditorialWelcome } from "@/components/v2/EditorialWelcome";
import { InsideTheNest } from "@/components/v2/InsideTheNest";
import { ShepherdsHut } from "@/components/v2/ShepherdsHut";
import { EveryDetail } from "@/components/v2/EveryDetail";
import { InspiredBy } from "@/components/v2/InspiredBy";
import { ExpandingGallery } from "@/components/v2/ExpandingGallery";
import { ReservationCard } from "@/components/v2/ReservationCard";
import { InlineBookCTA } from "@/components/v2/InlineBookCTA";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="v2-root" style={{ background: "var(--v2-bg)", color: "var(--v2-ink)" }}>
      <CleanHero />
      <EditorialWelcome />

      {/* Replaces the old pinned dark monologue. Editorial room-by-room
          grid with alternating photo placement. */}
      <InsideTheNest />

      {/* First inline CTA — between the rooms grid and the moments list. */}
      <InlineBookCTA
        headline="Book a night. Stay a week. No minimum."
        sub="The lodge is on Airbnb."
        ctaLabel={["Book", "now"]}
      />

      {/* Synced-scroll moments list — large photo, scroll syncs which
          item is active and which photo is shown. */}
      <EveryDetail />

      {/* The separate shepherd's hut — a quiet second moment, kept apart from
          the hut card in the rooms grid so the mention is spread out. */}
      <ShepherdsHut />

      <InspiredBy />
      <ExpandingGallery />

      {/* Second inline CTA — after the gallery, before the reservation
          card. Dark tone to mirror the moody reservation section that
          follows it. */}
      <InlineBookCTA
        tone="dark"
        headline="Want to see them in person?"
        sub="Sleep the night, take a piece home."
        ctaLabel={["Book", "a stay"]}
      />

      <ReservationCard />
    </div>
  );
}
