import { MarketsPageHeader } from '@/components/layout/MarketsPageHeader';
import { MarketGrid } from '@/components/markets/MarketGrid';
import { PromotionalGridCard } from '@/components/markets/PromotionalGridCard';
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
    <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col p-2">
      <MarketsPageHeader title={title} />
      <MarketGrid
        markets={markets}
        leadingSlot={gridLeadingSlot}
      />
    </div>
  );
}
