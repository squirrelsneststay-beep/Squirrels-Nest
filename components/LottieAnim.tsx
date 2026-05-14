"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

type Props = {
  /** Path inside /public, e.g. "/animations/line.json" */
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
};

/**
 * Wrapper for a Lottie (.json) animation file.
 * Drop a Lottie JSON into /public/animations/ and reference it by path.
 */
export function LottieAnim({
  src,
  loop = true,
  autoplay = true,
  className,
  width = "100%",
  height = "100%",
}: Props) {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!data) return null;
  return (
    <div className={className} style={{ width, height }}>
      <Lottie animationData={data} loop={loop} autoplay={autoplay} />
    </div>
  );
}
