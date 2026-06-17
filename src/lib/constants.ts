import type { IconName } from "@/types/icon";
import type { TopicFilter } from "@/types/topic-sidebar";

export type { TopicFilter } from "@/types/topic-sidebar";

export const APP_NAME = "Polypoly";

export type CategoryLink = {
  id: string;
  label: string;
  icon?: IconName | "wc";
  accent?: "gold";
  href?: string;
};

export type CategorySeparator = {
  id: string;
  type: "separator";
};

export type Category = CategoryLink | CategorySeparator;

export function isCategorySeparator(
  category: Category,
): category is CategorySeparator {
  return "type" in category && category.type === "separator";
}

export const CATEGORIES: Category[] = [
  { id: "trending", label: "Trending", icon: "broken-arrow" },
  { id: "world-cup", label: "World Cup", icon: "wc", accent: "gold" },
  { id: "breaking", label: "Breaking" },
  { id: "breaking-separator", type: "separator" },
  { id: "politics", label: "Politics", href: "/" },
  { id: "sports", label: "Sports", href: "/sports" },
  { id: "crypto", label: "Crypto", href: "/crypto" },
  { id: "esports", label: "Esports" },
  { id: "iran", label: "Iran" },
  { id: "finance", label: "Finance" },
  { id: "geopolitics", label: "Geopolitics" },
  { id: "tech", label: "Tech" },
  { id: "culture", label: "Culture" },
  { id: "economy", label: "Economy" },
  { id: "weather", label: "Weather" },
  { id: "mentions", label: "Mentions" },
  { id: "elections", label: "Elections" },
  { id: "more", label: "More" },
];

export const TOPIC_FILTERS: TopicFilter[] = [
  { id: "all", label: "All", count: "1.6K" },
  { id: "trump", label: "Trump", count: "293" },
  { id: "trump-daily", label: "Trump Daily", count: "3" },
  { id: "midterms", label: "Midterms", count: "543" },
  { id: "global-elections", label: "Global Elections", count: "140" },
  { id: "primaries", label: "Primaries", count: "141" },
  { id: "congress", label: "Congress", count: "40" },
  { id: "trump-cabinet", label: "Trump Cabinet", count: "14" },
  { id: "courts", label: "Courts", count: "32" },
  { id: "epstein", label: "Epstein", count: "22" },
  { id: "gov-shutdown", label: "Gov Shutdown", count: "2" },
  { id: "la-mayor", label: "LA Mayor", count: "7" },
  { id: "uk-elections", label: "UK Elections", count: "3" },
  { id: "colombia-election", label: "Colombia Election", count: "5" },
  { id: "german-elections", label: "German Elections", count: "6" },
  { id: "french-elections", label: "French Elections", count: "4" },
  { id: "us-election", label: "US Election", count: "133" },
  { id: "mayoral-elections", label: "Mayoral Elections", count: "7" },
  { id: "south-korea", label: "South Korea", count: "18" },
  { id: "japan", label: "Japan", count: "12" },
  { id: "china", label: "China", count: "38" },
];

export const CRYPTO_TOPIC_FILTERS: TopicFilter[] = [
  { id: "all", label: "All", count: "308", lucideIcon: "grid" },
  { id: "5-min", label: "5 Min", count: "7", lucideIcon: "gauge" },
  { id: "15-min", label: "15 Min", count: "7", lucideIcon: "clock-dashed" },
  { id: "1-hour", label: "1 Hour", count: "7", lucideIcon: "clock-undo" },
  { id: "4-hours", label: "4 Hours", count: "7", lucideIcon: "clock" },
  { id: "daily", label: "Daily", count: "11", lucideIcon: "calendar" },
  { id: "weekly", label: "Weekly", count: "60", lucideIcon: "bar-chart" },
  { id: "monthly", label: "Monthly", count: "24", lucideIcon: "trending" },
  { id: "yearly", label: "Yearly", count: "23", lucideIcon: "calendar-year" },
  { id: "pre-market", label: "Pre-Market", count: "144", lucideIcon: "chart" },
  { id: "etf", label: "ETF", count: "2", lucideIcon: "chart" },
  { id: "crypto-separator", type: "separator" },
  { id: "bitcoin", label: "Bitcoin", count: "34", cryptoIcon: "bitcoin" },
  { id: "ethereum", label: "Ethereum", count: "17", cryptoIcon: "ethereum" },
  { id: "solana", label: "Solana", count: "13", cryptoIcon: "solana" },
  { id: "xrp", label: "XRP", count: "11", cryptoIcon: "xrp" },
  { id: "dogecoin", label: "Dogecoin", count: "6", cryptoIcon: "dogecoin" },
  { id: "bnb", label: "BNB", count: "6", cryptoIcon: "bnb" },
  { id: "microstrategy", label: "Microstrategy", count: "7", cryptoIcon: "microstrategy" },
];
