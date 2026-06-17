import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { EventDetailContent } from '@/components/events/EventDetailContent';
import { UNTITLED_MARKET } from '@/lib/constants';
import { getEventBySlug } from '@/services/polymarket/client';
import { mapEventToDetail } from '@/services/polymarket/mapEventToMarket';

type EventPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({
  params,
}: Pick<EventPageProps, 'params'>): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: 'Event not found' };
  }

  return {
    title: event.title ?? UNTITLED_MARKET,
  };
}

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
