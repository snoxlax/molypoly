import type { MarketOutcome } from "@/types/market";

export type EventDetailOutcome = MarketOutcome & {
  volume?: number;
};

export type EventDetail = {
  id: string;
  slug: string;
  title: string;
  volume: number;
  imageUrl?: string;
  category?: string;
  assetLabel?: string;
  outcomes: EventDetailOutcome[];
};
