import Image from "next/image";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types/icon";

import BrokenArrowIcon from "@/assets/icons/broken-arrow.svg";
import FiltersIcon from "@/assets/icons/filters.svg";
import HamIcon from "@/assets/icons/ham.svg";
import LogoSmallIcon from "@/assets/icons/logo-small.svg";
import SearchIcon from "@/assets/icons/search.svg";

const ICONS = {
  "broken-arrow": BrokenArrowIcon,
  filters: FiltersIcon,
  ham: HamIcon,
  "logo-small": LogoSmallIcon,
  search: SearchIcon,
} as const satisfies Record<IconName, (typeof SearchIcon)>;

export type { IconName } from "@/types/icon";

type IconProps = {
  name: IconName;
  className?: string;
  size?: number;
};

export function Icon({ name, className, size = 18 }: IconProps) {
  const src = ICONS[name];

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      aria-hidden
      className={cn("shrink-0", className)}
    />
  );
}
