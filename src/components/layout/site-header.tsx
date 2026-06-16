import Link from 'next/link';
import { CategoryNav } from '@/components/layout/category-nav';
import { Icon } from '@/components/ui/icon';
import { APP_NAME } from '@/lib/constants';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-border bg-background">
      <div className="site-container px-4 lg:px-6">
        <div className="flex min-h-14 items-center gap-4 py-4">
          <Link
            href="/"
            className="flex shrink-0 items-center pr-1"
          >
            <Icon
              name="logo-small"
              className="h-[26px] w-auto"
              size={120}
            />
            <span className="sr-only">{APP_NAME}</span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center gap-2 lg:flex">
            <form
              className="relative w-full min-w-[400px] max-w-[640px]"
              role="search"
            >
              <div className="relative">
                <Icon
                  name="search"
                  className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 opacity-60"
                  size={16}
                />
                <input
                  type="search"
                  placeholder="Search polymarkets..."
                  className="site-search"
                />
              </div>
            </form>

            <button
              type="button"
              className="how-it-works-btn shrink-0"
            >
              <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-current text-[10px] leading-none">
                i
              </span>
              How it works
            </button>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-5">
            <button
              type="button"
              className="hidden text-sm font-medium text-primary lg:inline-flex"
            >
              Log In
            </button>
            <button
              type="button"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Sign Up
            </button>
            <button
              type="button"
              className="inline-flex items-center"
            >
              <Icon
                name="ham"
                size={18}
              />
            </button>
          </div>
        </div>

        <CategoryNav />
      </div>
    </header>
  );
}
