import { MarketsPageHeader } from '@/components/layout/MarketsPageHeader';

import { MarketCardSkeleton } from './MarketCardSkeleton';

type MarketsPageLoadingProps = {
  title: string;
};

export function MarketsPageLoading({ title }: MarketsPageLoadingProps) {
  return (
    <div className="scroll-container flex min-h-0 w-full min-w-0 flex-1 flex-col p-2">
      <MarketsPageHeader title={title} />
      <section className="min-w-0 px-4 pb-10 lg:px-0">
        <div className="grid w-full min-w-0 auto-rows-[minmax(180px,auto)] grid-cols-1 items-start gap-3 *:min-w-0 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }, (_, index) => (
            <MarketCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
