import { MarketsShell } from '@/components/layout/MarketsShell';
import { TopicSidebar } from '@/components/layout/TopicSidebar';
import { MarketsPageContent } from '@/components/markets/MarketsPageContent';
import { TRENDING_TOPIC_FILTERS } from '@/lib/constants';
import { getTrendingEvents } from '@/lib/polymarket/client';
import { TRENDING_CATEGORY } from '@/lib/polymarket/constants';
import { mapEventsToMarkets } from '@/lib/polymarket/map-event-to-market';

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
          showPromo
        />
      }
    />
  );
}
