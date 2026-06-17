import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { MarketImageShape } from '@/types/market';

type MarketImageProps = {
  shape: MarketImageShape;
  imageUrl?: string;
  alt?: string;
  className?: string;
  /** Rendered width hint — must match the CSS display size. */
  sizes?: string;
};

export function MarketImage({
  shape,
  imageUrl,
  alt = '',
  className,
  sizes = '40px',
}: MarketImageProps) {
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-md';
  const containerClass = cn(
    'relative shrink-0 size-10 overflow-hidden',
    shapeClass,
    className,
  );

  if (imageUrl) {
    return (
      <div className={containerClass}>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes={sizes}
          unoptimized
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn(containerClass, 'bg-zinc-700')} aria-hidden />
  );
}
