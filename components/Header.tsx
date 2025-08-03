'use client';
import { SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { user } = useUser();
  const pathname = usePathname();
  
  // Don't show header on sign-in page
  if (pathname === '/sign-in') return null;
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/events" className="text-xl font-bold text-blue-600">
          EventShowcase
        </Link>
        
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <div className="flex items-center">
                <span className="bg-gray-200 border-2 border-dashed rounded-full w-8 h-8 mr-2"></span>
                <div>
                  <p className="text-sm font-medium">
                    {user.fullName || user.emailAddresses[0]?.emailAddress}
                  </p>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    user.publicMetadata.tier === 'free' ? 'bg-blue-100 text-blue-800' :
                    user.publicMetadata.tier === 'silver' ? 'bg-gray-100 text-gray-800' :
                    user.publicMetadata.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {user.publicMetadata.tier || 'free'}
                  </span>
                </div>
              </div>
              
              <SignOutButton>
                <button className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded hover:bg-gray-100 transition">
                  Sign Out
                </button>
              </SignOutButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}