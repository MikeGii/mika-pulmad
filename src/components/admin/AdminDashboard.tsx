// src/components/admin/AdminDashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import '../../styles/admin/AdminDashboard.css';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleCardClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="dashboard-container">
            <Header />

            <main className="dashboard-content">
                <div className="dashboard-welcome">
                    <h2>Welcome to Admin Dashboard</h2>
                    <p>Manage your wedding preparations from here</p>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card" onClick={() => handleCardClick('/admin/accounts')}>
                        <h3>Account Management</h3>
                        <p>Manage user accounts and permissions</p>
                        <div className="card-stats">
                            <span className="stat-number">1</span>
                            <span className="stat-label">Admin Users</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;