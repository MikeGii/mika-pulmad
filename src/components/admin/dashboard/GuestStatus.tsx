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
        guestsByTable: {} as { [tableNumber: number]: number },
        // RSVP statistics
        totalResponded: 0,
        totalAttending: 0,
        attendingAdults: 0,
        attendingChildren: 0,
        totalNotAttending: 0,
        totalPending: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGuestStatistics();
    }, []);

    const fetchGuestStatistics = async () => {
        try {
            // Get basic statistics
            const stats = await GuestService.getGuestStatistics();

            // Get all guests for RSVP calculations
            const allGuests = await GuestService.getAllGuests();

            // Calculate RSVP statistics
            const invitationGetters = allGuests.filter(g => g.isInvitationGetter);

            let totalResponded = 0;
            let totalAttending = 0;
            let totalNotAttending = 0;
            let totalPending = 0;
            let attendingAdults = 0;
            let attendingChildren = 0;

            invitationGetters.forEach(getter => {
                if (getter.rsvpStatus === 'pending') {
                    totalPending++;
                } else {
                    totalResponded++;

                    if (getter.rsvpStatus === 'attending') {
                        totalAttending++;

                        // Count who is actually attending
                        const attendingIds = getter.rsvpResponses?.attendingGuestIds || [];

                        attendingIds.forEach(guestId => {
                            const guest = allGuests.find(g => g.id === guestId);
                            if (guest) {
                                if (guest.isChild) {
                                    attendingChildren++;
                                } else {
                                    attendingAdults++;
                                }
                            }
                        });
                    } else {
                        totalNotAttending++;
                    }
                }
            });

            setStatistics({
                ...stats,
                totalResponded,
                totalAttending,
                attendingAdults,
                attendingChildren,
                totalNotAttending,
                totalPending
            });
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
                            <p>{t('guests.loading')}</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const responseRate = statistics.totalGuests > 0
        ? Math.round((statistics.totalResponded / statistics.totalGuests) * 100)
        : 0;

    return (
        <section className="mika-guest-status">
            <div className="mika-guest-content">
                <div className="mika-guest-header">
                    <h2 className="mika-guest-title">{t('guests.title')}</h2>
                    <p className="mika-guest-subtitle">{t('guests.subtitle')}</p>
                </div>

                {/* Invited Guests Overview */}
                <div className="mika-guest-cards">
                    <div className="mika-guest-card mika-card-invited">
                        <div className="mika-card-icon">📨</div>
                        <div className="mika-card-content">
                            <div className="mika-guest-overview">
                                <div className="mika-guest-stat">
                                    <span className="mika-guest-stat-number">{statistics.totalGuests}</span>
                                    <span className="mika-guest-stat-label">{t('guests.totalInvited')}</span>
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


                    {/* Attending Guests Card */}
                    <div className="mika-guest-card mika-card-attending">
                        <div className="mika-card-icon">🎉</div>
                        <div className="mika-card-content">
                            <div className="mika-guest-overview">
                                <div className="mika-guest-stat">
                                    <span className="mika-guest-stat-number">
                                        {statistics.attendingAdults + statistics.attendingChildren}
                                    </span>
                                    <span className="mika-guest-stat-label">{t('guests.attending')}</span>
                                </div>
                                <div className="mika-guest-stat">
                                    <span className="mika-guest-stat-number">{statistics.attendingAdults}</span>
                                    <span className="mika-guest-stat-label">{t('guests.attendingAdults')}</span>
                                </div>
                                <div className="mika-guest-stat">
                                    <span className="mika-guest-stat-number">{statistics.attendingChildren}</span>
                                    <span className="mika-guest-stat-label">{t('guests.attendingChildren')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuestStatus;