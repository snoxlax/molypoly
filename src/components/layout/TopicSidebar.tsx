'use client';

import { TOPIC_FILTERS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  isTopicFilterSeparator,
  type TopicFilter,
} from '@/types/topic-sidebar';

import { TopicSidebarIcon } from './TopicSidebarIcon';

type TopicSidebarProps = {
  activeTopic: string;
  filters?: TopicFilter[];
};

export function TopicSidebar({
  activeTopic,
  filters = TOPIC_FILTERS,
}: TopicSidebarProps) {
  return (
    <aside className="hidden w-[200px] shrink-0 lg:block pt-2">
      <ul className="flex flex-col gap-0.5">
        {filters.map((topic) => {
          if (isTopicFilterSeparator(topic)) {
            return (
              <li
                key={topic.id}
                aria-hidden
                className="py-2"
              >
                <span className="block h-px bg-border" />
              </li>
            );
          }

          const isActive = topic.id === activeTopic;
          const hasIcon = Boolean(topic.lucideIcon ?? topic.cryptoIcon);

          return (
            <li key={topic.id}>
              <div
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm',
                  isActive
                    ? 'bg-sidebar-active font-medium text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {hasIcon ? (
                  <TopicSidebarIcon
                    lucideIcon={topic.lucideIcon}
                    cryptoIcon={topic.cryptoIcon}
                  />
                ) : null}
                <span className="min-w-0 flex-1 truncate text-left">
                  {topic.label}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                  {topic.count}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
