'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestSupabase() {
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .limit(2);
        
        if (error) throw error;
        setEvents(data || []);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-md">
          <p className="font-bold">Error connecting to Supabase:</p>
          <p>{error}</p>
          <p className="mt-2">Check your environment variables and network connection</p>
        </div>
      ) : events.length > 0 ? (
        <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-md">
          <p className="font-bold">Success! Connected to Supabase</p>
          <p>First event title: {events[0]?.title}</p>
        </div>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-md">
          <p>Loading Supabase data...</p>
        </div>
      )}
    </div>
  );
}