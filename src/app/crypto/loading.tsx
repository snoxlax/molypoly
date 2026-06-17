import { MarketsShellLoading } from '@/components/layout/MarketsShellLoading';
import { TopicSidebar } from '@/components/layout/TopicSidebar';
import { CRYPTO_CATEGORY, CRYPTO_TOPIC_FILTERS } from '@/lib/constants';

export default function CryptoLoading() {
  return (
    <MarketsShellLoading
      title={CRYPTO_CATEGORY}
      sidebar={
        <TopicSidebar
          activeTopic="all"
          filters={CRYPTO_TOPIC_FILTERS}
        />
      }
    />
  );
}
