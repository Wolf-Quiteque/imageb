import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './admin.css';

export default function AdminLayout({ children }) {
    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="admin-main">
                <Header />
                <div className="admin-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
