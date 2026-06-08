"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * InsideTheNest — four rooms, each its own little gallery of 3–4 photos.
 * Photos are grouped strictly by room (no strays): bedroom = beds, shower room
 * = bathroom, kitchen = kitchen, courtyard = outside. Heading alternates side
 * for rhythm; photos reveal + parallax on scroll.
 */

type Shot = { src: string; alt: string; w: string; aspect: string };
type Room = { name: string; body: string; photos: Shot[] };

const ROOMS: Room[] = [
  {
    name: "The Bedroom",
    body: "Open-plan, with a super king-size bed. Plenty of room, soft light, and woodland in the window.",
    photos: [
      { src: "/images/squirrels-nest/sq-12.jpg", alt: "The super king bed with its red headboard", w: "min(34rem, 92vw)", aspect: "3 / 2" },
      { src: "/images/squirrels-nest/sq-33.jpg", alt: "The bedroom in green, bed made up", w: "min(20rem, 46vw)", aspect: "3 / 4" },
      { src: "/images/squirrels-nest/sq-40.jpg", alt: "The bed and bedside lamp", w: "min(22rem, 46vw)", aspect: "1 / 1" },
      { src: "/images/squirrels-nest/sq-30.jpg", alt: "Painted lamp and mirror detail", w: "min(17rem, 38vw)", aspect: "3 / 4" },
    ],
  },
  {
    name: "The Shower Room",
    body: "A walk-in shower and a pedestal basin. Plenty of hot water, whenever you want it.",
    photos: [
      { src: "/images/squirrels-nest/sq-38.jpg", alt: "The walk-in shower", w: "min(22rem, 60vw)", aspect: "3 / 4" },
      { src: "/images/squirrels-nest/sq-39.jpg", alt: "The pedestal basin under the green window", w: "min(22rem, 60vw)", aspect: "3 / 4" },
      { src: "/images/squirrels-nest/sq-20.jpg", alt: "Brass taps and a fresh flower", w: "min(26rem, 86vw)", aspect: "3 / 2" },
    ],
  },
  {
    name: "The Kitchen",
    body: "Coffee machine, kettle, a little oven and a proper sink. Everything you need to cook in, or just make the morning coffee.",
    photos: [
      { src: "/images/squirrels-nest/sq-37.jpg", alt: "The kitchen sink under the window", w: "min(24rem, 66vw)", aspect: "3 / 4" },
      { src: "/images/squirrels-nest/sq-24.jpg", alt: "Looking through to the kitchen", w: "min(20rem, 50vw)", aspect: "3 / 4" },
      { src: "/images/squirrels-nest/sq-29.jpg", alt: "The sink and draining board", w: "min(24rem, 66vw)", aspect: "4 / 5" },
    ],
  },
  {
    name: "The Courtyard",
    body: "Your own enclosed courtyard, with a table and chairs. For morning coffee, or dinner outside.",
    photos: [
      { src: "/images/squirrels-nest/sq-08.jpg", alt: "The private courtyard with its bistro table", w: "min(26rem, 70vw)", aspect: "4 / 5" },
      { src: "/images/squirrels-nest/sq-04.jpg", alt: "The timber-clad cabin from outside", w: "min(28rem, 86vw)", aspect: "3 / 2" },
      { src: "/images/squirrels-nest/sq-06.jpg", alt: "The room from the courtyard, a dog in the doorway", w: "min(20rem, 56vw)", aspect: "3 / 4" },
    ],
  },
];

function BookLink() {
  return (
    <a
      href="#reserve"
      style={{
        display: "inline-block",
        marginTop: "1.25rem",
        fontFamily: "var(--font-geist)",
        fontSize: "0.9rem",
        fontWeight: 600,
        letterSpacing: "-0.005em",
        color: "var(--v2-ink)",
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        textDecorationThickness: "2px",
        textDecorationColor: "var(--v2-accent)",
      }}
    >
      Book a stay
    </a>
  );
}

function RoomBlock({ room, flip }: { room: Room; flip: boolean }) {
  return (
    <article className="itn-room">
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem 3rem",
          alignItems: "flex-end",
          justifyContent: flip ? "flex-end" : "flex-start",
          textAlign: flip ? "right" : "left",
          marginBottom: "clamp(1.75rem, 4vh, 2.75rem)",
        }}
      >
        <div style={{ maxWidth: "34rem", marginLeft: flip ? "auto" : 0 }}>
          <h3
            className="font-display"
            style={{
              fontSize: "clamp(1.8rem, 3.4vw, 2.9rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              color: "var(--v2-ink)",
              fontWeight: 600,
              margin: 0,
            }}
          >
            {room.name}
          </h3>
          <p
            style={{
              marginTop: "1rem",
              fontFamily: "var(--font-geist)",
              fontSize: "1.0625rem",
              lineHeight: 1.55,
              color: "var(--v2-ink-soft)",
              maxWidth: "32rem",
              marginLeft: flip ? "auto" : 0,
            }}
          >
            {room.body}
          </p>
          <BookLink />
        </div>
      </div>

      {/* 3–4 photos, varied sizes */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(0.85rem, 1.6vw, 1.4rem)",
          justifyContent: "center",
          alignItems: "flex-end",
          flexDirection: flip ? "row-reverse" : "row",
        }}
      >
        {room.photos.map((p) => (
          <div
            key={p.src}
            className="itn-frame"
            style={{
              position: "relative",
              width: p.w,
              aspectRatio: p.aspect,
              borderRadius: "3px",
              overflow: "hidden",
              background: "var(--v2-line)",
            }}
          >
            <div className="itn-img-inner absolute" style={{ inset: "-7% 0", willChange: "transform" }}>
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 90vw, 34rem" style={{ objectFit: "cover" }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export function InsideTheNest() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.from(".itn-title-line", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      gsap.utils.toArray<HTMLElement>(".itn-room").forEach((room) => {
        const frames = room.querySelectorAll<HTMLElement>(".itn-frame");
        gsap.from(frames, {
          y: 40,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: room, start: "top 78%", once: true },
        });
      });

      if (reduced) return;
      gsap.utils.toArray<HTMLElement>(".itn-img-inner").forEach((inner) => {
        gsap.fromTo(
          inner,
          { yPercent: 7 },
          {
            yPercent: -7,
            ease: "none",
            scrollTrigger: { trigger: inner, start: "top bottom", end: "bottom top", scrub: 1 },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      style={{ background: "var(--v2-bg)", paddingBlock: "clamp(6rem, 14vh, 12rem)" }}
    >
      <h2
        className="font-display mx-auto text-center"
        style={{
          maxWidth: "80rem",
          paddingInline: "clamp(1.5rem, 4vw, 4rem)",
          fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.025em",
          color: "var(--v2-ink)",
          fontWeight: 600,
          margin: "0 auto clamp(4rem, 10vh, 7rem)",
        }}
      >
        <span className="itn-title-line block overflow-hidden">
          <span className="block">Look Inside</span>
        </span>
        <span className="itn-title-line block overflow-hidden">
          <span className="block" style={{ color: "var(--v2-ink-soft)" }}>
            the Nest.
          </span>
        </span>
      </h2>

      <div
        className="mx-auto"
        style={{
          maxWidth: "92rem",
          paddingInline: "clamp(1.5rem, 3vw, 3rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(5rem, 13vh, 10rem)",
        }}
      >
        {ROOMS.map((room, i) => (
          <RoomBlock key={room.name} room={room} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
