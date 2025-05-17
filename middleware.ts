import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicAdminRoutes = ["/admin/login", "/admin/register"];

  if (publicAdminRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Protected admin routes
  if (pathname.startsWith("/admin")) {
    try {
      const session = await auth();

      // Not authenticated
      if (!session) {
        const loginUrl = new URL("/admin/login", request.url);
        return NextResponse.redirect(loginUrl);
      }

      // Not an admin
      if (session.user?.role !== "ADMIN") {
        const homeUrl = new URL("/", request.url);
        return NextResponse.redirect(homeUrl);
      }

      // Is admin, allow access
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
