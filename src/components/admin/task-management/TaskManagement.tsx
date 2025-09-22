// src/components/admin/task-management/TaskManagement.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Header from '../../common/Header';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Task, TaskFormData } from '../../../types';
import { User } from '../../../types';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import '../../../styles/admin/TaskManagement.css';

const TaskManagement: React.FC = () => {
    const { t } = useLanguage();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]); // Change from string[] to User[]
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
        fetchUsers();
    }, []);

    const fetchTasks = async () => {
        try {
            const tasksSnapshot = await getDocs(collection(db, 'tasks'));
            const tasksData = tasksSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
                updatedAt: doc.data().updatedAt?.toDate() || new Date(),
            })) as Task[];
            setTasks(tasksData);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    // Update this function to fetch full user objects
    const fetchUsers = async () => {
        try {
            const usersSnapshot = await getDocs(collection(db, 'users'));
            const usersData = usersSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    email: data.email,
                    profile: data.profile,
                    permissions: data.permissions,
                    dashboardAccess: data.dashboardAccess,
                    isActive: data.isActive ?? true,
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                    lastLoginAt: data.lastLoginAt?.toDate()
                } as User;
            }).filter(user => user.isActive); // Only get active users

            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreateTask = async (formData: TaskFormData) => {
        try {
            const taskData = {
                ...formData,
                monetaryRequirement: formData.monetaryRequirement === '' ? 0 : Number(formData.monetaryRequirement),
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await addDoc(collection(db, 'tasks'), taskData);
            setShowForm(false);
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleUpdateTask = async (formData: TaskFormData) => {
        if (!editingTask) return;

        try {
            const taskData = {
                ...formData,
                monetaryRequirement: formData.monetaryRequirement === '' ? 0 : Number(formData.monetaryRequirement),
                updatedAt: new Date(),
            };

            await updateDoc(doc(db, 'tasks', editingTask.id), taskData);
            setEditingTask(null);
            setShowForm(false);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async () => {
        if (!taskToDelete) return;

        try {
            await deleteDoc(doc(db, 'tasks', taskToDelete.id));
            setTaskToDelete(null);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEditClick = (task: Task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleDeleteClick = (task: Task) => {
        setTaskToDelete(task);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    if (loading) {
        return (
            <div className="mika-task-management-container">
                <Header />
                <div className="mika-task-loading">
                    <p>Loading tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mika-task-management-container">
            <Header />

            <main className="mika-task-management-content">
                <div className="mika-task-page-header">
                    <h2 className="mika-task-page-title">{t('taskManagement.title')}</h2>
                    <p className="mika-task-page-subtitle">{t('taskManagement.subtitle')}</p>
                    <button
                        className="mika-task-add-button"
                        onClick={() => setShowForm(true)}
                    >
                        {t('taskManagement.addTask')}
                    </button>
                </div>

                <TaskTable
                    tasks={tasks}
                    users={users} // Pass full users array to TaskTable too
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                />

                {showForm && (
                    <TaskForm
                        task={editingTask}
                        users={users} // Pass full User objects instead of just emails
                        onSave={editingTask ? handleUpdateTask : handleCreateTask}
                        onCancel={handleFormCancel}
                    />
                )}

                {taskToDelete && (
                    <DeleteConfirmationModal
                        task={taskToDelete}
                        onConfirm={handleDeleteTask}
                        onCancel={() => setTaskToDelete(null)}
                    />
                )}
            </main>
        </div>
    );
};

export default TaskManagement;