import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  tone?: "forest" | "moss" | "bark" | "stone" | "rust" | "cream" | "charcoal";
  aspect?: string;
  className?: string;
  showLabel?: boolean;
};

// FLAT solid colours only — no gradients, no grain. Matches the editorial flat-color aesthetic.
const tones: Record<NonNullable<Props["tone"]>, string> = {
  forest:   "#1f2a24",
  moss:     "#4f6b54",
  bark:     "#4a3a2c",
  stone:    "#d8d3c6",
  rust:     "#b86b3e",
  cream:    "#f4eee2",
  charcoal: "#2a2723",
};

export function PlaceholderImage({
  label,
  tone = "forest",
  aspect = "4 / 5",
  className,
  showLabel = false,
}: Props) {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        aspectRatio: aspect,
        background: tones[tone],
      }}
    >
      {showLabel && label && (
        <span
          className="absolute bottom-3 right-3 font-mono-eyebrow z-10"
          style={{ color: "color-mix(in srgb, var(--lef-cream) 25%, transparent)" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
