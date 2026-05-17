"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor — a soft cream orb that follows the mouse with easing.
 * Grows on hover over `<a>`, `<button>`, and `[data-cursor="grow"]`.
 * Invisible on touch devices. Hidden if reduced motion preferred.
 * Native cursor is hidden via globals.css when this is mounted.
 */
export function CursorOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });
  const stateRef = useRef<"idle" | "grow" | "shrink">("idle");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip touch

    document.documentElement.classList.add("cursor-hidden");

    const orb = orbRef.current;
    if (!orb) return;

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      // Check element under cursor for "grow" intent
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const grow = !!el?.closest('a, button, [data-cursor="grow"]');
      stateRef.current = grow ? "grow" : "idle";
    };
    const onLeave = () => {
      targetRef.current.x = -100;
      targetRef.current.y = -100;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const tick = () => {
      // Ease pos toward target
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.18;
      const scale = stateRef.current === "grow" ? 2.6 : 1;
      orb.style.transform = `translate3d(${posRef.current.x - 8}px, ${posRef.current.y - 8}px, 0) scale(${scale})`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, []);

  return (
    <div
      ref={orbRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        background: "var(--v2-bg)",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    />
  );
}
