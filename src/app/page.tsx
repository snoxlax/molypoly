import { MarketsShell } from "@/components/layout/markets-shell";
import { TopicSidebar } from "@/components/layout/topic-sidebar";
import { PoliticsPageContent } from "@/components/markets/politics-page-content";
import type { Market } from "@/types/market";
import politicsMarkets from "@/data/politics-markets.json";

const POLITICS_MARKETS = politicsMarkets as Market[];

export default function Home() {
  return (
    <MarketsShell
      sidebar={<TopicSidebar activeTopic="all" />}
      main={<PoliticsPageContent markets={POLITICS_MARKETS} />}
    />
  );
}
