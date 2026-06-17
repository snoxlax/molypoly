import { MarketsShellLoading } from '@/components/layout/MarketsShellLoading';
import { TopicSidebar } from '@/components/layout/TopicSidebar';
import { TRENDING_TOPIC_FILTERS } from '@/lib/constants';

export default function TrendingLoading() {
  return (
    <MarketsShellLoading
      title="Trending"
      sidebar={
        <TopicSidebar
          activeTopic="all"
          filters={TRENDING_TOPIC_FILTERS}
        />
      }
    />
  );
}
