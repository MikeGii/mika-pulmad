// src/components/admin/AdminDashboard.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../common/Header';
import '../../styles/admin/AdminDashboard.css';
import WeddingDetails from "./WeddingDetails";
import ToDoDashboard from "./ToDoDashboard";

const AdminDashboard: React.FC = () => {
    const { t } = useLanguage();
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
        </div>
    );
};

export default AdminDashboard;