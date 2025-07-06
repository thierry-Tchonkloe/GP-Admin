import React from 'react';
import Icon from '../../../components/AppIcon';

const BrandingSection = () => {
  const features = [
    {
      icon: 'Fingerprint',
      title: 'Authentification Biométrique',
      description: 'Système de reconnaissance d\'empreintes digitales sécurisé et fiable pour un contrôle d\'accès précis.'
    },
    {
      icon: 'Clock',
      title: 'Suivi en Temps Réel',
      description: 'Monitoring instantané des présences avec notifications automatiques et tableaux de bord interactifs.'
    },
    {
      icon: 'BarChart3',
      title: 'Rapports Intelligents',
      description: 'Génération automatique de rapports détaillés avec analyses de ponctualité et export PDF/Excel.'
    },
    {
      icon: 'Shield',
      title: 'Sécurité Avancée',
      description: 'Protection des données multi-tenant avec isolation complète et conformité aux standards de sécurité.'
    }
  ];

  const stats = [
    { value: '500+', label: 'Entreprises Africaines' },
    { value: '50K+', label: 'Employés Gérés' },
    { value: '99.9%', label: 'Temps de Disponibilité' },
    { value: '24/7', label: 'Support Technique' }
  ];

  return (
    <div className="h-full flex flex-col justify-center space-y-8">
      {/* Logo and Main Title */}
      <div className="text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <svg
              width="28"
              height="28"
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
          <div>
            <h1 className="text-2xl font-bold text-text-primary font-heading">
              GP-Admin
            </h1>
            <p className="text-sm text-text-secondary font-caption">
              Système Biométrique Intelligent
            </p>
          </div>
        </div>
        
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4 font-heading">
          Révolutionnez la Gestion
          <br />
          <span className="text-primary">de vos Employés</span>
        </h2>
        
        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          Solution complète de gestion des présences par reconnaissance biométrique, 
          spécialement conçue pour les entreprises africaines avec support hors ligne 
          et optimisation pour connexions limitées.
        </p>
      </div>

      {/* Key Features */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-text-primary mb-4 font-heading">
          Fonctionnalités Clés
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-surface-secondary rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature.icon} size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-1">
                  {feature.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 text-center lg:text-left">
          Faites Confiance à Notre Expertise
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <span>Données Sécurisées</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Wifi" size={16} color="var(--color-success)" />
            <span>Mode Hors Ligne</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Smartphone" size={16} color="var(--color-success)" />
            <span>Multi-Plateforme</span>
          </div>
        </div>
        
        <div className="bg-success-50 border border-success-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <span className="text-sm font-medium text-success-700">
              Essai gratuit de 30 jours - Aucune carte de crédit requise
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSection;