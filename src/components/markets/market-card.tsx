import type { Market } from "@/types/market";
import { MarketCardBinary } from "./market-card-binary";
import { MarketCardMulti } from "./market-card-multi";

type MarketCardProps = {
  market: Market;
};

export function MarketCard({ market }: MarketCardProps) {
  if (market.variant === "binary") {
    return <MarketCardBinary market={market} />;
  }

  return <MarketCardMulti market={market} />;
}
