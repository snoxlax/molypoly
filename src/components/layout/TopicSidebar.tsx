'use client';

import { useState } from 'react';

import { TOPIC_FILTERS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { isTopicFilterSeparator, type TopicFilter } from '@/types/topicSidebar';

import { TopicSidebarIcon } from './TopicSidebarIcon';

type TopicSidebarProps = {
  activeTopic: string;
  filters?: TopicFilter[];
};

export function TopicSidebar({
  activeTopic,
  filters = TOPIC_FILTERS,
}: TopicSidebarProps) {
  const [selectedTopic, setSelectedTopic] = useState(activeTopic);

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

          const isActive = topic.id === selectedTopic;
          const hasIcon = Boolean(topic.lucideIcon ?? topic.cryptoIcon);

          return (
            <li key={topic.id}>
              <button
                type="button"
                aria-current={isActive ? 'true' : undefined}
                onClick={() => setSelectedTopic(topic.id)}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                  'hover:bg-sidebar-active/60 hover:text-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
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
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
