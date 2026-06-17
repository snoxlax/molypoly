import { MarketsShell } from '@/components/layout/MarketsShell';
import { MarketsPageContent } from '@/components/markets/MarketsPageContent';
import { SPORTS_CATEGORY } from '@/lib/constants';
import { getEventsByTag } from '@/services/polymarket/client';
import { mapEventsToMarkets } from '@/services/polymarket/mapEventToMarket';

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
