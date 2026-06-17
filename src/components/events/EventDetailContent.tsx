'use client';

import { useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';

import { EventOutcomeRow } from '@/components/events/EventOutcomeRow';
import { EventTradePanel } from '@/components/events/EventTradePanel';
import { MarketImage } from '@/components/ui/MarketImage';
import { useLivePriceSimulation } from '@/hooks/useLivePriceSimulation';
import { formatVolume } from '@/lib/utils';
import { eventDetailAtom, outcomePricesAtom } from '@/store/markets';
import type { EventDetail } from '@/types/event-detail';
import type { Market } from '@/types/market';

type EventDetailContentProps = {
  detail: EventDetail;
};

export function EventDetailContent({ detail }: EventDetailContentProps) {
  const setEventDetail = useSetAtom(eventDetailAtom);
  const setOutcomePrices = useSetAtom(outcomePricesAtom);

  useHydrateAtoms([[eventDetailAtom, detail]]);

  useEffect(() => {
    setEventDetail(detail);
    return () => {
      setEventDetail(null);
      setOutcomePrices({});
    };
  }, [detail, setEventDetail, setOutcomePrices]);

  const simulationMarket = useMemo(
    (): Market => ({
      id: detail.id,
      slug: detail.slug,
      question: detail.title,
      category: detail.category ?? '',
      variant: detail.outcomes.length <= 2 ? 'binary' : 'multi',
      imageShape: 'square',
      volume: detail.volume,
      frequency: null,
      outcomes: detail.outcomes,
    }),
    [detail]
  );

  const simulationMarkets = useMemo(
    () => [simulationMarket],
    [simulationMarket],
  );

  useLivePriceSimulation({
    markets: simulationMarkets,
  });

  const leadingOutcomeId = detail.outcomes[0]?.id;

  const breadcrumb = detail.assetLabel
    ? `${detail.category} > ${detail.assetLabel}`
    : detail.category;

  const backHref =
    detail.category === 'Sports'
      ? '/sports'
      : detail.category === 'Crypto'
        ? '/crypto'
        : '/';

  return (
    <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
      <div className="site-container px-4 py-6 lg:px-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_330px]">
          <main className="min-w-0">
            <header className="mb-4">
              <div className="flex items-start gap-3">
                <MarketImage
                  shape="square"
                  imageUrl={detail.imageUrl}
                  alt=""
                  sizes="(min-width: 640px) 64px, 56px"
                  className="size-14 rounded-lg sm:size-16"
                />
                <div className="min-w-0 flex-1">
                  {breadcrumb ? (
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      {breadcrumb}
                    </p>
                  ) : null}
                  <h1 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight sm:text-[30px]">
                    {detail.title}
                  </h1>
                  <p className="mt-3 flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
                    <span>{formatVolume(detail.volume)}</span>
                    <span aria-hidden>·</span>
                    <span>Live simulation</span>
                  </p>
                </div>
              </div>
            </header>

            <section className="rounded-xl border border-border bg-card/25">
              {detail.outcomes.map((outcome) => (
                <EventOutcomeRow
                  key={outcome.id}
                  outcome={outcome}
                  eventVolume={detail.volume}
                  highlightYes={outcome.id === leadingOutcomeId}
                />
              ))}
            </section>

            <p className="mt-6">
              <Link
                href={backHref}
                className="text-sm font-medium text-primary hover:underline"
              >
                ← Back to {detail.category || 'markets'}
              </Link>
            </p>
          </main>

          <EventTradePanel />
        </div>
      </div>
    </div>
  );
}
