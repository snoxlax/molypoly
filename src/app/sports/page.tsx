import { MarketsShell } from '@/components/layout/MarketsShell';
import { MarketsPageContent } from '@/components/markets/MarketsPageContent';
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
