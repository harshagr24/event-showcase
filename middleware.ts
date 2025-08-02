import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const url = new URL(req.url);

  // Redirect signed-in users from home to events
  if (userId && url.pathname === '/') {
    return NextResponse.redirect(new URL('/events', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};