import { Bookmark } from 'lucide-react';

import { IconButton } from '@/components/ui/icon-button';
import { cn, formatVolume } from '@/lib/utils';
import type { MarketFrequency } from '@/types/market';

type MarketCardFooterProps = {
  volume: number;
  frequency: MarketFrequency;
  className?: string;
};

export function MarketCardFooter({
  volume,
  frequency,
  className,
}: MarketCardFooterProps) {
  return (
    <footer
      className={cn(
        'flex h-7 items-center justify-between pt-1.5',
        className,
      )}
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{formatVolume(volume)}</span>
        {frequency ? <span>{frequency}</span> : null}
      </div>
      <IconButton
        aria-label="Bookmark market"
        className="size-6"
      >
        <Bookmark size={15} />
      </IconButton>
    </footer>
  );
}
