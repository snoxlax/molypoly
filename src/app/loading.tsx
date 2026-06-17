import { MarketsShell } from "@/components/layout/markets-shell";
import { MarketsPageLoading } from "@/components/markets/markets-page-loading";

export default function Loading() {
  return <MarketsShell main={<MarketsPageLoading title="Politics" />} />;
}
