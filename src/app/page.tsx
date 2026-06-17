import { MarketsShell } from '@/components/layout/markets-shell';
import { TopicSidebar } from '@/components/layout/topic-sidebar';
import { MarketsPageContent } from '@/components/markets/markets-page-content';
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
