"use client";

import { useEffect } from "react";
import { CleanHero } from "@/components/v2/CleanHero";
import { EditorialWelcome } from "@/components/v2/EditorialWelcome";
import { InsideTheNest } from "@/components/v2/InsideTheNest";
import { ShepherdsHut } from "@/components/v2/ShepherdsHut";
import { InspiredBy } from "@/components/v2/InspiredBy";
import { ExpandingGallery } from "@/components/v2/ExpandingGallery";
import { ReservationCard } from "@/components/v2/ReservationCard";
import { InlineBookCTA } from "@/components/v2/InlineBookCTA";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // Dark-green base so the rounded fold reveals green behind it as the
    // content panel lifts over the hero (Framer-style page overlap).
    <div className="v2-root" style={{ background: "var(--v2-ink)", color: "var(--v2-ink)" }}>
      <CleanHero />

      {/* TOP FOLD — the editorial sections sit in a rounded white panel that
          lifts UP and over the bottom of the hero (negative margin + rounded
          top + upward shadow). overflow:hidden is safe here because none of
          these sections use a ScrollTrigger pin. */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "calc(-1 * clamp(1rem, 3vw, 2.25rem))",
          background: "var(--v2-bg)",
          borderTopLeftRadius: "clamp(1rem, 3vw, 2.5rem)",
          borderTopRightRadius: "clamp(1rem, 3vw, 2.5rem)",
          boxShadow: "0 -34px 70px -34px rgba(16, 61, 46, 0.45)",
          overflow: "hidden",
        }}
      >
        <EditorialWelcome />
        <InsideTheNest />

        <InlineBookCTA
          headline="A romantic escape, or a quiet one."
          sub="Book direct on Airbnb."
          ctaLabel={["Book", "now"]}
        />

        <ShepherdsHut />
      </div>

      {/* Lower half — kept OUT of the overflow:hidden wrapper so InspiredBy's
          pinned scroll animation works correctly. */}
      <div style={{ position: "relative", zIndex: 1, background: "var(--v2-bg)" }}>
        <InspiredBy />
        <ExpandingGallery />
        <ReservationCard />
      </div>
    </div>
  );
}
