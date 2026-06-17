import { MarketsShell } from '@/components/layout/MarketsShell';
import { TopicSidebar } from '@/components/layout/TopicSidebar';
import { MarketCard } from '@/components/markets/MarketCard';
import { MarketsPageContent } from '@/components/markets/MarketsPageContent';
import { CRYPTO_TOPIC_FILTERS } from '@/lib/constants';
import { getEventsByTag } from '@/lib/polymarket/client';
import {
  getCryptoPromoMarket,
  mapEventsToCryptoMarkets,
} from '@/lib/polymarket/map-event-to-market';

export default async function CryptoPage() {
  const events = await getEventsByTag('crypto', { limit: 50 });
  const promoMarket = getCryptoPromoMarket(events);
  const markets = mapEventsToCryptoMarkets(events);

  return (
    <MarketsShell
      sidebar={
        <TopicSidebar
          activeTopic="all"
          filters={CRYPTO_TOPIC_FILTERS}
        />
      }
      main={
        <MarketsPageContent
          title="Crypto"
          markets={markets}
          leadingSlot={
            promoMarket ? <MarketCard market={promoMarket} /> : undefined
          }
        />
      }
    />
  );
}
