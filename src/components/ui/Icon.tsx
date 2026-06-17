import Image from "next/image";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types/icon";

import BaseballIcon from "@/assets/icons/sports/Baseball.svg";
import BasketballIcon from "@/assets/icons/sports/Basketball.svg";
import BoxingIcon from "@/assets/icons/sports/Boxing.svg";
import CricketIcon from "@/assets/icons/sports/Cricket.svg";
import EsportsIcon from "@/assets/icons/sports/Esports.svg";
import F1Icon from "@/assets/icons/sports/F1.svg";
import FootballIcon from "@/assets/icons/sports/Football.svg";
import GoldIcon from "@/assets/icons/sports/Gold.svg";
import LacrosseIcon from "@/assets/icons/sports/Lacrosse.svg";
import LiveIcon from "@/assets/icons/Live.svg";
import MLBIcon from "@/assets/icons/sports/MLB.svg";
import NHLIcon from "@/assets/icons/sports/NHL.svg";
import PBallIcon from "@/assets/icons/sports/PBall.svg";
import RugbyIcon from "@/assets/icons/sports/Rugby.svg";
import SoccerIcon from "@/assets/icons/sports/Soccer.svg";
import TennisIcon from "@/assets/icons/sports/Tennis.svg";
import TTennisIcon from "@/assets/icons/sports/TTennis.svg";
import UFCIcon from "@/assets/icons/sports/UFC.svg";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
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
