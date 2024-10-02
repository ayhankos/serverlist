import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const session = await auth();

  if (
    req.nextUrl.pathname === "/admin/login" ||
    req.nextUrl.pathname === "/admin/register"
  ) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (session.user.role === "ADMIN") {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    return NextResponse.next();
  } else {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
