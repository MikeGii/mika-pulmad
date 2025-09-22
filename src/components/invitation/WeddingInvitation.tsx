// src/components/invitation/WeddingInvitation.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GuestService } from '../../services/guestService';
import { Guest } from '../../types/Guest';
import { LanguageProvider, useLanguage } from '../../contexts/LanguageContext';
import '../../styles/invitation/WeddingInvitation.css';

const WeddingInvitationContent: React.FC = () => {
    const { guestName } = useParams<{ guestName: string }>();
    const [invitationGetter, setInvitationGetter] = useState<Guest | null>(null);
    const [linkedGuests, setLinkedGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t, setLanguage } = useLanguage();

    useEffect(() => {
        if (guestName) {
            loadInvitationData();
        }
    }, [guestName]);

    const loadInvitationData = async () => {
        try {
            if (!guestName) return;

            // Parse guest name from URL (firstname&lastname)
            const [firstName, lastName] = guestName.split('&');
            if (!firstName || !lastName) {
                setError('Invalid invitation URL');
                return;
            }

            // Find the invitation getter by name
            const allGuests = await GuestService.getAllGuests();
            const getter = allGuests.find(guest =>
                guest.firstName.toLowerCase() === firstName.toLowerCase() &&
                guest.lastName.toLowerCase() === lastName.toLowerCase() &&
                guest.isInvitationGetter
            );

            if (!getter) {
                setError('Invitation not found');
                return;
            }

            setInvitationGetter(getter);

            // Set the language based on the invitation getter's preference
            setLanguage(getter.invitationLanguage);

            // Find all linked guests
            const linked = allGuests.filter(guest =>
                guest.linkedInvitationGetterId === getter.id
            );
            setLinkedGuests(linked);

        } catch (error) {
            console.error('Error loading invitation:', error);
            setError('Failed to load invitation');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="mika-invitation-loading">
                <div className="mika-invitation-spinner"></div>
                <p>Loading your invitation...</p>
            </div>
        );
    }

    if (error || !invitationGetter) {
        return (
            <div className="mika-invitation-error">
                <h2>Invitation Not Found</h2>
                <p>{error || 'This invitation link is not valid.'}</p>
            </div>
        );
    }

    const allInvitedGuests = [invitationGetter, ...linkedGuests];

    return (
        <div className="mika-invitation-container">
            {/* Background decoration */}
            <div className="mika-invitation-background"></div>

            <div className="mika-invitation-content">
                {/* Header */}
                <header className="mika-invitation-header">
                    <h1 className="mika-invitation-title">
                        Mike & Kateryna
                    </h1>
                    <p className="mika-invitation-subtitle">
                        {t('invitation.subtitle')}
                    </p>
                </header>

                {/* Wedding Details */}
                <section className="mika-invitation-details">
                    <div className="mika-invitation-date">
                        <span className="mika-invitation-date-number">22</span>
                        <div className="mika-invitation-date-text">
                            <span className="mika-invitation-month">{t('invitation.may')}</span>
                            <span className="mika-invitation-year">2026</span>
                        </div>
                    </div>

                    <div className="mika-invitation-venue">
                        <h3>{t('invitation.venue')}</h3>
                        <p>Põhjala Resort</p>
                        <p className="mika-invitation-address">
                            {t('invitation.address')}
                        </p>
                    </div>

                    <div className="mika-invitation-time">
                        <h3>{t('invitation.time')}</h3>
                        <p>{t('invitation.ceremonyTime')}</p>
                    </div>
                </section>

                {/* Guest Names */}
                <section className="mika-invitation-guests">
                    <h3 className="mika-invitation-guests-title">
                        {allInvitedGuests.length === 1
                            ? t('invitation.dearGuest')
                            : t('invitation.dearGuests')
                        }
                    </h3>
                    <div className="mika-invitation-guest-names">
                        {allInvitedGuests.map((guest, index) => (
                            <div key={guest.id} className="mika-invitation-guest-name">
                                {guest.firstName} {guest.lastName}
                                {guest.isChild && (
                                    <span className="mika-invitation-child-indicator">
                                        {t('invitation.child')}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mika-invitation-table-info">
                        {t('invitation.tableNumber')}: {invitationGetter.tableNumber}
                    </div>
                </section>

                {/* Message */}
                <section className="mika-invitation-message">
                    <p>{t('invitation.message')}</p>
                </section>

                {/* RSVP Section */}
                <section className="mika-invitation-rsvp">
                    <h3>{t('invitation.rsvp.title')}</h3>
                    <p>{t('invitation.rsvp.deadline')}</p>
                    {invitationGetter.phoneNumber && (
                        <div className="mika-invitation-contact">
                            <p>{t('invitation.contact')}: {invitationGetter.phoneNumber}</p>
                        </div>
                    )}
                </section>

                {/* Footer */}
                <footer className="mika-invitation-footer">
                    <p>{t('invitation.footer')}</p>
                </footer>
            </div>
        </div>
    );
};

// Wrapper component with LanguageProvider
const WeddingInvitation: React.FC = () => {
    return (
        <LanguageProvider>
            <WeddingInvitationContent />
        </LanguageProvider>
    );
};

export default WeddingInvitation;