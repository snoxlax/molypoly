import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MarketImage } from '@/components/ui/market-image';
import type { Market } from '@/types/market';
import { MarketCardFooter } from './market-card-footer';

type MarketCardShellProps = {
  market: Market;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
};

export function MarketCardShell({
  market,
  headerAction,
  children,
}: MarketCardShellProps) {
  return (
    <Card
      size="sm"
      className="relative min-h-[181px] justify-between shadow-md shadow-black/5"
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

      <CardContent className="flex flex-col justify-end gap-2">
        {children}
        <MarketCardFooter
          volume={market.volume}
          frequency={market.frequency}
        />
      </CardContent>
    </Card>
  );
}
