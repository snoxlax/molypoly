"use client";

import { cn, formatCents, formatProbability } from '@/lib/utils';

type YesNoButtonsProps = {
  variant: 'pills' | 'blocks' | 'trade';
  price?: number;
  className?: string;
  yesLabel?: string;
  noLabel?: string;
  highlightYes?: boolean;
};

export function YesNoButtons({
  variant,
  price = 0,
  className,
  yesLabel = 'Yes',
  noLabel = 'No',
  highlightYes = false,
}: YesNoButtonsProps) {
  const stopLinkNavigation = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const tradeBtnBase =
    'inline-flex h-10 w-[118px] cursor-pointer items-center justify-center gap-1 rounded-md px-3 py-2 text-xs font-semibold whitespace-nowrap transition duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-100 disabled:pointer-events-none disabled:opacity-50 sm:w-[124px]';

  const yesButton =
    variant === 'pills' ? (
      <button
        type="button"
        className="group outcome-pill outcome-yes"
        onClick={stopLinkNavigation}
      >
        <span className="group-hover:hidden">{yesLabel}</span>
        <span className="hidden group-hover:inline">
          {formatProbability(price)}
        </span>
      </button>
    ) : variant === 'trade' ? (
      <button
        type="button"
        className={cn(
          tradeBtnBase,
          'bg-yes/15 text-yes hover:bg-yes/25',
          highlightYes && 'bg-yes/25 hover:bg-yes/35',
        )}
        onClick={stopLinkNavigation}
      >
        Buy Yes {formatCents(price)}
      </button>
    ) : (
      <button type="button" className="yes-block" onClick={stopLinkNavigation}>
        {yesLabel}
      </button>
    );

  const noButton =
    variant === 'pills' ? (
      <button
        type="button"
        className="group outcome-pill outcome-no"
        onClick={stopLinkNavigation}
      >
        <span className="group-hover:hidden">{noLabel}</span>
        <span className="hidden group-hover:inline">
          {formatProbability(1 - price)}
        </span>
      </button>
    ) : variant === 'trade' ? (
      <button
        type="button"
        className={cn(
          tradeBtnBase,
          'bg-no/15 text-no hover:bg-no/25',
        )}
        onClick={stopLinkNavigation}
      >
        Buy No {formatCents(1 - price)}
      </button>
    ) : (
      <button type="button" className="no-block" onClick={stopLinkNavigation}>
        {noLabel}
      </button>
    );

  if (variant === 'blocks' || variant === 'trade') {
    return (
      <div className={cn(className)}>
        <div
          className={cn(
            variant === 'trade' ? 'event-outcome-actions' : 'flex gap-2',
          )}
        >
          {yesButton}
          {noButton}
        </div>
      </div>
    );
  }

  return (
    <>
      {yesButton}
      {noButton}
    </>
  );
}
