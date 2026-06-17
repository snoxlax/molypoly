# Molypoly

Molypoly is a focused Next.js implementation of the core Polymarket browsing experience for the PLAEE frontend assignment. It uses the Polymarket Gamma API for open events, mirrors the main market grid and event detail flows, and demonstrates live probability updates with Jotai-powered simulated prices.

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Jotai for client-side price atoms
- Tailwind CSS and shadcn/radix primitives
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

## Feature Coverage

- Main politics market grid at `/`
- Dedicated bonus category pages at `/crypto` and `/sports`
- Working top navigation for Politics, Sports, and Crypto
- Event detail pages at `/event/[slug]`
- Event title, volume, all mapped outcomes, live prices, and trade-style buttons
- Loading skeletons for list routes and event detail routes
- Event-page simulated live price movement without page refresh
- Subtle rising/falling highlight when simulated prices change

## Architecture

Server routes fetch open Polymarket events from the Gamma API and map them into small UI-facing market types before rendering. The list pages keep that fetched market data as props instead of storing static lists globally.

Client-side Jotai state is reserved for live event prices. Each outcome has its own atom through `jotai-family`, so a simulated tick updates only the subscribed outcome row instead of forcing the whole page or grid to re-render.

## Realtime Approach

This project intentionally does not use WebSockets. The assignment allows a convincing simulation, so live updates run only on event detail pages. On mount, the event outcomes seed Jotai price atoms from the server-provided prices. Every 2.5 seconds, one outcome moves by a small bounded delta; paired Yes/No or Up/Down outcomes are updated inversely.

Market list pages show server-provided prices. This keeps the realtime demo clear and scoped to the event page, where the live percentages, trade buttons, and price-change highlights make the update behavior visible.

## Next.js Usage

- App Router route segments are used for `/`, `/crypto`, `/sports`, and `/event/[slug]`.
- Dynamic event pages use async `params` and `searchParams`.
- Route-level `loading.tsx` files provide streaming skeleton states.
- Gamma API fetches use short `next.revalidate` caching so the server data is reasonably fresh while the client simulation handles live movement.
- `not-found.tsx` handles missing or unavailable events.

## Limitations

- No real trading, order book, authentication, or portfolio state.
- No WebSocket connection to Polymarket live feeds.
- Event outcomes use live percentages and trade buttons, not separate probability bars.
- Topic sidebar counts are presentational and do not filter markets.
- Search and auth header controls are visual only.
- Event and category data quality depends on the public Gamma API response shape.
