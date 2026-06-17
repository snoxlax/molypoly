import type { Market, MarketImageShape, MarketOutcome, MarketVariant } from "@/types/market";
import type { EventDetail, EventDetailOutcome } from "@/types/event-detail";
import type { GammaEvent, GammaMarket } from "@/types/polymarket";

const MAX_CARD_OUTCOMES = 2;
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
    question?: string;
    imageUrl?: string;
    assetLabel?: string;
    isLive?: boolean;
  },
): MarketBaseFields {
  return {
    id: event.id,
    slug: event.slug ?? event.id,
    question: options.question ?? event.title ?? UNTITLED_MARKET,
    category: options.category,
    variant: options.variant,
    imageShape: options.imageShape,
    volume: event.volume ?? 0,
    frequency: null,
    imageUrl: options.imageUrl ?? event.image ?? undefined,
    assetLabel: options.assetLabel,
    isLive: options.isLive,
  };
}

function buildCardOutcomes(markets: GammaMarket[]): MarketOutcome[] {
  return markets.slice(0, MAX_CARD_OUTCOMES).map((market) => ({
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
      question: market.question ?? undefined,
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
      imageShape: "square",
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

function buildDetailOutcomesForSingleMarket(
  market: GammaMarket,
): EventDetailOutcome[] {
  const labels = parseJsonStringArray(market.outcomes);
  const volume = market.volume24hr ?? undefined;

  if (labels.includes("Yes") && labels.includes("No")) {
    return [
      {
        id: `${market.id}-yes`,
        label: "Yes",
        price: readOutcomePrice(market, "Yes"),
        volume,
      },
      {
        id: `${market.id}-no`,
        label: "No",
        price: readOutcomePrice(market, "No"),
        volume,
      },
    ];
  }

  return labels.map((label) => ({
    id: `${market.id}-${label.toLowerCase()}`,
    label,
    price: readOutcomePrice(market, label),
    volume,
  }));
}

function buildDetailOutcomesForMultiMarket(
  openMarkets: GammaMarket[],
): EventDetailOutcome[] {
  return openMarkets.map((market) => ({
    id: market.id,
    label: market.groupItemTitle ?? market.question ?? "Unknown",
    price: readOutcomePrice(market, "Yes"),
    volume: market.volume24hr ?? undefined,
  }));
}

function resolveEventMeta(
  title: string,
  categoryOverride?: string,
): {
  category: string;
  assetLabel?: string;
} {
  if (categoryOverride) {
    if (categoryOverride === "Crypto") {
      const assetLabel = detectCryptoAssetLabel(title);
      return {
        category: "Crypto",
        assetLabel: assetLabel === CRYPTO_CATEGORY ? undefined : assetLabel,
      };
    }
    return { category: categoryOverride };
  }

  return { category: categoryOverride ?? "Politics" };
}

export function mapEventToDetail(
  event: GammaEvent,
  categoryOverride?: string,
): EventDetail | null {
  const openMarkets = getRankedOpenMarkets(event);

  if (openMarkets.length === 0) return null;

  const outcomes =
    openMarkets.length === 1
      ? buildDetailOutcomesForSingleMarket(openMarkets[0]!)
      : buildDetailOutcomesForMultiMarket(openMarkets);

  const { category, assetLabel } = resolveEventMeta(
    event.title ?? "",
    categoryOverride,
  );

  return {
    id: event.id,
    slug: event.slug ?? event.id,
    title: event.title ?? UNTITLED_MARKET,
    volume: event.volume ?? 0,
    imageUrl: event.image ?? undefined,
    category,
    assetLabel,
    outcomes,
  };
}

// --- Crypto markets ---

const CRYPTO_CATEGORY = "Crypto";

const CRYPTO_ASSETS = [
  "Bitcoin",
  "Ethereum",
  "Solana",
  "XRP",
  "Dogecoin",
  "BNB",
  "MicroStrategy",
] as const;

const ASSET_LABEL_OVERRIDES: Record<string, string> = {
  microstrategy: "Microstrategy",
};

const SHORT_ASSET_LABELS: Record<string, string> = {
  Bitcoin: "BTC",
  Ethereum: "ETH",
  Solana: "SOL",
};

const UP_DOWN_TIME_RANGE =
  /(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i;

function isShortIntervalUpDownEvent(event: GammaEvent): boolean {
  const title = event.title ?? "";

  return /up or down/i.test(title) && UP_DOWN_TIME_RANGE.test(title);
}

function isUpDownMarket(market: GammaMarket): boolean {
  const outcomes = parseJsonStringArray(market.outcomes);

  return outcomes.includes("Up") && outcomes.includes("Down");
}

function detectCryptoAssetLabel(title: string): string {
  const lower = title.toLowerCase();

  for (const asset of CRYPTO_ASSETS) {
    if (lower.includes(asset.toLowerCase())) {
      return ASSET_LABEL_OVERRIDES[asset.toLowerCase()] ?? asset;
    }
  }

  return CRYPTO_CATEGORY;
}

function getCryptoImageUrl(event: GammaEvent, market?: GammaMarket): string | undefined {
  return market?.image ?? market?.icon ?? event.image ?? undefined;
}

function formatCryptoOutcomeLabel(market: GammaMarket): string {
  const rawTitle = market.groupItemTitle?.trim();

  if (rawTitle) {
    const cleaned = rawTitle
      .replace(/\u0018/g, "↑")
      .replace(/\u0019/g, "↓")
      .trim();

    if (cleaned) return cleaned;
  }

  const question = market.question ?? "";
  const priceMatch = question.match(/\$?([\d,]+)/);
  const price = priceMatch?.[1];

  if (!price) return market.groupItemTitle ?? "Unknown";

  if (/dip|below|less than/i.test(question)) return `↓ ${price}`;
  if (/reach|above|greater/i.test(question)) return `↑ ${price}`;

  return price;
}

function rankCryptoPriceMarkets(markets: GammaMarket[]): GammaMarket[] {
  return [...markets].sort((a, b) => {
    const volumeDiff = (b.volume24hr ?? 0) - (a.volume24hr ?? 0);

    if (volumeDiff !== 0) return volumeDiff;

    return readOutcomePrice(b, "Yes") - readOutcomePrice(a, "Yes");
  });
}

function buildCryptoOutcomes(market: GammaMarket): MarketOutcome[] {
  const labels = parseJsonStringArray(market.outcomes);

  return labels.map((label) => ({
    id: `${market.id}-${label.toLowerCase()}`,
    label,
    price: readOutcomePrice(market, label),
  }));
}

function buildCryptoBinaryMarket(
  event: GammaEvent,
  market: GammaMarket,
  assetLabel: string,
): Market {
  const outcomes = buildCryptoOutcomes(market);
  const isUpDown = isUpDownMarket(market);
  const leadingOutcome = isUpDown
    ? outcomes.find((outcome) => outcome.label === "Up") ?? outcomes[0]
    : outcomes.find((outcome) => outcome.label === "Yes") ?? outcomes[0];

  return {
    ...buildMarketBase(event, {
      category: CRYPTO_CATEGORY,
      variant: "binary",
      imageShape: "square",
      question: event.title ?? market.question ?? undefined,
      imageUrl: getCryptoImageUrl(event, market),
      assetLabel,
      isLive: isUpDown,
    }),
    leadingPrice: leadingOutcome?.price ?? 0,
    outcomes,
  };
}

function buildCryptoMultiMarket(
  event: GammaEvent,
  openMarkets: GammaMarket[],
  assetLabel: string,
): Market {
  const outcomes = rankCryptoPriceMarkets(openMarkets)
    .slice(0, MAX_CARD_OUTCOMES)
    .map((market) => ({
      id: market.id,
      label: formatCryptoOutcomeLabel(market),
      price: readOutcomePrice(market, "Yes"),
    }));

  return {
    ...buildMarketBase(event, {
      category: CRYPTO_CATEGORY,
      variant: "multi",
      imageShape: "square",
      imageUrl: getCryptoImageUrl(event, openMarkets[0]),
      assetLabel,
    }),
    outcomes,
  };
}

function mapEventToCryptoMarket(event: GammaEvent): Market | null {
  const openMarkets = getRankedOpenMarkets(event);

  if (openMarkets.length === 0) return null;

  const assetLabel = detectCryptoAssetLabel(event.title ?? "");

  if (openMarkets.length === 1) {
    return buildCryptoBinaryMarket(event, openMarkets[0]!, assetLabel);
  }

  return buildCryptoMultiMarket(event, openMarkets, assetLabel);
}

export function mapEventsToCryptoMarkets(events: GammaEvent[]): Market[] {
  return events
    .filter((event) => !isShortIntervalUpDownEvent(event))
    .map(mapEventToCryptoMarket)
    .filter((market): market is Market => market !== null);
}

function parseClockToMinutes(hour: number, minute: number, period: string): number {
  const isPm = period.toUpperCase() === "PM";
  const isAm = period.toUpperCase() === "AM";
  let normalizedHour = hour;

  if (isPm && normalizedHour !== 12) normalizedHour += 12;
  if (isAm && normalizedHour === 12) normalizedHour = 0;

  return normalizedHour * 60 + minute;
}

function getUpDownIntervalLabel(title: string): string | null {
  const match = title.match(UP_DOWN_TIME_RANGE);

  if (!match) return null;

  const start = parseClockToMinutes(
    Number.parseInt(match[1]!, 10),
    Number.parseInt(match[2]!, 10),
    match[3]!,
  );
  const end = parseClockToMinutes(
    Number.parseInt(match[4]!, 10),
    Number.parseInt(match[5]!, 10),
    match[6]!,
  );
  const diff = end <= start ? end + 24 * 60 - start : end - start;

  return `${diff}m`;
}

function formatPromoQuestion(event: GammaEvent, assetLabel: string): string {
  const shortAsset = SHORT_ASSET_LABELS[assetLabel] ?? assetLabel;
  const interval = getUpDownIntervalLabel(event.title ?? "");

  return interval
    ? `${shortAsset} Up or Down ${interval}`
    : `${shortAsset} Up or Down`;
}

export function getCryptoPromoMarket(events: GammaEvent[]): Market | null {
  const promoEvent = events.find(
    (event) =>
      isShortIntervalUpDownEvent(event) &&
      /bitcoin|btc/i.test(event.title ?? ""),
  );

  if (!promoEvent) return null;

  const market = mapEventToCryptoMarket(promoEvent);

  if (!market) return null;

  const assetLabel = market.assetLabel ?? CRYPTO_CATEGORY;

  return {
    ...market,
    question: formatPromoQuestion(promoEvent, assetLabel),
    isLive: true,
  };
}
