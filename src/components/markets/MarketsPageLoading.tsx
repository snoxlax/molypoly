import { MarketsPageHeader } from '@/components/layout/MarketsPageHeader';

type MarketsPageLoadingProps = {
  title: string;
};

export function MarketsPageLoading({ title }: MarketsPageLoadingProps) {
  return (
    <div className="no-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
      <MarketsPageHeader title={title} />
      <section className="min-w-0 px-4 pb-10 lg:px-0">
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(180px,auto)] *:min-w-0">
          {Array.from({ length: 9 }, (_, index) => (
            <div
              key={index}
              className="min-h-[181px] animate-pulse rounded-xl bg-card p-4 shadow-md shadow-black/5 ring-1 ring-foreground/5"
            >
              <div className="flex items-start gap-3">
                <div className="size-12 rounded-md bg-zinc-700/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full rounded bg-zinc-700/50" />
                  <div className="h-4 w-2/3 rounded bg-zinc-700/50" />
                </div>
                <div className="size-12 rounded-full bg-zinc-700/50" />
              </div>
              <div className="mt-7 flex gap-2">
                <div className="h-10 flex-1 rounded-lg bg-zinc-700/50" />
                <div className="h-10 flex-1 rounded-lg bg-zinc-700/50" />
              </div>
              <div className="mt-5 h-3 w-24 rounded bg-zinc-700/50" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
