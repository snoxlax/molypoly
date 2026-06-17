"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { Icon } from "@/components/ui/icon";
import { WorldCupIcon } from "@/components/ui/world-cup-icon";
import { CATEGORIES, isCategorySeparator } from "@/lib/constants";
import { cn } from "@/lib/utils";

function getActiveCategoryId(pathname: string): string {
  if (pathname === "/sports") return "sports";
  if (pathname === "/crypto") return "crypto";
  if (pathname === "/" || pathname.startsWith("/event/")) return "politics";

  return "politics";
}

export function CategoryNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const activeCategory = pathname.startsWith("/event/")
    ? categoryParam === "Crypto"
      ? "crypto"
      : categoryParam === "Sports"
        ? "sports"
        : "politics"
    : getActiveCategoryId(pathname);

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
          const className = cn(
            "flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap transition-colors",
            category.accent === "gold" && !isActive && "gold-accent-text",
            isActive && "text-foreground",
            !isActive &&
              category.accent !== "gold" &&
              "text-nav-muted hover:text-foreground",
          );

          return (
            <li key={category.id}>
              {category.href ? (
                <Link href={category.href} className={className}>
                  {category.icon === "wc" ? (
                    <WorldCupIcon />
                  ) : category.icon ? (
                    <Icon name={category.icon} size={16} className="opacity-90" />
                  ) : null}
                  {category.label}
                </Link>
              ) : (
                <button type="button" className={className}>
                  {category.icon === "wc" ? (
                    <WorldCupIcon />
                  ) : category.icon ? (
                    <Icon name={category.icon} size={16} className="opacity-90" />
                  ) : null}
                  {category.label}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
