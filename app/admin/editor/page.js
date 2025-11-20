'use client';

import { useRouter } from 'next/navigation';

export default function EditorPage() {
    const router = useRouter();

    const sections = [
        { id: 'hero', title: 'Hero Section', description: 'Main homepage slider', icon: '🎯' },
        { id: 'about', title: 'About Section', description: 'About us content', icon: '📝' },
        { id: 'services', title: 'Services', description: 'Service offerings', icon: '💼' },
        { id: 'portfolio', title: 'Portfolio', description: 'Portfolio section', icon: '🖼️' },
        { id: 'testimonials', title: 'Testimonials', description: 'Client testimonials', icon: '💬' },
        { id: 'contact', title: 'Contact', description: 'Contact information', icon: '📧' },
    ];

    return (
        <div className="editor-page">
            <div className="page-header">
                <h1>Content Editor</h1>
                <p>Select a section to edit its content</p>
            </div>

            <div className="content-grid">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className="content-card"
                        onClick={() => router.push(`/admin/editor/${section.id}`)}
                    >
                        <div className="section-icon">{section.icon}</div>
                        <h3>{section.title}</h3>
                        <p>{section.description}</p>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .editor-page {
          padding: 20px;
        }

        .page-header {
          margin-bottom: 30px;
        }

        .page-header h1 {
          margin: 0 0 10px 0;
          font-size: 32px;
          color: #333;
        }

        .page-header p {
          margin: 0;
          color: #666;
          font-size: 16px;
        }

        .section-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }
      `}</style>
        </div>
    );
}
