'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TextEditor from '../components/TextEditor';
import RichTextEditor from '../components/RichTextEditor';
import ImageUploader from '../components/ImageUploader';

export default function SectionEditor() {
    const params = useParams();
    const router = useRouter();
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchContent();
    }, [params.section]);

    const fetchContent = async () => {
        try {
            const response = await fetch(`/api/content?section=${params.section}`);
            const data = await response.json();

            // Convert array to object keyed by field key
            const contentObj = {};
            data.forEach(item => {
                contentObj[item.key] = item.value;
            });

            setContent(contentObj);
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateField = (key, value) => {
        setContent(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const saveContent = async () => {
        setSaving(true);
        try {
            for (const key in content) {
                await fetch('/api/content', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        key,
                        section: params.section,
                        type: 'text',
                        value: content[key]
                    })
                });
            }
            alert('Content saved successfully!');
        } catch (error) {
            alert('Error saving content: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="section-editor"><h1>Loading...</h1></div>;

    return (
        <div className="section-editor">
            <div className="editor-header">
                <button onClick={() => router.back()} className="back-btn">← Back</button>
                <h1>Edit {params.section} Section</h1>
                <button onClick={saveContent} disabled={saving} className="save-btn">
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="editor-content">
                <div className="note">
                    <p><strong>Note:</strong> This is a simplified content editor. Add fields below based on your needs.</p>
                </div>

                <TextEditor
                    label="Title"
                    value={content[`${params.section}_title`]}
                    onChange={(val) => updateField(`${params.section}_title`, val)}
                    placeholder="Enter title"
                />

                <RichTextEditor
                    label="Description"
                    value={content[`${params.section}_description`]}
                    onChange={(val) => updateField(`${params.section}_description`, val)}
                />

                <ImageUploader
                    label="Featured Image"
                    value={content[`${params.section}_image`]}
                    onChange={(val) => updateField(`${params.section}_image`, val)}
                />

                {/* Add more fields as needed for each section */}
            </div>

            <style jsx>{`
        .section-editor {
          padding: 20px;
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          gap: 20px;
        }

        .editor-header h1 {
          flex: 1;
          margin: 0;
          font-size: 28px;
          color: #333;
          text-transform: capitalize;
        }

        .back-btn {
          background: #e0e0e0;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        .save-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .save-btn:hover:not(:disabled) {
          background: #5568d3;
        }

        .save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .editor-content {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .note {
          background: #fff3cd;
          border: 1px solid #ffc107;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 20px;
        }

        .note p {
          margin: 0;
          color: #856404;
        }
      `}</style>
        </div>
    );
}
