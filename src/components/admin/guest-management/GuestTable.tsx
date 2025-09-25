// src/components/admin/guest-management/GuestTable.tsx
import React, { useMemo } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Guest } from '../../../types';
import '../../../styles/admin/GuestTable.css';

interface GuestTableProps {
    guests: Guest[];
    onEdit: (guest: Guest) => void;
    onDelete: (guest: Guest) => void;
}

const GuestTable: React.FC<GuestTableProps> = ({ guests, onEdit, onDelete }) => {
    const { t } = useLanguage();

    // Helper function to generate invitation URL
    const generateInvitationUrl = (guest: Guest): string => {
        const encodedName = `${guest.firstName}&${guest.lastName}`;
        return `${window.location.origin}/invitation/${encodedName}`;
    };

    // Helper function to copy URL to clipboard
    const handleCopyInvitationUrl = async (guest: Guest) => {
        const url = generateInvitationUrl(guest);
        try {
            await navigator.clipboard.writeText(url);
            alert(t('guestTable.invitationUrlCopied'));
        } catch (error) {
            console.error('Failed to copy URL:', error);
            alert(t('guestTable.invitationUrlCopyFailed'));
        }
    };

    // Helper function to get invitation status badge
    const getInvitationStatusBadge = (status: string) => {
        const statusClasses = {
            'not_sent': 'mika-invitation-status-not-sent',
            'sent': 'mika-invitation-status-sent',
            'opened': 'mika-invitation-status-opened',
            'responded': 'mika-invitation-status-responded',
            'declined': 'mika-invitation-status-declined'
        };

        return (
            <span className={`mika-invitation-status ${statusClasses[status as keyof typeof statusClasses]}`}>
                {t(`invitationStatus.${status}`)}
            </span>
        );
    };

    // Helper function to get RSVP status badge
    const getRsvpStatusBadge = (status: string) => {
        const statusClasses = {
            'pending': 'mika-rsvp-status-pending',
            'attending': 'mika-rsvp-status-attending',
            'not_attending': 'mika-rsvp-status-not-attending'
        };

        return (
            <span className={`mika-rsvp-status ${statusClasses[status as keyof typeof statusClasses]}`}>
                {t(`rsvpStatus.${status}`)}
            </span>
        );
    };

    // Group guests by table number
    const guestsByTable = useMemo(() => {
        const grouped: { [tableNumber: number]: Guest[] } = {};

        guests.forEach(guest => {
            if (!grouped[guest.tableNumber]) {
                grouped[guest.tableNumber] = [];
            }
            grouped[guest.tableNumber].push(guest);
        });

        // Sort guests within each table: invitation getters first, then by name
        Object.keys(grouped).forEach(tableNumber => {
            grouped[Number(tableNumber)].sort((a, b) => {
                // Invitation getters first
                if (a.isInvitationGetter && !b.isInvitationGetter) return -1;
                if (!a.isInvitationGetter && b.isInvitationGetter) return 1;
                // Then by name
                return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
            });
        });

        return grouped;
    }, [guests]);

    // Sort table numbers
    const sortedTableNumbers = Object.keys(guestsByTable)
        .map(Number)
        .sort((a, b) => a - b);

    if (guests.length === 0) {
        return (
            <div className="mika-guest-table-container">
                <div className="mika-guest-table-empty">
                    <div className="mika-guest-table-empty-icon">👥</div>
                    <h3>{t('guestTable.noGuests')}</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="mika-guest-table-container">
            <div className="mika-guest-table-wrapper">
                {sortedTableNumbers.map(tableNumber => {
                    const tableGuests = guestsByTable[tableNumber];
                    return (
                        <div key={tableNumber} className="mika-guest-table-group">
                            <div className="mika-guest-table-group-header">
                                <span>{t('guestTable.table')} {tableNumber}</span>
                                <span className="mika-table-guest-count">
                                    {tableGuests.length} {tableGuests.length === 1 ? t('guestTable.guest') : t('guestTable.guests')}
                                </span>
                            </div>

                            <table className="mika-guest-table">
                                <thead className="mika-guest-table-head">
                                <tr>
                                    <th>{t('guestTable.name')}</th>
                                    <th>{t('guestTable.contact')}</th>
                                    <th>{t('guestTable.location')}</th>
                                    <th>{t('guestTable.invitationInfo')}</th>
                                    <th>{t('guestTable.actions')}</th>
                                </tr>
                                </thead>
                                <tbody className="mika-guest-table-body">
                                {tableGuests.map((guest) => (
                                    <tr key={guest.id} className="mika-guest-table-row">
                                        <td className="mika-guest-name-cell">
                                            <div className="mika-guest-name-content">
                                                <span className="mika-guest-name">
                                                    {guest.firstName} {guest.lastName}
                                                </span>
                                                {guest.isChild && (
                                                    <span className="mika-guest-child-badge">
                                                        {t('guestTable.child')}
                                                    </span>
                                                )}
                                                {guest.isInvitationGetter && (
                                                    <span className="mika-guest-invitation-getter-badge">
                                                        {t('guestTable.invitationGetter')}
                                                    </span>
                                                )}
                                                {guest.linkedInvitationGetterId && (
                                                    <span className="mika-guest-linked-badge">
                                                        {t('guestTable.linkedGuest')}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="mika-guest-contact-info">
                                            {guest.phoneNumber && (
                                                <div className="mika-guest-contact-item">
                                                    <span className="mika-guest-contact-label">{t('guestTable.phone')}</span>
                                                    <span className="mika-guest-contact-value">{guest.phoneNumber}</span>
                                                </div>
                                            )}
                                            {guest.email && (
                                                <div className="mika-guest-contact-item">
                                                    <span className="mika-guest-contact-label">{t('guestTable.email')}</span>
                                                    <span className="mika-guest-contact-value">{guest.email}</span>
                                                </div>
                                            )}
                                            {!guest.phoneNumber && !guest.email && (
                                                <span className="mika-guest-contact-value">-</span>
                                            )}
                                        </td>
                                        <td className="mika-guest-location">
                                            {guest.location || '-'}
                                        </td>
                                        <td className="mika-guest-invitation-info">
                                            {guest.isInvitationGetter ? (
                                                <div className="mika-invitation-getter-info">
                                                    <div className="mika-invitation-language">
                                                        {guest.invitationLanguage === 'et' ? '🇪🇪 Eesti' : '🇺🇦 Українська'}
                                                    </div>
                                                    <div className="mika-invitation-status-info">
                                                        {getInvitationStatusBadge(guest.invitationStatus)}
                                                    </div>
                                                    {guest.invitationOpenCount > 0 && (
                                                        <div className="mika-invitation-opens">
                                                            {guest.invitationOpenCount} {guest.invitationOpenCount === 1 ? t('guestTable.openedTime') : t('guestTable.openedTimes')}
                                                        </div>
                                                    )}
                                                    <div className="mika-rsvp-status-info">
                                                        {getRsvpStatusBadge(guest.rsvpStatus)}
                                                    </div>
                                                    {guest.rsvpStatus === 'attending' && (
                                                        <div className="mika-rsvp-details">
                                                            {guest.rsvpResponses.requiresAccommodation && (
                                                                <span className="mika-rsvp-need">🏨 {t('guestTable.needsAccommodation')}</span>
                                                            )}
                                                            {guest.rsvpResponses.needsTransport && (
                                                                <span className="mika-rsvp-need">🚗 {t('guestTable.needsTransport')}</span>
                                                            )}
                                                            {guest.rsvpResponses.hasDietaryRestrictions && (
                                                                <span className="mika-rsvp-need">🍽️ {t('guestTable.hasDietaryRestrictions')}</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="mika-linked-guest-info">
                                                    <span className="mika-linked-to-text">
                                                        {t('guestTable.linkedTo')}
                                                        <span className="mika-linked-getter-name">
                                                            {(() => {
                                                                const linkedGetter = guests.find(g => g.id === guest.linkedInvitationGetterId);
                                                                return linkedGetter ? ` ${linkedGetter.firstName} ${linkedGetter.lastName}` : t('guestTable.unknownGetter');
                                                            })()}
                                                        </span>
                                                    </span>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <div className="mika-guest-actions">
                                                {guest.isInvitationGetter && (
                                                    <button
                                                        className="mika-guest-action-button mika-guest-action-invitation"
                                                        onClick={() => handleCopyInvitationUrl(guest)}
                                                        title={t('guestTable.generateInvitation')}
                                                    >
                                                        🔗
                                                    </button>
                                                )}
                                                <button
                                                    className="mika-guest-action-button mika-guest-action-edit"
                                                    onClick={() => onEdit(guest)}
                                                    title={t('guestTable.edit')}
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    className="mika-guest-action-button mika-guest-action-delete"
                                                    onClick={() => onDelete(guest)}
                                                    title={t('guestTable.delete')}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GuestTable;