import { MarketsShellLoading } from '@/components/layout/MarketsShellLoading';
import { TopicSidebar } from '@/components/layout/TopicSidebar';
import { CRYPTO_TOPIC_FILTERS } from '@/lib/constants';

export default function CryptoLoading() {
  return (
    <MarketsShellLoading
      title="Crypto"
      sidebar={
        <TopicSidebar
          activeTopic="all"
          filters={CRYPTO_TOPIC_FILTERS}
        />
      }
    />
  );
}
