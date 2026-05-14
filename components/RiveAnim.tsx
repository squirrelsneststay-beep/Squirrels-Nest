"use client";

import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

type Props = {
  /** Path inside /public, e.g. "/animations/line.riv" */
  src: string;
  /** State machine name inside the .riv file (optional — falls back to first animation) */
  stateMachine?: string;
  /** Artboard name (optional — uses default) */
  artboard?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  /** "contain" preserves aspect, "cover" fills container */
  fit?: "contain" | "cover" | "fill";
};

/**
 * Wrapper for a Rive (.riv) animation file.
 * Drop a .riv file into /public/animations/ and reference it by path.
 */
export function RiveAnim({
  src,
  stateMachine,
  artboard,
  width = "100%",
  height = "100%",
  className,
  fit = "contain",
}: Props) {
  const fitMap = { contain: Fit.Contain, cover: Fit.Cover, fill: Fit.Fill };

  const { RiveComponent } = useRive({
    src,
    stateMachines: stateMachine,
    artboard,
    autoplay: true,
    layout: new Layout({ fit: fitMap[fit], alignment: Alignment.Center }),
  });

  return (
    <div className={className} style={{ width, height }}>
      <RiveComponent />
    </div>
  );
}
