"use client";

import { useEffect } from "react";
import { CleanHero } from "@/components/v2/CleanHero";
import { EditorialWelcome } from "@/components/v2/EditorialWelcome";
import { UnifiedStory } from "@/components/v2/UnifiedStory";
import { StackingCards } from "@/components/v2/StackingCards";
import { InspiredBy } from "@/components/v2/InspiredBy";
import { ExpandingGallery } from "@/components/v2/ExpandingGallery";
import { ReservationCard } from "@/components/v2/ReservationCard";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="v2-root" style={{ background: "var(--v2-bg)", color: "var(--v2-ink)" }}>
      <CleanHero />
      {/* Everything below the hero sits at z-index 2+ with a solid bg, so
          natural scroll makes them slide UP and COVER the sticky hero. The
          hero stays fixed while the next section "draws a curtain" over it. */}
      <div style={{ position: "relative", zIndex: 2, background: "var(--v2-bg)" }}>
      <EditorialWelcome />
      <UnifiedStory />
      <StackingCards />
      <InspiredBy />
      <ExpandingGallery />
      <ReservationCard />
      </div>
    </div>
  );
}
