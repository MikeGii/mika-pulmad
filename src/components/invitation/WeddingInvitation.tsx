// src/components/invitation/WeddingInvitation.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { InvitationService } from '../../services/invitationService';
import { Guest } from '../../types';
import { LanguageProvider, useLanguage } from '../../contexts/LanguageContext';
import RSVPForm from './RSVPForm';
import '../../styles/invitation/WeddingInvitation.css';

const WeddingInvitationContent: React.FC = () => {
    const { guestName } = useParams<{ guestName: string }>();
    const [invitationGetter, setInvitationGetter] = useState<Guest | null>(null);
    const [linkedGuests, setLinkedGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showRSVP, setShowRSVP] = useState(false);
    const { t, setLanguage } = useLanguage();

    const loadInvitationData = useCallback(async () => {
        try {
            if (!guestName) return;

            const [firstName, lastName] = guestName.split('&');
            if (!firstName || !lastName) {
                setError('Invalid invitation URL');
                return;
            }

            const getter = await InvitationService.findInvitationGetterByName(firstName, lastName);

            if (!getter) {
                setError('Invitation not found');
                return;
            }

            setInvitationGetter(getter);
            setLanguage(getter.invitationLanguage);

            const linked = await InvitationService.getLinkedGuestsForInvitation(getter.id);
            setLinkedGuests(linked);

            await InvitationService.trackInvitationOpen(guestName);

        } catch (error) {
            console.error('Error loading invitation:', error);
            setError('Failed to load invitation');
        } finally {
            setLoading(false);
        }
    }, [guestName, setLanguage]);

    useEffect(() => {
        if (guestName) {
            loadInvitationData();
        }
    }, [guestName, loadInvitationData]);

    const handleRSVPSubmitted = () => {
        loadInvitationData();
        setShowRSVP(false);
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
            <div className="mika-invitation-full-container">
                <div className="mika-invitation-section">
                    <div className="mika-ornamental-frame-container">
                        <img
                            src="/images/kutse_021.png"
                            alt=""
                            className="mika-ornamental-frame"
                        />

                        <div className="mika-ornamental-content">
                            <div className="mika-ornamental-guest-names">
                                <span className="mika-ornamental-dear">
                                    {allInvitedGuests.length > 1
                                        ? t('invitation.dearGuests')
                                        : t('invitation.dearGuest')}
                                </span>
                                {allInvitedGuests.map((guest) => (
                                    <div key={guest.id} className="mika-ornamental-guest-name">
                                        {guest.firstName} {guest.lastName}
                                    </div>
                                ))}
                            </div>

                            <div className="mika-ornamental-invitation-text">
                                <p className="mika-ornamental-subtitle">
                                    {t('invitation.subtitle')}
                                </p>

                                <div className="mika-ornamental-venue">
                                    <h4 className="mika-ornamental-venue-title">Põhjala Resort</h4>
                                    <p className="mika-ornamental-address">
                                        {t('invitation.address')}
                                    </p>
                                </div>

                                <p className="mika-ornamental-message">
                                    {t('invitation.message')}
                                </p>
                            </div>

                            <div className="mika-ornamental-signature">
                                Mike & Kateryna
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mika-rsvp-section">
                    <div className="mika-rsvp-card">
                        <h3>{t('invitation.rsvp.title')}</h3>
                        <p>{t('invitation.rsvp.deadline')}</p>

                        {!showRSVP ? (
                            <button
                                className="mika-rsvp-button"
                                onClick={() => setShowRSVP(true)}
                            >
                                {invitationGetter.rsvpStatus === 'pending'
                                    ? t('rsvp.respondNow')
                                    : t('rsvp.editResponse')}
                            </button>
                        ) : (
                            <RSVPForm
                                invitationGetter={invitationGetter}
                                linkedGuests={linkedGuests}
                                onSubmitted={handleRSVPSubmitted}
                            />
                        )}

                        {invitationGetter.phoneNumber && (
                            <div className="mika-invitation-contact">
                                <p>{t('invitation.contact')}: {invitationGetter.phoneNumber}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const WeddingInvitation: React.FC = () => {
    return (
        <LanguageProvider>
            <WeddingInvitationContent />
        </LanguageProvider>
    );
};

export default WeddingInvitation;