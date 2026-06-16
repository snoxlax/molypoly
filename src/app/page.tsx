import { MarketsShell } from '@/components/layout/markets-shell';
import { TopicSidebar } from '@/components/layout/topic-sidebar';
import { PoliticsPageContent } from '@/components/markets/politics-page-content';
import { getPoliticsEvents } from '@/lib/polymarket/client';
import { mapEventsToMarkets } from '@/lib/polymarket/map-event-to-market';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const events = await getPoliticsEvents();
  const markets = mapEventsToMarkets(events);

  return (
    <MarketsShell
      sidebar={<TopicSidebar activeTopic="all" />}
      main={<PoliticsPageContent markets={markets} />}
    />
  );
}
