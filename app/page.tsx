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
      <EditorialWelcome />
      <UnifiedStory />
      <StackingCards />
      <InspiredBy />
      <ExpandingGallery />
      <ReservationCard />
    </div>
  );
}
