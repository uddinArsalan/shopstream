import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAndRemoveToken } from "./app/actions/checkout";
import { verifyAccessToken } from "./app/lib/db";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const path = request.nextUrl.pathname;

  // if (path === "/") {
  //   return NextResponse.next();
  // }

  if (path.startsWith("/checkout/")) {
    const token = request.nextUrl.searchParams.get("token");
    if (!token || !verifyAndRemoveToken(token)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    cookies().delete("checkoutToken");
    return NextResponse.next();
  }

  if (path.startsWith("/auth/login") || path.startsWith("/auth/signup")) {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    const response = NextResponse.next();
    response.cookies.set("userId", payload._id as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (error) {
    console.error("Error verifying access token:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
