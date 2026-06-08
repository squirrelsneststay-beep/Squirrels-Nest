"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor + magnetic buttons (desktop only).
 * A soft ring eases after the pointer and grows over links / images; elements
 * tagged [data-magnetic] lean toward the cursor when it's near. Disabled on
 * touch devices and for prefers-reduced-motion (system cursor stays).
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const ring = ringRef.current;
    if (!ring) return;
    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let cs = 1; // current scale
    let ts = 1; // target scale
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target as HTMLElement | null;
      ts = t && t.closest("a, button, [data-cursor], img") ? 2.1 : 1;

      const mags = document.querySelectorAll<HTMLElement>("[data-magnetic]");
      mags.forEach((el) => {
        const r = el.getBoundingClientRect();
        const dx = mx - (r.left + r.width / 2);
        const dy = my - (r.top + r.height / 2);
        const radius = Math.max(r.width, r.height) * 1.3 + 48;
        el.style.transform =
          Math.hypot(dx, dy) < radius ? `translate(${dx * 0.3}px, ${dy * 0.3}px)` : "";
      });
    };

    const tick = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      cs += (ts - cs) * 0.2;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${cs})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
      document
        .querySelectorAll<HTMLElement>("[data-magnetic]")
        .forEach((el) => (el.style.transform = ""));
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "1.5px solid #fff",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        willChange: "transform",
      }}
    />
  );
}
