import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the response
  const response = NextResponse.next();

  // Add cache control headers for static content
  response.headers.set(
    'Cache-Control',
    'public, max-age=31536000, immutable'
  );

  return response;
}

export const config = {
  matcher: [
    // Match all static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
