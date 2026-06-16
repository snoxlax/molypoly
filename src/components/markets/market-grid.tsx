import type { Market } from "@/types/market";
import { MarketCard } from "./market-card";

type MarketGridProps = {
  markets: Market[];
  title?: string;
  leadingSlot?: React.ReactNode;
};

export function MarketGrid({
  markets,
  title = "Politics",
  leadingSlot,
}: MarketGridProps) {
  return (
    <section className="px-4 pb-10 lg:px-0">
      <h1 className="sr-only">{title}</h1>
      <div className="grid h-auto grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {leadingSlot}
        {markets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>
    </section>
  );
}
