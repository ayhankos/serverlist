import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicAdminRoutes = ["/admin/login", "/admin/register"];

  if (publicAdminRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    try {
      const session = await auth();

      if (!session) {
        const loginUrl = new URL("/admin/login", request.url);
        return NextResponse.redirect(loginUrl);
      }

      if (session.user?.role !== "ADMIN") {
        const homeUrl = new URL("/", request.url);
        return NextResponse.redirect(homeUrl);
      }

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
