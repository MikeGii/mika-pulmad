// src/components/admin/guest-management/GuestTable.tsx
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Guest } from '../../../types/Guest';
import { InvitationService } from '../../../services/invitationService';
import '../../../styles/admin/GuestTable.css';

interface GuestTableProps {
    guests: Guest[];
    onEdit: (guest: Guest) => void;
    onDelete: (guest: Guest) => void; // Keep it as Guest, not guestId string
}

const GuestTable: React.FC<GuestTableProps> = ({ guests, onEdit, onDelete }) => {
    const { t } = useLanguage();
    const [expandedTables, setExpandedTables] = useState<Set<number>>(new Set());
    const [expandedRsvpRows, setExpandedRsvpRows] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');

    // Toggle RSVP details expansion
    const toggleRsvpDetails = (guestId: string) => {
        setExpandedRsvpRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(guestId)) {
                newSet.delete(guestId);
            } else {
                newSet.add(guestId);
            }
            return newSet;
        });
    };

    // Check if guest has RSVP details to show - Fix boolean type issues
    const hasRsvpDetails = (guest: Guest): boolean => {
        if (guest.rsvpStatus !== 'attending') return false;

        const { rsvpResponses } = guest;
        return Boolean(rsvpResponses?.requiresAccommodation) ||
            Boolean(rsvpResponses?.needsTransport) ||
            Boolean(rsvpResponses?.transportDetails) ||
            Boolean(rsvpResponses?.hasDietaryRestrictions) ||
            Boolean(rsvpResponses?.dietaryNote && rsvpResponses.dietaryNote.trim().length > 0);
    };

    const handleCopyInvitationUrl = async (guest: Guest) => {
        try {
            const url = InvitationService.getFullInvitationUrl(guest);
            await navigator.clipboard.writeText(url);
            alert(t('guestTable.invitationCopied'));
        } catch (error) {
            console.error('Error copying invitation URL:', error);
            alert(t('guestTable.invitationCopyError'));
        }
    };

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

    // Toggle table expansion
    const toggleTable = (tableNumber: number) => {
        setExpandedTables(prev => {
            const newSet = new Set(prev);
            if (newSet.has(tableNumber)) {
                newSet.delete(tableNumber);
            } else {
                newSet.add(tableNumber);
            }
            return newSet;
        });
    };

    // Expand all tables when searching
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        if (value.trim()) {
            const allTableNumbers = new Set(guests.map(guest => guest.tableNumber));
            setExpandedTables(allTableNumbers);
        }
    };

    // Filter guests based on search term
    const filteredGuests = useMemo(() => {
        if (!searchTerm.trim()) return guests;

        const searchLower = searchTerm.toLowerCase().trim();
        return guests.filter(guest => {
            const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase();
            const email = (guest.email || '').toLowerCase();
            const phone = (guest.phoneNumber || '').toLowerCase();
            const location = (guest.location || '').toLowerCase();

            return fullName.includes(searchLower) ||
                email.includes(searchLower) ||
                phone.includes(searchLower) ||
                location.includes(searchLower);
        });
    }, [guests, searchTerm]);

    // Group filtered guests by table number with sorting logic
    const guestsByTable = useMemo(() => {
        const grouped: { [tableNumber: number]: Guest[] } = {};

        filteredGuests.forEach(guest => {
            if (!grouped[guest.tableNumber]) {
                grouped[guest.tableNumber] = [];
            }
            grouped[guest.tableNumber].push(guest);
        });

        // Sort guests within each table
        Object.keys(grouped).forEach(tableNumber => {
            const tableGuests = grouped[Number(tableNumber)];
            const invitationGetters = tableGuests.filter(guest => guest.isInvitationGetter);
            const linkedGuests = tableGuests.filter(guest => !guest.isInvitationGetter);

            invitationGetters.sort((a, b) => {
                return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
            });

            const sortedGuests: Guest[] = [];

            invitationGetters.forEach(getter => {
                sortedGuests.push(getter);
                const getterLinkedGuests = linkedGuests
                    .filter(guest => guest.linkedInvitationGetterId === getter.id)
                    .sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
                sortedGuests.push(...getterLinkedGuests);
            });

            const orphanedLinkedGuests = linkedGuests
                .filter(guest => {
                    const linkedGetter = invitationGetters.find(getter => getter.id === guest.linkedInvitationGetterId);
                    return !linkedGetter;
                })
                .sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));

            sortedGuests.push(...orphanedLinkedGuests);
            grouped[Number(tableNumber)] = sortedGuests;
        });

        return grouped;
    }, [filteredGuests]);

    const sortedTableNumbers = Object.keys(guestsByTable)
        .map(Number)
        .sort((a, b) => a - b);

    const handleClearSearch = () => {
        setSearchTerm('');
        setExpandedTables(new Set());
    };

    const formatTransportDetails = (transportDetails: string): string => {
        // Parse the transport details string
        // Format: "Estonia: Location" or "Ukraine: Location"
        if (transportDetails.startsWith('Estonia:')) {
            const location = transportDetails.replace('Estonia:', '').trim();
            return `${t('guestTable.rsvpDetails.transportEstonia')}: ${location || '-'}`;
        } else if (transportDetails.startsWith('Ukraine:')) {
            const location = transportDetails.replace('Ukraine:', '').trim();
            return `${t('guestTable.rsvpDetails.transportUkraine')}: ${location || '-'}`;
        }
        return transportDetails;
    };

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
            {/* Search Bar */}
            <div className="mika-guest-search-section">
                <div className="mika-guest-search-container">
                    <div className="mika-guest-search-input-wrapper">
                        <input
                            type="text"
                            className="mika-guest-search-input"
                            placeholder={t('guestTable.searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                className="mika-guest-search-clear"
                                onClick={handleClearSearch}
                                title={t('guestTable.searchClear')}
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                {searchTerm && (
                    <div className="mika-guest-search-summary">
                        {filteredGuests.length === 0 ? (
                            <span className="mika-guest-search-no-results">
                                {t('guestTable.noSearchResults')}
                            </span>
                        ) : (
                            <span className="mika-guest-search-results-count">
                                {filteredGuests.length} {filteredGuests.length === 1
                                ? t('guestTable.searchResults')
                                : t('guestTable.searchResultsPlural')}
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className="mika-guest-table-wrapper">
                {sortedTableNumbers.length === 0 && searchTerm ? (
                    <div className="mika-guest-table-empty">
                        <div className="mika-guest-table-empty-icon">🔍</div>
                        <h3>{t('guestTable.noSearchResults')}</h3>
                    </div>
                ) : (
                    sortedTableNumbers.map(tableNumber => {
                        const tableGuests = guestsByTable[tableNumber];
                        const isExpanded = expandedTables.has(tableNumber);

                        return (
                            <div key={tableNumber} className="mika-guest-table-group">
                                <div
                                    className={`mika-guest-table-group-header ${isExpanded ? 'mika-expanded' : 'mika-collapsed'}`}
                                    onClick={() => toggleTable(tableNumber)}
                                    title={isExpanded ? t('guestTable.clickToCollapse') : t('guestTable.clickToExpand')}
                                >
                                    <div className="mika-table-header-content">
                                        <span className="mika-table-expand-icon">
                                            {isExpanded ? '▼' : '▶'}
                                        </span>
                                        <span className="mika-table-title">
                                            {t('guestTable.table')} {tableNumber}
                                        </span>
                                    </div>
                                    <span className="mika-table-guest-count">
                                        {tableGuests.length} {tableGuests.length === 1 ? t('guestTable.guest') : t('guestTable.guests')}
                                    </span>
                                </div>

                                {isExpanded && (
                                    <div className="mika-guest-table-content">
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
                                                <React.Fragment key={guest.id}>
                                                    {/* Main guest row */}
                                                    <tr className="mika-guest-table-row">
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
                                                                {!guest.isInvitationGetter && guest.linkedInvitationGetterId && (
                                                                    <span className="mika-guest-linked-badge">
                                                                        {t('guestTable.linkedGuest')}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>

                                                        <td className="mika-guest-contact-cell">
                                                            <div className="mika-guest-contact-info">
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
                                                            </div>
                                                        </td>

                                                        <td className="mika-guest-location-cell">
                                                            <div className="mika-guest-location">
                                                                {guest.location || '-'}
                                                            </div>
                                                        </td>

                                                        <td className="mika-guest-invitation-cell">
                                                            <div className="mika-guest-invitation-info">
                                                                {guest.isInvitationGetter ? (
                                                                    <div className="mika-invitation-getter-info">
                                                                        <div className="mika-invitation-language">
                                                                            {guest.invitationLanguage?.toUpperCase() || 'ET'}
                                                                        </div>
                                                                        <div className="mika-invitation-status-info">
                                                                            {getInvitationStatusBadge(guest.invitationStatus)}
                                                                        </div>
                                                                        <div className="mika-rsvp-status-info">
                                                                            {getRsvpStatusBadge(guest.rsvpStatus)}
                                                                        </div>
                                                                        {guest.invitationOpenCount > 0 && (
                                                                            <div className="mika-invitation-opens">
                                                                                {guest.invitationOpenCount} {guest.invitationOpenCount === 1
                                                                                ? t('guestTable.openedTime')
                                                                                : t('guestTable.openedTimes')}
                                                                            </div>
                                                                        )}
                                                                        {/* RSVP Details Toggle Button */}
                                                                        {hasRsvpDetails(guest) && (
                                                                            <button
                                                                                className="mika-rsvp-details-toggle"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    toggleRsvpDetails(guest.id);
                                                                                }}
                                                                                title={expandedRsvpRows.has(guest.id) ? t('guestTable.hideRsvpDetails') : t('guestTable.showRsvpDetails')}
                                                                            >
                                                                                <span className="mika-rsvp-toggle-icon">
                                                                                    {expandedRsvpRows.has(guest.id) ? '▲' : '▼'}
                                                                                </span>
                                                                                {t('guestTable.rsvpDetails')}
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div className="mika-linked-guest-info">
                                                                        <div className="mika-linked-to-text">
                                                                            {t('guestTable.linkedTo')}:{' '}
                                                                            <span className="mika-linked-getter-name">
                                                                                {(() => {
                                                                                    const linkedGetter = guests.find(g => g.id === guest.linkedInvitationGetterId);
                                                                                    return linkedGetter
                                                                                        ? ` ${linkedGetter.firstName} ${linkedGetter.lastName}`
                                                                                        : t('guestTable.unknownGetter');
                                                                                })()}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>

                                                        <td className="mika-guest-actions-cell">
                                                            <div className="mika-guest-actions">
                                                                {guest.isInvitationGetter && (
                                                                    <button
                                                                        className="mika-guest-action-button mika-guest-action-invitation"
                                                                        onClick={() => handleCopyInvitationUrl(guest)}
                                                                        title={t('guestTable.generateInvitation')}
                                                                    >
                                                                        📧
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

                                                    {/* Expanded RSVP Details Row */}
                                                    {expandedRsvpRows.has(guest.id) && hasRsvpDetails(guest) && (
                                                        <tr key={`rsvp-${guest.id}`} className="mika-rsvp-details-row">
                                                            <td colSpan={8} className="mika-rsvp-details-cell">
                                                                <div className="mika-rsvp-details-container">
                                                                    <h4 className="mika-rsvp-details-title">
                                                                        {t('guestTable.rsvpDetailsTitle')}
                                                                    </h4>
                                                                    <div className="mika-rsvp-details-content">
                                                                        {guest.rsvpResponses.requiresAccommodation && (
                                                                            <div className="mika-rsvp-detail-item">
                                                                                <span className="mika-rsvp-detail-icon">🏨</span>
                                                                                <span className="mika-rsvp-detail-text">
                                {t('guestTable.rsvpDetails.needsAccommodation')}
                            </span>
                                                                            </div>
                                                                        )}

                                                                        {guest.rsvpResponses.needsTransport && (
                                                                            <div className="mika-rsvp-detail-item">
                                                                                <span className="mika-rsvp-detail-icon">🚗</span>
                                                                                <span className="mika-rsvp-detail-text">
                                {t('guestTable.rsvpDetails.needsTransport')}
                                                                                    {guest.rsvpResponses.transportDetails && (
                                                                                        <span className="mika-rsvp-transport-detail">
                                        {' - '}
                                                                                            {formatTransportDetails(guest.rsvpResponses.transportDetails)}
                                    </span>
                                                                                    )}
                            </span>
                                                                            </div>
                                                                        )}

                                                                        {guest.rsvpResponses.hasDietaryRestrictions && (
                                                                            <div className="mika-rsvp-detail-item">
                                                                                <span className="mika-rsvp-detail-icon">🍽️</span>
                                                                                <span className="mika-rsvp-detail-text">
                                {t('guestTable.rsvpDetails.hasDietaryRestrictions')}
                            </span>
                                                                            </div>
                                                                        )}

                                                                        {guest.rsvpResponses.dietaryNote && (
                                                                            <div className="mika-rsvp-detail-note">
                            <span className="mika-rsvp-note-label">
                                {t('guestTable.rsvpDetails.dietaryNote')}:
                            </span>
                                                                                <span className="mika-rsvp-note-text">
                                {guest.rsvpResponses.dietaryNote}
                            </span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default GuestTable;