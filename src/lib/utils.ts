import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatVolume(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(0)}B Vol.`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(0)}M Vol.`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K Vol.`;
  }
  return `$${value} Vol.`;
}

export function formatProbability(value: number): string {
  const percent = Math.round(value * 100);
  if (percent < 1) return "<1%";
  return `${percent}%`;
}

/** Polymarket-style cent price, e.g. 0.32 → "32¢", 0.008 → "0.8¢" */
export function formatCents(value: number): string {
  const cents = value * 100;
  if (cents >= 10 && Math.abs(cents - Math.round(cents)) < 0.05) {
    return `${Math.round(cents)}¢`;
  }
  return `${cents.toFixed(1)}¢`;
}
