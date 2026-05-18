"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Slide = {
  caption: string;
  image: string;
  alt: string;
};

const slides: Slide[] = [
  { caption: "The lane.",     image: "/images/squirrels-nest/sq-01.jpg", alt: "The lane at Squirrels' Nest" },
  { caption: "The garden.",   image: "/images/squirrels-nest/sq-05.jpg", alt: "The garden at Squirrels' Nest" },
  { caption: "The hearth.",   image: "/images/squirrels-nest/sq-25.jpg", alt: "The hearth at Squirrels' Nest" },
  { caption: "The field.",    image: "/images/squirrels-nest/sq-10.jpg", alt: "The field at Squirrels' Nest" },
];

/**
 * Pinned editorial scroll — single image fills the viewport, single small
 * caption fades through as the user scrolls. One photo + one word at a time.
 */
export function PinnedStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${slides.length * 110}%`,
        pin: ".ps-pin",
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(slides.length - 1, Math.floor(self.progress * slides.length));
          setActiveIdx(idx);
        },
      });
      return () => trigger.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="ps-pin relative h-screen overflow-hidden">
        {/* Image layers — cross-fade between */}
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 overflow-hidden"
            style={{
              opacity: i === activeIdx ? 1 : 0,
              transition: "opacity 1200ms ease-out",
              zIndex: i === activeIdx ? 2 : 1,
            }}
          >
            <Image
              src={s.image}
              alt={s.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}

        {/* Subtle gradient for legibility */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.0) 50%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        {/* Single small caption bottom-left */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-10 lg:p-14">
          {slides.map((s, i) => (
            <span
              key={i}
              className="block font-display-italic"
              style={{
                position: i === 0 ? "relative" : "absolute",
                left: i === 0 ? undefined : "0",
                bottom: i === 0 ? undefined : "0",
                margin: i === 0 ? undefined : "inherit",
                opacity: i === activeIdx ? 1 : 0,
                transform: i === activeIdx ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 900ms ease-out, transform 900ms ease-out",
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                color: "#fff",
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              {s.caption}
            </span>
          ))}
        </div>

        {/* Tiny counter top-right */}
        <span
          className="absolute top-6 right-6 md:top-10 md:right-10 z-20"
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.75rem",
            color: "color-mix(in srgb, white 70%, transparent)",
            letterSpacing: "0.02em",
          }}
        >
          {String(activeIdx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
