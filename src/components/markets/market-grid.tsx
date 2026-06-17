import type { Market } from '@/types/market';
import { MarketCard } from './market-card';

type MarketGridProps = {
  markets: Market[];
  leadingSlot?: React.ReactNode;
};

export function MarketGrid({ markets, leadingSlot }: MarketGridProps) {
  return (
    <section className="min-w-0 px-4 pb-10 lg:px-0">
      <div className="grid w-full min-w-0 grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(180px,auto)] *:min-w-0">
        {leadingSlot}
        {markets.map((market) => (
          <MarketCard
            key={market.id}
            market={market}
          />
        ))}
      </div>
    </section>
  );
}
