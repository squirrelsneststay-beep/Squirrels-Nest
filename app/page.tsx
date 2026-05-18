"use client";

import { useEffect } from "react";
import { CleanHero } from "@/components/v2/CleanHero";
import { EditorialWelcome } from "@/components/v2/EditorialWelcome";
import { UnifiedStory } from "@/components/v2/UnifiedStory";
import { StackingCards } from "@/components/v2/StackingCards";
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
      <UnifiedStory />

      {/* First inline CTA — straight after the dark photographic monologue,
          before the cards. Cream tone, plum pill. */}
      <InlineBookCTA
        headline="Book a night. Stay a week. No minimum."
        sub="The lodge is on Airbnb."
        ctaLabel={["Book", "now"]}
      />

      <StackingCards />
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
