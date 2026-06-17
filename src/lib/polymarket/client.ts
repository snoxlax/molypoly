import type { GammaEvent } from "@/types/polymarket";

export const GAMMA_API_URL = "https://gamma-api.polymarket.com";
const GAMMA_REVALIDATE_SECONDS = 60;

export type MarketTagSlug = "politics" | "sports" | "crypto";

type GetEventsByTagOptions = {
  limit?: number;
};

const EVENTS_CHUNK_SIZE = 10;

async function fetchEventsChunk(
  tagSlug: MarketTagSlug,
  limit: number,
  offset: number,
): Promise<GammaEvent[]> {
  const params = new URLSearchParams({
    closed: "false",
    tag_slug: tagSlug,
    limit: String(limit),
    offset: String(offset),
    order: "volume24hr",
    ascending: "false",
  });

  const response = await fetch(`${GAMMA_API_URL}/events?${params}`, {
    next: { revalidate: GAMMA_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch ${tagSlug} events: ${response.status} ${response.statusText}`,
    );
    return [];
  }

  return (await response.json()) as GammaEvent[];
}

export async function getEventsByTag(
  tagSlug: MarketTagSlug,
  options: GetEventsByTagOptions = {},
): Promise<GammaEvent[]> {
  const { limit = 10 } = options;
  const safeLimit = Math.max(0, limit);

  if (safeLimit === 0) {
    return [];
  }

  if (safeLimit <= EVENTS_CHUNK_SIZE) {
    return fetchEventsChunk(tagSlug, safeLimit, 0);
  }

  const requests: Promise<GammaEvent[]>[] = [];
  for (let offset = 0; offset < safeLimit; offset += EVENTS_CHUNK_SIZE) {
    const chunkLimit = Math.min(EVENTS_CHUNK_SIZE, safeLimit - offset);
    requests.push(fetchEventsChunk(tagSlug, chunkLimit, offset));
  }

  const chunks = await Promise.all(requests);
  const seen = new Set<string>();
  const merged: GammaEvent[] = [];

  for (const events of chunks) {
    for (const event of events) {
      if (seen.has(event.id)) continue;
      seen.add(event.id);
      merged.push(event);
    }
  }

  return merged;
}

export async function getEventBySlug(slug: string): Promise<GammaEvent | null> {
  const response = await fetch(`${GAMMA_API_URL}/events/slug/${slug}`, {
    next: { revalidate: GAMMA_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch event "${slug}": ${response.status} ${response.statusText}`,
    );
    return null;
  }

  return (await response.json()) as GammaEvent;
}
