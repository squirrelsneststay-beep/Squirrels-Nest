import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with conflict resolution — `twMerge` deduplicates
 * conflicting utilities (e.g. `px-2 px-4` → `px-4`) so conditional class
 * composition stays predictable. Without it, callers had to remember the
 * order-dependency footgun.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
