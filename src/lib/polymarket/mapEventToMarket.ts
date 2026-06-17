import type { Market, MarketImageShape, MarketOutcome, MarketVariant } from "@/types/market";
import type { EventDetail, EventDetailOutcome } from "@/types/eventDetail";
import type { GammaEvent, GammaMarket } from "@/types/polymarket";

import {
  ASSET_LABEL_OVERRIDES,
  CRYPTO_ASSETS,
  CRYPTO_CATEGORY,
  MAX_CARD_OUTCOMES,
  POLITICS_CATEGORY,
  SHORT_ASSET_LABELS,
  UNTITLED_MARKET,
  UP_DOWN_TIME_RANGE,
} from "@/lib/polymarket/constants";

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

function isUpDownMarket(market: GammaMarket): boolean {
  const outcomes = parseJsonStringArray(market.outcomes);

  return outcomes.includes("Up") && outcomes.includes("Down");
}

function defaultMultiOutcomeLabel(market: GammaMarket): string {
  return market.groupItemTitle ?? market.question ?? "Unknown";
}

// --- Outcome assembly ---

function buildOutcomesFromSingleMarket(market: GammaMarket): MarketOutcome[] {
  const labels = parseJsonStringArray(market.outcomes);

  if (labels.length > 0) {
    return labels.map((label) => ({
      id: `${market.id}-${label.toLowerCase()}`,
      label,
      price: readOutcomePrice(market, label),
    }));
  }

  return [
    {
      id: `${market.id}-yes`,
      label: "Yes",
      price: readOutcomePrice(market, "Yes"),
    },
    {
      id: `${market.id}-no`,
      label: "No",
      price: readOutcomePrice(market, "No"),
    },
  ];
}

function buildOutcomesFromMultipleMarkets(
  markets: GammaMarket[],
  options: {
    limit?: number;
    rankMarkets?: (markets: GammaMarket[]) => GammaMarket[];
    formatLabel?: (market: GammaMarket) => string;
  } = {},
): MarketOutcome[] {
  const {
    limit = MAX_CARD_OUTCOMES,
    rankMarkets = (items) => items,
    formatLabel = defaultMultiOutcomeLabel,
  } = options;

  return rankMarkets(markets).slice(0, limit).map((market) => ({
    id: market.id,
    label: formatLabel(market),
    price: readOutcomePrice(market, "Yes"),
  }));
}

function withOutcomeVolume(
  outcomes: MarketOutcome[],
  volume?: number,
): EventDetailOutcome[] {
  return outcomes.map((outcome) => ({
    ...outcome,
    volume,
  }));
}

