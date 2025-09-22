// src/components/admin/task-management/TaskForm.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Task, TaskFormData, TaskStatus, TaskContent } from '../../../types';
import { User } from '../../../types';
import '../../../styles/admin/TaskForm.css';

interface TaskFormProps {
    task?: Task | null;
    users: User[];
    onSave: (formData: TaskFormData) => void;
    onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, users, onSave, onCancel }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<TaskFormData>({
        name: { et: '', ua: '' },
        status: 'tegemata',
        description: { et: '', ua: '' },
        monetaryRequirement: '',
        taskManager: '',
        extraInformation: { et: '', ua: '' },
    });

    useEffect(() => {
        if (task) {
            setFormData({
                name: task.name,
                status: task.status,
                description: task.description,
                monetaryRequirement: task.monetaryRequirement || '',
                taskManager: task.taskManager,
                extraInformation: task.extraInformation || { et: '', ua: '' },
            });
        }
    }, [task]);

    const handleInputChange = (field: keyof TaskFormData, value: string | number | TaskContent) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleMultilingualChange = (field: 'name' | 'description' | 'extraInformation', language: 'et' | 'ua', value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [language]: value
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const getUserDisplayName = (user: User): string => {
        if (user.profile.displayName) {
            return user.profile.displayName;
        }
        return `${user.profile.firstName} ${user.profile.lastName}`;
    };

    return (
        <div className="mika-task-form-overlay">
            <div className="mika-task-form-container">
                <form onSubmit={handleSubmit} className="mika-task-form">
                    <div className="mika-task-form-header">
                        <h3>{task ? t('taskManagement.editTask') : t('taskManagement.addTask')}</h3>
                    </div>

                    <div className="mika-task-form-body">
                        {/* Task Name - Multilingual */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('taskForm.name')} *
                            </label>
                            <div className="mika-multilingual-group">
                                <div className="mika-language-input">
                                    <label className="mika-language-label">🇪🇪 Eesti</label>
                                    <input
                                        type="text"
                                        className="mika-form-input"
                                        placeholder={t('taskForm.namePlaceholder')}
                                        value={formData.name.et}
                                        onChange={(e) => handleMultilingualChange('name', 'et', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mika-language-input">
                                    <label className="mika-language-label">🇺🇦 Українська</label>
                                    <input
                                        type="text"
                                        className="mika-form-input"
                                        placeholder="Введіть назву завдання..."
                                        value={formData.name.ua}
                                        onChange={(e) => handleMultilingualChange('name', 'ua', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('taskForm.status')} *
                            </label>
                            <select
                                className="mika-form-select"
                                value={formData.status}
                                onChange={(e) => handleInputChange('status', e.target.value as TaskStatus)}
                                required
                            >
                                <option value="tegemata">{t('taskStatus.tegemata')}</option>
                                <option value="toos">{t('taskStatus.toos')}</option>
                                <option value="tehtud">{t('taskStatus.tehtud')}</option>
                            </select>
                        </div>

                        {/* Description - Multilingual */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('taskForm.description')} *
                            </label>
                            <div className="mika-multilingual-group">
                                <div className="mika-language-input">
                                    <label className="mika-language-label">🇪🇪 Eesti</label>
                                    <textarea
                                        className="mika-form-textarea"
                                        placeholder={t('taskForm.descriptionPlaceholder')}
                                        value={formData.description.et}
                                        onChange={(e) => handleMultilingualChange('description', 'et', e.target.value)}
                                        maxLength={300}
                                        rows={4}
                                        required
                                    />
                                    <div className="mika-char-counter">
                                        {formData.description.et.length}/300
                                    </div>
                                </div>
                                <div className="mika-language-input">
                                    <label className="mika-language-label">🇺🇦 Українська</label>
                                    <textarea
                                        className="mika-form-textarea"
                                        placeholder="Введіть опис завдання (до 300 символів)..."
                                        value={formData.description.ua}
                                        onChange={(e) => handleMultilingualChange('description', 'ua', e.target.value)}
                                        maxLength={300}
                                        rows={4}
                                        required
                                    />
                                    <div className="mika-char-counter">
                                        {formData.description.ua.length}/300
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mika-form-row">
                            {/* Monetary Requirement */}
                            <div className="mika-form-group mika-form-group-half">
                                <label className="mika-form-label">
                                    {t('taskForm.monetaryRequirement')}
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="mika-form-input"
                                    placeholder={t('taskForm.monetaryPlaceholder')}
                                    value={formData.monetaryRequirement}
                                    onChange={(e) => handleInputChange('monetaryRequirement', e.target.value)}
                                />
                            </div>

                            {/* Task Manager */}
                            <div className="mika-form-group mika-form-group-half">
                                <label className="mika-form-label">
                                    {t('taskForm.taskManager')} *
                                </label>
                                <select
                                    className="mika-form-select"
                                    value={formData.taskManager}
                                    onChange={(e) => handleInputChange('taskManager', e.target.value)}
                                    required
                                >
                                    <option value="">{t('taskForm.taskManagerPlaceholder')}</option>
                                    {users.map(user => (
                                        <option key={user.email} value={user.email}>
                                            {getUserDisplayName(user)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Extra Information - Multilingual */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('taskForm.extraInformation')}
                            </label>
                            <div className="mika-multilingual-group">
                                <div className="mika-language-input">
                                    <label className="mika-language-label">🇪🇪 Eesti</label>
                                    <input
                                        type="text"
                                        className="mika-form-input"
                                        placeholder={t('taskForm.extraPlaceholder')}
                                        value={formData.extraInformation.et}
                                        onChange={(e) => handleMultilingualChange('extraInformation', 'et', e.target.value)}
                                    />
                                </div>
                                <div className="mika-language-input">
                                    <label className="mika-language-label">🇺🇦 Українська</label>
                                    <input
                                        type="text"
                                        className="mika-form-input"
                                        placeholder="Назва компанії або інша інформація..."
                                        value={formData.extraInformation.ua}
                                        onChange={(e) => handleMultilingualChange('extraInformation', 'ua', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mika-task-form-footer">
                        <button
                            type="button"
                            className="mika-form-button mika-form-button-cancel"
                            onClick={onCancel}
                        >
                            {t('taskForm.cancel')}
                        </button>
                        <button
                            type="submit"
                            className="mika-form-button mika-form-button-save"
                        >
                            {t('taskForm.save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;