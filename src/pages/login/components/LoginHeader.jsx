import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-elevation-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Welcome Text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-text-primary font-heading">
          Bienvenue sur GP-Admin
        </h1>
        <p className="text-lg text-text-secondary">
          Système de Gestion Biométrique
        </p>
        <p className="text-sm text-text-tertiary max-w-md mx-auto">
          Connectez-vous pour accéder au tableau de bord de gestion des présences et administrer votre système biométrique.
        </p>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-2 mt-6 p-3 bg-success-50 border border-success-200 rounded-lg max-w-sm mx-auto">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <Icon name="Shield" size={16} className="text-success-600" />
        <span className="text-sm font-medium text-success-700">
          Connexion Sécurisée
        </span>
      </div>
    </div>
  );
};

export default LoginHeader;