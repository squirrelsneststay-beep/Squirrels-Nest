"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HIGHLIGHTS = [
  "Boutique 1-bedroom retreat with super king bed",
  "Optional shepherd's hut (sleeps 2)",
  "Private enclosed courtyard with seating",
  "Woodland views",
  "Fully equipped kitchen",
  "Large walk-in shower room",
  "WiFi & central heating",
  "On-site animals including horses, chickens, ducks, cats & dogs",
  "Private parking",
];

/**
 * TheSpace — an "inside & out" editorial beat: the comforts + the courtyard in
 * the owner's words, beside a scannable Highlights list. Adds substance between
 * the rooms grid and the booking CTA. Reveals + staggers on scroll.
 */
export function TheSpace() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".ts-reveal", {
        y: 28,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
      gsap.from(".ts-item", {
        x: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ".ts-list", start: "top 85%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      style={{
        background: "var(--v2-bg)",
        paddingBlock: "clamp(5rem, 13vh, 11rem)",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "82rem",
          paddingInline: "clamp(1.5rem, 4vw, 4rem)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(2.5rem, 6vw, 6rem)",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* Left — prose */}
        <div style={{ flex: "1 1 30rem", maxWidth: "38rem" }}>
          <p
            className="ts-reveal"
            style={{
              fontFamily: "var(--font-geist)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--v2-mute)",
              margin: 0,
            }}
          >
            Inside &amp; out
          </p>
          <h2
            className="ts-reveal font-display"
            style={{
              marginTop: "1.25rem",
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              color: "var(--v2-ink)",
              fontWeight: 600,
              maxWidth: "16ch",
            }}
          >
            Every detail, curated for comfort.
          </h2>
          <p
            className="ts-reveal"
            style={{
              marginTop: "1.75rem",
              maxWidth: "34rem",
              fontFamily: "var(--font-geist)",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--v2-ink-soft)",
            }}
          >
            Inside, the space is thoughtfully designed with an open-plan layout
            featuring a luxurious super king-size bed, a fully equipped kitchen,
            and a spacious shower room with a modern walk-in shower. Whether
            you&apos;re planning a romantic getaway or a quiet retreat, every detail
            has been curated for comfort — central heating and WiFi for cosy
            evenings in.
          </p>
          <p
            className="ts-reveal"
            style={{
              marginTop: "1.25rem",
              maxWidth: "34rem",
              fontFamily: "var(--font-geist)",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--v2-ink-soft)",
            }}
          >
            Step outside into your private, enclosed courtyard, complete with
            outdoor seating — ideal for morning coffee, alfresco dining, or
            unwinding under the stars.
          </p>
          <p
            className="ts-reveal font-display"
            style={{
              marginTop: "2rem",
              fontStyle: "italic",
              fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.015em",
              color: "var(--v2-ink)",
              maxWidth: "22ch",
            }}
          >
            Escape to the countryside — a stay as relaxing as it is memorable.
          </p>
        </div>

        {/* Right — highlights */}
        <div className="ts-list" style={{ flex: "1 1 22rem", maxWidth: "30rem" }}>
          <p
            className="ts-reveal"
            style={{
              fontFamily: "var(--font-geist)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--v2-mute)",
              margin: "0 0 1.5rem",
            }}
          >
            Highlights
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {HIGHLIGHTS.map((h) => (
              <li
                key={h}
                className="ts-item"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.85rem",
                  paddingBlock: "0.8rem",
                  borderBottom: "1px solid var(--v2-line)",
                  fontFamily: "var(--font-geist)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.4,
                  color: "var(--v2-ink)",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flex: "none",
                    width: "0.55rem",
                    height: "0.55rem",
                    borderRadius: "2px",
                    background: "var(--v2-ink)",
                    transform: "translateY(0.1rem)",
                  }}
                />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
