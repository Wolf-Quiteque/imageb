import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';

export async function GET(request) {
    const auth = checkAuth();

    if (auth.authenticated) {
        return NextResponse.json({
            authenticated: true,
            username: auth.username
        });
    }

    return NextResponse.json(
        { authenticated: false },
        { status: 401 }
    );
}
