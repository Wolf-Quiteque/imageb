'use client';

import { useState } from 'react';

export default function ImageUploader({ value, onChange, label }) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'content');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                onChange(data.url);
            } else {
                alert('Upload failed: ' + data.error);
            }
        } catch (error) {
            alert('Upload error: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="image-uploader">
            {label && <label className="uploader-label">{label}</label>}

            <div className="upload-area">
                {value && (
                    <div className="image-preview">
                        <img src={value} alt="Preview" />
                    </div>
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    id="image-upload"
                    className="file-input"
                />
                <label htmlFor="image-upload" className="upload-button">
                    {uploading ? 'Uploading...' : value ? 'Change Image' : 'Choose Image'}
                </label>
            </div>

            <style jsx>{`
        .image-uploader {
          margin-bottom: 20px;
        }

        .uploader-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .upload-area {
          border: 2px dashed #e0e0e0;
          padding: 20px;
          border-radius: 6px;
          text-align: center;
        }

        .image-preview {
          margin-bottom: 15px;
        }

        .image-preview img {
          max-width: 300px;
          max-height: 200px;
          border-radius: 6px;
        }

        .file-input {
          display: none;
        }

        .upload-button {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .upload-button:hover {
          background: #5568d3;
        }
      `}</style>
        </div>
    );
}
