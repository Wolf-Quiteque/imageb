import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { checkAuth } from '@/lib/auth';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const active = searchParams.get('active');

        const db = await getDatabase();
        const collection = db.collection('imagerybyb_ovation_gallery');

        const query = active === 'true' ? { isActive: true } : {};
        const images = await collection
            .find(query)
            .sort({ order: 1, createdAt: -1 })
            .toArray();

        return NextResponse.json(images);
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
        const { title, description, imageUrl, thumbnailUrl, metadata } = body;

        const db = await getDatabase();
        const collection = db.collection('imagerybyb_ovation_gallery');

        // Get max order
        const lastImage = await collection
            .find({})
            .sort({ order: -1 })
            .limit(1)
            .toArray();

        const nextOrder = lastImage.length > 0 ? (lastImage[0].order || 0) + 1 : 1;

        const imageDoc = {
            title,
            description: description || '',
            imageUrl,
            thumbnailUrl: thumbnailUrl || imageUrl,
            metadata: metadata || {},
            order: nextOrder,
            isActive: true,
            createdAt: new Date(),
            createdBy: auth.username
        };

        const result = await collection.insertOne(imageDoc);

        return NextResponse.json({
            success: true,
            id: result.insertedId,
            data: imageDoc
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
