'use client';

import { useState, useEffect } from 'react';
import ImageUploadModal from './components/ImageUploadModal';

export default function GalleryPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUploadModal, setShowUploadModal] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch('/api/gallery');
            if (response.ok) {
                const data = await response.json();
                setImages(data);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
            fetchImages();
        } catch (error) {
            alert('Error deleting image');
        }
    };

    const handleToggleActive = async (id, isActive) => {
        try {
            await fetch(`/api/gallery/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !isActive })
            });
            fetchImages();
        } catch (error) {
            alert('Error updating image');
        }
    };

    return (
        <div className="gallery-page">
            <div className="page-header">
                <h1>Gallery Management</h1>
                <button onClick={() => setShowUploadModal(true)} className="upload-btn">
                    + Upload Images
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="gallery-grid">
                    {images.map((image) => (
                        <div key={image._id} className="gallery-item">
                            <img src={image.thumbnailUrl || image.imageUrl} alt={image.title} />
                            <div className="item-info">
                                <h3>{image.title}</h3>
                                <p>{image.description}</p>
                            </div>
                            <div className="item-actions">
                                <button
                                    onClick={() => handleToggleActive(image._id, image.isActive)}
                                    className={image.isActive ? 'active' : 'inactive'}
                                >
                                    {image.isActive ? 'Active' : 'Inactive'}
                                </button>
                                <button onClick={() => handleDelete(image._id)} className="delete-btn">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showUploadModal && (
                <ImageUploadModal
                    onClose={() => setShowUploadModal(false)}
                    onSuccess={() => {
                        setShowUploadModal(false);
                        fetchImages();
                    }}
                />
            )}

            <style jsx>{`
        .gallery-page {
          padding: 20px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .page-header h1 {
          margin: 0;
          font-size: 32px;
          color: #333;
        }

        .upload-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .upload-btn:hover {
          background: #5568d3;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .gallery-item {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .gallery-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .gallery-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .item-info {
          padding: 15px;
        }

        .item-info h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
          color: #333;
        }

        .item-info p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .item-actions {
          padding: 15px;
          display: flex;
          gap: 10px;
          border-top: 1px solid #eee;
        }

        .item-actions button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .item-actions button.active {
          background: #4CAF50;
          color: white;
        }

        .item-actions button.inactive {
          background: #9e9e9e;
          color: white;
        }

        .delete-btn {
          background: #f44336;
          color: white;
        }

        .delete-btn:hover {
          background: #d32f2f;
        }
      `}</style>
        </div>
    );
}
