import { MarketsShell } from '@/components/layout/MarketsShell';
import { MarketsPageLoading } from '@/components/markets/MarketsPageLoading';

export default function SportsLoading() {
  return <MarketsShell main={<MarketsPageLoading title="Sports" />} />;
}
