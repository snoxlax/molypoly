import { MarketsShellLoading } from '@/components/layout/MarketsShellLoading';
import { TopicSidebar } from '@/components/layout/TopicSidebar';

export default function Loading() {
  return (
    <MarketsShellLoading
      title="Politics"
      sidebar={<TopicSidebar activeTopic="all" />}
    />
  );
}
