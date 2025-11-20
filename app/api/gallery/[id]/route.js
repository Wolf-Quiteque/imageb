import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { checkAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
    try {
        const db = await getDatabase();
        const collection = db.collection('imagerybyb_ovation_gallery');
        const image = await collection.findOne({ _id: new ObjectId(params.id) });

        if (!image) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(image);
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
        const collection = db.collection('imagerybyb_ovation_gallery');

        await collection.updateOne(
            { _id: new ObjectId(params.id) },
            { $set: { ...body, updatedAt: new Date() } }
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
        const collection = db.collection('imagerybyb_ovation_gallery');

        await collection.deleteOne({ _id: new ObjectId(params.id) });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
