"use client";

import { useAtomValue } from "jotai";

import { MarketImage } from "@/components/ui/market-image";
import { formatCents } from "@/lib/utils";
import { outcomePricesAtom } from "@/store/markets";
import type { EventDetailOutcome } from "@/types/event-detail";

type EventTradePanelProps = {
  title: string;
  imageUrl?: string;
  outcome?: EventDetailOutcome;
};

export function EventTradePanel({
  title,
  imageUrl,
  outcome,
}: EventTradePanelProps) {
  const prices = useAtomValue(outcomePricesAtom);
  const atomPrice = outcome?.id ? prices[outcome.id] : undefined;
  const price = atomPrice || outcome?.price || 0;

  return (
    <aside className="event-ticket">
      <div className="flex items-center gap-2">
        <MarketImage
          shape="square"
          imageUrl={imageUrl}
          alt=""
          className="size-9 rounded-lg"
        />
        <p className="line-clamp-2 text-sm font-semibold leading-snug">
          {outcome?.label ?? title}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-border text-sm font-semibold">
        <div className="flex gap-4">
          <button type="button" className="border-b-2 border-foreground pb-2">
            Buy
          </button>
          <button type="button" className="pb-2 text-muted-foreground">
            Sell
          </button>
        </div>
        <button type="button" className="pb-2 text-xs text-foreground">
          Market v
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="ticket-choice ticket-choice-yes">
          Yes {formatCents(price)}
        </button>
        <button type="button" className="ticket-choice ticket-choice-no">
          No {formatCents(1 - price)}
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>Amount</span>
          <span className="text-3xl text-muted-foreground">$0</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["+$1", "+$5", "+$10", "+$100", "Max"].map((amount) => (
            <button
              key={amount}
              type="button"
              className="rounded bg-secondary px-2 py-1 text-xs font-semibold text-muted-foreground"
            >
              {amount}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="mt-4 h-10 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        Trade
      </button>
    </aside>
  );
}
