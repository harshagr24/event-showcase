// types/user.ts
export interface UserPublicMetadata {
  tier?: 'free' | 'silver' | 'gold' | 'platinum';
}

declare module '@clerk/nextjs' {
  interface UserPublicMetadata {
    tier?: 'free' | 'silver' | 'gold' | 'platinum';
  }
}