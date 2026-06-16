export type MarketVariant = "multi" | "binary";

export type MarketImageShape = "square" | "circle";

export type MarketFrequency = "Monthly" | "Daily" | null;

export type MarketOutcome = {
  id: string;
  label: string;
  price: number;
};

export type Market = {
  id: string;
  slug: string;
  question: string;
  category: string;
  variant: MarketVariant;
  imageShape: MarketImageShape;
  volume: number;
  frequency: MarketFrequency;
  outcomes: MarketOutcome[];
  imageUrl?: string;
  leadingPrice?: number;
};
