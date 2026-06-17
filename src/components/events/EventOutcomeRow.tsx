"use client";

import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

import { YesNoButtons } from '@/components/ui/YesNoButtons';
import { cn, formatProbability, formatVolume } from "@/lib/utils";
import { outcomePricesAtom } from "@/store/markets";
import type { EventDetailOutcome } from "@/types/event-detail";

type EventOutcomeRowProps = {
  outcome: EventDetailOutcome;
  eventVolume?: number;
  highlightYes?: boolean;
};

export function EventOutcomeRow({
  outcome,
  eventVolume,
  highlightYes = false,
}: EventOutcomeRowProps) {
  const prices = useAtomValue(outcomePricesAtom);
  const price = prices[outcome.id];
  const livePrice = price || outcome.price;
  const previousPrice = useRef(livePrice);
  const [changeDirection, setChangeDirection] = useState<"up" | "down" | null>(
    null,
  );
  const [changePercent, setChangePercent] = useState(0);
  const volume = outcome.volume ?? eventVolume;

  useEffect(() => {
    const delta = livePrice - previousPrice.current;
    previousPrice.current = livePrice;

    if (Math.abs(delta) < 0.001) return;

    setChangeDirection(delta > 0 ? "up" : "down");
    setChangePercent(Math.max(1, Math.round(Math.abs(delta) * 100)));
    const timeoutId = window.setTimeout(() => setChangeDirection(null), 900);

    return () => window.clearTimeout(timeoutId);
  }, [livePrice]);

  return (
    <div
      className={cn(
        "event-outcome-row",
        changeDirection === "up" && "is-rising",
        changeDirection === "down" && "is-falling",
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-foreground">
          {outcome.label}
        </p>
        {volume ? (
          <p className="mt-1 text-xs text-muted-foreground">
            {formatVolume(volume)}
          </p>
        ) : null}
      </div>

      <div className="event-outcome-price">
        <p
          className={cn(
            "event-outcome-change",
            changeDirection === "up" && "text-yes",
            changeDirection === "down" && "text-no",
            !changeDirection && "opacity-0",
          )}
          aria-hidden={!changeDirection}
        >
          {changeDirection === "up" ? "+" : "-"}
          {changePercent}%
        </p>
        <p className="event-outcome-percent">{formatProbability(livePrice)}</p>
      </div>

      <YesNoButtons
        variant="trade"
        price={livePrice}
        highlightYes={highlightYes}
      />
    </div>
  );
}
