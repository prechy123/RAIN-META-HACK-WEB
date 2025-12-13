import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    if (request.nextUrl.pathname.startsWith("/main")) {
      const loginUrl = new URL("/login", request.nextUrl.origin);
      const fullPath = request.nextUrl.pathname + request.nextUrl.search;
      loginUrl.searchParams.set("redirect", fullPath);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/main"
  ],
};
