import { MarketsShell } from '@/components/layout/markets-shell';
import { TopicSidebar } from '@/components/layout/topic-sidebar';
import { MarketCard } from '@/components/markets/market-card';
import { MarketsPageContent } from '@/components/markets/markets-page-content';
import { CRYPTO_TOPIC_FILTERS } from '@/lib/constants';
import { getCryptoEvents } from '@/lib/polymarket/client';
import {
  getCryptoPromoMarket,
  mapEventsToCryptoMarkets,
} from '@/lib/polymarket/map-event-to-market';

export const dynamic = 'force-dynamic';

export default async function CryptoPage() {
  const events = await getCryptoEvents({ limit: 50 });
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
