import { MarketsShell } from '@/components/layout/MarketsShell';
import { TopicSidebar } from '@/components/layout/TopicSidebar';
import { MarketsPageContent } from '@/components/markets/MarketsPageContent';
import { TRENDING_CATEGORY, TRENDING_TOPIC_FILTERS } from '@/lib/constants';
import { getTrendingEvents } from '@/services/polymarket/client';
import { mapEventsToMarkets } from '@/services/polymarket/mapEventToMarket';

export default async function TrendingPage() {
  const events = await getTrendingEvents();
  const markets = mapEventsToMarkets(events, TRENDING_CATEGORY);

  return (
    <MarketsShell
      sidebar={
        <TopicSidebar
          activeTopic="all"
          filters={TRENDING_TOPIC_FILTERS}
        />
      }
      main={
        <MarketsPageContent
          title={TRENDING_CATEGORY}
          markets={markets}
        />
      }
    />
  );
}
