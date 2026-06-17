import { atom } from "jotai";

import type { EventDetail } from "@/types/eventDetail";
import type { Market } from "@/types/market";

export const eventDetailAtom = atom<EventDetail | null>(null);

export const outcomePricesAtom = atom<Record<string, number>>({});

export function collectOutcomeIds(markets: Market[]): string[] {
  return markets.flatMap((market) => market.outcomes.map((outcome) => outcome.id));
}

export function buildPairedOutcomeMap(markets: Market[]): Map<string, string> {
  const pairs = new Map<string, string>();

  for (const market of markets) {
    const labels = new Set(market.outcomes.map((item) => item.label));

    if (labels.has("Yes") && labels.has("No")) {
      const yesId = market.outcomes.find((item) => item.label === "Yes")?.id;
      const noId = market.outcomes.find((item) => item.label === "No")?.id;
      if (yesId && noId) {
        pairs.set(yesId, noId);
        pairs.set(noId, yesId);
      }
    }

    if (labels.has("Up") && labels.has("Down")) {
      const upId = market.outcomes.find((item) => item.label === "Up")?.id;
      const downId = market.outcomes.find((item) => item.label === "Down")?.id;
      if (upId && downId) {
        pairs.set(upId, downId);
        pairs.set(downId, upId);
      }
    }
  }

  return pairs;
}
