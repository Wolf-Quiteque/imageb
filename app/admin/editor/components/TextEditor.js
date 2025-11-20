'use client';

export default function TextEditor({ value, onChange, label, placeholder }) {
    return (
        <div className="text-editor">
            {label && <label className="editor-label">{label}</label>}
            <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="text-input"
            />

            <style jsx>{`
        .text-editor {
          margin-bottom: 20px;
        }

        .editor-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .text-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 16px;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }

        .text-input:focus {
          outline: none;
          border-color: #667eea;
        }
      `}</style>
        </div>
    );
}
