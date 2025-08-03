'use client';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
const tiers = ['free', 'silver', 'gold', 'platinum'];

export default function UpgradeButton() {
  const { user, isLoaded } = useUser();
  const [isUpgrading, setUpgrading] = useState(false);
  
  const upgradeTier = async () => {
    if (!isLoaded || !user) return;
    
    setUpgrading(true);
    try {
      const currentTier = user.publicMetadata.tier || 'free';
      const currentIndex = tiers.indexOf(currentTier as string);
      const nextIndex = currentIndex < tiers.length - 1 ? currentIndex + 1 : 0;
      
      await user.update({
        publicMetadata: { tier: tiers[nextIndex] }
      });
      
      // Refresh to show new events
      window.location.reload();
    } catch (error) {
      console.error("Upgrade failed:", error);
    } finally {
      setUpgrading(false);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={upgradeTier}
      disabled={isUpgrading}
      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition flex items-center disabled:opacity-50"
    >
      {isUpgrading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Upgrading...
        </>
      ) : (
        `Upgrade Tier (${user.publicMetadata.tier === 'platinum' ? 'Reset' : 'Demo'})`
      )}
    </button>
  );
}