import { MarketsShell } from '@/components/layout/MarketsShell';
import { TopicSidebar } from '@/components/layout/TopicSidebar';
import { MarketsPageContent } from '@/components/markets/MarketsPageContent';
import { POLITICS_CATEGORY } from '@/lib/constants';
import { getEventsByTag } from '@/services/polymarket/client';
import { mapEventsToMarkets } from '@/services/polymarket/mapEventToMarket';

export default async function PoliticsPage() {
  const events = await getEventsByTag('politics');
  const markets = mapEventsToMarkets(events, POLITICS_CATEGORY);

  return (
    <MarketsShell
      sidebar={<TopicSidebar activeTopic="all" />}
      main={
        <MarketsPageContent
          title={POLITICS_CATEGORY}
          markets={markets}
          showPromo
        />
      }
    />
  );
}
