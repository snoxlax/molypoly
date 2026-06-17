import { MarketsShellLoading } from '@/components/layout/MarketsShellLoading';
import { TopicSidebar } from '@/components/layout/TopicSidebar';

export default function PoliticsLoading() {
  return (
    <MarketsShellLoading
      title="Politics"
      sidebar={<TopicSidebar activeTopic="all" />}
    />
  );
}
