import { MarketsShell } from '@/components/layout/MarketsShell';
import { MarketsPageLoading } from '@/components/markets/MarketsPageLoading';

export default function Loading() {
  return <MarketsShell main={<MarketsPageLoading title="Politics" />} />;
}
