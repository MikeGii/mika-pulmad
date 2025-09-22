// src/components/admin/dashboard/GuestStatus.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { GuestService } from '../../../services/guestService';
import '../../../styles/admin/GuestStatus.css';

const GuestStatus: React.FC = () => {
    const { t } = useLanguage();
    const [statistics, setStatistics] = useState({
        totalGuests: 0,
        totalAdults: 0,
        totalChildren: 0,
        guestsByTable: {} as { [tableNumber: number]: number }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGuestStatistics();
    }, []);

    const fetchGuestStatistics = async () => {
        try {
            const stats = await GuestService.getGuestStatistics();
            setStatistics(stats);
        } catch (error) {
            console.error('Error fetching guest statistics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="mika-guest-status">
                <div className="mika-guest-content">
                    <div className="mika-guest-header">
                        <h2 className="mika-guest-title">{t('guests.title')}</h2>
                    </div>
                    <div className="mika-guest-container">
                        <div className="mika-guest-loading">
                            <p>Loading guest information...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="mika-guest-status">
            <div className="mika-guest-content">
                <div className="mika-guest-header">
                    <h2 className="mika-guest-title">{t('guests.title')}</h2>
                    <p className="mika-guest-subtitle">{t('guests.subtitle')}</p>

                    {/* Guest Overview */}
                    <div className="mika-guest-overview">
                        <div className="mika-guest-stat">
                            <span className="mika-guest-stat-number">{statistics.totalGuests}</span>
                            <span className="mika-guest-stat-label">{t('guests.totalGuests')}</span>
                        </div>
                        <div className="mika-guest-stat">
                            <span className="mika-guest-stat-number">{statistics.totalAdults}</span>
                            <span className="mika-guest-stat-label">{t('guests.totalAdults')}</span>
                        </div>
                        <div className="mika-guest-stat">
                            <span className="mika-guest-stat-number">{statistics.totalChildren}</span>
                            <span className="mika-guest-stat-label">{t('guests.totalChildren')}</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default GuestStatus;