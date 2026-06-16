import type { GammaEvent } from "@/types/polymarket";

export const GAMMA_API_URL = "https://gamma-api.polymarket.com";

export type MarketTagSlug = "politics" | "sports" | "crypto";

type GetEventsByTagOptions = {
  limit?: number;
};

export async function getEventsByTag(
  tagSlug: MarketTagSlug,
  options: GetEventsByTagOptions = {},
): Promise<GammaEvent[]> {
  const { limit = 20 } = options;

  const params = new URLSearchParams({
    closed: "false",
    tag_slug: tagSlug,
    limit: String(limit),
    order: "volume24hr",
    ascending: "false",
  });

  const response = await fetch(`${GAMMA_API_URL}/events?${params}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch ${tagSlug} events: ${response.status} ${response.statusText}`,
    );
    return [];
  }

  return (await response.json()) as GammaEvent[];
}

export async function getPoliticsEvents(
  options: GetEventsByTagOptions = {},
): Promise<GammaEvent[]> {
  return getEventsByTag("politics", options);
}

export async function getCryptoEvents(
  options: GetEventsByTagOptions = {},
): Promise<GammaEvent[]> {
  return getEventsByTag("crypto", options);
}
