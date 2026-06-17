import { MarketsShell } from '@/components/layout/MarketsShell';
import { MarketsPageContent } from '@/components/markets/MarketsPageContent';
import { getEventsByTag } from '@/lib/polymarket/client';
import { SPORTS_CATEGORY } from '@/lib/polymarket/constants';
import { mapEventsToMarkets } from '@/lib/polymarket/map-event-to-market';

export default async function SportsPage() {
  const events = await getEventsByTag('sports');
  const markets = mapEventsToMarkets(events, SPORTS_CATEGORY);

  return (
    <MarketsShell
      main={
        <MarketsPageContent
          title={SPORTS_CATEGORY}
          markets={markets}
        />
      }
    />
  );
}
