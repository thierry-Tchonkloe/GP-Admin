import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MobileNavigation from '../../components/ui/MobileNavigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import CompanyProfileTab from './components/CompanyProfileTab';
import AttendancePoliciesTab from './components/AttendancePoliciesTab';
import HardwareConfigTab from './components/HardwareConfigTab';
import NotificationsTab from './components/NotificationsTab';

const SystemSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('company');

  const tabs = [
    {
      id: 'company',
      label: 'Profil Entreprise',
      icon: 'Building',
      component: CompanyProfileTab
    },
    {
      id: 'policies',
      label: 'Politiques de Présence',
      icon: 'Clock',
      component: AttendancePoliciesTab
    },
    {
      id: 'hardware',
      label: 'Configuration Matérielle',
      icon: 'Fingerprint',
      component: HardwareConfigTab
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      component: NotificationsTab
    }
  ];

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onToggleSidebar={handleToggleSidebar}
        isSidebarOpen={sidebarOpen}
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
      />

      {/* Main Content */}
      <main className="lg:ml-60 pt-16 pb-20 lg:pb-6">
        <div className="px-4 lg:px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Paramètres Système</h1>
                <p className="text-text-secondary">
                  Configurez les paramètres de votre système de gestion de présence
                </p>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="bg-surface rounded-lg border border-border shadow-elevation-1">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-0 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap
                      border-b-2 transition-colors duration-200
                      ${activeTab === tab.id
                        ? 'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                      }
                    `}
                  >
                    <Icon 
                      name={tab.icon} 
                      size={18} 
                      className={activeTab === tab.id ? 'text-primary' : 'text-text-secondary'} 
                    />
                    <span className="hidden sm:block">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="Download" size={16} className="text-success" />
                </div>
                <h3 className="font-medium text-text-primary">Sauvegarde Système</h3>
              </div>
              <p className="text-sm text-text-secondary mb-3">
                Créez une sauvegarde complète de vos données et paramètres
              </p>
              <button className="text-sm text-success hover:text-success-700 font-medium">
                Créer une sauvegarde →
              </button>
            </div>

            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Icon name="RefreshCw" size={16} className="text-warning" />
                </div>
                <h3 className="font-medium text-text-primary">Mise à Jour</h3>
              </div>
              <p className="text-sm text-text-secondary mb-3">
                Vérifiez et installez les dernières mises à jour du système
              </p>
              <button className="text-sm text-warning hover:text-warning-700 font-medium">
                Vérifier les mises à jour →
              </button>
            </div>

            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Icon name="HelpCircle" size={16} className="text-accent" />
                </div>
                <h3 className="font-medium text-text-primary">Support</h3>
              </div>
              <p className="text-sm text-text-secondary mb-3">
                Accédez à la documentation et contactez le support technique
              </p>
              <button className="text-sm text-accent hover:text-accent-700 font-medium">
                Obtenir de l'aide →
              </button>
            </div>
          </div>

          {/* System Information */}
          <div className="mt-8 bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Informations Système</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-text-secondary">Version</p>
                <p className="text-lg font-semibold text-text-primary">v2.1.3</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-text-secondary">Dernière Mise à Jour</p>
                <p className="text-lg font-semibold text-text-primary">15/03/2024</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-text-secondary">Uptime</p>
                <p className="text-lg font-semibold text-text-primary">15j 8h</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-text-secondary">Licence</p>
                <p className="text-lg font-semibold text-text-primary">Entreprise</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default SystemSettings;