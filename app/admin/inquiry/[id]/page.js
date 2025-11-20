'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function InquiryDetail() {
    const params = useParams();
    const router = useRouter();
    const [inquiry, setInquiry] = useState(null);
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState('new');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiry();
    }, [params.id]);

    const fetchInquiry = async () => {
        try {
            const response = await fetch(`/api/inquiry/${params.id}`);
            const data = await response.json();
            setInquiry(data);
            setNotes(data.notes || '');
            setStatus(data.status);

            // Mark as read if new
            if (data.status === 'new') {
                updateStatus('read');
            }
        } catch (error) {
            console.error('Error fetching inquiry:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (newStatus) => {
        try {
            await fetch(`/api/inquiry/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            setStatus(newStatus);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const saveNotes = async () => {
        try {
            await fetch(`/api/inquiry/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notes })
            });
            alert('Notes saved!');
        } catch (error) {
            alert('Error saving notes');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!inquiry) return <div>Inquiry not found</div>;

    return (
        <div className="inquiry-detail">
            <button onClick={() => router.back()} className="back-btn">← Back</button>

            <h1>Inquiry from {inquiry.firstName} {inquiry.lastName}</h1>

            <div className="detail-grid">
                <div className="detail-card">
                    <h3>Contact Information</h3>
                    <p><strong>Email:</strong> {inquiry.email}</p>
                    <p><strong>Phone:</strong> {inquiry.phone}</p>
                    <p><strong>Submitted:</strong> {new Date(inquiry.submittedAt).toLocaleString()}</p>
                </div>

                <div className="detail-card">
                    <h3>Inquiry Details</h3>
                    <p><strong>Type:</strong> {inquiry.inquiryType}</p>
                    {inquiry.date && (
                        <p><strong>Event Date:</strong> {new Date(inquiry.date).toLocaleDateString()}</p>
                    )}
                    {inquiry.message && (
                        <div>
                            <strong>Message:</strong>
                            <p>{inquiry.message}</p>
                        </div>
                    )}
                </div>

                <div className="detail-card full-width">
                    <h3>Status</h3>
                    <select value={status} onChange={(e) => updateStatus(e.target.value)}>
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="responded">Responded</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                <div className="detail-card full-width">
                    <h3>Admin Notes</h3>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={6}
                        placeholder="Add internal notes about this inquiry..."
                    />
                    <button onClick={saveNotes} className="save-btn">Save Notes</button>
                </div>
            </div>

            <style jsx>{`
        .inquiry-detail {
          padding: 20px;
        }

        .back-btn {
          background: #e0e0e0;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          margin-bottom: 20px;
          font-weight: 600;
        }

        h1 {
          margin-bottom: 30px;
          color: #333;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .detail-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .detail-card h3 {
          margin: 0 0 15px 0;
          color: #333;
        }

        .detail-card p {
          margin: 8px 0;
          color: #666;
        }

        textarea {
          width: 100%;
          padding: 10px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 14px;
          margin-top: 10px;
          font-family: inherit;
          box-sizing: border-box;
        }

        select {
          padding: 10px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 14px;
          width: 200px;
        }

        .save-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
          font-weight: 600;
        }

        .save-btn:hover {
          background: #5568d3;
        }
      `}</style>
        </div>
    );
}