function getLeadingOutcome(outcomes: MarketOutcome[]): MarketOutcome | undefined {
  const upOutcome = outcomes.find((outcome) => outcome.label === "Up");
  if (upOutcome) return upOutcome;

  const yesOutcome = outcomes.find((outcome) => outcome.label === "Yes");
  if (yesOutcome) return yesOutcome;

  return outcomes[0];
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

type MapMarketOptions = {
  category: string;
  assetLabel?: string;
  resolveImageUrl?: (event: GammaEvent, market?: GammaMarket) => string | undefined;
  resolveBinaryQuestion?: (event: GammaEvent, market: GammaMarket) => string | undefined;
  resolveIsLive?: (event: GammaEvent, market: GammaMarket) => boolean | undefined;
  rankMultiMarkets?: (markets: GammaMarket[]) => GammaMarket[];
  formatMultiOutcomeLabel?: (market: GammaMarket) => string;
};

function mapEventToMarketWithOptions(
  event: GammaEvent,
  options: MapMarketOptions,
): Market | null {
  const openMarkets = getRankedOpenMarkets(event);

  if (openMarkets.length === 0) return null;

  const resolveImageUrl =
    options.resolveImageUrl ?? ((gammaEvent) => gammaEvent.image ?? undefined);

  if (openMarkets.length === 1) {
    const market = openMarkets[0]!;
    const outcomes = buildOutcomesFromSingleMarket(market);
    const leadingOutcome = getLeadingOutcome(outcomes);

    return {
      ...buildMarketBase(event, {
        category: options.category,
        variant: "binary",
        imageShape: "square",
        question:
          options.resolveBinaryQuestion?.(event, market) ??
          market.question ??
          undefined,
        imageUrl: resolveImageUrl(event, market),
        assetLabel: options.assetLabel,
        isLive: options.resolveIsLive?.(event, market),
      }),
      leadingPrice: leadingOutcome?.price ?? 0,
      outcomes,
    };
  }

  return {
    ...buildMarketBase(event, {
      category: options.category,
      variant: "multi",
      imageShape: "square",
      imageUrl: resolveImageUrl(event, openMarkets[0]),
      assetLabel: options.assetLabel,
    }),
    outcomes: buildOutcomesFromMultipleMarkets(openMarkets, {
      rankMarkets: options.rankMultiMarkets,
      formatLabel: options.formatMultiOutcomeLabel,
    }),
  };
}

// --- Public API ---

export function mapEventToMarket(
  event: GammaEvent,
  category = POLITICS_CATEGORY,
): Market | null {
  return mapEventToMarketWithOptions(event, { category });
}

export function mapEventsToMarkets(
  events: GammaEvent[],
  category = POLITICS_CATEGORY,
): Market[] {
  return events
    .map((event) => mapEventToMarket(event, category))
    .filter((market): market is Market => market !== null);
}

function resolveEventMeta(
  title: string,
  categoryOverride?: string,
): {
  category: string;
  assetLabel?: string;
} {
  if (categoryOverride) {
    if (categoryOverride === CRYPTO_CATEGORY) {
      const assetLabel = detectCryptoAssetLabel(title);
      return {
        category: CRYPTO_CATEGORY,
        assetLabel: assetLabel === CRYPTO_CATEGORY ? undefined : assetLabel,
      };
    }
    return { category: categoryOverride };
  }

  return { category: categoryOverride ?? POLITICS_CATEGORY };
}

export function mapEventToDetail(
  event: GammaEvent,
  categoryOverride?: string,
): EventDetail | null {
  const openMarkets = getRankedOpenMarkets(event);

  if (openMarkets.length === 0) return null;

  const outcomes =
    openMarkets.length === 1
      ? withOutcomeVolume(
        buildOutcomesFromSingleMarket(openMarkets[0]!),
        openMarkets[0]!.volume24hr ?? undefined,
      )
      : buildOutcomesFromMultipleMarkets(openMarkets, {
        limit: openMarkets.length,
      }).map((outcome) => {
        const market = openMarkets.find((item) => item.id === outcome.id);
        return {
          ...outcome,
          volume: market?.volume24hr ?? undefined,
        };
      });

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

function isShortIntervalUpDownEvent(event: GammaEvent): boolean {
  const title = event.title ?? "";

  return /up or down/i.test(title) && UP_DOWN_TIME_RANGE.test(title);
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

function getCryptoImageUrl(
  event: GammaEvent,
  market?: GammaMarket,
): string | undefined {
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

function mapEventToCryptoMarket(event: GammaEvent): Market | null {
  const assetLabel = detectCryptoAssetLabel(event.title ?? "");

  return mapEventToMarketWithOptions(event, {
    category: CRYPTO_CATEGORY,
    assetLabel: assetLabel === CRYPTO_CATEGORY ? undefined : assetLabel,
    resolveImageUrl: getCryptoImageUrl,
    resolveBinaryQuestion: (gammaEvent, market) =>
      gammaEvent.title ?? market.question ?? undefined,
    resolveIsLive: (_gammaEvent, market) =>
      isUpDownMarket(market) ? true : undefined,
    rankMultiMarkets: rankCryptoPriceMarkets,
    formatMultiOutcomeLabel: formatCryptoOutcomeLabel,
  });
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
