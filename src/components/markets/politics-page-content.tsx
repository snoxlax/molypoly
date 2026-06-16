"use client";

import { useHydrateAtoms } from "jotai/utils";

import { MarketsPageHeader } from "@/components/layout/markets-page-header";
import { MarketGrid } from "@/components/markets/market-grid";
import { PromotionalGridCard } from "@/components/markets/promotional-grid-card";
import { politicsMarketsAtom } from "@/store/markets";
import type { Market } from "@/types/market";

type PoliticsPageContentProps = {
  markets: Market[];
};

export function PoliticsPageContent({ markets }: PoliticsPageContentProps) {
  useHydrateAtoms([[politicsMarketsAtom, markets]]);

  return (
    <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
      <MarketsPageHeader title="Politics" />
      <MarketGrid
        markets={markets}
        title="Politics"
        leadingSlot={<PromotionalGridCard />}
      />
    </div>
  );
}
