import { MarketsPageHeader } from "@/components/layout/markets-page-header";
import { MarketsShell } from "@/components/layout/markets-shell";
import { TopicSidebar } from "@/components/layout/topic-sidebar";
import { MarketGrid } from "@/components/markets/market-grid";
import type { Market } from "@/types/market";
import politicsMarkets from "../../coverage/politics-markets.json";

const POLITICS_MARKETS = politicsMarkets as Market[];

export default function Home() {
  return (
    <MarketsShell
      sidebar={<TopicSidebar activeTopic="all" />}
      main={
        <>
          <MarketsPageHeader title="Politics" />
          <MarketGrid markets={POLITICS_MARKETS} title="Politics" />
        </>
      }
    />
  );
}
