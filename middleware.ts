import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicAdminPath = path === "/admin/login";
    const isAdminPath = path.startsWith("/admin");

    // Skip middleware entirely if not an admin path
    if (!isAdminPath) {
        return NextResponse.next();
    }

    const token = request.cookies.get("auth_token")?.value;

    // If trying to access protected admin route without a token
    if (!isPublicAdminPath && !token) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // If trying to access login page while already authenticated
    if (isPublicAdminPath && token) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
