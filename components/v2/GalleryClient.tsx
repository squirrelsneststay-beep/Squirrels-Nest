"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AIRBNB_URL, EXTERNAL_LINK_PROPS } from "@/lib/site";

/**
 * The gallery — every photo of the Nest, in a tall editorial masonry that
 * fades each frame up as it enters. Deliberately slow and unhurried: the
 * reveal IS the luxury. Reduced-motion shows everything immediately.
 */

// All 43 frames, lightly curated into an order that opens strong (the red
// headboard hero) and alternates interior / detail / outside for rhythm.
const PHOTOS: { src: string; alt: string }[] = [
  { src: "sq-12.jpg", alt: "The super king bed with its red scalloped headboard" },
  { src: "sq-17.jpg", alt: "The room, bed and chairs in soft daylight" },
  { src: "sq-08.jpg", alt: "The private enclosed courtyard with its bistro table" },
  { src: "sq-33.jpg", alt: "The bedroom in green, bed freshly made" },
  { src: "sq-37.jpg", alt: "The kitchen sink beneath the window" },
  { src: "sq-20.jpg", alt: "Brass taps and a single fresh flower" },
  { src: "sq-03.jpg", alt: "Wisteria climbing the timber-clad country house" },
  { src: "sq-40.jpg", alt: "The bed and a painted bedside lamp" },
  { src: "sq-38.jpg", alt: "The walk-in shower" },
  { src: "sq-04.jpg", alt: "The timber-clad cabin from the garden" },
  { src: "sq-30.jpg", alt: "A painted lamp and mirror detail" },
  { src: "sq-24.jpg", alt: "Looking through to the kitchen" },
  { src: "sq-06.jpg", alt: "The room seen from the courtyard doorway" },
  { src: "sq-39.jpg", alt: "The pedestal basin under the green window" },
  { src: "sq-02.jpg", alt: "A path winding through the planting" },
  { src: "sq-15.jpg", alt: "A quiet corner and a comfortable chair" },
  { src: "sq-25.jpg", alt: "An interior detail at dusk" },
  { src: "sq-29.jpg", alt: "The sink and draining board" },
  { src: "sq-32.jpg", alt: "A made bed and soft pillows" },
  { src: "sq-42.jpg", alt: "Lamplight in the evening" },
  { src: "sq-01.jpg", alt: "The garden and its hedgerows" },
  { src: "sq-18.jpg", alt: "The living space" },
  { src: "sq-22.jpg", alt: "The brass tap, close" },
  { src: "sq-34.jpg", alt: "A detail of the furnishings" },
  { src: "sq-07.jpg", alt: "The cabin and its setting" },
  { src: "sq-09.jpg", alt: "Inside the Nest" },
  { src: "sq-10.jpg", alt: "A corner of the room" },
  { src: "sq-11.jpg", alt: "Soft furnishings and light" },
  { src: "sq-13.jpg", alt: "The bed and headboard, angled" },
  { src: "sq-14.jpg", alt: "A considered detail" },
  { src: "sq-16.jpg", alt: "The room in the morning" },
  { src: "sq-19.jpg", alt: "Texture and tone" },
  { src: "sq-21.jpg", alt: "A quiet still life" },
  { src: "sq-23.jpg", alt: "The kitchen window light" },
  { src: "sq-26.jpg", alt: "An evening interior" },
  { src: "sq-27.jpg", alt: "A small detail" },
  { src: "sq-28.jpg", alt: "Inside, looking out" },
  { src: "sq-31.jpg", alt: "The bedroom, another view" },
  { src: "sq-35.jpg", alt: "The kitchen at work" },
  { src: "sq-36.jpg", alt: "A glimpse of the grounds" },
  { src: "sq-41.jpg", alt: "Evening light across the room" },
  { src: "sq-43.jpg", alt: "A last look around the Nest" },
  { src: "sq-05.jpg", alt: "The gravel path through the grounds" },
];

export function GalleryClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".gal-item"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      style={{ background: "var(--v2-bg)", paddingBottom: "12vh" }}
    >
      {/* Editorial header */}
      <header
        className="mx-auto text-center"
        style={{
          maxWidth: "60rem",
          paddingInline: "clamp(1.5rem, 4vw, 3.5rem)",
          paddingTop: "clamp(8rem, 18vh, 13rem)",
          paddingBottom: "clamp(3rem, 7vh, 6rem)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--v2-mute)",
            margin: 0,
          }}
        >
          The gallery
        </p>
        <h1
          className="font-display"
          style={{
            marginTop: "1.5rem",
            fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            fontWeight: 400,
            color: "var(--v2-ink)",
          }}
        >
          Every corner of{" "}
          <span style={{ fontStyle: "italic", color: "color-mix(in srgb, var(--v2-ink) 72%, transparent)" }}>
            the Nest.
          </span>
        </h1>
        <p
          style={{
            marginTop: "1.5rem",
            maxWidth: "34rem",
            marginInline: "auto",
            fontFamily: "var(--font-geist)",
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "var(--v2-ink-soft)",
          }}
        >
          A slow look around the cabin, the courtyard and the grounds, in
          Zoe&apos;s own photographs.
        </p>
      </header>

      {/* Masonry */}
      <div
        className="gal-grid mx-auto"
        style={{ maxWidth: "88rem", paddingInline: "clamp(1rem, 3vw, 3rem)" }}
      >
        {PHOTOS.map((p, i) => (
          <figure key={p.src} className="gal-item" style={{ margin: 0 }}>
            <Image
              src={`/images/squirrels-nest/${p.src}`}
              alt={`${p.alt} — Squirrels' Nest, a boutique cabin retreat in Berkshire`}
              width={1000}
              height={1333}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading={i < 4 ? "eager" : "lazy"}
              priority={i < 2}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "4px",
                display: "block",
              }}
            />
          </figure>
        ))}
      </div>

      {/* Quiet close + CTA */}
      <div
        className="mx-auto text-center"
        style={{
          maxWidth: "40rem",
          paddingInline: "clamp(1.5rem, 4vw, 3.5rem)",
          paddingTop: "clamp(5rem, 12vh, 9rem)",
        }}
      >
        <p
          className="font-display"
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--v2-ink)",
            margin: 0,
          }}
        >
          Best seen in person.
        </p>
        <a
          href={AIRBNB_URL}
          {...EXTERNAL_LINK_PROPS}
          className="sv-pill is-inverse"
          style={{ marginTop: "2rem" }}
        >
          <span>Book</span>
          <span className="sv-pill-rule" aria-hidden />
          <span>on Airbnb</span>
        </a>
      </div>
    </section>
  );
}
