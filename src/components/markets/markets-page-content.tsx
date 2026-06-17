import { MarketsPageHeader } from '@/components/layout/markets-page-header';
import { MarketGrid } from '@/components/markets/market-grid';
import { PromotionalGridCard } from '@/components/markets/promotional-grid-card';
import type { Market } from '@/types/market';

type MarketsPageContentProps = {
  title: string;
  markets: Market[];
  showPromo?: boolean;
  leadingSlot?: React.ReactNode;
};

export function MarketsPageContent({
  title,
  markets,
  showPromo = false,
  leadingSlot,
}: MarketsPageContentProps) {
  const gridLeadingSlot =
    leadingSlot ?? (showPromo ? <PromotionalGridCard /> : undefined);

  return (
    <div className="scroll-container p-2 flex min-h-0 w-full min-w-0 flex-1 flex-col">
      <MarketsPageHeader title={title} />
      <MarketGrid
        markets={markets}
        leadingSlot={gridLeadingSlot}
      />
    </div>
  );
}
