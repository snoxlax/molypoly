import { cn } from "@/lib/utils";
import wcIcon from "@/assets/icons/wc.svg";

const wcIconUrl = typeof wcIcon === "string" ? wcIcon : wcIcon.src;

type WorldCupIconProps = {
  className?: string;
};

export function WorldCupIcon({ className }: WorldCupIconProps) {
  return (
    <span
      aria-hidden
      className={cn("world-cup-icon", className)}
      style={{
        WebkitMaskImage: `url(${wcIconUrl})`,
        maskImage: `url(${wcIconUrl})`,
      }}
    />
  );
}
