// src/components/admin/task-management/DeleteConfirmationModal.tsx
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Task, TaskContent } from '../../../types';
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
    const { t, language } = useLanguage();

    // Helper function to get content in current language
    const getLocalizedContent = (content: TaskContent | string): string => {
        if (typeof content === 'string') {
            return content; // Fallback for old tasks
        }
        return content[language] || content.et || content.ua || '';
    };

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
                            <strong>{getLocalizedContent(task.name)}</strong>
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