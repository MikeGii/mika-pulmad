// Update src/components/admin/dashboard/AdminDashboard.tsx
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import Header from '../../common/Header';
import WeddingDetails from './WeddingDetails';
import ToDoDashboard from './ToDoDashboard';
import FinancialStatus from './FinancialStatus'; // Add this import
import '../../../styles/admin/AdminDashboard.css';

const AdminDashboard: React.FC = () => {
    // eslint-disable-next-line
    const { t } = useLanguage();
    // eslint-disable-next-line
    const { currentUser } = useAuth();

    return (
        <div className="mika-dashboard-container">
            <Header />

            {/* Hero Section */}
            <section className="mika-hero-section">
                <div className="mika-hero-image">
                    <img src="/images/index.jpg" alt="Mike & Kateryna" />
                    <div className="mika-hero-overlay"></div>
                </div>
            </section>

            {/* Wedding Details */}
            <WeddingDetails />

            {/* ToDo Dashboard */}
            <ToDoDashboard />

            {/* Financial Status */}
            <FinancialStatus />
        </div>
    );
};

export default AdminDashboard;