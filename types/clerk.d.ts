// types/clerk.d.ts
import '@clerk/nextjs';

declare module '@clerk/nextjs' {
  interface UserPublicMetadata {
    tier?: 'free' | 'silver' | 'gold' | 'platinum';
  }
}