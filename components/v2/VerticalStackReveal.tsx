"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Without [stacked words]" — vertical reveal on a dark photographic background.
 * The lead label sits left, with the stacked list appearing one item at a time
 * as the user scrolls through the pinned section.
 */
export function VerticalStackReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const items = ["traffic.", "signal.", "noise.", "neighbours.", "rushing."];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const lead = root.querySelector(".vs-lead");
      const stackItems = gsap.utils.toArray<HTMLElement>(".vs-item");
      const img = root.querySelector(".vs-img");

      gsap.set([lead, ...stackItems], { opacity: 0, y: 14 });

      if (prefersReducedMotion) {
        gsap.set([lead, ...stackItems], { clearProps: "all" });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=180%",
          pin: ".vs-pin",
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(img, { scale: 1 }, { scale: 1.1, ease: "none" }, 0);
      tl.to(lead, { opacity: 1, y: 0, duration: 0.06 }, 0.05);
      stackItems.forEach((it, i) => {
        tl.to(it, { opacity: 1, y: 0, duration: 0.08, ease: "power3.out" }, 0.18 + i * 0.12);
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative">
      <div className="vs-pin relative h-screen overflow-hidden">
        <div className="vs-img absolute inset-0" style={{ willChange: "transform" }}>
          <img
            src="/images/squirrels-nest/sq-30.jpg"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.55)" }}
        />

        <div className="absolute inset-0 flex items-center">
          <div
            className="w-full mx-auto"
            style={{ maxWidth: "80rem", paddingInline: "clamp(1.25rem, 6vw, 6rem)" }}
          >
            <div className="grid grid-cols-12 gap-6 items-start">
              <span
                className="vs-lead font-display-italic col-span-3 md:col-span-2 pt-2"
                style={{
                  fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                  color: "color-mix(in srgb, white 75%, transparent)",
                  fontWeight: 300,
                }}
              >
                Without
              </span>

              <ul className="col-span-9 md:col-span-10 space-y-1">
                {items.map((w, i) => (
                  <li
                    key={i}
                    className="vs-item font-display"
                    style={{
                      fontSize: "clamp(1.75rem, 3.2vw, 3rem)",
                      color: "#fff",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      fontWeight: 400,
                    }}
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
