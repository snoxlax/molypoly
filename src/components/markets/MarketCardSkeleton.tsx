export function MarketCardSkeleton() {
  return (
    <div className="flex min-h-[181px] animate-pulse flex-col rounded-xl bg-card p-4 shadow-md shadow-black/5 ring-1 ring-foreground/5">
      <div className="flex items-start gap-3">
        <div className="size-10 shrink-0 rounded-md bg-zinc-700/50" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3.5 w-full rounded bg-zinc-700/50" />
          <div className="h-3.5 w-2/3 rounded bg-zinc-700/50" />
        </div>
        <div className="size-10 shrink-0 rounded-full bg-zinc-700/50" />
      </div>

      <div className="mt-auto flex gap-2 pt-7">
        <div className="h-10 flex-1 rounded-lg bg-zinc-700/50" />
        <div className="h-10 flex-1 rounded-lg bg-zinc-700/50" />
      </div>

      <div className="mt-3 h-3 w-20 rounded bg-zinc-700/50" />
    </div>
  );
}
