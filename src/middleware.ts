import { NextResponse, NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = process.env.NEXT_AUTH_TOKEN_NAME ?? 'ghdashauth';
const PROTECTED_PREFIX = '/dashboard';

const API_BASE_ENDPOINT = process.env.NEXT_PUBLIC_API_BASE! + process.env.NEXT_PUBLIC_GITHUB_AUTHENTICATION_ENDPOINT_URL!;
const AUTH_VERIFY_ENDPOINT = '/session';

const PUBLIC_REDIRECTS = new Set<string>(['/', '/login']);

function isProtected(pathname: string) {
    return pathname === PROTECTED_PREFIX || pathname.startsWith(`${PROTECTED_PREFIX}/`);
}

function shouldPublicRedirect(pathname: string) {
    return PUBLIC_REDIRECTS.has(pathname);
}

async function verifySession(request: NextRequest, cookieValue: string | undefined) {
    if (!cookieValue) return { valid: false };

    try {
        const res = await fetch(API_BASE_ENDPOINT + AUTH_VERIFY_ENDPOINT, {
            headers: {
                cookie: `${AUTH_COOKIE_NAME}=${cookieValue}`,
            },
            cache: 'no-store',
        });
        
        if (!res.ok) return { valid: false };
        return { valid: true };
    } catch (error) {
        console.log('Error verifying session:', error);
        return { valid: false };
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const cookieValue = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    
    const { valid } = await verifySession(request, cookieValue);

    if (isProtected(pathname)) {
        if (!valid) {
            const response = NextResponse.redirect(new URL('/', request.url));
            response.cookies.set({
                name: AUTH_COOKIE_NAME,
                value: '',
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                expires: new Date(0),
            });
            return response;
        }
        return NextResponse.next();
    }

    if (valid && shouldPublicRedirect(pathname)) {
        return NextResponse.redirect(new URL(PROTECTED_PREFIX, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js|woff2?)).*)',
    ],
};
