// components/EventCard.tsx
import { EventTier } from '@/types/event';
import Link from 'next/link';

interface EventCardProps {
  event: EventTier;
  userTier: string;
}

export default function EventCard({ event, userTier }: EventCardProps) {
  // ... rest of your component code
}