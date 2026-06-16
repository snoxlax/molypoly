"use client";

import { useHydrateAtoms } from "jotai/utils";

import { MarketsPageHeader } from "@/components/layout/markets-page-header";
import { MarketGrid } from "@/components/markets/market-grid";
import { PromotionalGridCard } from "@/components/markets/promotional-grid-card";
import { marketsAtom } from "@/store/markets";
import type { Market } from "@/types/market";

type MarketsPageContentProps = {
  title: string;
  markets: Market[];
  showPromo?: boolean;
};

export function MarketsPageContent({
  title,
  markets,
  showPromo = false,
}: MarketsPageContentProps) {
  useHydrateAtoms([[marketsAtom, markets]]);

  return (
    <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
      <MarketsPageHeader title={title} />
      <MarketGrid
        markets={markets}
        title={title}
        leadingSlot={showPromo ? <PromotionalGridCard /> : undefined}
      />
    </div>
  );
}
