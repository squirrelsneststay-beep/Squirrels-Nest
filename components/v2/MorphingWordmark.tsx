"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * MorphingWordmark — the single visible "Squirrels' Nest" wordmark + logo.
 *
 * It is rendered at FULL hero size (so the glyphs are razor-sharp) and, as you
 * scroll the first viewport, it flies up + scales DOWN + recolours to land on
 * the nav-logo slot. Scaling a large, crisply-rasterised wordmark DOWN keeps it
 * sharp at every size — the opposite (rendering small and scaling up) is what
 * made it blurry.
 *
 * #hero-mark-anchor (in the hero) fixes the START rect/size; #nav-logo (an
 * invisible spacer in the nav) fixes the END rect. The overlay then IS the
 * landed logo, so there is no size/letter-spacing mismatch to hand off.
 * Decorative + aria-hidden: the real <h1> is sr-only in the hero, and #nav-logo
 * is the focusable home link underneath.
 */
export function MorphingWordmark() {
  const ref = useRef<HTMLSpanElement>(null);
  // Re-run on every client navigation. This component lives in the root layout,
  // so it does NOT remount between pages — without pathname in the deps it would
  // stay hidden forever after visiting a page that has no hero (e.g. /contact).
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    // Reset visibility up-front so returning to the home page re-shows it.
    el.style.display = "";
    const navLogo = document.getElementById("nav-logo");
    const startAnchor = document.getElementById("hero-mark-anchor");

    // No hero on this page (e.g. /contact): hide the flying wordmark and let
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

    // On the home page the overlay IS the visible logo, so keep the static nav
    // logo as an invisible spacer (it may have been shown on a prior page).
    navLogo.style.opacity = "0";
    let unmounted = false;

    const readInk = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--v2-ink")
        .trim() || "#08351c";

    // Hide the landed logo over lower dark sections (mirrors the nav fade), but
    // never over the hero itself (that is where the big wordmark lives).
    const overLowerDark = () => {
      if (window.scrollY < window.innerHeight * 0.9) return false;
      const sections = document.querySelectorAll<HTMLElement>(
        "[data-section-tone='dark']:not([data-hero])"
      );
      for (const s of Array.from(sections)) {
        const r = s.getBoundingClientRect();
        if (r.top < 80 && r.bottom > 0) return true;
      }
      return false;
    };

    let tween: gsap.core.Tween | null = null;

    const applyVisibility = () => {
      el.style.opacity = overLowerDark() ? "0" : "1";
    };

    const setup = () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();

      // Measure with the overlay at its natural (start/big) state.
      gsap.set(el, { clearProps: "x,y,scale" });
      const startR = startAnchor.getBoundingClientRect();
      const endR = navLogo.getBoundingClientRect();
      if (!startR.height || !endR.height) return;

      // Anchor the overlay onto the hero wordmark position at scale 1 (big).
      el.style.left = `${startR.left}px`;
      el.style.top = `${startR.top}px`;

      const endScale = endR.height / startR.height; // < 1 → scaling DOWN, crisp
      const dx = endR.left - startR.left;
      const dy = endR.top - startR.top;
      const ink = readInk();

      gsap.set(el, { x: 0, y: 0, scale: 1, color: "#ffffff", transformOrigin: "left top" });
      applyVisibility();

      tween = gsap.to(el, {
        x: dx,
        y: dy,
        scale: endScale,
        color: ink,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: () => window.innerHeight,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
    };

    let ready = false;
    const run = () => {
      if (ready || unmounted) return; // guard: fonts.ready can resolve post-unmount
      ready = true;
      setup();
      ScrollTrigger.refresh();
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(run);
    }
    const fallback = window.setTimeout(run, 600);

    const onResize = () => setup();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", applyVisibility, { passive: true });

    // Re-resolve ink + re-evaluate when the theme flips.
    const obs = new MutationObserver(() => setup());
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      unmounted = true;
      window.clearTimeout(fallback);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", applyVisibility);
      obs.disconnect();
      tween?.scrollTrigger?.kill();
      tween?.kill();
      // Restore the static nav logo so it shows correctly on a page without a hero.
      if (navLogo) navLogo.style.opacity = "1";
    };
  }, [pathname]);

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
        // Rendered at full hero size — scaled DOWN to the nav, so it stays crisp.
        fontSize: "clamp(3.5rem, 12vw, 14rem)",
        lineHeight: 0.84,
        letterSpacing: "-0.045em",
        fontWeight: 400,
        color: "#ffffff",
        opacity: 0,
        willChange: "transform",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      Squirrels&apos; Nest
    </span>
  );
}
