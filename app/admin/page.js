'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalViews: 0,
        uniqueVisitors: 0,
        newInquiries: 0,
        galleryImages: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/analytics/stats');
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="dashboard"><h1>Loading...</h1></div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome to your ImageryByB admin panel</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">👁️</div>
                    <div className="stat-label">Total Views</div>
                    <div className="stat-value">{stats.totalViews.toLocaleString()}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-label">Unique Visitors</div>
                    <div className="stat-value">{stats.uniqueVisitors.toLocaleString()}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📧</div>
                    <div className="stat-label">New Inquiries</div>
                    <div className="stat-value">{stats.newInquiries.toLocaleString()}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🖼️</div>
                    <div className="stat-label">Gallery Images</div>
                    <div className="stat-value">{stats.galleryImages.toLocaleString()}</div>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="content-grid">
                    <a href="/admin/editor" className="content-card">
                        <h3>✏️ Edit Content</h3>
                        <p>Manage website content and copy</p>
                    </a>

                    <a href="/admin/gallery" className="content-card">
                        <h3>🖼️ Manage Gallery</h3>
                        <p>Upload and organize gallery images</p>
                    </a>

                    <a href="/admin/inquiry" className="content-card">
                        <h3>📧 View Inquiries</h3>
                        <p>Check and respond to inquiries</p>
                    </a>
                </div>
            </div>

            <style jsx>{`
        .quick-actions {
          margin-top: 40px;
        }

        .quick-actions h2 {
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }
      `}</style>
        </div>
    );
}
