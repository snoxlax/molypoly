import { Card, CardContent } from "@/components/ui/card";

export function PromotionalGridCard() {
  return (
    <Card
      size="sm"
      className="relative h-full min-h-[181px] shadow-md shadow-black/5"
    >
      <CardContent className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
        Promotional card
      </CardContent>
    </Card>
  );
}
