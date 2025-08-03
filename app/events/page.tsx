'use client';
import { useUser, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const tierOrder = ['free', 'silver', 'gold', 'platinum'] as const;
type EventTier = typeof tierOrder[number];

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  tier: EventTier;
}

export default function EventsPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    
    if (!isSignedIn) {
      router.push('/');
      return;
    }
    
    fetchEvents();
  }, [isLoaded, isSignedIn, user]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const userTier = (user?.publicMetadata?.tier as EventTier) || 'free';
      const userTierIndex = tierOrder.indexOf(userTier);
      const accessibleTiers = tierOrder.slice(0, userTierIndex + 1);
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .in('tier', accessibleTiers)
        .order('event_date', { ascending: true });
      
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Auth Controls - Fixed Position */}
      <div className="fixed top-4 right-4 flex items-center space-x-4 z-50">
        {isSignedIn ? (
          <>
            <UserButton afterSignOutUrl="/" />
            <SignOutButton>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm">
                Sign Out
              </button>
            </SignOutButton>
          </>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>

      {/* Main Content */}
      <div className="mt-12"> {/* Added margin to avoid overlap */}
        <h1 className="text-2xl font-bold mb-6">
          Events for {(user?.publicMetadata?.tier as string || 'free').toUpperCase()} Tier
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="border rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{event.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  event.tier === 'free' ? 'bg-blue-100 text-blue-800' :
                  event.tier === 'silver' ? 'bg-gray-100 text-gray-800' :
                  event.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {event.tier.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{event.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(event.event_date).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          ))}
        </div>
        
        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No events available for your tier</p>
          </div>
        )}
      </div>
    </div>
  );
}