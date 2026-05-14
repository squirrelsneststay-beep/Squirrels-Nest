"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  stagger?: number;
  selector?: string;
  className?: string;
  start?: string;
};

export function ScrollReveal({
  children,
  delay = 0,
  y = 40,
  stagger = 0.08,
  selector,
  className,
  start = "top 80%",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const targets = selector ? el.querySelectorAll<HTMLElement>(selector) : [el];
    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "expo.out",
      delay,
      stagger,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y, stagger, selector, start]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
