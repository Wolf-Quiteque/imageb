'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        { path: '/admin', icon: '📊', label: 'Dashboard' },
        { path: '/admin/editor', icon: '✏️', label: 'Content Editor' },
        { path: '/admin/gallery', icon: '🖼️', label: 'Gallery' },
        { path: '/admin/inquiry', icon: '📧', label: 'Inquiries' },
    ];

    return (
        <div className="admin-sidebar">
            <div className="sidebar-header">
                <h2>ImageryByB</h2>
                <p>Admin Panel</p>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`sidebar-item ${pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="sidebar-icon">{item.icon}</span>
                        <span className="sidebar-text">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
