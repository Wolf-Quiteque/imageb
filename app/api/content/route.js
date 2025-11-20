import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { checkAuth } from '@/lib/auth';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const section = searchParams.get('section');

        const db = await getDatabase();
        const collection = db.collection('imagerybyb_ovation_content');

        const query = section ? { section } : {};
        const content = await collection.find(query).toArray();

        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    const auth = checkAuth();
    if (!auth.authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { key, section, subsection, type, value } = body;

        if (!key) {
            return NextResponse.json({ error: 'Key is required' }, { status: 400 });
        }

        const db = await getDatabase();
        const collection = db.collection('imagerybyb_ovation_content');

        const contentDoc = {
            key,
            section: section || 'general',
            subsection: subsection || null,
            type: type || 'text',
            value,
            updatedAt: new Date(),
            updatedBy: auth.username
        };

        await collection.updateOne(
            { key },
            { $set: contentDoc },
            { upsert: true }
        );

        return NextResponse.json({ success: true, data: contentDoc });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
