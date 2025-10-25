import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js 16 Proxy Configuration
 *
 * This replaces middleware.ts in Next.js 16 to make the app's network boundary explicit.
 * The proxy runs on the Node.js runtime and handles request interception.
 *
 * Key differences from middleware.ts:
 * - Runs on Node.js runtime (not Edge)
 * - Clearer naming for network boundary
 * - Single, predictable runtime for request interception
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Example: Redirect old paths to new ones
  if (pathname.startsWith("/old-path")) {
    return NextResponse.redirect(new URL("/new-path", request.url));
  }

  // Example: Add security headers
  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");

  // Performance headers
  response.headers.set("X-DNS-Prefetch-Control", "on");

  return response;
}

/**
 * Configuration for the proxy
 *
 * In Next.js 16, you can configure which paths the proxy should run on
 * using the config object. This is more explicit than the previous
 * middleware configuration.
 */
export const config = {
  // Match all paths except static files and API routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
