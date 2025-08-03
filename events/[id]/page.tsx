'use client';
import { useUser } from '@clerk/nextjs';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import { EventTier } from '@/types/event';
// app/events/page.tsx

// ... rest of your page code
interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  tier: string;
}

export default function EventDetailPage() {
  const { id } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        if (!data) throw new Error('Event not found');
        
        setEvent(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load event details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [id, user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 max-w-6xl mx-auto w-full p-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error || 'Event not found'}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full p-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Events
        </button>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-200 border-2 border-dashed w-full h-64" />
          
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  event.tier === 'free' ? 'bg-blue-100 text-blue-800' :
                  event.tier === 'silver' ? 'bg-gray-100 text-gray-800' :
                  event.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {event.tier.toUpperCase()}
                </span>
                <h1 className="text-2xl font-bold mt-2">{event.title}</h1>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500">Event Date</p>
                <p className="text-lg font-semibold">
                  {new Date(event.event_date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-gray-600">
                  {new Date(event.event_date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}