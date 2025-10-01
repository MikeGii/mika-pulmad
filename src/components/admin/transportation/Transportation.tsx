// src/components/admin/transportation/Transportation.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import { GuestService } from '../../../services/guestService';
import { Guest } from '../../../types';
import Header from '../../common/Header';
import '../../../styles/admin/Transportation.css';

const Transportation: React.FC = () => {
    const { t } = useLanguage();
    const { currentUserProfile } = useAuth();
    const [guests, setGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGuests();
    }, []);

    const fetchGuests = async () => {
        try {
            const allGuests = await GuestService.getAllGuests();
            // Filter only guests who need transportation
            const guestsNeedingTransport = allGuests.filter(
                guest => guest.rsvpResponses?.needsTransport === true
            );
            setGuests(guestsNeedingTransport);
        } catch (error) {
            console.error('Error fetching guests:', error);
        } finally {
            setLoading(false);
        }
    };

    // Check permission
    if (!currentUserProfile?.permissions.transportationManagement) {
        return (
            <div className="mika-transportation-container">
                <Header />
                <div className="mika-access-denied">
                    <h2>{t('transportation.accessDenied')}</h2>
                    <p>{t('transportation.noPermission')}</p>
                </div>
            </div>
        );
    }

    const formatTransportDetails = (details?: string): string => {
        if (!details) return '-';

        if (details.startsWith('Estonia:')) {
            const location = details.replace('Estonia:', '').trim();
            return `🇪🇪 ${location || t('transportation.noLocation')}`;
        } else if (details.startsWith('Ukraine:')) {
            const location = details.replace('Ukraine:', '').trim();
            return `🇺🇦 ${location || t('transportation.noLocation')}`;
        }
        return details;
    };

    // Group guests by invitation getter
    const groupedGuests: Record<string, { invitationGetter: Guest | null; linkedGuests: Guest[] }> = {};

    // First, add all invitation getters who need transport
    guests.forEach(guest => {
        if (guest.isInvitationGetter) {
            groupedGuests[guest.id] = {
                invitationGetter: guest,
                linkedGuests: []
            };
        }
    });

    // Then, handle linked guests who need transport
    guests.forEach(guest => {
        if (!guest.isInvitationGetter && guest.linkedInvitationGetterId) {
            // Check if the invitation getter exists in our grouped list
            if (groupedGuests[guest.linkedInvitationGetterId]) {
                // Invitation getter also needs transport, add to their list
                groupedGuests[guest.linkedInvitationGetterId].linkedGuests.push(guest);
            } else {
                // Invitation getter doesn't need transport, but linked guest does
                // We need to fetch the invitation getter info or create a placeholder group
                if (!groupedGuests[guest.linkedInvitationGetterId]) {
                    groupedGuests[guest.linkedInvitationGetterId] = {
                        invitationGetter: null, // We'll need to fetch this
                        linkedGuests: [guest]
                    };
                } else {
                    groupedGuests[guest.linkedInvitationGetterId].linkedGuests.push(guest);
                }
            }
        }
    });

    // Handle orphaned linked guests (whose invitation getter might not need transport)
    const orphanedGuests = guests.filter(guest =>
        !guest.isInvitationGetter &&
        guest.linkedInvitationGetterId &&
        !groupedGuests[guest.linkedInvitationGetterId]
    );

    if (orphanedGuests.length > 0) {
        groupedGuests['orphaned'] = {
            invitationGetter: null,
            linkedGuests: orphanedGuests
        };
    }
    if (loading) {
        return (
            <div className="mika-transportation-container">
                <Header />
                <div className="mika-loading">
                    <div className="mika-spinner"></div>
                    <p>{t('transportation.loading')}</p>
                </div>
            </div>
        );
    }

    // Create subtitle with count
    const getSubtitleText = (): string => {
        const language = localStorage.getItem('language') || 'et';
        if (language === 'et') {
            return `Külalised, kes vajavad transporti: ${guests.length}`;
        } else {
            return `Гості, які потребують транспорту: ${guests.length}`;
        }
    };

    return (
        <div className="mika-transportation-container">
            <Header />

            <div className="mika-transportation-content">
                <div className="mika-transportation-header">
                    <h1>{t('transportation.title')}</h1>
                    <p className="mika-transportation-subtitle">
                        {getSubtitleText()}
                    </p>
                </div>

                {guests.length === 0 ? (
                    <div className="mika-transportation-empty">
                        <span className="mika-empty-icon">🚗</span>
                        <h3>{t('transportation.noGuests')}</h3>
                        <p>{t('transportation.noGuestsDescription')}</p>
                    </div>
                ) : (
                    <div className="mika-transportation-table-wrapper">
                        <table className="mika-transportation-table">
                            <thead>
                            <tr>
                                <th>{t('transportation.name')}</th>
                                <th>{t('transportation.phone')}</th>
                                <th>{t('transportation.transportFrom')}</th>
                                <th>{t('transportation.type')}</th>
                                <th>{t('transportation.tableNumber')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.values(groupedGuests).map((group, index) => (
                                <React.Fragment key={group.invitationGetter?.id || `group-${index}`}>
                                    {/* Invitation Getter - only show if they exist and need transport */}
                                    {group.invitationGetter && (
                                        <tr className="mika-transport-getter-row">
                                            <td className="mika-transport-name">
                                                <strong>
                                                    {group.invitationGetter.firstName} {group.invitationGetter.lastName}
                                                </strong>
                                                <span className="mika-transport-badge">
                                                    {t('transportation.invitationGetter')}
                                                </span>
                                            </td>
                                            <td>{group.invitationGetter.phoneNumber || '-'}</td>
                                            <td>{formatTransportDetails(group.invitationGetter.rsvpResponses?.transportDetails)}</td>
                                            <td>
                                                <span className="mika-transport-type">
                                                    {t('transportation.mainGuest')}
                                                </span>
                                            </td>
                                            <td>{group.invitationGetter.tableNumber}</td>
                                        </tr>
                                    )}

                                    {/* Linked Guests */}
                                    {group.linkedGuests.map(linkedGuest => (
                                        <tr key={linkedGuest.id} className="mika-transport-linked-row">
                                            <td className="mika-transport-name mika-transport-linked">
                                                {linkedGuest.firstName} {linkedGuest.lastName}
                                            </td>
                                            <td>{linkedGuest.phoneNumber || '-'}</td>
                                            <td>{formatTransportDetails(linkedGuest.rsvpResponses?.transportDetails)}</td>
                                            <td>
                                                <span className="mika-transport-type-linked">
                                                    {t('transportation.linkedGuest')}
                                                </span>
                                            </td>
                                            <td>{linkedGuest.tableNumber}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transportation;