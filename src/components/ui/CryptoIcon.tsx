import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CryptoIconName } from "@/types/topic-sidebar";

import BitcoinIcon from "@/assets/icons/crypto/bitcoin.png";
import BnbIcon from "@/assets/icons/crypto/bnb.png";
import DogeIcon from "@/assets/icons/crypto/doge.png";
import EthIcon from "@/assets/icons/crypto/eth.png";
import MicrostrategyIcon from "@/assets/icons/crypto/mirco.png";
import SolanaIcon from "@/assets/icons/crypto/solana.png";
import XrpIcon from "@/assets/icons/crypto/xrp.png";

const CRYPTO_ICONS = {
  bitcoin: BitcoinIcon,
  ethereum: EthIcon,
  solana: SolanaIcon,
  xrp: XrpIcon,
  dogecoin: DogeIcon,
  bnb: BnbIcon,
  microstrategy: MicrostrategyIcon,
} as const satisfies Record<CryptoIconName, typeof BitcoinIcon>;

type CryptoIconProps = {
  name: CryptoIconName;
  className?: string;
  size?: number;
};

export function CryptoIcon({ name, className, size = 18 }: CryptoIconProps) {
  return (
    <Image
      src={CRYPTO_ICONS[name]}
      alt=""
      width={size}
      height={size}
      aria-hidden
      className={cn("shrink-0 rounded-full", className)}
    />
  );
}
