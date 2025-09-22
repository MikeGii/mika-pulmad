// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import AdminLogin from './components/login/AdminLogin';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import AccountManagement from './components/admin/account-management/AccountManagement';
import TaskManagement from './components/admin/task-management/TaskManagement';
import './App.css';
import FinancialManagement from "./components/admin/financial-management/FinancialManagement";
import GuestManagement from "./components/admin/guest-management/GuestManagement";

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useAuth();
    return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

// Permission-based Protected Route
const PermissionRoute: React.FC<{
    children: React.ReactNode;
    requiredPermission: string;
}> = ({ children, requiredPermission }) => {
    const { currentUser } = useAuth();

    // For now, only allow mike.gross@mika-pulm.ee to access account management
    if (requiredPermission === 'accountManagement') {
        if (currentUser?.email === 'mike.gross@mika-pulm.ee') {
            return <>{children}</>;
        } else {
            return <Navigate to="/admin" />;
        }
    }

    return <>{children}</>;
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

                    {/* Admin dashboard route */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Add this new Task Management route */}
                    <Route
                        path="/admin/tasks"
                        element={
                            <ProtectedRoute>
                                <TaskManagement />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/financial"
                        element={
                            <ProtectedRoute>
                                <FinancialManagement />
                            </ProtectedRoute>
                        }
                    />

                    {/* Account Management route - only for mike.gross@mika-pulm.ee */}
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

                    <Route
                        path="/admin/guests"
                        element={
                            <ProtectedRoute>
                                <GuestManagement />
                            </ProtectedRoute>
                        }
                    />

                    {/* Guest invitation routes (we'll add these later) */}
                    <Route path="/:guestName" element={<div>Guest invitation page</div>} />
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