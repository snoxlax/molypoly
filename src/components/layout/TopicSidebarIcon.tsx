'use client';

import {
  BarChart3,
  Calendar,
  CalendarDays,
  CircleDashed,
  Clock,
  Gauge,
  LayoutGrid,
  LineChart,
  RotateCcw,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

import { CryptoIcon } from '@/components/ui/CryptoIcon';
import type { CryptoIconName, TopicLucideIconName } from '@/types/topicSidebar';

const LUCIDE_ICONS: Record<TopicLucideIconName, LucideIcon> = {
  grid: LayoutGrid,
  gauge: Gauge,
  'clock-dashed': CircleDashed,
  'clock-undo': RotateCcw,
  clock: Clock,
  calendar: Calendar,
  'bar-chart': BarChart3,
  trending: TrendingUp,
  'calendar-year': CalendarDays,
  chart: LineChart,
};

type TopicSidebarIconProps = {
  lucideIcon?: TopicLucideIconName;
  cryptoIcon?: CryptoIconName;
};

export function TopicSidebarIcon({
  lucideIcon,
  cryptoIcon,
}: TopicSidebarIconProps) {
  if (cryptoIcon) {
    return (
      <CryptoIcon
        name={cryptoIcon}
        size={18}
        className="shrink-0"
      />
    );
  }

  if (lucideIcon) {
    const Icon = LUCIDE_ICONS[lucideIcon];
    return (
      <Icon
        size={18}
        strokeWidth={1.75}
        className="size-[18px] shrink-0 text-current"
        aria-hidden
      />
    );
  }

  return null;
}
