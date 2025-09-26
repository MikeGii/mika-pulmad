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
    const [hasResponded, setHasResponded] = useState(false);
    const { t, setLanguage } = useLanguage();

    const loadInvitationData = useCallback(async () => {
        try {
            if (!guestName) return;

            // Parse guest name from URL (firstname&lastname)
            const [firstName, lastName] = guestName.split('&');
            if (!firstName || !lastName) {
                setError('Invalid invitation URL');
                return;
            }

            // Find the invitation getter by name
            const getter = await InvitationService.findInvitationGetterByName(firstName, lastName);

            if (!getter) {
                setError('Invitation not found');
                return;
            }

            setInvitationGetter(getter);

            // Set the language based on the invitation getter's preference
            setLanguage(getter.invitationLanguage);

            // Check if already responded
            setHasResponded(getter.rsvpStatus !== 'pending');

            // Find all linked guests
            const linked = await InvitationService.getLinkedGuestsForInvitation(getter.id);
            setLinkedGuests(linked);

            // Track invitation open
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
        setHasResponded(true);
        setShowRSVP(false);
        // Reload data to show updated status
        if (invitationGetter) {
            loadInvitationData();
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
            <div className="mika-invitation-full-container">
                {/* Wedding Invitation Card with Ornamental Frame */}
                <div className="mika-invitation-section">
                    <div className="mika-ornamental-frame-container">
                        {/* Bottom layer: Frame image */}
                        <img
                            src="/images/kutse_01.png"
                            alt=""
                            className="mika-ornamental-frame"
                        />

                        {/* Middle layer: Meie.jpg oval background */}
                        <div className="mika-ornamental-oval-bg">
                            <img
                                src="/images/meie.jpg"
                                alt=""
                                className="mika-oval-background-image"
                            />
                        </div>

                        {/* Top layer: Text content */}
                        <div className="mika-ornamental-content">
                            <h1 className="mika-ornamental-title">
                                {invitationGetter.invitationLanguage === 'et' ?
                                    'Pulmakutse' : 'Весільне запрошення'}
                            </h1>

                            <p className="mika-ornamental-date">
                                22.05.2026
                            </p>

                            <div className="mika-ornamental-location">
                                <p className="mika-ornamental-location-venue">Põhjala Resort</p>
                                <p>Kata küla, Kose vald, Harjumaa</p>
                                <p>Eesti</p>
                            </div>

                            <div className="mika-ornamental-guest-names">
                                {allInvitedGuests.map((guest) => (
                                    <div key={guest.id} className="mika-ornamental-guest-name">
                                        {guest.firstName} {guest.lastName}
                                    </div>
                                ))}
                            </div>

                            <p className="mika-ornamental-signature">
                                Mike & Kateryna
                            </p>
                        </div>
                    </div>
                </div>

                {/* RSVP Section - Completely Separate Below */}
                <div className="mika-rsvp-section">
                    <div className="mika-rsvp-card">
                        <h3>{t('invitation.rsvp.title')}</h3>
                        <p>{t('invitation.rsvp.deadline')}</p>

                        {hasResponded ? (
                            <div className="mika-response-confirmed">
                                <h4>✓ {t('rsvp.responseReceived')}</h4>
                                <p>
                                    {invitationGetter.rsvpStatus === 'attending'
                                        ? t('rsvp.seeYouThere')
                                        : t('rsvp.sorryToMissYou')
                                    }
                                </p>
                            </div>
                        ) : (
                            <>
                                {!showRSVP ? (
                                    <button
                                        className="mika-rsvp-button"
                                        onClick={() => setShowRSVP(true)}
                                    >
                                        {t('rsvp.respondNow')}
                                    </button>
                                ) : (
                                    <RSVPForm
                                        invitationGetter={invitationGetter}
                                        linkedGuests={linkedGuests}
                                        onSubmitted={handleRSVPSubmitted}
                                    />
                                )}
                            </>
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

// Wrapper component with LanguageProvider
const WeddingInvitation: React.FC = () => {
    return (
        <LanguageProvider>
            <WeddingInvitationContent />
        </LanguageProvider>
    );
};

export default WeddingInvitation;