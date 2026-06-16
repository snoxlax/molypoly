import { Bookmark } from "lucide-react";

import { Icon } from "@/components/ui/icon";
import { IconButton } from "@/components/ui/icon-button";

type MarketsPageHeaderProps = {
  title: string;
};

export function MarketsPageHeader({ title }: MarketsPageHeaderProps) {
  return (
    <div className="site-container flex flex-col items-center gap-5 px-4 pt-3 lg:mb-4 lg:px-0 lg:pt-5.5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <div className="flex items-center gap-1">
          <IconButton aria-label="Search">
            <Icon name="search" size={18} />
          </IconButton>
          <IconButton aria-label="Filter">
            <Icon name="filters" size={18} />
          </IconButton>
          <IconButton aria-label="Bookmark">
            <Bookmark size={18} className="text-white" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
