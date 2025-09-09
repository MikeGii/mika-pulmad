// src/components/admin/AdminDashboard.tsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/admin/AdminDashboard.css';

const AdminDashboard: React.FC = () => {
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>MiKa Pulmad - Admin Dashboard</h1>
                <div className="user-info">
                    <span>Welcome, {currentUser?.email}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </header>

            <main className="dashboard-content">
                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>Guest Management</h3>
                        <p>Manage guest invitations and RSVPs</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Transportation</h3>
                        <p>Track who needs transport arrangements</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Accommodation</h3>
                        <p>Manage sleeping arrangements</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Dietary Requirements</h3>
                        <p>Track food allergies and preferences</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;