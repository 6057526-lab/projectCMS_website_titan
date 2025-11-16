import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuthToken, AUTH_COOKIE_NAME } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to login page without authentication
  if (pathname === "/admin/login") {
    const response = NextResponse.next();
    // Add pathname to headers for layout to check
    response.headers.set("x-pathname", pathname);
    return response;
  }

  // Check for admin routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Verify the token
    const payload = await verifyAuthToken(token);

    if (!payload) {
      // Redirect to login if token is invalid
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Token is valid, allow access
    const response = NextResponse.next();
    response.headers.set("x-pathname", pathname);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

