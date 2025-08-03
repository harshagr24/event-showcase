import { User } from '@clerk/nextjs';

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  // Safely get the tier with proper typing
  const userTier = user?.publicMetadata?.tier as 'free' | 'silver' | 'gold' | 'platinum' | undefined;
  const displayTier = userTier || 'free';

  return (
    <header>
      {/* Other header content */}
      <div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          displayTier === 'free' ? 'bg-gray-100 text-gray-800' :
          displayTier === 'silver' ? 'bg-gray-300 text-gray-800' :
          displayTier === 'gold' ? 'bg-yellow-100 text-yellow-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {displayTier.toUpperCase()}
        </span>
      </div>
    </header>
  );
}