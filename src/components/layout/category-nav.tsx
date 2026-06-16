import { Icon } from "@/components/ui/icon";
import { WorldCupIcon } from "@/components/ui/world-cup-icon";
import { CATEGORIES, isCategorySeparator } from "@/lib/constants";
import { cn } from "@/lib/utils";

type CategoryNavProps = {
  activeCategory: string;
};

export function CategoryNav({ activeCategory }: CategoryNavProps) {
  return (
    <div className="no-scrollbar flex h-12 w-full min-w-0 items-center overflow-x-auto">
      <ul className="flex min-w-max items-center gap-4">
        {CATEGORIES.map((category) => {
          if (isCategorySeparator(category)) {
            return (
              <li key={category.id} aria-hidden>
                <span className="block h-4 w-px shrink-0 bg-border" />
              </li>
            );
          }

          const isActive = category.id === activeCategory;

          return (
            <li key={category.id}>
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap transition-colors",
                  category.accent === "gold" && !isActive && "gold-accent-text",
                  isActive && "text-foreground",
                  !isActive &&
                    category.accent !== "gold" &&
                    "text-nav-muted hover:text-foreground",
                )}
              >
                {category.icon === "wc" ? (
                  <WorldCupIcon />
                ) : category.icon ? (
                  <Icon name={category.icon} size={16} className="opacity-90" />
                ) : null}
                {category.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
