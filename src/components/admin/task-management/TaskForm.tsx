// src/components/admin/task-management/TaskForm.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Task, TaskFormData, TaskStatus } from '../../../types';
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
        name: '',
        status: 'tegemata',
        description: '',
        monetaryRequirement: '',
        taskManager: '',
        extraInformation: '',
    });

    useEffect(() => {
        if (task) {
            setFormData({
                name: task.name,
                status: task.status,
                description: task.description,
                monetaryRequirement: task.monetaryRequirement || '',
                taskManager: task.taskManager,
                extraInformation: task.extraInformation || '',
            });
        }
    }, [task]);

    const handleInputChange = (field: keyof TaskFormData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    // Helper function to get display name
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
                        {/* Task Name */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('taskForm.name')} *
                            </label>
                            <input
                                type="text"
                                className="mika-form-input"
                                placeholder={t('taskForm.namePlaceholder')}
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                required
                            />
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

                        {/* Description */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('taskForm.description')} *
                            </label>
                            <textarea
                                className="mika-form-textarea"
                                placeholder={t('taskForm.descriptionPlaceholder')}
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                maxLength={300}
                                rows={4}
                                required
                            />
                            <div className="mika-char-counter">
                                {formData.description.length}/300
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

                            {/* Task Manager - Updated to show display names */}
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
                                        <option key={user.email}>
                                            {getUserDisplayName(user)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Extra Information */}
                        <div className="mika-form-group">
                            <label className="mika-form-label">
                                {t('taskForm.extraInformation')}
                            </label>
                            <input
                                type="text"
                                className="mika-form-input"
                                placeholder={t('taskForm.extraPlaceholder')}
                                value={formData.extraInformation}
                                onChange={(e) => handleInputChange('extraInformation', e.target.value)}
                            />
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