import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LanguageSelector from './components/LanguageSelector';
import SystemStatus from './components/SystemStatus';

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-surface to-secondary-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="text-text-secondary">Vérification de l'authentification...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-surface to-secondary-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-100 rounded-full opacity-10 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-md mx-auto">
        {/* Language Selector - Top Right */}
        <div className="flex justify-end mb-6">
          <LanguageSelector />
        </div>

        {/* Login Card */}
        <div className="bg-surface border border-border rounded-2xl shadow-elevation-4 p-8 backdrop-blur-sm">
          {/* Header */}
          <LoginHeader />

          {/* Login Form */}
          <LoginForm />
        </div>

        {/* System Status */}
        <div className="mt-6">
          <SystemStatus />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-xs text-text-tertiary">
            GP-Admin v2.1.0 - Système Biométrique Professionnel
          </p>
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} GP-Admin. Tous droits réservés.
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-text-tertiary">
            <a href="#" className="hover:text-primary transition-colors">
              Aide & Support
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">
              Confidentialité
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">
              Conditions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;