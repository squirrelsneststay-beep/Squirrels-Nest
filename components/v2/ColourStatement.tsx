"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircledWord } from "@/components/v2/CircledWord";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ColourStatement — a loud, full-bleed YELLOW block with oversized green type.
 * A bold colour beat between the photo sections; the headline lines rise as it
 * enters and the whole head drifts a touch on scroll.
 */
export function ColourStatement() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.from(".cs-line", {
        yPercent: 120,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      });
      gsap.from(".cs-sub", {
        opacity: 0,
        y: 16,
        duration: 1,
        delay: 0.35,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
      if (reduced) return;
      gsap.to(".cs-head", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      style={{
        background: "var(--v2-accent)",
        color: "#103d2e",
        paddingBlock: "clamp(6rem, 16vh, 13rem)",
        paddingInline: "clamp(1.5rem, 5vw, 5rem)",
        overflow: "hidden",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "90rem" }}>
        <p
          className="cs-sub"
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            margin: "0 0 clamp(1.5rem, 3vh, 2.5rem)",
            opacity: 0.7,
          }}
        >
          Take it home
        </p>
        <h2
          className="cs-head font-display"
          style={{
            fontSize: "clamp(3rem, 11vw, 12rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            fontWeight: 700,
            margin: 0,
          }}
        >
          <span className="block overflow-hidden">
            <span className="cs-line block">Everything is</span>
          </span>
          <span className="block" style={{ overflow: "visible" }}>
            <span className="cs-line block">
              for <CircledWord color="#103d2e">sale</CircledWord>.
            </span>
          </span>
        </h2>
        <p
          className="cs-sub"
          style={{
            marginTop: "clamp(1.5rem, 4vh, 3rem)",
            maxWidth: "40rem",
            fontFamily: "var(--font-geist)",
            fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)",
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          The chairs, the lamps, the screens, the finds. Most of it can be yours.
        </p>
      </div>
    </section>
  );
}
