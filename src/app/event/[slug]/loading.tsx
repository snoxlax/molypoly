export default function EventLoading() {
  return (
    <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
      <div className="site-container animate-pulse px-4 py-6 lg:px-5">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-start gap-3">
            <div className="size-14 shrink-0 rounded-full bg-zinc-700/50" />
            <div className="flex-1 space-y-3">
              <div className="h-3 w-24 rounded bg-zinc-700/50" />
              <div className="h-7 w-3/4 rounded bg-zinc-700/50" />
              <div className="h-4 w-20 rounded bg-zinc-700/50" />
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 ring-1 ring-foreground/10 sm:px-5">
            {[1, 2, 3, 4].map((row) => (
              <div
                key={row}
                className="flex items-center gap-4 border-b border-border py-4 last:border-b-0"
              >
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 rounded bg-zinc-700/50" />
                  <div className="h-3 w-16 rounded bg-zinc-700/50" />
                </div>
                <div className="h-7 w-12 rounded bg-zinc-700/50" />
                <div className="hidden h-9 w-52 rounded bg-zinc-700/50 sm:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
