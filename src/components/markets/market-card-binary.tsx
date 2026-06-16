import { ChanceArc } from '@/components/ui/chance-arc';
import { YesNoButtons } from '@/components/ui/yes-no-buttons';
import type { Market } from '@/types/market';
import { MarketCardShell } from './market-card-shell';

type MarketCardBinaryProps = {
  market: Market;
};

export function MarketCardBinary({ market }: MarketCardBinaryProps) {
  const leadingPrice = market.leadingPrice ?? market.outcomes[0]?.price ?? 0;

  return (
    <MarketCardShell
      market={market}
      headerAction={
        <ChanceArc percent={Math.round(leadingPrice * 100)} />
      }
      contentClassName="flex-1"
    >
      <div className="mt-auto">
        <YesNoButtons variant="blocks" />
      </div>
    </MarketCardShell>
  );
}
