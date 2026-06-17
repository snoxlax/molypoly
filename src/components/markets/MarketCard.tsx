import type { Market } from "@/types/market";
import { MarketCardBinary } from './MarketCardBinary';
import { MarketCardMulti } from './MarketCardMulti';

type MarketCardProps = {
  market: Market;
};

export function MarketCard({ market }: MarketCardProps) {
  if (market.variant === "binary") {
    return <MarketCardBinary market={market} />;
  }

  return <MarketCardMulti market={market} />;
}
