// src/components/admin/accommodation/Accommodation.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import { GuestService } from '../../../services/guestService';
import { Guest } from '../../../types';
import Header from '../../common/Header';
import '../../../styles/admin/Accommodation.css';

const Accommodation: React.FC = () => {
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

            // Get all invitation getters who:
            // 1. Have responded to RSVP
            // 2. Need accommodation
            // 3. Have at least one person attending
            const gettersNeedingAccommodation = allGuests.filter(guest =>
                guest.isInvitationGetter &&
                guest.rsvpStatus !== 'pending' &&
                guest.rsvpResponses?.requiresAccommodation === true &&
                guest.rsvpResponses?.attendingGuestIds?.length > 0
            );

            // Build a list of guests who actually need accommodation
            const guestsNeedingAccommodation: Guest[] = [];

            gettersNeedingAccommodation.forEach(getter => {
                const attendingIds = getter.rsvpResponses?.attendingGuestIds || [];

                // Check if the invitation getter themselves is attending
                if (attendingIds.includes(getter.id)) {
                    guestsNeedingAccommodation.push(getter);
                }

                // Find all linked guests who are attending
                const linkedGuests = allGuests.filter(guest =>
                    guest.linkedInvitationGetterId === getter.id &&
                    attendingIds.includes(guest.id)
                );

                guestsNeedingAccommodation.push(...linkedGuests);
            });

            setGuests(guestsNeedingAccommodation);
        } catch (error) {
            console.error('Error fetching guests:', error);
        } finally {
            setLoading(false);
        }
    };

    // Check permission
    if (!currentUserProfile?.permissions.accommodationManagement) {
        return (
            <div className="mika-accommodation-container">
                <Header />
                <div className="mika-access-denied">
                    <h2>{t('accommodation.accessDenied')}</h2>
                    <p>{t('accommodation.noPermission')}</p>
                </div>
            </div>
        );
    }

    // Group guests by invitation getter
    interface GuestGroup {
        invitationGetter: Guest | null;
        linkedGuests: Guest[];
    }

    const groupedGuests: { [key: string]: GuestGroup } = {};

    guests.forEach(guest => {
        if (guest.isInvitationGetter) {
            groupedGuests[guest.id] = {
                invitationGetter: guest,
                linkedGuests: []
            };
        }
    });

    guests.forEach(guest => {
        if (!guest.isInvitationGetter && guest.linkedInvitationGetterId) {
            const getterId = guest.linkedInvitationGetterId;
            if (groupedGuests[getterId]) {
                groupedGuests[getterId].linkedGuests.push(guest);
            }
        }
    });

    if (loading) {
        return (
            <div className="mika-accommodation-container">
                <Header />
                <div className="mika-loading">
                    <div className="mika-spinner"></div>
                    <p>{t('accommodation.loading')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mika-accommodation-container">
            <Header />
            <div className="mika-accommodation-content">
                <div className="mika-accommodation-header">
                    <h1>{t('accommodation.title')}</h1>
                    <p className="mika-accommodation-subtitle">
                        {t('accommodation.subtitle')} {guests.length}
                    </p>
                </div>

                {guests.length === 0 ? (
                    <div className="mika-accommodation-empty">
                        <span className="mika-empty-icon">🏨</span>
                        <h3>{t('accommodation.noGuests')}</h3>
                        <p>{t('accommodation.noGuestsDescription')}</p>
                    </div>
                ) : (
                    <div className="mika-accommodation-table-wrapper">
                        <table className="mika-accommodation-table">
                            <thead>
                            <tr>
                                <th>{t('accommodation.name')}</th>
                                <th>{t('accommodation.phone')}</th>
                                <th>{t('accommodation.type')}</th>
                                <th>{t('accommodation.tableNumber')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.values(groupedGuests).map((group, index) => (
                                <React.Fragment key={group.invitationGetter?.id || `group-${index}`}>
                                    {/* Invitation Getter - only if they're attending */}
                                    {group.invitationGetter && (
                                        <tr className="mika-accommodation-getter-row">
                                            <td className="mika-accommodation-name">
                                                <strong>
                                                    {group.invitationGetter.firstName} {group.invitationGetter.lastName}
                                                </strong>
                                                <span className="mika-accommodation-badge">
                                                    {t('accommodation.invitationGetter')}
                                                </span>
                                            </td>
                                            <td>{group.invitationGetter.phoneNumber || '-'}</td>
                                            <td>
                                                <span className="mika-accommodation-type">
                                                    {t('accommodation.mainGuest')}
                                                </span>
                                            </td>
                                            <td>{group.invitationGetter.tableNumber}</td>
                                        </tr>
                                    )}

                                    {/* Linked Guests - only those who are attending */}
                                    {group.linkedGuests.map(linkedGuest => (
                                        <tr key={linkedGuest.id} className="mika-accommodation-linked-row">
                                            <td className="mika-accommodation-name mika-accommodation-linked">
                                                {linkedGuest.firstName} {linkedGuest.lastName}
                                            </td>
                                            <td>{linkedGuest.phoneNumber || '-'}</td>
                                            <td>
                                                <span className="mika-accommodation-type-linked">
                                                    {t('accommodation.linkedGuest')}
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

export default Accommodation;