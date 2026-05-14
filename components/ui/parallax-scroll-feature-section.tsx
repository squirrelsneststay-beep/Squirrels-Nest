"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

type Feature = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  reverse: boolean;
};

type FeatureRowProps = {
  feature: Feature;
};

function FeatureRow({ feature }: FeatureRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const opacity: MotionValue<number> = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  const translateY: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [-50, 0]);

  return (
    <div
      ref={ref}
      className={`min-h-screen flex items-center justify-center md:gap-32 gap-12 px-6 md:px-12 ${
        feature.reverse ? "md:flex-row-reverse flex-col" : "md:flex-row flex-col"
      } flex`}
    >
      <motion.div style={{ y: translateY }} className="max-w-md">
        <span
          className="block mb-6"
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.75rem",
            color: "var(--v2-mute)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          0{feature.id}
        </span>
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 4rem)",
            color: "var(--v2-ink)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            fontWeight: 400,
          }}
        >
          {feature.title}
        </h3>
        <motion.p
          style={{
            y: translateY,
            fontFamily: "var(--font-geist)",
            fontSize: "1.0625rem",
            color: "var(--v2-ink-soft)",
            lineHeight: 1.6,
            maxWidth: "40ch",
            marginTop: "1.75rem",
          }}
        >
          {feature.description}
        </motion.p>
      </motion.div>

      <motion.div style={{ opacity, clipPath }} className="relative">
        <img
          src={feature.imageUrl}
          className="w-[26rem] h-[32rem] object-cover rounded-sm"
          alt={feature.alt}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}

export type ParallaxFeature = Omit<Feature, "id" | "reverse">;

type Props = {
  features: ParallaxFeature[];
};

export const ParallaxScrollFeatureSection: React.FC<Props> = ({ features }) => {
  const decorated: Feature[] = features.map((f, i) => ({
    ...f,
    id: i + 1,
    reverse: i % 2 === 1,
  }));

  return (
    <div className="flex flex-col" style={{ background: "var(--v2-bg)" }}>
      {decorated.map((feature) => (
        <FeatureRow key={feature.id} feature={feature} />
      ))}
    </div>
  );
};

export default ParallaxScrollFeatureSection;
