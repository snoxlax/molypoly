import type { Market } from '@/types/market';
import { MarketCardShell } from './market-card-shell';
import { OutcomeRow } from './outcome-row';

type MarketCardMultiProps = {
  market: Market;
};

export function MarketCardMulti({ market }: MarketCardMultiProps) {
  return (
    <MarketCardShell market={market}>
      {market.outcomes.map((outcome) => (
        <OutcomeRow
          key={outcome.id}
          outcome={outcome}
        />
      ))}
    </MarketCardShell>
  );
}
