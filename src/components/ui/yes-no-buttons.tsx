import { cn, formatProbability } from '@/lib/utils';

type YesNoButtonsProps = {
  variant: 'pills' | 'blocks';
  price?: number;
  className?: string;
};

export function YesNoButtons({
  variant,
  price = 0,
  className,
}: YesNoButtonsProps) {
  const yesButton =
    variant === 'pills' ? (
      <button
        type="button"
        className="group outcome-pill outcome-yes"
      >
        <span className="group-hover:hidden">Yes</span>
        <span className="hidden group-hover:inline">
          {formatProbability(price)}
        </span>
      </button>
    ) : (
      <button type="button" className="yes-block">
        Yes
      </button>
    );

  const noButton =
    variant === 'pills' ? (
      <button
        type="button"
        className="group outcome-pill outcome-no"
      >
        <span className="group-hover:hidden">No</span>
        <span className="hidden group-hover:inline">
          {formatProbability(1 - price)}
        </span>
      </button>
    ) : (
      <button type="button" className="no-block">
        No
      </button>
    );

  if (variant === 'blocks') {
    return (
      <div className={cn(className)}>
        <div className="flex gap-2">
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
