import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { checkAuth } from '@/lib/auth';

export async function GET(request) {
    const auth = checkAuth();
    if (!auth.authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const db = await getDatabase();
        const collection = db.collection('imagerybyb_ovation_inquiries');

        const query = status ? { status } : {};
        const inquiries = await collection
            .find(query)
            .sort({ submittedAt: -1 })
            .toArray();

        return NextResponse.json(inquiries);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, inquiryType, date, message } = body;

        if (!firstName || !email) {
            return NextResponse.json(
                { error: 'First name and email are required' },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const collection = db.collection('imagerybyb_ovation_inquiries');

        const inquiryDoc = {
            firstName,
            lastName: lastName || '',
            email,
            phone: phone || '',
            inquiryType: inquiryType || 'general',
            date: date ? new Date(date) : null,
            message: message || '',
            status: 'new',
            submittedAt: new Date(),
            notes: ''
        };

        const result = await collection.insertOne(inquiryDoc);

        return NextResponse.json({
            success: true,
            id: result.insertedId
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
