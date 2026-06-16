import Image from "next/image";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types/icon";

import BaseballIcon from "@/assets/icons/Baseball.svg";
import BasketballIcon from "@/assets/icons/Basketball.svg";
import BoxingIcon from "@/assets/icons/Boxing.svg";
import CricketIcon from "@/assets/icons/Cricket.svg";
import EsportsIcon from "@/assets/icons/Esports.svg";
import F1Icon from "@/assets/icons/F1.svg";
import FootballIcon from "@/assets/icons/Football.svg";
import GoldIcon from "@/assets/icons/Gold.svg";
import LacrosseIcon from "@/assets/icons/Lacrosse.svg";
import LiveIcon from "@/assets/icons/Live.svg";
import MLBIcon from "@/assets/icons/MLB.svg";
import NHLIcon from "@/assets/icons/NHL.svg";
import PBallIcon from "@/assets/icons/PBall.svg";
import RugbyIcon from "@/assets/icons/Rugby.svg";
import SoccerIcon from "@/assets/icons/Soccer.svg";
import TennisIcon from "@/assets/icons/Tennis.svg";
import TTennisIcon from "@/assets/icons/TTennis.svg";
import UFCIcon from "@/assets/icons/UFC.svg";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import BrokenArrowIcon from "@/assets/icons/broken-arrow.svg";
import DiscordIcon from "@/assets/icons/discord.svg";
import ExplorerIcon from "@/assets/icons/explorer.svg";
import FiltersIcon from "@/assets/icons/filters.svg";
import HamIcon from "@/assets/icons/ham.svg";
import InstaIcon from "@/assets/icons/insta.svg";
import LogoSmallIcon from "@/assets/icons/logo-small.svg";
import MailIcon from "@/assets/icons/mail.svg";
import SearchIcon from "@/assets/icons/search.svg";
import TiktokIcon from "@/assets/icons/tiktok.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import WcIcon from "@/assets/icons/wc.svg";

const ICONS = {
  Baseball: BaseballIcon,
  Basketball: BasketballIcon,
  Boxing: BoxingIcon,
  Cricket: CricketIcon,
  Esports: EsportsIcon,
  F1: F1Icon,
  Football: FootballIcon,
  Gold: GoldIcon,
  Lacrosse: LacrosseIcon,
  Live: LiveIcon,
  MLB: MLBIcon,
  NHL: NHLIcon,
  PBall: PBallIcon,
  Rugby: RugbyIcon,
  Soccer: SoccerIcon,
  Tennis: TennisIcon,
  TTennis: TTennisIcon,
  UFC: UFCIcon,
  "arrow-down": ArrowDownIcon,
  bookmark: BookmarkIcon,
  "broken-arrow": BrokenArrowIcon,
  discord: DiscordIcon,
  explorer: ExplorerIcon,
  filters: FiltersIcon,
  ham: HamIcon,
  insta: InstaIcon,
  "logo-small": LogoSmallIcon,
  mail: MailIcon,
  search: SearchIcon,
  tiktok: TiktokIcon,
  twitter: TwitterIcon,
  wc: WcIcon,
} as const satisfies Record<IconName, (typeof BaseballIcon)>;

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
