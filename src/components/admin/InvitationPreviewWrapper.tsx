// src/components/admin/InvitationPreviewWrapper.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Guest } from '../../types/Guest';
import PreviewRSVPForm from './PreviewRSVPForm';
import '../../styles/invitation/WeddingInvitation.css';

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

    // Set language based on mock data and reset states when resetKey changes
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
                        {t('invitation.tableNumber')}: {mockData.invitationGetter.tableNumber}
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

                    {hasResponded ? (
                        <div className="mika-invitation-response-status">
                            <div className="mika-response-confirmed">
                                <h4>✓ {t('rsvp.responseReceived')}</h4>
                                <p>
                                    {mockData.invitationGetter.rsvpStatus === 'attending'
                                        ? t('rsvp.seeYouThere')
                                        : t('rsvp.sorryToMissYou')
                                    }
                                </p>
                            </div>
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

                    {mockData.invitationGetter.phoneNumber && (
                        <div className="mika-invitation-contact">
                            <p>{t('invitation.contact')}: {mockData.invitationGetter.phoneNumber}</p>
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