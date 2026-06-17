import { MarketsShell } from '@/components/layout/MarketsShell';
import { TopicSidebar } from '@/components/layout/TopicSidebar';
import { MarketCard } from '@/components/markets/MarketCard';
import { MarketsPageContent } from '@/components/markets/MarketsPageContent';
import { CRYPTO_TOPIC_FILTERS } from '@/lib/constants';
import { getEventsByTag } from '@/lib/polymarket/client';
import { CRYPTO_CATEGORY } from '@/lib/polymarket/constants';
import {
  getCryptoPromoMarket,
  mapEventsToCryptoMarkets,
} from '@/lib/polymarket/mapEventToMarket';

export default async function CryptoPage() {
  const events = await getEventsByTag('crypto');
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
          title={CRYPTO_CATEGORY}
          markets={markets}
          leadingSlot={
            promoMarket ? <MarketCard market={promoMarket} /> : undefined
          }
        />
      }
    />
  );
}
