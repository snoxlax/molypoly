import type { Market } from '@/types/market';
import { MarketCardShell } from './MarketCardShell';
import { OutcomeRow } from './OutcomeRow';

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
