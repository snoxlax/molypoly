import { MarketsPageHeader } from "@/components/layout/markets-page-header";
import { MarketGrid } from "@/components/markets/market-grid";
import type { Market } from "@/types/market";

type PoliticsPageContentProps = {
  markets: Market[];
};

export function PoliticsPageContent({ markets }: PoliticsPageContentProps) {
  return (
    <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
      <MarketsPageHeader title="Politics" />
      <MarketGrid markets={markets} title="Politics" />
    </div>
  );
}
