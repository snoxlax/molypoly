export const MAX_CARD_OUTCOMES = 2;
export const UNTITLED_MARKET = "Untitled market";
export const TRENDING_CATEGORY = "Trending";
export const POLITICS_CATEGORY = "Politics";
export const SPORTS_CATEGORY = "Sports";
export const CRYPTO_CATEGORY = "Crypto";

export const CRYPTO_ASSETS = [
  "Bitcoin",
  "Ethereum",
  "Solana",
  "XRP",
  "Dogecoin",
  "BNB",
  "MicroStrategy",
] as const;

export const ASSET_LABEL_OVERRIDES: Record<string, string> = {
  microstrategy: "Microstrategy",
};

export const SHORT_ASSET_LABELS: Record<string, string> = {
  Bitcoin: "BTC",
  Ethereum: "ETH",
  Solana: "SOL",
};

export const UP_DOWN_TIME_RANGE =
  /(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i;
