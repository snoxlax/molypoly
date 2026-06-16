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
