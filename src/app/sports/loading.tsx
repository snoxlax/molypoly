import { MarketsShell } from "@/components/layout/markets-shell";
import { MarketsPageLoading } from "@/components/markets/markets-page-loading";

export default function SportsLoading() {
  return <MarketsShell main={<MarketsPageLoading title="Sports" />} />;
}
