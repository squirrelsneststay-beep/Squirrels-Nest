"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "forest" | "cream" | "ghost";

type BaseProps = {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

type LinkProps = BaseProps & ComponentProps<typeof Link> & { href: string };
type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

const variantClasses: Record<Variant, string> = {
  forest: "bg-[var(--lef-forest)] text-[var(--lef-cream)] hover:bg-[var(--lef-charcoal)]",
  cream:  "bg-[var(--lef-cream-soft)] text-[var(--lef-forest)] hover:bg-[var(--lef-stone)]",
  ghost:  "bg-transparent text-[var(--lef-forest)] border border-[var(--lef-bark)]/30 hover:bg-[var(--lef-cream-soft)]",
};

const base =
  "group relative inline-flex items-center gap-3 px-7 py-4 rounded-sm overflow-hidden " +
  "transition-colors duration-500 ease-[var(--ease-expo)] " +
  "font-[family-name:var(--font-geist)] tracking-tight";

const dashStyle: React.CSSProperties = {
  width: "2rem",
  height: "1px",
  background: "currentColor",
  transformOrigin: "left",
  transform: "scaleX(0.5)",
  transition: "transform 0.5s var(--ease-expo)",
};

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "forest", className, children, ...rest } = props as BaseProps & Record<string, unknown>;
  const innerStyle: React.CSSProperties = { fontSize: "var(--fs-16)" };

  const inner = (
    <>
      <span style={dashStyle} className="group-hover:!scale-x-100" />
      <span style={innerStyle}>{children}</span>
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as Omit<LinkProps, keyof BaseProps>;
    return (
      <Link href={href} className={cn(base, variantClasses[variant], className)} {...linkRest}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={cn(base, variantClasses[variant], className)} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
