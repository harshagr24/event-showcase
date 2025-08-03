// utils/user.ts
export function getUserTier(user: User | null): 'free' | 'silver' | 'gold' | 'platinum' {
    if (!user) return 'free';
    const tier = user.publicMetadata?.tier;
    return ['free', 'silver', 'gold', 'platinum'].includes(tier as string) 
      ? tier as 'free' | 'silver' | 'gold' | 'platinum'
      : 'free';
  }
  
  // In Header.tsx
  import { getUserTier } from '@/utils/user';
  
  export default function Header({ user }: { user: User | null }) {
    const tier = getUserTier(user);
    
    return (
      <header>
        {/* ... */}
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          {
            free: 'bg-gray-100 text-gray-800',
            silver: 'bg-gray-300 text-gray-800',
            gold: 'bg-yellow-100 text-yellow-800',
            platinum: 'bg-purple-100 text-purple-800'
          }[tier]
        }`}>
          {tier.toUpperCase()}
        </span>
      </header>
    );
  }