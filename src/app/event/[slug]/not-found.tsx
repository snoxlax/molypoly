import Link from "next/link";

export default function EventNotFound() {
  return (
    <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
      <div className="site-container px-4 py-16 text-center lg:px-5">
        <h1 className="text-2xl font-bold tracking-tight">Market not found</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          This event may be closed, unavailable from the Gamma API, or no longer
          listed in the current market feed.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Back to markets
        </Link>
      </div>
    </div>
  );
}
