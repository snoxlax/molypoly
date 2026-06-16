import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { MarketImageShape } from '@/types/market';

type MarketImageProps = {
  shape: MarketImageShape;
  imageUrl?: string;
  alt?: string;
  className?: string;
};

export function MarketImage({
  shape,
  imageUrl,
  alt = '',
  className,
}: MarketImageProps) {
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-md';

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={40}
        height={40}
        className={cn('size-10 shrink-0 object-cover', shapeClass, className)}
      />
    );
  }

  return (
    <div
      className={cn('size-10 shrink-0 bg-zinc-700', shapeClass, className)}
      aria-hidden
    />
  );
}
