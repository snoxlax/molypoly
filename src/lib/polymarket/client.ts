import type { GammaEvent } from "@/types/polymarket";

export const GAMMA_API_URL = "https://gamma-api.polymarket.com";

type GetPoliticsEventsOptions = {
  limit?: number;
};

export async function getPoliticsEvents(
  options: GetPoliticsEventsOptions = {},
): Promise<GammaEvent[]> {
  const { limit = 20 } = options;

  const params = new URLSearchParams({
    closed: "false",
    tag_slug: "politics",
    limit: String(limit),
    order: "volume24hr",
    ascending: "false",
  });

  const response = await fetch(`${GAMMA_API_URL}/events?${params}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch politics events: ${response.status} ${response.statusText}`,
    );
    return [];
  }

  return (await response.json()) as GammaEvent[];
}
