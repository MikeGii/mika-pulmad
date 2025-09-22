// src/components/admin/guest-management/GuestDeleteModal.tsx
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Guest } from '../../../types/Guest';
import '../../../styles/admin/DeleteConfirmationModal.css';

interface GuestDeleteModalProps {
    guest: Guest;
    onConfirm: () => void;
    onCancel: () => void;
}

const GuestDeleteModal: React.FC<GuestDeleteModalProps> = ({
                                                               guest,
                                                               onConfirm,
                                                               onCancel
                                                           }) => {
    const { t } = useLanguage();

    return (
        <div className="mika-delete-modal-overlay">
            <div className="mika-delete-modal-container">
                <div className="mika-delete-modal">
                    <div className="mika-delete-modal-header">
                        <h3>{t('guestDelete.title')}</h3>
                    </div>

                    <div className="mika-delete-modal-body">
                        <div className="mika-delete-modal-icon">⚠️</div>
                        <p>{t('guestDelete.message')}</p>
                        <div className="mika-delete-task-info">
                            <strong>{guest.firstName} {guest.lastName}</strong>
                            {guest.isChild && <span> ({t('guestTable.child')})</span>}
                            <br />
                            {t('guestTable.table')} {guest.tableNumber}
                        </div>
                    </div>

                    <div className="mika-delete-modal-footer">
                        <button
                            className="mika-delete-button mika-delete-button-cancel"
                            onClick={onCancel}
                        >
                            {t('guestDelete.cancel')}
                        </button>
                        <button
                            className="mika-delete-button mika-delete-button-confirm"
                            onClick={onConfirm}
                        >
                            {t('guestDelete.confirm')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestDeleteModal;