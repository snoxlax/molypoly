import { MarketsShellLoading } from '@/components/layout/MarketsShellLoading';
import { TopicSidebar } from '@/components/layout/TopicSidebar';
import { TRENDING_TOPIC_FILTERS } from '@/lib/constants';
import { TRENDING_CATEGORY } from '@/lib/polymarket/constants';

export default function TrendingLoading() {
  return (
    <MarketsShellLoading
      title={TRENDING_CATEGORY}
      sidebar={
        <TopicSidebar
          activeTopic="all"
          filters={TRENDING_TOPIC_FILTERS}
        />
      }
    />
  );
}
