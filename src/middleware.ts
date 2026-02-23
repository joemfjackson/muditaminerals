import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    const expectedToken = generateToken(process.env.ADMIN_PASSWORD || "");

    if (!token || token !== expectedToken) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

function generateToken(password: string): string {
  // Deterministic token from password using simple hash
  // In production, use proper HMAC — this is a sync-compatible approach for middleware
  let hash = 0;
  const str = `mudita-admin:${password}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return `admin_${Math.abs(hash).toString(36)}`;
}

export const config = {
  matcher: ["/admin/:path*"],
};
