import { cookies } from 'next/headers';
import crypto from 'crypto';

export function checkAuth() {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('admin_session');

    if (!sessionCookie) {
        return { authenticated: false };
    }

    try {
        // Decode session
        const [timestamp, hash] = sessionCookie.value.split(':');
        const username = process.env.ADMIN_USERNAME;

        // Verify hash
        const expectedHash = crypto
            .createHmac('sha256', process.env.SESSION_SECRET || 'default-secret')
            .update(`${username}:${timestamp}`)
            .digest('hex');

        if (hash !== expectedHash) {
            return { authenticated: false };
        }

        // Check expiration (7 days)
        const sessionAge = Date.now() - parseInt(timestamp);
        if (sessionAge > 7 * 24 * 60 * 60 * 1000) {
            return { authenticated: false };
        }

        return { authenticated: true, username };
    } catch (error) {
        return { authenticated: false };
    }
}

export function createSession(username) {
    const timestamp = Date.now().toString();
    const hash = crypto
        .createHmac('sha256', process.env.SESSION_SECRET || 'default-secret')
        .update(`${username}:${timestamp}`)
        .digest('hex');

    return `${timestamp}:${hash}`;
}
