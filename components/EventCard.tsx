import { EventTier } from '@/app/events/page';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string | null;
  tier: EventTier;
}

const tierColors = {
  free: 'bg-blue-100 text-blue-800',
  silver: 'bg-gray-100 text-gray-800',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-purple-100 text-purple-800',
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
      <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
      <div className="p-4">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${tierColors[event.tier]}`}>
          {event.tier}
        </span>
        <h3 className="text-lg font-bold mt-2">{event.title}</h3>
        <p className="text-gray-600 mt-1 line-clamp-2">{event.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {new Date(event.event_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <Link 
            href={`/events/${event.id}`} 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}