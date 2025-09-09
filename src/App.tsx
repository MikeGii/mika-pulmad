// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AdminLogin from './components/login/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import './App.css';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useAuth();
    return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

// Public Route Component (redirect if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useAuth();
    return !currentUser ? <>{children}</> : <Navigate to="/admin" />;
};

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

                    {/* Guest invitation routes (we'll add these later) */}
                    <Route path="/:guestName" element={<div>Guest invitation page</div>} />
                </Routes>
            </div>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;