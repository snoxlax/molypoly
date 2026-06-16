export type GammaMarket = {
  id: string;
  question: string | null;
  groupItemTitle: string | null;
  groupItemThreshold: string | null;
  outcomes: string | null;
  outcomePrices: string | null;
  closed: boolean | null;
  active: boolean | null;
  image: string | null;
  icon: string | null;
  volume24hr?: number | null;
};

export type GammaEvent = {
  id: string;
  slug: string | null;
  title: string | null;
  volume: number | null;
  image: string | null;
  markets: GammaMarket[];
};
