// src/components/admin/guest-management/GuestTable.tsx
import React, { useMemo } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Guest } from '../../../types/Guest';
import '../../../styles/admin/GuestTable.css';

interface GuestTableProps {
    guests: Guest[];
    onEdit: (guest: Guest) => void;
    onDelete: (guest: Guest) => void;
}

const GuestTable: React.FC<GuestTableProps> = ({ guests, onEdit, onDelete }) => {
    const { t } = useLanguage();

    // Group guests by table number
    const guestsByTable = useMemo(() => {
        const grouped: { [tableNumber: number]: Guest[] } = {};

        guests.forEach(guest => {
            if (!grouped[guest.tableNumber]) {
                grouped[guest.tableNumber] = [];
            }
            grouped[guest.tableNumber].push(guest);
        });

        // Sort guests within each table by name
        Object.keys(grouped).forEach(tableNumber => {
            grouped[Number(tableNumber)].sort((a, b) =>
                `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
            );
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
                                        <td>
                                            <div className="mika-guest-actions">
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