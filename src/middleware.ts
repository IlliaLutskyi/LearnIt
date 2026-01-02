import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    const token = req.nextauth.token as { role: string } | undefined;

    const isAuthPath =
      path.startsWith("/auth") || path.startsWith("/create-course");
    const isAdminPath = path.startsWith("/admin");

    if (isAuthPath && token)
      return NextResponse.redirect(new URL("/", req.url));

    if (isAdminPath && (!token || token.role !== "Admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/create-course", "/api/:path*"],
};
