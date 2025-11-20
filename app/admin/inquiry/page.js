'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InquiryPage() {
    const router = useRouter();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchInquiries();
    }, [filter]);

    const fetchInquiries = async () => {
        try {
            const url = filter === 'all' ? '/api/inquiry' : `/api/inquiry?status=${filter}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setInquiries(data);
            }
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const colors = {
            new: '#2196F3',
            read: '#FF9800',
            responded: '#4CAF50',
            archived: '#9e9e9e'
        };
        return colors[status] || colors.new;
    };

    return (
        <div className="inquiry-page">
            <div className="page-header">
                <h1>Inquiries</h1>
                <div className="filter-buttons">
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={filter === 'new' ? 'active' : ''}
                        onClick={() => setFilter('new')}
                    >
                        New
                    </button>
                    <button
                        className={filter === 'read' ? 'active' : ''}
                        onClick={() => setFilter('read')}
                    >
                        Read
                    </button>
                    <button
                        className={filter === 'responded' ? 'active' : ''}
                        onClick={() => setFilter('responded')}
                    >
                        Responded
                    </button>
                </div>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="inquiry-list">
                    {inquiries.length === 0 ? (
                        <p>No inquiries found.</p>
                    ) : (
                        inquiries.map((inquiry) => (
                            <div
                                key={inquiry._id}
                                className="inquiry-card"
                                onClick={() => router.push(`/admin/inquiry/${inquiry._id}`)}
                            >
                                <div className="inquiry-header">
                                    <h3>{inquiry.firstName} {inquiry.lastName}</h3>
                                    <span
                                        className="status-badge"
                                        style={{ background: getStatusBadge(inquiry.status) }}
                                    >
                                        {inquiry.status}
                                    </span>
                                </div>
                                <div className="inquiry-details">
                                    <p><strong>Email:</strong> {inquiry.email}</p>
                                    <p><strong>Phone:</strong> {inquiry.phone}</p>
                                    <p><strong>Type:</strong> {inquiry.inquiryType}</p>
                                    <p><strong>Date:</strong> {new Date(inquiry.submittedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <style jsx>{`
        .inquiry-page {
          padding: 20px;
        }

        .page-header {
          margin-bottom: 30px;
        }

        .page-header h1 {
          margin: 0 0 20px 0;
          font-size: 32px;
          color: #333;
        }

        .filter-buttons {
          display: flex;
          gap: 10px;
        }

        .filter-buttons button {
          padding: 8px 16px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .filter-buttons button.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .inquiry-list {
          display: grid;
          gap: 20px;
        }

        .inquiry-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .inquiry-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .inquiry-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .inquiry-header h3 {
          margin: 0;
          font-size: 20px;
          color: #333;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .inquiry-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
        }

        .inquiry-details p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
      `}</style>
        </div>
    );
}
