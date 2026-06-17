import { cn, formatProbability } from '@/lib/utils';

type ChanceArcProps = {
  percent: number;
  className?: string;
  sublabel?: string;
};

const RADIUS = 29;
const STROKE_WIDTH = 4.5;
const ARC_FRACTION = 0.6;
const ARC_SPAN = ARC_FRACTION * 2 * Math.PI;
const GAP_HALF = ((1 - ARC_FRACTION) * 2 * Math.PI) / 2;
const ARC_START = Math.PI / 2 + GAP_HALF;
const SVG_WIDTH = RADIUS * 2;
const SVG_HEIGHT =
  RADIUS + RADIUS * Math.sin(Math.PI / 2 - GAP_HALF) + STROKE_WIDTH / 2 + 2;
const AMBER = '#f59e0b';
const TRACK_COLOR = 'rgb(113 113 122 / 0.2)';

function roundCoord(value: number): number {
  return Number(value.toFixed(4));
}

function getPointOnArc(t: number) {
  const angle = ARC_START + t * ARC_SPAN;

  return {
    x: roundCoord(RADIUS * Math.cos(angle)),
    y: roundCoord(RADIUS * Math.sin(angle)),
  };
}

function describeArc(t: number) {
  const start = getPointOnArc(0);
  const end = getPointOnArc(t);
  const largeArc = t * ARC_SPAN > Math.PI ? 1 : 0;

  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function getChanceArcColor(percent: number): string {
  if (percent < 25) return 'var(--no)';
  if (percent > 75) return 'var(--yes)';
  return AMBER;
}

export function ChanceArc({ percent, className, sublabel = "chance" }: ChanceArcProps) {
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const progress = clampedPercent / 100;

  return (
    <div
      className={cn('relative w-[58px] shrink-0', className)}
      role="img"
      aria-label={`${formatProbability(clampedPercent / 100)} chance`}
    >
      <svg
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        viewBox={`${-RADIUS} ${-RADIUS} ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="overflow-visible"
        fill="none"
        aria-hidden
      >
        <path
          d={describeArc(1)}
          stroke={TRACK_COLOR}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
        />
        {progress > 0 ? (
          <path
            d={describeArc(progress)}
            stroke={getChanceArcColor(clampedPercent)}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
          />
        ) : null}
      </svg>
      <div className="flex w-full flex-col items-center -translate-y-7">
        <p className="text-lg leading-none font-medium tabular-nums">
          {formatProbability(clampedPercent / 100)}
        </p>
        <p className="text-xs leading-none font-semibold text-muted-foreground">
          {sublabel}
        </p>
      </div>
    </div>
  );
}
