import { MarketsShellLoading } from '@/components/layout/MarketsShellLoading';
import { TopicSidebar } from '@/components/layout/TopicSidebar';
import { POLITICS_CATEGORY } from '@/lib/polymarket/constants';

export default function PoliticsLoading() {
  return (
    <MarketsShellLoading
      title={POLITICS_CATEGORY}
      sidebar={<TopicSidebar activeTopic="all" />}
    />
  );
}
