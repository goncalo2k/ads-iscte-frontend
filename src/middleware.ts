import { NextResponse, NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = process.env.NEXT_AUTH_TOKEN_NAME ?? 'ghdashauth';
const PROTECTED_PREFIX = '/dashboard';

const API_BASE_ENDPOINT = process.env.NEXT_PUBLIC_API_BASE! + process.env.NEXT_PUBLIC_GITHUB_AUTHENTICATION_ENDPOINT_URL!;
const AUTH_VERIFY_ENDPOINT = '/session';

const PUBLIC_REDIRECTS = new Set<string>(['/', '/login']);

function isProtected(pathname: string) {
    return pathname === PROTECTED_PREFIX || pathname.startsWith(`${PROTECTED_PREFIX}/`);
}

function isPublicPath(pathname: string) {
    return PUBLIC_REDIRECTS.has(pathname);
}

async function verifySession(request: NextRequest, cookieValue: string | undefined) {
    console.log(['[mw] verifySession cookieValue:'], cookieValue)
    if (!cookieValue) return { valid: false };

    try {
        const res = await fetch(API_BASE_ENDPOINT + AUTH_VERIFY_ENDPOINT, {
            credentials: "include",
            cache: 'no-store',
        });
        console.log(['[mw] verifySession response:'], res)
        if (!res.ok) return { valid: false };
        return { valid: true };
    } catch (error) {
        console.log('[mw] Error verifying session:', error);
        return { valid: false };
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const cookieValue = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    
    console.log("[mw] pathname:", pathname);
    console.log("[mw] request.cookies:", request.cookies);
    console.log("[mw] cookieValue:", cookieValue);
    console.log("[mw] isProtected:", isProtected(pathname));
    if (isProtected(pathname)) {
        const { valid } = await verifySession(request, cookieValue);
        console.log("[mw-protected] valid?:", valid);
        if (!valid) {
            const response = NextResponse.redirect(new URL('/', request.url));
            return response;
        }
        if (valid && isPublicPath(pathname)) {
            return NextResponse.redirect(new URL(PROTECTED_PREFIX, request.url));
        }
        return NextResponse.next();
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js|woff2?)).*)',
    ],
};
