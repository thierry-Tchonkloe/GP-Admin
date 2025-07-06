import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAuth = true, roles = [] }) => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="text-text-secondary">Chargement...</span>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but shouldn't be (e.g., on login page)
  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Check role-based access if roles are specified
  if (requireAuth && roles?.length > 0 && userProfile) {
    const hasRequiredRole = roles.includes(userProfile.role);
    if (!hasRequiredRole) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-lg p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Accès Refusé
            </h2>
            <p className="text-text-secondary mb-6">
              Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Retour
            </button>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRoute;