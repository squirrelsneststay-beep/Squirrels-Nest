"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const tiles = [
  { tone: "#3d4f44", caption: "The lane" },
  { tone: "#2f3b34", caption: "The door" },
  { tone: "#54635a", caption: "The hearth" },
  { tone: "#3d4f44", caption: "The kitchen" },
  { tone: "#2f3b34", caption: "The fields" },
  { tone: "#54635a", caption: "The view" },
  { tone: "#3d4f44", caption: "The end of the day" },
];

/**
 * Horizontal snake gallery — section pins, vertical scroll translates a
 * horizontal row of tiles. Each tile has a Y offset that traces a sine
 * wave, so the row visually snakes as it passes through the viewport.
 */
export function SnakeGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = sectionRef.current;
    if (!root) return;
    const track = root.querySelector<HTMLElement>(".sg-track");
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = trackWidth - viewportWidth;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${distance}`,
          pin: ".sg-pin",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Wave on each tile based on its index
      const items = gsap.utils.toArray<HTMLElement>(".sg-tile");
      items.forEach((it, i) => {
        const phase = (i / items.length) * Math.PI * 2;
        const yOffset = Math.sin(phase) * 60;
        gsap.set(it, { y: yOffset });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="sg-pin relative h-screen overflow-hidden flex items-center" style={{ background: "var(--v2-bg)" }}>
        <div className="absolute top-10 left-0 right-0 z-20 v2-container flex items-center justify-between">
          <span className="font-mono-eyebrow" style={{ color: "var(--v2-mute)" }}>
            A walk through —
          </span>
          <span className="font-mono-eyebrow" style={{ color: "var(--v2-mute)" }}>
            Scroll →
          </span>
        </div>

        <div className="sg-track flex items-center gap-10 will-change-transform pl-24 pr-24">
          {tiles.map((t, i) => (
            <div
              key={i}
              className="sg-tile flex-none flex flex-col items-center gap-4"
              style={{ willChange: "transform" }}
            >
              <div
                style={{
                  width: "26rem",
                  aspectRatio: "4 / 5",
                  background: t.tone,
                  borderRadius: "2px",
                }}
              />
              <span className="font-display-italic" style={{ color: "var(--v2-ink-soft)", fontSize: "1.125rem" }}>
                {t.caption}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
