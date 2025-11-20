import { NextResponse } from 'next/server';
import { trackPageView } from '@/lib/analytics';

export async function POST(request) {
    try {
        const body = await request.json();
        const { path } = body;

        const userAgent = request.headers.get('user-agent') || 'unknown';
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';

        await trackPageView(path, userAgent, ip);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
