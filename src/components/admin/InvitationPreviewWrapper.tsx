// src/components/admin/InvitationPreviewWrapper.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Guest } from '../../types';
import PreviewRSVPForm from './PreviewRSVPForm';
import '../../styles/admin/InvitationPreview.css';

interface InvitationPreviewWrapperProps {
    mockData: {
        invitationGetter: Guest;
        linkedGuests: Guest[];
    };
    resetKey: number;
}

const InvitationPreviewWrapper: React.FC<InvitationPreviewWrapperProps> = ({
                                                                               mockData,
                                                                               resetKey
                                                                           }) => {
    const { t, setLanguage } = useLanguage();
    const [showRSVP, setShowRSVP] = useState(false);
    const [hasResponded, setHasResponded] = useState(false);

    useEffect(() => {
        setLanguage(mockData.invitationGetter.invitationLanguage);
        setShowRSVP(false);
        setHasResponded(false);
    }, [mockData.invitationGetter.invitationLanguage, setLanguage, resetKey]);

    const handleRSVPSubmitted = () => {
        setHasResponded(true);
        setShowRSVP(false);
        console.log('Preview mode: RSVP submitted (not saved to database)');
    };

    const allInvitedGuests = [mockData.invitationGetter, ...mockData.linkedGuests];

    return (
        <div className="mika-preview-full-container">
            {/* Wedding Invitation Card with Frame */}
            <div className="mika-preview-invitation-section">
                <div className="mika-ornamental-frame-container">
                    {/* Frame image */}
                    <img
                        src="/images/kutse_021.png"
                        alt=""
                        className="mika-ornamental-frame"
                    />

                    {/* Text content BELOW the image */}
                    <div className="mika-ornamental-content">
                        {/* Guest Names - Elegant presentation */}
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

                        {/* Main invitation text */}
                        <div className="mika-ornamental-invitation-text">
                            <p className="mika-ornamental-subtitle">
                                {t('invitation.subtitle')}
                            </p>

                            {/* Venue Information */}
                            <div className="mika-ornamental-venue">
                                <h4 className="mika-ornamental-venue-title">Põhjala Resort</h4>
                                <p className="mika-ornamental-address">
                                    {t('invitation.address')}
                                </p>
                            </div>

                            {/* Personal Message */}
                            <p className="mika-ornamental-message">
                                {t('invitation.message')}
                            </p>
                        </div>

                        {/* Signature */}
                        <div className="mika-ornamental-signature">
                            Mike & Kateryna
                        </div>
                    </div>
                </div>
            </div>

            {/* RSVP Section - Completely Separate Below */}
            <div className="mika-preview-rsvp-section">
                <div className="mika-preview-rsvp-card">
                    <h3>{t('invitation.rsvp.title')}</h3>
                    <p>{t('invitation.rsvp.deadline')}</p>

                    {hasResponded ? (
                        <div className="mika-response-confirmed">
                            <h4>✓ {t('rsvp.responseReceived')}</h4>
                            <p>
                                {mockData.invitationGetter.rsvpStatus === 'attending'
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
                                <PreviewRSVPForm
                                    invitationGetter={mockData.invitationGetter}
                                    linkedGuests={mockData.linkedGuests}
                                    onSubmitted={handleRSVPSubmitted}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// Mock data factory
export const createMockData = (
    scenario: 'single' | 'couple' | 'family' | 'group',
    language: 'et' | 'ua' = 'et'
) => {
    const baseDate = new Date();

    const scenarios = {
        single: {
            invitationGetter: {
                id: 'mock-single',
                firstName: 'Anna',
                lastName: 'Kask',
                phoneNumber: '+372 5123 4567',
                email: 'anna.kask@email.com',
                location: 'Harjumaa, Eesti',
                tableNumber: 5,
                isChild: false,
                isInvitationGetter: true,
                invitationLanguage: language,
                invitationStatus: 'not_sent' as const,
                invitationOpenCount: 0,
                rsvpStatus: 'pending' as const,
                rsvpResponses: {
                    attendingGuestIds: [],
                    requiresAccommodation: false,
                    needsTransport: false,
                    hasDietaryRestrictions: false
                },
                createdAt: baseDate,
                updatedAt: baseDate
            },
            linkedGuests: []
        },

        couple: {
            invitationGetter: {
                id: 'mock-couple-1',
                firstName: 'Jaan',
                lastName: 'Tamm',
                phoneNumber: '+372 5234 5678',
                email: 'jaan.tamm@email.com',
                location: 'Tallinn, Eesti',
                tableNumber: 3,
                isChild: false,
                isInvitationGetter: true,
                invitationLanguage: language,
                invitationStatus: 'not_sent' as const,
                invitationOpenCount: 0,
                rsvpStatus: 'pending' as const,
                rsvpResponses: {
                    attendingGuestIds: [],
                    requiresAccommodation: false,
                    needsTransport: false,
                    hasDietaryRestrictions: false
                },
                createdAt: baseDate,
                updatedAt: baseDate
            },
            linkedGuests: [{
                id: 'mock-couple-2',
                firstName: 'Mari',
                lastName: 'Tamm',
                location: 'Tallinn, Eesti',
                tableNumber: 3,
                isChild: false,
                isInvitationGetter: false,
                invitationLanguage: language,
                linkedInvitationGetterId: 'mock-couple-1',
                invitationStatus: 'not_sent' as const,
                invitationOpenCount: 0,
                rsvpStatus: 'pending' as const,
                rsvpResponses: {
                    attendingGuestIds: [],
                    requiresAccommodation: false,
                    needsTransport: false,
                    hasDietaryRestrictions: false
                },
                createdAt: baseDate,
                updatedAt: baseDate
            }]
        },

        family: {
            invitationGetter: {
                id: 'mock-family-1',
                firstName: language === 'ua' ? 'Oleksandr' : 'Peeter',
                lastName: language === 'ua' ? 'Petrenko' : 'Saar',
                phoneNumber: language === 'ua' ? '+380 67 123 4567' : '+372 5456 7890',
                email: language === 'ua' ? 'oleksandr.petrenko@email.com' : 'peeter.saar@email.com',
                location: language === 'ua' ? 'Київська область, Україна' : 'Tartu, Eesti',
                tableNumber: 7,
                isChild: false,
                isInvitationGetter: true,
                invitationLanguage: language,
                invitationStatus: 'not_sent' as const,
                invitationOpenCount: 0,
                rsvpStatus: 'pending' as const,
                rsvpResponses: {
                    attendingGuestIds: [],
                    requiresAccommodation: false,
                    needsTransport: false,
                    hasDietaryRestrictions: false
                },
                createdAt: baseDate,
                updatedAt: baseDate
            },
            linkedGuests: [
                {
                    id: 'mock-family-2',
                    firstName: language === 'ua' ? 'Oksana' : 'Liis',
                    lastName: language === 'ua' ? 'Petrenko' : 'Saar',
                    location: language === 'ua' ? 'Київська область, Україна' : 'Tartu, Eesti',
                    tableNumber: 7,
                    isChild: false,
                    isInvitationGetter: false,
                    invitationLanguage: language,
                    linkedInvitationGetterId: 'mock-family-1',
                    invitationStatus: 'not_sent' as const,
                    invitationOpenCount: 0,
                    rsvpStatus: 'pending' as const,
                    rsvpResponses: {
                        attendingGuestIds: [],
                        requiresAccommodation: false,
                        needsTransport: false,
                        hasDietaryRestrictions: false
                    },
                    createdAt: baseDate,
                    updatedAt: baseDate
                },
                {
                    id: 'mock-family-3',
                    firstName: language === 'ua' ? 'Artem' : 'Markus',
                    lastName: language === 'ua' ? 'Petrenko' : 'Saar',
                    location: language === 'ua' ? 'Київська область, Україна' : 'Tartu, Eesti',
                    tableNumber: 7,
                    isChild: true,
                    isInvitationGetter: false,
                    invitationLanguage: language,
                    linkedInvitationGetterId: 'mock-family-1',
                    invitationStatus: 'not_sent' as const,
                    invitationOpenCount: 0,
                    rsvpStatus: 'pending' as const,
                    rsvpResponses: {
                        attendingGuestIds: [],
                        requiresAccommodation: false,
                        needsTransport: false,
                        hasDietaryRestrictions: false
                    },
                    createdAt: baseDate,
                    updatedAt: baseDate
                }
            ]
        },

        group: {
            invitationGetter: {
                id: 'mock-group-1',
                firstName: 'Meelis',
                lastName: 'Kivi',
                phoneNumber: '+372 5567 8901',
                email: 'meelis.kivi@email.com',
                location: 'Pärnu, Eesti',
                tableNumber: 12,
                isChild: false,
                isInvitationGetter: true,
                invitationLanguage: language,
                invitationStatus: 'not_sent' as const,
                invitationOpenCount: 0,
                rsvpStatus: 'pending' as const,
                rsvpResponses: {
                    attendingGuestIds: [],
                    requiresAccommodation: false,
                    needsTransport: false,
                    hasDietaryRestrictions: false
                },
                createdAt: baseDate,
                updatedAt: baseDate
            },
            linkedGuests: [
                {
                    id: 'mock-group-2',
                    firstName: 'Kadri',
                    lastName: 'Kivi',
                    tableNumber: 12,
                    isChild: false,
                    isInvitationGetter: false,
                    invitationLanguage: language,
                    linkedInvitationGetterId: 'mock-group-1',
                    invitationStatus: 'not_sent' as const,
                    invitationOpenCount: 0,
                    rsvpStatus: 'pending' as const,
                    rsvpResponses: {
                        attendingGuestIds: [],
                        requiresAccommodation: false,
                        needsTransport: false,
                        hasDietaryRestrictions: false
                    },
                    createdAt: baseDate,
                    updatedAt: baseDate
                },
                {
                    id: 'mock-group-3',
                    firstName: 'Toomas',
                    lastName: 'Mets',
                    tableNumber: 12,
                    isChild: false,
                    isInvitationGetter: false,
                    invitationLanguage: language,
                    linkedInvitationGetterId: 'mock-group-1',
                    invitationStatus: 'not_sent' as const,
                    invitationOpenCount: 0,
                    rsvpStatus: 'pending' as const,
                    rsvpResponses: {
                        attendingGuestIds: [],
                        requiresAccommodation: false,
                        needsTransport: false,
                        hasDietaryRestrictions: false
                    },
                    createdAt: baseDate,
                    updatedAt: baseDate
                },
                {
                    id: 'mock-group-4',
                    firstName: 'Kristjan',
                    lastName: 'Tamm',
                    tableNumber: 12,
                    isChild: false,
                    isInvitationGetter: false,
                    invitationLanguage: language,
                    linkedInvitationGetterId: 'mock-group-1',
                    invitationStatus: 'not_sent' as const,
                    invitationOpenCount: 0,
                    rsvpStatus: 'pending' as const,
                    rsvpResponses: {
                        attendingGuestIds: [],
                        requiresAccommodation: false,
                        needsTransport: false,
                        hasDietaryRestrictions: false
                    },
                    createdAt: baseDate,
                    updatedAt: baseDate
                }
            ]
        }
    };

    return scenarios[scenario];
};

export default InvitationPreviewWrapper;