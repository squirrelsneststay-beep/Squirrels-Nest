"use client";

import { useEffect } from "react";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import { FromToMoment } from "@/components/v2/FromToMoment";
import { CenteredQuiet } from "@/components/v2/CenteredQuiet";
import { VerticalStackReveal } from "@/components/v2/VerticalStackReveal";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="v2-root" style={{ background: "var(--v2-bg)", color: "var(--v2-ink)" }}>
      {/* 1. Smooth scroll hero — clip-path slowly expands a photo as you scroll */}
      <SmoothScrollHero
        scrollHeight={3200}
        desktopImage="/images/squirrels-nest/sq-01.jpg"
        mobileImage="/images/squirrels-nest/sq-15.jpg"
        initialClipPercentage={20}
        finalClipPercentage={80}
      />

      {/* 2. Centered editorial intro */}
      <CenteredQuiet
        eyebrow="Lane End Farm"
        body="A converted cabin on a working farm,"
        italicTail="where the lane runs out."
      />

      {/* 3. From → To #1 */}
      <FromToMoment
        image="/images/squirrels-nest/sq-05.jpg"
        alt="The lane at Lane End Farm"
        labelLeft="From the road"
        labelRight="to the lane"
        subline="The drive feels longer than it is."
        italicTail="By the time you arrive, the world has already gone quiet."
      />

      {/* 4. Centered moment */}
      <CenteredQuiet
        eyebrow="The cabin"
        body="Hand-finished pine, a wood-burning stove,"
        italicTail="and a window worth sitting at."
      />

      {/* 5. From → To #2 */}
      <FromToMoment
        image="/images/squirrels-nest/sq-08.jpg"
        alt="The cabin exterior"
        labelLeft="From the door"
        labelRight="to the hearth"
        subline="Logs split. Stove lit on arrival."
        italicTail="Twenty minutes from cold to warm."
      />

      {/* 6. Centered moment */}
      <CenteredQuiet
        eyebrow="The land"
        body="Three years of work, by hand, on the same patch of ground."
        italicTail="It's still going."
      />

      {/* 7. From → To #3 */}
      <FromToMoment
        image="/images/squirrels-nest/sq-18.jpg"
        alt="Two velvet chairs by the window"
        labelLeft="From the field"
        labelRight="to the fire"
        subline="Walk the lanes at first light. Meet the sheep."
        italicTail="Come back when you're cold."
      />

      {/* 8. Centered moment */}
      <CenteredQuiet
        eyebrow="What you'll find"
        body="No traffic. No signal worth checking."
        italicTail="Just the field, the fire, and a slower kind of evening."
      />

      {/* 9. Vertical stack — Without traffic / signal / noise */}
      <VerticalStackReveal />

      {/* 10. From → To #4 */}
      <FromToMoment
        image="/images/squirrels-nest/sq-12.jpg"
        alt="The bedroom at Lane End Farm"
        labelLeft="From the night"
        labelRight="to the morning"
        subline="Wake to mist on the field."
        italicTail="A pot of coffee, the door wide open."
      />

      {/* 11. Centered moment — final reflection */}
      <CenteredQuiet
        eyebrow="Stays at Lane End Farm"
        body="Two nights, four nights,"
        italicTail="long enough to feel the difference."
      />

      {/* 12. Final CTA */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-40 md:py-56 px-6"
        style={{ background: "var(--v2-bg)" }}
      >
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
          Bookings
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
