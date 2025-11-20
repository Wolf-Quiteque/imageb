import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { getAnalyticsStats } from '@/lib/analytics';
import { getDatabase } from '@/lib/mongodb';

export async function GET(request) {
    const auth = checkAuth();
    if (!auth.authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const analytics = await getAnalyticsStats(30);
        const db = await getDatabase();

        // Get inquiry count
        const inquiryCollection = db.collection('imagerybyb_ovation_inquiries');
        const newInquiries = await inquiryCollection.countDocuments({ status: 'new' });

        // Get gallery count
        const galleryCollection = db.collection('imagerybyb_ovation_gallery');
        const galleryImages = await galleryCollection.countDocuments({ isActive: true });

        return NextResponse.json({
            totalViews: analytics.totalViews,
            uniqueVisitors: analytics.uniqueVisitors,
            newInquiries,
            galleryImages
        });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
