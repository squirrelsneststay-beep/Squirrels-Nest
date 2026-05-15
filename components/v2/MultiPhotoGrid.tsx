"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Multiple photos on screen at once, varied sizes and positions, centred
 * around a small text moment. NOT full-bleed. Inspired by the saltsaun
 * "Room to breathe" multi-image composition.
 */
export function MultiPhotoGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".mpg-photo", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
      gsap.from(".mpg-line", {
        opacity: 0,
        y: 16,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      style={{ background: "var(--v2-bg)", paddingBlock: "16vh" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "80rem", paddingInline: "clamp(1.5rem, 5vw, 4rem)" }}
      >
        {/* Centered eyebrow + heading */}
        <div className="text-center mx-auto mb-20" style={{ maxWidth: "32rem" }}>
          <div
            className="mpg-line mx-auto"
            style={{
              width: "2rem",
              height: "1px",
              background: "var(--v2-mute)",
              marginBottom: "1.25rem",
            }}
          />
          <p
            className="mpg-line"
            style={{
              fontFamily: "var(--font-geist)",
              fontSize: "0.75rem",
              color: "var(--v2-mute)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            03 — Around the cabin
          </p>
          <h2
            className="mpg-line font-display"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              color: "var(--v2-ink)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            Small rooms, deep windows,
            <span className="block font-display-italic" style={{ color: "var(--v2-ink-soft)" }}>
              and a kettle always near.
            </span>
          </h2>
        </div>

        {/* Asymmetric multi-photo composition, varied sizes */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div
            className="mpg-photo col-span-7 col-start-1"
            style={{ alignSelf: "start" }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "3 / 2",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <img
                src="/images/squirrels-nest/sq-18.jpg"
                alt="Two yellow velvet chairs by the window"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <p
              className="mpg-line mt-3"
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "0.75rem",
                color: "var(--v2-mute)",
                letterSpacing: "0.02em",
              }}
            >
              — the sitting room
            </p>
          </div>

          <div
            className="mpg-photo col-span-4 col-start-9"
            style={{ alignSelf: "end", marginTop: "4rem" }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <img
                src="/images/squirrels-nest/sq-22.jpg"
                alt="A bronze tap detail"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <p
              className="mpg-line mt-3"
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "0.75rem",
                color: "var(--v2-mute)",
                letterSpacing: "0.02em",
              }}
            >
              — small details
            </p>
          </div>

          <div
            className="mpg-photo col-span-3 col-start-2"
            style={{ marginTop: "4rem", alignSelf: "start" }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <img
                src="/images/squirrels-nest/sq-35.jpg"
                alt="The kitchen"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <p
              className="mpg-line mt-3"
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "0.75rem",
                color: "var(--v2-mute)",
                letterSpacing: "0.02em",
              }}
            >
              — the kitchen
            </p>
          </div>

          <div
            className="mpg-photo col-span-6 col-start-6"
            style={{ marginTop: "2rem", alignSelf: "start" }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "3 / 2",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <img
                src="/images/squirrels-nest/sq-28.jpg"
                alt="The bedroom"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <p
              className="mpg-line mt-3"
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "0.75rem",
                color: "var(--v2-mute)",
                letterSpacing: "0.02em",
              }}
            >
              — the bedroom
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
