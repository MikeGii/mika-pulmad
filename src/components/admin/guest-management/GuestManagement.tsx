// src/components/admin/guest-management/GuestManagement.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import { GuestService } from '../../../services/guestService';
import { Guest, GuestFormData, CreateGuestData } from '../../../types';
import Header from '../../common/Header';
import GuestForm from './GuestForm';
import GuestTable from './GuestTable';
import GuestDeleteModal from './GuestDeleteModal';
import '../../../styles/admin/GuestManagement.css';

const GuestManagement: React.FC = () => {
    const { t } = useLanguage();
    const { currentUserProfile } = useAuth();
    const [guests, setGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
    const [guestToDelete, setGuestToDelete] = useState<Guest | null>(null);
    const [statistics, setStatistics] = useState({
        totalGuests: 0,
        totalAdults: 0,
        totalChildren: 0,
        guestsByTable: {} as { [tableNumber: number]: number }
    });

    useEffect(() => {
        fetchGuests();
        fetchStatistics();
    }, []);

    const fetchGuests = async () => {
        try {
            const allGuests = await GuestService.getAllGuests();
            setGuests(allGuests);
        } catch (error) {
            console.error('Error fetching guests:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async () => {
        try {
            const stats = await GuestService.getGuestStatistics();
            setStatistics(stats);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    const handleCreateGuest = async (formData: GuestFormData) => {
        try {
            const guestData: CreateGuestData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber || undefined,
                email: formData.email || undefined,
                location: formData.location || undefined,
                tableNumber: Number(formData.tableNumber),
                isChild: formData.isChild,
                // Add new invitation fields
                isInvitationGetter: formData.isInvitationGetter,
                invitationLanguage: formData.invitationLanguage,
                linkedInvitationGetterId: formData.linkedInvitationGetterId || undefined,
            };

            await GuestService.createGuest(guestData);
            setShowForm(false);
            fetchGuests();
            fetchStatistics();
        } catch (error) {
            console.error('Error creating guest:', error);
            alert(t('guestManagement.errorCreating'));
        }
    };

    const handleUpdateGuest = async (formData: GuestFormData) => {
        if (!editingGuest) return;

        try {
            // Check if this is an invitation getter and table number changed
            const isTableNumberChanged = editingGuest.isInvitationGetter &&
                editingGuest.tableNumber !== Number(formData.tableNumber);

            if (isTableNumberChanged) {
                // Use the cascading update method for invitation getters
                // This handles BOTH the invitation getter AND all linked guests
                await GuestService.updateInvitationGetterTable(
                    editingGuest.id,
                    Number(formData.tableNumber)
                );

                // Update other guest data (excluding table number since it was handled in cascade)
                const otherGuestData = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phoneNumber: formData.phoneNumber || undefined,
                    email: formData.email || undefined,
                    location: formData.location || undefined,
                    isChild: formData.isChild,
                    isInvitationGetter: formData.isInvitationGetter,
                    invitationLanguage: formData.invitationLanguage,
                    linkedInvitationGetterId: formData.linkedInvitationGetterId || undefined,
                    // DO NOT include tableNumber here - it was already handled by updateInvitationGetterTable
                };

                // Update only the non-table fields
                await GuestService.updateGuest(editingGuest.id, otherGuestData);
            } else {
                // Normal update for non-invitation getters or when table didn't change
                const guestData: CreateGuestData = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phoneNumber: formData.phoneNumber || undefined,
                    email: formData.email || undefined,
                    location: formData.location || undefined,
                    tableNumber: Number(formData.tableNumber),
                    isChild: formData.isChild,
                    isInvitationGetter: formData.isInvitationGetter,
                    invitationLanguage: formData.invitationLanguage,
                    linkedInvitationGetterId: formData.linkedInvitationGetterId || undefined,
                };

                await GuestService.updateGuest(editingGuest.id, guestData);
            }

            setEditingGuest(null);
            setShowForm(false);
            fetchGuests();
            fetchStatistics();

            // Show success message for cascading updates
            if (isTableNumberChanged) {
                alert(t('guestManagement.tableUpdatedWithLinkedGuests'));
            }
        } catch (error) {
            console.error('Error updating guest:', error);
            alert(t('guestManagement.errorUpdating'));
        }
    };

    const handleDeleteGuest = async () => {
        if (!guestToDelete) return;

        try {
            await GuestService.deleteGuest(guestToDelete.id);
            setGuestToDelete(null);
            fetchGuests();
            fetchStatistics();
        } catch (error) {
            console.error('Error deleting guest:', error);
            alert(t('guestManagement.errorDeleting'));
        }
    };

    const handleEditClick = (guest: Guest) => {
        setEditingGuest(guest);
        setShowForm(true);
    };

    const handleDeleteClick = (guest: Guest) => {
        setGuestToDelete(guest);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingGuest(null);
    };

    // Check permissions
    if (!currentUserProfile?.permissions.guestManagement) {
        return (
            <div className="mika-guest-management-container">
                <Header />
                <div className="mika-guest-loading">
                    <p>Access denied. You don't have permission to manage guests.</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="mika-guest-management-container">
                <Header />
                <div className="mika-guest-loading">
                    <p>Loading guests...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mika-guest-management-container">
            <Header />

            <main className="mika-guest-management-content">
                <div className="mika-guest-page-header">
                    <h2 className="mika-guest-page-title">{t('guestManagement.title')}</h2>
                    <p className="mika-guest-page-subtitle">{t('guestManagement.subtitle')}</p>

                    {/* Guest Statistics */}
                    {statistics.totalGuests > 0 && (
                        <div className="mika-guest-stats">
                            <div className="mika-guest-stat">
                                <span className="mika-guest-stat-number">{statistics.totalGuests}</span>
                                <span className="mika-guest-stat-label">{t('guestManagement.totalGuests')}</span>
                            </div>
                            <div className="mika-guest-stat">
                                <span className="mika-guest-stat-number">{statistics.totalAdults}</span>
                                <span className="mika-guest-stat-label">{t('guestManagement.totalAdults')}</span>
                            </div>
                            <div className="mika-guest-stat">
                                <span className="mika-guest-stat-number">{statistics.totalChildren}</span>
                                <span className="mika-guest-stat-label">{t('guestManagement.totalChildren')}</span>
                            </div>
                            <div className="mika-guest-stat">
                                <span className="mika-guest-stat-number">{Object.keys(statistics.guestsByTable).length}</span>
                                <span className="mika-guest-stat-label">{t('guestManagement.totalTables')}</span>
                            </div>
                        </div>
                    )}

                    <button
                        className="mika-guest-add-button"
                        onClick={() => setShowForm(true)}
                    >
                        {t('guestManagement.addGuest')}
                    </button>
                </div>

                <GuestTable
                    guests={guests}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                />

                {showForm && (
                    <GuestForm
                        guest={editingGuest}
                        onSave={editingGuest ? handleUpdateGuest : handleCreateGuest}
                        onCancel={handleFormCancel}
                    />
                )}

                {guestToDelete && (
                    <GuestDeleteModal
                        guest={guestToDelete}
                        onConfirm={handleDeleteGuest}
                        onCancel={() => setGuestToDelete(null)}
                    />
                )}
            </main>
        </div>
    );
};

export default GuestManagement;