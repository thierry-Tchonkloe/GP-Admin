import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import BrandingSection from './components/BrandingSection';
import LanguageToggle from './components/LanguageToggle';

const CompanyRegistration = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
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
              <span className="text-lg font-bold text-text-primary font-heading">
                GP-Admin
              </span>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHome}
                iconName="ArrowLeft"
                iconPosition="left"
                className="hidden sm:flex"
              >
                Retour
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHome}
                iconName="ArrowLeft"
                className="sm:hidden"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[calc(100vh-200px)]">
            
            {/* Left Section - Branding (Hidden on mobile, visible on tablet and desktop) */}
            <div className="hidden md:block lg:col-span-6 xl:col-span-7">
              <div className="sticky top-8">
                <BrandingSection />
              </div>
            </div>

            {/* Right Section - Registration Form */}
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="bg-surface rounded-xl shadow-elevation-2 p-6 lg:p-8">
                {/* Mobile Branding Header */}
                <div className="md:hidden mb-8 text-center">
                  <h2 className="text-2xl font-bold text-text-primary mb-2 font-heading">
                    Créer votre Compte
                  </h2>
                  <p className="text-text-secondary">
                    Rejoignez des centaines d'entreprises africaines qui font confiance à GP-Admin
                  </p>
                </div>

                {/* Desktop Form Header */}
                <div className="hidden md:block mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2 font-heading">
                    Inscription Entreprise
                  </h2>
                  <p className="text-text-secondary">
                    Créez votre compte pour accéder au système de gestion biométrique
                  </p>
                </div>

                {/* Registration Form */}
                <RegistrationForm />
              </div>

              {/* Mobile Features Preview */}
              <div className="md:hidden mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-text-primary text-center">
                  Pourquoi Choisir GP-Admin ?
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon name="Fingerprint" size={16} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary text-sm">
                        Biométrie Avancée
                      </h4>
                      <p className="text-xs text-text-secondary">
                        Reconnaissance d'empreintes sécurisée
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                    <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <Icon name="Wifi" size={16} color="var(--color-secondary)" />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary text-sm">
                        Mode Hors Ligne
                      </h4>
                      <p className="text-xs text-text-secondary">
                        Fonctionne sans connexion internet
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                    <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                      <Icon name="BarChart3" size={16} color="var(--color-accent)" />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary text-sm">
                        Rapports Intelligents
                      </h4>
                      <p className="text-xs text-text-secondary">
                        Analyses automatiques et export PDF
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span>© {new Date().getFullYear()} GP-Admin</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Système Biométrique Intelligent</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Button variant="link" className="text-text-secondary hover:text-primary p-0 h-auto">
                Politique de Confidentialité
              </Button>
              <Button variant="link" className="text-text-secondary hover:text-primary p-0 h-auto">
                Conditions d'Utilisation
              </Button>
              <Button variant="link" className="text-text-secondary hover:text-primary p-0 h-auto">
                Support
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompanyRegistration;