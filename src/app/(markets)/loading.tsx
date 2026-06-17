import { MarketsShellLoading } from '@/components/layout/MarketsShellLoading';
import { TopicSidebar } from '@/components/layout/TopicSidebar';
import { TRENDING_CATEGORY, TRENDING_TOPIC_FILTERS } from '@/lib/constants';

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
