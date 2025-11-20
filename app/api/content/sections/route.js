import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET(request) {
    try {
        const db = await getDatabase();
        const collection = db.collection('imagerybyb_ovation_content');

        const content = await collection.find({}).toArray();

        // Group by section
        const grouped = content.reduce((acc, item) => {
            if (!acc[item.section]) {
                acc[item.section] = [];
            }
            acc[item.section].push(item);
            return acc;
        }, {});

        return NextResponse.json(grouped);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
