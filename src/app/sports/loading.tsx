import { MarketsShellLoading } from '@/components/layout/MarketsShellLoading';
import { SPORTS_CATEGORY } from '@/lib/polymarket/constants';

export default function SportsLoading() {
  return <MarketsShellLoading title={SPORTS_CATEGORY} />;
}
