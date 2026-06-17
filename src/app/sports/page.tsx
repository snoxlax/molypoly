import { MarketsShell } from '@/components/layout/markets-shell';
import { MarketsPageContent } from '@/components/markets/markets-page-content';
import { getEventsByTag } from '@/lib/polymarket/client';
import { mapEventsToMarkets } from '@/lib/polymarket/map-event-to-market';

export default async function SportsPage() {
  const events = await getEventsByTag('sports', { limit: 20 });
  const markets = mapEventsToMarkets(events, 'Sports');

  return (
    <MarketsShell
      main={
        <MarketsPageContent
          title="Sports"
          markets={markets}
        />
      }
    />
  );
}
