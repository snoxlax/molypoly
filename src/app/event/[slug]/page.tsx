import { notFound } from 'next/navigation';

import { EventDetailContent } from '@/components/events/EventDetailContent';
import { getEventBySlug } from '@/services/polymarket/client';
import { mapEventToDetail } from '@/services/polymarket/mapEventToMarket';

type EventPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string }>;
};

export default async function EventPage({
  params,
  searchParams,
}: EventPageProps) {
  const { slug } = await params;
  const { category } = await searchParams;
  const event = await getEventBySlug(slug);
  const detail = event ? mapEventToDetail(event, category) : null;

  if (!detail) {
    notFound();
  }

  return <EventDetailContent detail={detail} />;
}
