import { MarketsShell } from '@/components/layout/markets-shell';
import { MarketsPageContent } from '@/components/markets/markets-page-content';
import { getEventsByTag } from '@/lib/polymarket/client';
import { mapEventsToMarkets } from '@/lib/polymarket/map-event-to-market';

export const dynamic = 'force-dynamic';

export default async function SportsPage() {
  const events = await getEventsByTag('sports');
  const markets = mapEventsToMarkets(events, 'Sports');

  return (
    <MarketsShell
      main={<MarketsPageContent title="Sports" markets={markets} />}
    />
  );
}
