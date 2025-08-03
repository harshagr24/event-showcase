'use client';

export default function EnvTestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <div className="bg-gray-100 p-4 rounded-md">
        <p className="mb-2"><strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}</p>
        <p className="mb-2"><strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set (hidden for security)' : 'Not set'}</p>
        <p className="mb-2"><strong>Key Length:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0} characters</p>
        <p className="mt-4 text-sm text-gray-600">
          If these values are missing, check your .env.local file in the project root.
          The file should contain lines like:
          <br />
          <code>NEXT_PUBLIC_SUPABASE_URL=https://bzfdckcepyxsccmdzzxc.supabase.co</code>
          <br />
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6ZmRja2NlcHl4c2NjbWR6enhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NzA0OTUsImV4cCI6MjA2OTU0NjQ5NX0.KE_mAAxqznJ6MtY_r2M7gF7ynM69MVkQYKwLAlwYsho</code>
        </p>
      </div>
    </div>
  );
}