import { NextResponse } from 'next/server';
import { createSession } from '@/lib/auth';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // Simple environment-based authentication
        if (
            username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const sessionValue = createSession(username);

            const response = NextResponse.json({ success: true });

            // Set cookie with session
            response.cookies.set('admin_session', sessionValue, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/'
            });

            return response;
        }

        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
