'use client';

import { useState } from 'react';

export default function ImageUploadModal({ onClose, onSuccess }) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploading(true);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setUploadProgress(prev => ({ ...prev, [file.name]: 'uploading' }));

            try {
                // Upload file
                const formData = new FormData();
                formData.append('file', file);
                formData.append('type', 'gallery');

                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });

                const uploadData = await uploadResponse.json();

                if (uploadData.success) {
                    // Save to gallery collection
                    await fetch('/api/gallery', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            title: file.name.replace(/\.[^/.]+$/, ''),
                            description: '',
                            imageUrl: uploadData.url,
                            thumbnailUrl: uploadData.thumbnailUrl,
                            metadata: {
                                originalName: file.name,
                                mimeType: file.type,
                                size: file.size,
                                ...uploadData.metadata
                            }
                        })
                    });

                    setUploadProgress(prev => ({ ...prev, [file.name]: 'success' }));
                } else {
                    setUploadProgress(prev => ({ ...prev, [file.name]: 'failed' }));
                }
            } catch (error) {
                setUploadProgress(prev => ({ ...prev, [file.name]: 'failed' }));
            }
        }

        setUploading(false);
        setTimeout(() => {
            onSuccess();
        }, 1000);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Upload Images</h2>

                <div className="upload-area">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        id="gallery-upload"
                    />
                    <label htmlFor="gallery-upload">
                        Choose Images ({files.length} selected)
                    </label>
                </div>

                {files.length > 0 && (
                    <div className="file-list">
                        {files.map((file) => (
                            <div key={file.name} className="file-item">
                                <span>{file.name}</span>
                                <span className={`status ${uploadProgress[file.name] || ''}`}>
                                    {uploadProgress[file.name] || 'pending'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="modal-actions">
                    <button onClick={onClose} disabled={uploading}>
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={uploading || files.length === 0}
                        className="primary"
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>

                <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .modal-content {
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
          }

          .upload-area {
            border: 2px dashed #ddd;
            padding: 40px;
            text-align: center;
            margin: 20px 0;
            border-radius: 8px;
          }

          .upload-area input {
            display: none;
          }

          .upload-area label {
            background: #667eea;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            display: inline-block;
          }

          .file-list {
            margin: 20px 0;
          }

          .file-item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #eee;
          }

          .status {
            font-size: 12px;
            padding: 4px 8px;
            border-radius: 4px;
          }

          .status.success {
            background: #4CAF50;
            color: white;
          }

          .status.failed {
            background: #f44336;
            color: white;
          }

          .status.uploading {
            background: #2196F3;
            color: white;
          }

          .modal-actions {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            margin-top: 20px;
          }

          .modal-actions button {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }

          .modal-actions button.primary {
            background: #667eea;
            color: white;
          }

          .modal-actions button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}</style>
            </div>
        </div>
    );
}
