import { MarketsShell } from '@/components/layout/MarketsShell';
import { TopicSidebar } from '@/components/layout/TopicSidebar';
import { MarketsPageContent } from '@/components/markets/MarketsPageContent';
import { getEventsByTag } from '@/lib/polymarket/client';
import { mapEventsToMarkets } from '@/lib/polymarket/map-event-to-market';

export default async function Home() {
  const events = await getEventsByTag('politics', { limit: 20 });
  const markets = mapEventsToMarkets(events, 'Politics');

  return (
    <MarketsShell
      sidebar={<TopicSidebar activeTopic="all" />}
      main={
        <MarketsPageContent
          title="Politics"
          markets={markets}
          showPromo
        />
      }
    />
  );
}
