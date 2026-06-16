import type { Market, MarketImageShape, MarketOutcome, MarketVariant } from "@/types/market";
import type { GammaEvent, GammaMarket } from "@/types/polymarket";

const MAX_MULTI_CARD_OUTCOMES = 2;
const UNTITLED_MARKET = "Untitled market";

// --- Gamma API field parsing ---

function parseJsonStringArray(raw: string | null): string[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function parseNumericString(raw: string | undefined): number {
  if (!raw) return 0;

  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 0;
}

// --- Outcome prices ---

function readOutcomePrice(market: GammaMarket, outcomeLabel: string): number {
  const labels = parseJsonStringArray(market.outcomes);
  const prices = parseJsonStringArray(market.outcomePrices);
  const index = labels.indexOf(outcomeLabel);

  if (index < 0 || index >= prices.length) return 0;

  return parseNumericString(prices[index]);
}

// --- Market selection ---

function isOpenActiveMarket(market: GammaMarket): boolean {
  return Boolean(market.active && !market.closed);
}

function getRankedOpenMarkets(event: GammaEvent): GammaMarket[] {
  return (event.markets ?? [])
    .filter(isOpenActiveMarket)
    .sort(
      (a, b) =>
        readOutcomePrice(b, "Yes") - readOutcomePrice(a, "Yes"),
    );
}

// --- Market card assembly ---

type MarketBaseFields = Omit<Market, "outcomes" | "leadingPrice">;

function buildMarketBase(
  event: GammaEvent,
  options: {
    category: string;
    variant: MarketVariant;
    imageShape: MarketImageShape;
    questionFallback?: string;
  },
): MarketBaseFields {
  return {
    id: event.id,
    slug: event.slug ?? event.id,
    question: event.title ?? options.questionFallback ?? UNTITLED_MARKET,
    category: options.category,
    variant: options.variant,
    imageShape: options.imageShape,
    volume: event.volume ?? 0,
    frequency: null,
    imageUrl: event.image ?? undefined,
  };
}

function buildCardOutcomes(markets: GammaMarket[]): MarketOutcome[] {
  return markets.slice(0, MAX_MULTI_CARD_OUTCOMES).map((market) => ({
    id: market.id,
    label: market.groupItemTitle ?? market.question ?? "Unknown",
    price: readOutcomePrice(market, "Yes"),
  }));
}

function buildBinaryMarket(
  event: GammaEvent,
  market: GammaMarket,
  category: string,
): Market {
  const yesPrice = readOutcomePrice(market, "Yes");
  const noPrice = readOutcomePrice(market, "No");

  return {
    ...buildMarketBase(event, {
      category,
      variant: "binary",
      imageShape: "square",
      questionFallback: market.question ?? undefined,
    }),
    leadingPrice: yesPrice,
    outcomes: [
      { id: `${market.id}-yes`, label: "Yes", price: yesPrice },
      { id: `${market.id}-no`, label: "No", price: noPrice },
    ],
  };
}

function buildMultiMarket(
  event: GammaEvent,
  openMarkets: GammaMarket[],
  category: string,
): Market {
  return {
    ...buildMarketBase(event, {
      category,
      variant: "multi",
      imageShape: "circle",
    }),
    outcomes: buildCardOutcomes(openMarkets),
  };
}

// --- Public API ---

export function mapEventToMarket(
  event: GammaEvent,
  category = "Politics",
): Market | null {
  const openMarkets = getRankedOpenMarkets(event);

  if (openMarkets.length === 0) return null;
  if (openMarkets.length === 1) {
    return buildBinaryMarket(event, openMarkets[0]!, category);
  }

  return buildMultiMarket(event, openMarkets, category);
}

export function mapEventsToMarkets(
  events: GammaEvent[],
  category = "Politics",
): Market[] {
  return events
    .map((event) => mapEventToMarket(event, category))
    .filter((market): market is Market => market !== null);
}
