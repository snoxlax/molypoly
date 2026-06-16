export const TOPIC_LUCIDE_ICONS = [
  "grid",
  "gauge",
  "clock-dashed",
  "clock-undo",
  "clock",
  "calendar",
  "bar-chart",
  "trending",
  "calendar-year",
  "chart",
] as const;

export type TopicLucideIconName = (typeof TOPIC_LUCIDE_ICONS)[number];

export const CRYPTO_ICON_NAMES = [
  "bitcoin",
  "ethereum",
  "solana",
  "xrp",
  "dogecoin",
  "bnb",
  "microstrategy",
] as const;

export type CryptoIconName = (typeof CRYPTO_ICON_NAMES)[number];

export type TopicFilterLink = {
  id: string;
  label: string;
  count: string;
  lucideIcon?: TopicLucideIconName;
  cryptoIcon?: CryptoIconName;
};

export type TopicFilterSeparator = {
  id: string;
  type: "separator";
};

export type TopicFilter = TopicFilterLink | TopicFilterSeparator;

export function isTopicFilterSeparator(
  filter: TopicFilter,
): filter is TopicFilterSeparator {
  return "type" in filter && filter.type === "separator";
}
