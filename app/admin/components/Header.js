'use client';

import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    return (
        <header className="admin-header">
            <div className="header-content">
                <h1>Admin Panel</h1>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>

            <style jsx>{`
        .admin-header {
          background: white;
          border-bottom: 1px solid #e0e0e0;
          padding: 0 20px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .admin-header h1 {
          margin: 0;
          font-size: 24px;
          color: #333;
        }

        .logout-btn {
          background: #f44336;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .logout-btn:hover {
          background: #d32f2f;
        }
      `}</style>
        </header>
    );
}
