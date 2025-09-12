// src/components/admin/AdminDashboard.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import Header from '../common/Header';
import '../../styles/admin/AdminDashboard.css';

const AdminDashboard: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="dashboard-container">
            <Header />

            <main className="dashboard-content">
                <div className="dashboard-welcome">
                    <h2>{t('dashboard.title')}</h2>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;