import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { checkAuth } from '@/lib/auth';

export async function GET(request, { params }) {
    try {
        const db = await getDatabase();
        const collection = db.collection('imagerybyb_ovation_content');
        const content = await collection.findOne({ key: params.key });

        if (!content) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const auth = checkAuth();
    if (!auth.authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const db = await getDatabase();
        const collection = db.collection('imagerybyb_ovation_content');

        const result = await collection.updateOne(
            { key: params.key },
            {
                $set: {
                    ...body,
                    key: params.key,
                    updatedAt: new Date(),
                    updatedBy: auth.username
                }
            },
            { upsert: true }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const auth = checkAuth();
    if (!auth.authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const db = await getDatabase();
        const collection = db.collection('imagerybyb_ovation_content');

        await collection.deleteOne({ key: params.key });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
