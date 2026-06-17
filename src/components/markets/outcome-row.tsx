"use client";

import { YesNoButtons } from "@/components/ui/yes-no-buttons";
import { formatProbability } from "@/lib/utils";
import type { MarketOutcome } from "@/types/market";

type OutcomeRowProps = {
  outcome: MarketOutcome;
};

export function OutcomeRow({ outcome }: OutcomeRowProps) {
  return (
    <div className="flex h-[27px] items-center">
      <span className="min-w-0 flex-1 truncate text-sm text-foreground">
        {outcome.label}
      </span>
      <div className="outcome-actions shrink-0">
        <span className="outcome-percent tabular-nums">
          {formatProbability(outcome.price)}
        </span>
        <YesNoButtons variant="pills" price={outcome.price} />
      </div>
    </div>
  );
}
