'use client';

import { ChanceArc } from '@/components/ui/ChanceArc';
import { YesNoButtons } from '@/components/ui/YesNoButtons';
import type { Market, MarketOutcome } from '@/types/market';
import { MarketCardShell } from './MarketCardShell';

type MarketCardBinaryProps = {
  market: Market;
};

function pickOutcome(
  outcomes: MarketOutcome[],
  labels: string[],
  fallbackIndex: number
): MarketOutcome | undefined {
  for (const label of labels) {
    const match = outcomes.find((outcome) => outcome.label === label);
    if (match) return match;
  }

  return outcomes[fallbackIndex];
}

export function MarketCardBinary({ market }: MarketCardBinaryProps) {
  const leadingOutcome =
    pickOutcome(market.outcomes, ['Up', 'Yes'], 0) ?? market.outcomes[0];
  const trailingOutcome =
    pickOutcome(market.outcomes, ['Down', 'No'], 1) ?? market.outcomes[1];

  const leadingPrice = leadingOutcome?.price ?? 0;
  const isUpDown =
    leadingOutcome?.label === 'Up' && trailingOutcome?.label === 'Down';

  return (
    <MarketCardShell
      market={market}
      headerAction={
        <ChanceArc
          percent={Math.round(leadingPrice * 100)}
          sublabel={isUpDown ? 'Up' : 'chance'}
        />
      }
      contentClassName="flex-1"
    >
      <div className="mt-auto">
        <YesNoButtons
          variant="blocks"
          yesLabel={leadingOutcome?.label ?? 'Yes'}
          noLabel={trailingOutcome?.label ?? 'No'}
          price={leadingPrice}
        />
      </div>
    </MarketCardShell>
  );
}
