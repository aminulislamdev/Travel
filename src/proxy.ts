import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = [
  "/profile",
  "/my-bookings",
  "/add-destination",
];
const authRoutes = ["/sign-in", "/sign-up"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSessionCookie = !!getSessionCookie(request);

  const isProtectedRoute =
    protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    ) || pathname.startsWith("/all-destinations/");

  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute && hasSessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedRoute && !hasSessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/my-bookings/:path*",
    "/add-destination/:path*",
    "/all-destinations/:path*",
    "/sign-in",
    "/sign-up",
  ],
};