'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

export default function RichTextEditor({ value, onChange, label }) {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading editor...</p>,
    }), []);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'],
        ],
    };

    return (
        <div className="rich-text-editor">
            {label && <label className="editor-label">{label}</label>}
            <ReactQuill
                theme="snow"
                value={value || ''}
                onChange={onChange}
                modules={modules}
                style={{ background: 'white', borderRadius: '6px' }}
            />

            <style jsx>{`
        .rich-text-editor {
          margin-bottom: 20px;
        }

        .editor-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        :global(.ql-container) {
          min-height: 200px;
          font-size: 16px;
        }
      `}</style>
        </div>
    );
}
