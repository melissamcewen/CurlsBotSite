import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get hostname (e.g. curlsbot.com, www.curlsbot.com)
  const hostname = request.headers.get('host') || '';

  // Redirect non-www to www in production
  if (process.env.NODE_ENV === 'production' && !hostname.startsWith('www.')) {
    const wwwUrl = new URL(request.url);
    wwwUrl.host = `www.${hostname}`;
    return NextResponse.redirect(wwwUrl.toString(), { status: 301 });
  }

  // Clone the response for static content
  const response = NextResponse.next();

  // Add cache control headers for static content
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  return response;
}

export const config = {
  matcher: [
    // Match all static files and pages
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
