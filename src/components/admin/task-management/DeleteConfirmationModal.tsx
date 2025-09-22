// src/components/admin/DeleteConfirmationModal.tsx
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Task } from '../../../types';
import '../../../styles/admin/DeleteConfirmationModal.css';

interface DeleteConfirmationModalProps {
    task: Task;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
                                                                             task,
                                                                             onConfirm,
                                                                             onCancel
                                                                         }) => {
    const { t } = useLanguage();

    return (
        <div className="mika-delete-modal-overlay">
            <div className="mika-delete-modal-container">
                <div className="mika-delete-modal">
                    <div className="mika-delete-modal-header">
                        <h3>{t('taskDelete.title')}</h3>
                    </div>

                    <div className="mika-delete-modal-body">
                        <div className="mika-delete-modal-icon">⚠️</div>
                        <p>{t('taskDelete.message')}</p>
                        <div className="mika-delete-task-info">
                            <strong>{task.name}</strong>
                        </div>
                    </div>

                    <div className="mika-delete-modal-footer">
                        <button
                            className="mika-delete-button mika-delete-button-cancel"
                            onClick={onCancel}
                        >
                            {t('taskDelete.cancel')}
                        </button>
                        <button
                            className="mika-delete-button mika-delete-button-confirm"
                            onClick={onConfirm}
                        >
                            {t('taskDelete.confirm')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;