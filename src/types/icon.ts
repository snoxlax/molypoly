export const ICON_NAMES = [
  "broken-arrow",
  "filters",
  "ham",
  "logo-small",
  "search",
] as const;

export type IconName = (typeof ICON_NAMES)[number];
