import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MarketImage } from '@/components/ui/market-image';
import { cn } from '@/lib/utils';
import type { Market } from '@/types/market';
import { MarketCardFooter } from './market-card-footer';

type MarketCardShellProps = {
  market: Market;
  headerAction?: React.ReactNode;
  contentClassName?: string;
  children: React.ReactNode;
};

export function MarketCardShell({
  market,
  headerAction,
  contentClassName,
  children,
}: MarketCardShellProps) {
  return (
    <Card
      size="sm"
      className="relative h-full min-h-[181px] flex flex-col shadow-md shadow-black/5"
    >
      <CardHeader className="flex items-start gap-3">
        <MarketImage
          shape={market.imageShape}
          imageUrl={market.imageUrl}
          alt=""
        />
        <CardTitle className="line-clamp-2 flex-1 leading-snug">
          {market.question}
        </CardTitle>
        {headerAction ? (
          <CardAction className="shrink-0">{headerAction}</CardAction>
        ) : null}
      </CardHeader>

      <CardContent
        className={cn(
          "flex flex-1 flex-col gap-2",
          contentClassName,
        )}
      >
        <div className="flex flex-col gap-2">{children}</div>
        <MarketCardFooter
          className="mt-auto"
          volume={market.volume}
          frequency={market.frequency}
          assetLabel={market.assetLabel}
          isLive={market.isLive}
        />
      </CardContent>
    </Card>
  );
}
