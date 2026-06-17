# MolyPoly

MolyPoly is a focused Next.js implementation of the core Polymarket browsing experience. It uses the Polymarket Gamma API for open events, mirrors the main market grid and event detail flows, and demonstrates live probability updates with Jotai-powered simulated prices on event detail pages.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Jotai for client-side price atoms
- Tailwind CSS 4 and shadcn/Radix UI primitives
- Polymarket Gamma API: `https://gamma-api.polymarket.com`

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run build
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Trending market grid (mixed categories by volume) |
| `/politics` | Politics market grid |
| `/sports` | Sports market grid |
| `/crypto` | Crypto market grid |
| `/event/[slug]` | Event detail page |

Trending, Politics, Sports, and Crypto are implemented. Other category labels in the header are presentational.

## Feature Coverage

- Trending market grid at `/` with cross-category topic sidebar UI
- Politics market grid at `/politics` with politics topic sidebar UI and promo card
- Sports market grid at `/sports`
- Crypto market grid at `/crypto` with crypto-specific topic sidebar UI and an API-derived short-interval BTC promo card when available
- Top navigation links for Trending, Politics, Sports, and Crypto
- Event detail pages at `/event/[slug]` with title, volume, mapped outcomes, and trade-style buttons
- Loading skeletons for list routes and event detail routes
- **Live price simulation on all event detail pages** — percentages update every 2.5s with rising/falling highlights

## Architecture

Server route components fetch open Polymarket events from the Gamma API and map them into small UI-facing market types before rendering. List pages pass fetched market data as props; there is no custom API route, database, or global server cache beyond Next.js fetch caching.

Client-side Jotai state uses two plain atoms in `src/store/markets.ts`:

- `eventDetailAtom` — current event detail for the trade panel
- `outcomePricesAtom` — a `Record<outcomeId, price>` map for live percentages

`useLivePriceSimulation` seeds and updates `outcomePricesAtom` on an interval via `useStore()`. Event detail components (`EventOutcomeRow`, `EventTradePanel`) read prices with `useAtomValue(outcomePricesAtom)` and look up their outcome by ID. Paired Yes/No and Up/Down outcomes stay in sync through `buildPairedOutcomeMap()`.

### API fetching

Events are fetched by tag (`politics`, `sports`, `crypto`) with per-tag limits, plus a trending feed at `/`:

- Trending: 30 events (no tag filter, ordered by `volume24hr`)
- Politics: 20 events
- Sports: 20 events
- Crypto: 50 events

When a tag needs more than 10 events, the fetch helper splits the request into multiple parallel calls (`limit=10` per chunk, offset pagination) and merges the results with deduplication.

Fetches use `next.revalidate: 60` (60-second ISR). Failed list fetches are logged and return an empty array; failed event fetches return `null` and render the event not-found page. Next.js only caches individual fetch responses under its 2MB limit — larger chunks (notably politics/sports offset pages) may skip the data cache and still return data at runtime. You may see a build-time warning about this; it is non-fatal.

## Realtime Approach

This project intentionally does not use WebSockets. The assignment allows a convincing simulation, so live updates are scoped to event detail pages:

1. All **event detail pages** enable simulation on mount.
2. Outcomes seed Jotai price atoms from server-provided prices.
3. Every 2.5 seconds, one outcome moves by a small bounded delta; paired Yes/No or Up/Down outcomes update inversely.

Market list pages show server-provided prices only.

## Next.js Usage

- App Router segments for `/`, `/politics`, `/crypto`, `/sports`, and `/event/[slug]`
- Dynamic event pages use async `params`
- Route-level `loading.tsx` files provide streaming skeleton states
- Gamma API fetches use short `revalidate` caching; client simulation handles live movement on event detail pages
- `app/event/[slug]/not-found.tsx` handles missing or unavailable events

## Limitations

### Scope

- **Trending plus three categories only** — Trending, Politics, Sports, and Crypto are wired up. No other Polymarket categories are implemented as routes.
- **No real trading** — order book, authentication, wallet, and portfolio state are out of scope.
- **No WebSockets** — prices are simulated client-side, not streamed from Polymarket.

### Navigation

- **Top category nav** — Trending, Politics, Sports, and Crypto links work. World Cup, Breaking, Esports, and other header items are visual placeholders with no routes.
- **Topic sidebars** — trending, politics, and crypto sidebars render filter labels and counts but do not filter the grid.

### Data and caching

- Event and category data quality depends on the public Gamma API response shape.
- Fetch limits cap how many events appear per page (30 trending, 20 politics, 20 sports, 50 crypto).
- Large API responses may not be fully cached by Next.js; chunked fetches reduce payload size but some chunks can still exceed the 2MB cache limit.
- **No dedicated API error UI** — if the Gamma API fails, times out, or returns an unexpected response, list pages do not show an explicit error message. They may render an empty grid, while event detail failures fall back to the event not-found page.

### UI

- Search and auth header controls are visual only.
- Event outcomes use live percentages and trade buttons, not separate probability bars.
- Unmatched pages rely on Next.js not-found behavior; only the event not-found state is customized in this codebase.
- A few small visual bugs remain — layout, spacing, or polish differences from the reference Polymarket UI.
