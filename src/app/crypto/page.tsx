import { MarketsShell } from '@/components/layout/markets-shell';
import { TopicSidebar } from '@/components/layout/topic-sidebar';
import { MarketsPageContent } from '@/components/markets/markets-page-content';
import { CRYPTO_TOPIC_FILTERS } from '@/lib/constants';
import { getEventsByTag } from '@/lib/polymarket/client';
import { mapEventsToMarkets } from '@/lib/polymarket/map-event-to-market';

export const dynamic = 'force-dynamic';

export default async function CryptoPage() {
  const events = await getEventsByTag('crypto');
  const markets = mapEventsToMarkets(events, 'Crypto');

  return (
    <MarketsShell
      sidebar={
        <TopicSidebar activeTopic="all" filters={CRYPTO_TOPIC_FILTERS} />
      }
      main={<MarketsPageContent title="Crypto" markets={markets} />}
    />
  );
}
