// src/App.tsx - Fixed routing order
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import AdminLogin from './components/login/AdminLogin';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import AccountManagement from './components/admin/account-management/AccountManagement';
import TaskManagement from './components/admin/task-management/TaskManagement';
import FinancialManagement from "./components/admin/financial-management/FinancialManagement";
import GuestManagement from "./components/admin/guest-management/GuestManagement";
import WeddingInvitation from './components/invitation/WeddingInvitation';
import InvitationPreview from './components/admin/InvitationPreview';
import './App.css';
import Transportation from "./components/admin/transportation/Transportation";

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useAuth();
    return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

// Permission-based Protected Route
const PermissionRoute: React.FC<{
    children: React.ReactNode;
    requiredPermission: keyof import('./types/User').UserPermissions;
}> = ({ children, requiredPermission }) => {
    const { currentUserProfile } = useAuth();

    if (currentUserProfile?.permissions[requiredPermission]) {
        return <>{children}</>;
    } else {
        return <Navigate to="/admin" />;
    }
};

// Public Route Component (redirect if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useAuth();
    return !currentUser ? <>{children}</> : <Navigate to="/admin" />;
};

// App Content Component (needs to be inside AuthProvider to use useAuth)
function AppContent() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Default route - redirect to login */}
                    <Route path="/" element={<Navigate to="/login" />} />

                    {/* Login route */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <AdminLogin />
                            </PublicRoute>
                        }
                    />

                    {/* Wedding Invitation route - MUST come before /admin routes */}
                    <Route
                        path="/invitation/:guestName"
                        element={<WeddingInvitation />}
                    />

                    {/* Admin dashboard route */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Task Management route */}
                    <Route
                        path="/admin/tasks"
                        element={
                            <ProtectedRoute>
                                <PermissionRoute requiredPermission="taskManagement">
                                    <TaskManagement />
                                </PermissionRoute>
                            </ProtectedRoute>
                        }
                    />

                    {/* Financial Management route */}
                    <Route
                        path="/admin/financial"
                        element={
                            <ProtectedRoute>
                                <PermissionRoute requiredPermission="financialManagement">
                                    <FinancialManagement />
                                </PermissionRoute>
                            </ProtectedRoute>
                        }
                    />

                    {/* Guest Management route */}
                    <Route
                        path="/admin/guests"
                        element={
                            <ProtectedRoute>
                                <PermissionRoute requiredPermission="guestManagement">
                                    <GuestManagement />
                                </PermissionRoute>
                            </ProtectedRoute>
                        }
                    />

                    {/* Account Management route */}
                    <Route
                        path="/admin/accounts"
                        element={
                            <ProtectedRoute>
                                <PermissionRoute requiredPermission="accountManagement">
                                    <AccountManagement />
                                </PermissionRoute>
                            </ProtectedRoute>
                        }
                    />

                    {/* Invitation Preview route */}
                    <Route
                        path="/admin/invitation-preview"
                        element={
                            <ProtectedRoute>
                                <PermissionRoute requiredPermission="guestManagement">
                                    <InvitationPreview />
                                </PermissionRoute>
                            </ProtectedRoute>
                        }
                    />

                    {/* Transportation page */}
                    <Route
                        path="/admin/transportation"
                        element={
                            <ProtectedRoute>
                                <PermissionRoute requiredPermission="transportationManagement">
                                    <Transportation />
                                </PermissionRoute>
                            </ProtectedRoute>
                        }
                    />

                    {/* 404 fallback - remove the catch-all route that was causing conflicts */}
                    <Route path="*" element={<div>Page not found</div>} />
                </Routes>
            </div>
        </Router>
    );
}

// Main App Component with proper provider nesting
function App() {
    return (
        <LanguageProvider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </LanguageProvider>
    );
}

export default App;