import { Bookmark } from 'lucide-react';

import { IconButton } from '@/components/ui/icon-button';
import { cn, formatVolume } from '@/lib/utils';
import type { MarketFrequency } from '@/types/market';

type MarketCardFooterProps = {
  volume: number;
  frequency: MarketFrequency;
  assetLabel?: string;
  isLive?: boolean;
  className?: string;
};

export function MarketCardFooter({
  volume,
  frequency,
  assetLabel,
  isLive,
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
        {isLive ? (
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <span className="size-1.5 rounded-full bg-red-500" aria-hidden />
            LIVE
          </span>
        ) : null}
        {assetLabel ? <span>{assetLabel}</span> : null}
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
