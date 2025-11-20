import { getDatabase } from './mongodb';

export async function trackPageView(path, userAgent, ip) {
    try {
        const db = await getDatabase();
        const collection = db.collection('imagerybyb_ovation_analytics');

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Create a simple visitor ID from user agent and IP
        const visitorId = Buffer.from(`${userAgent}-${ip}`).toString('base64');

        await collection.updateOne(
            { date: today },
            {
                $inc: { totalViews: 1 },
                $addToSet: { visitors: visitorId },
                $push: {
                    pages: {
                        path,
                        timestamp: new Date(),
                        userAgent
                    }
                }
            },
            { upsert: true }
        );

        return { success: true };
    } catch (error) {
        console.error('Analytics tracking error:', error);
        return { success: false, error: error.message };
    }
}

export async function getAnalyticsStats(days = 30) {
    try {
        const db = await getDatabase();
        const collection = db.collection('imagerybyb_ovation_analytics');

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        startDate.setHours(0, 0, 0, 0);

        const stats = await collection
            .find({ date: { $gte: startDate } })
            .toArray();

        const totalViews = stats.reduce((sum, day) => sum + (day.totalViews || 0), 0);

        // Count unique visitors across all days
        const allVisitors = new Set();
        stats.forEach(day => {
            if (day.visitors) {
                day.visitors.forEach(v => allVisitors.add(v));
            }
        });

        return {
            totalViews,
            uniqueVisitors: allVisitors.size,
            dailyStats: stats.map(s => ({
                date: s.date,
                views: s.totalViews || 0,
                visitors: s.visitors ? s.visitors.length : 0
            }))
        };
    } catch (error) {
        console.error('Analytics fetch error:', error);
        return {
            totalViews: 0,
            uniqueVisitors: 0,
            dailyStats: []
        };
    }
}
