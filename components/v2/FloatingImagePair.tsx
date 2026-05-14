"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  leftImage: string;
  rightImage: string;
  leftAlt?: string;
  rightAlt?: string;
  caption?: string;
  italicTail?: string;
};

/**
 * Two small images floating at opposite corners with a centered caption.
 * Both images parallax in opposite directions as the user scrolls.
 * The viewer stays fixed; the images drift around the caption.
 */
export function FloatingImagePair({
  leftImage,
  rightImage,
  leftAlt = "",
  rightAlt = "",
  caption,
  italicTail,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fip-left",
        { y: 80 },
        {
          y: -120,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1.2 },
        }
      );
      gsap.fromTo(
        ".fip-right",
        { y: -60 },
        {
          y: 140,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1.2 },
        }
      );
      gsap.from(".fip-caption > span", {
        opacity: 0,
        y: 30,
        duration: 1.3,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative grid grid-cols-12 items-center"
      style={{
        background: "var(--v2-bg)",
        minHeight: "90vh",
        paddingBlock: "10vh",
      }}
    >
      {/* Left floating image */}
      <div
        className="fip-left col-span-3 col-start-1 md:col-start-2 will-change-transform"
        style={{ alignSelf: "start" }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "4 / 5",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <img
            src={leftImage}
            alt={leftAlt}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>

      {/* Centered caption */}
      <div className="col-span-6 col-start-4 md:col-span-4 md:col-start-5 text-center">
        <p className="fip-caption">
          {caption && (
            <span
              className="block font-display"
              style={{
                fontSize: "clamp(2rem, 4.2vw, 3.75rem)",
                color: "var(--v2-ink)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontWeight: 400,
              }}
            >
              {caption}
            </span>
          )}
          {italicTail && (
            <span
              className="block font-display-italic mt-3"
              style={{
                fontSize: "clamp(1.25rem, 2.4vw, 2rem)",
                color: "var(--v2-ink-soft)",
                lineHeight: 1.3,
              }}
            >
              {italicTail}
            </span>
          )}
        </p>
      </div>

      {/* Right floating image */}
      <div
        className="fip-right col-span-3 col-start-10 md:col-start-9 will-change-transform"
        style={{ alignSelf: "end" }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "3 / 4",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <img
            src={rightImage}
            alt={rightAlt}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}
