"use client";

import { useStore } from "jotai";
import { useEffect, useMemo } from "react";

import {
  buildPairedOutcomeMap,
  collectOutcomeIds,
  outcomePricesAtom,
} from "@/store/markets";
import type { Market } from "@/types/market";

const TICK_MS = 2_500;
const MAX_DELTA = 0.015;

function clampPrice(value: number): number {
  return Math.min(0.99, Math.max(0.01, value));
}



type UseLivePriceSimulationOptions = {
  markets: Market[];
  enabled?: boolean;
};

export function useLivePriceSimulation({
  markets,
  enabled = true,
}: UseLivePriceSimulationOptions): void {
  const store = useStore();
  const outcomeIds = useMemo(() => collectOutcomeIds(markets), [markets]);
  const pairedOutcomeIds = useMemo(
    () => buildPairedOutcomeMap(markets),
    [markets],
  );
  function seedOutcomePrices(
    store: ReturnType<typeof useStore>,
    markets: Market[],
  ): void {
    const prices: Record<string, number> = {};

    for (const market of markets) {
      for (const outcome of market.outcomes) {
        prices[outcome.id] = outcome.price;
      }
    }

    store.set(outcomePricesAtom, prices);
  }

  useEffect(() => {
    seedOutcomePrices(store, markets);
  }, [store, markets]);

  useEffect(() => {
    if (!enabled) return;
    if (outcomeIds.length === 0) return;

    const intervalId = window.setInterval(() => {
      const outcomeId =
        outcomeIds[Math.floor(Math.random() * outcomeIds.length)]!;
      const current = store.get(outcomePricesAtom)[outcomeId] ?? 0;
      const delta = (Math.random() - 0.5) * 2 * MAX_DELTA;
      const next = clampPrice(current + delta);
      const pairedId = pairedOutcomeIds.get(outcomeId);

      store.set(outcomePricesAtom, (prev) => ({
        ...prev,
        [outcomeId]: next,
        ...(pairedId ? { [pairedId]: clampPrice(1 - next) } : {}),
      }));
    }, TICK_MS);

    return () => window.clearInterval(intervalId);
  }, [store, outcomeIds, pairedOutcomeIds, enabled]);

}
