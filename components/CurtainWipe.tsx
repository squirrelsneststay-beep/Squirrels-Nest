"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  fromColor?: string;
  toColor?: string;
  caption?: string;
};

/**
 * Morphing-band section transition.
 * A wide horizontal band shrinks-then-expands as you scroll through it,
 * giving the impression of a curtain wiping one section into the next.
 */
export function CurtainWipe({
  fromColor = "var(--lef-cream)",
  toColor = "var(--lef-forest)",
  caption = "—",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = sectionRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const band = root.querySelector<HTMLElement>(".cw-band");
      const cap = root.querySelector(".cw-caption");
      const bg = root.querySelector(".cw-bg");
      if (!band) return;

      gsap.set(band, { scaleX: 0.2, scaleY: 0.05, transformOrigin: "center" });
      gsap.set(cap, { opacity: 0 });
      gsap.set(bg, { opacity: 0 });

      if (prefersReducedMotion) {
        gsap.set(band, { clearProps: "all" });
        gsap.set([cap, bg], { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 90%",
          end: "bottom 30%",
          scrub: 1.2,
        },
      });

      tl.to(band, { scaleX: 1, scaleY: 1, duration: 1, ease: "power3.inOut" }, 0);
      tl.to(bg, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.5);
      tl.to(cap, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: fromColor, height: "70vh" }}
    >
      <div
        className="cw-bg absolute inset-0"
        style={{ background: toColor }}
      />

      <div
        className="cw-band absolute inset-x-[6%] top-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          height: "44vh",
          background: fromColor,
          borderRadius: "4px",
          willChange: "transform",
        }}
      >
        <span
          className="cw-caption font-mono-eyebrow"
          style={{ color: "var(--lef-bark)" }}
        >
          {caption}
        </span>
      </div>
    </section>
  );
}
