"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * MorphingWordmark — the single visible "Squirrels' Nest" wordmark.
 *
 * It starts GIANT, centred at the bottom of the hero (measured from the
 * invisible #hero-mark-anchor), then as you scroll the first viewport it
 * flies up + shrinks + recolours to land exactly on the nav logo
 * (#nav-logo), which fades in underneath as the flight completes.
 *
 * Decorative + aria-hidden: the real <h1> lives (sr-only) in the hero, and
 * #nav-logo is the keyboard-focusable home link.
 */
export function MorphingWordmark() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    const navLogo = document.getElementById("nav-logo");
    const startAnchor = document.getElementById("hero-mark-anchor");

    // No hero on this page (e.g. /contact) — hide the flying wordmark and let
    // the static nav logo show normally.
    if (!navLogo || !startAnchor) {
      el.style.display = "none";
      if (navLogo) navLogo.style.opacity = "1";
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.display = "none";
      navLogo.style.opacity = "1";
      return;
    }

    const readInk = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--v2-ink")
        .trim() || "#08351c";

    let tween: gsap.core.Tween | null = null;

    const setup = () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();

      // Measure with the overlay in its resting (end) state.
      gsap.set(el, { clearProps: "x,y,scale" });
      const endR = navLogo.getBoundingClientRect();
      const startR = startAnchor.getBoundingClientRect();
      if (!endR.height || !startR.height) return;

      el.style.left = `${endR.left}px`;
      el.style.top = `${endR.top}px`;

      const scale = startR.height / endR.height;
      const dx = startR.left - endR.left;
      const dy = startR.top - endR.top;
      const ink = readInk();

      // Rest at the start (big, centred-bottom, white) until scroll drives it.
      gsap.set(el, { x: dx, y: dy, scale, color: "#ffffff", transformOrigin: "left top" });
      el.style.opacity = "1";

      tween = gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        color: ink,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: () => window.innerHeight,
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            el.style.opacity = String(1 - Math.max(0, (p - 0.92) / 0.08));
            navLogo.style.opacity = String(Math.max(0, (p - 0.9) / 0.1));
          },
        },
      });
    };

    // Fonts must be ready or the measured heights are wrong.
    let ready = false;
    const run = () => {
      if (ready) return;
      ready = true;
      setup();
      ScrollTrigger.refresh();
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(run);
    }
    // Fallback in case fonts.ready never resolves.
    const t = window.setTimeout(run, 600);

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    // Re-resolve the ink colour when the theme flips.
    const obs = new MutationObserver(() => setup());
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
      obs.disconnect();
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="font-display"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 55,
        margin: 0,
        whiteSpace: "nowrap",
        pointerEvents: "none",
        fontSize: "1.15rem",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        color: "#ffffff",
        opacity: 0,
        willChange: "transform",
      }}
    >
      Squirrels&apos; Nest
    </span>
  );
}
