import { MarketsShell } from '@/components/layout/MarketsShell';
import { MarketsPageLoading } from '@/components/markets/MarketsPageLoading';

export default function CryptoLoading() {
  return <MarketsShell main={<MarketsPageLoading title="Crypto" />} />;
}
