import { NextResponse } from 'next/server';
import { checkAuth } from './lib/auth';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Protect admin routes (except login page)
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const auth = checkAuth();

        if (!auth.authenticated) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Redirect to dashboard if already logged in and trying to access login
    if (pathname === '/admin/login') {
        const auth = checkAuth();

        if (auth.authenticated) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
