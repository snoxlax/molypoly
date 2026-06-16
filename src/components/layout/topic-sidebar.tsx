import { TOPIC_FILTERS } from '@/lib/constants';
import { cn } from '@/lib/utils';

type TopicSidebarProps = {
  activeTopic: string;
};

export function TopicSidebar({ activeTopic }: TopicSidebarProps) {
  return (
    <aside className="hidden w-[200px] shrink-0 lg:block">
      <ul className="flex flex-col gap-0.5">
        {TOPIC_FILTERS.map((topic) => {
          const isActive = topic.id === activeTopic;

          return (
            <li key={topic.id}>
              <button
                type="button"
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-sidebar-active font-medium text-foreground'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                )}
              >
                <span>{topic.label}</span>
                <span className="text-xs text-muted-foreground">{topic.count}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
