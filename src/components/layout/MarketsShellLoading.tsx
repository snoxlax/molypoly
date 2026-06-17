import { MarketsPageLoading } from '@/components/markets/MarketsPageLoading';

import { MarketsShell } from './MarketsShell';

type MarketsShellLoadingProps = {
  title: string;
  sidebar?: React.ReactNode;
};

export function MarketsShellLoading({
  title,
  sidebar,
}: MarketsShellLoadingProps) {
  return (
    <MarketsShell
      sidebar={sidebar}
      main={<MarketsPageLoading title={title} />}
    />
  );
}
