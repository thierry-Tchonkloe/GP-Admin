import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, completedTabs }) => {
  const tabs = [
    {
      id: 'personal',
      label: 'Informations Personnelles',
      icon: 'User',
      description: 'Données personnelles et contact'
    },
    {
      id: 'employment',
      label: 'Détails d\'Emploi',
      icon: 'Briefcase',
      description: 'Poste, département et contrat'
    },
    // {
    //   id: 'biometric',
    //   label: 'Configuration Biométrique',
    //   icon: 'Fingerprint',
    //   description: 'Enregistrement des empreintes'
    // }
  ];

  const getTabStatus = (tabId) => {
    if (completedTabs.includes(tabId)) return 'completed';
    if (tabId === activeTab) return 'active';
    return 'inactive';
  };

  const getTabClasses = (status) => {
    const baseClasses = "flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer";
    
    switch (status) {
      case 'completed':
        return `${baseClasses} border-success bg-success-50 text-success-700 hover:bg-success-100`;
      case 'active':
        return `${baseClasses} border-primary bg-primary-50 text-primary-700`;
      case 'inactive':
        return `${baseClasses} border-border bg-surface hover:border-border-secondary text-text-secondary hover:text-text-primary`;
      default:
        return baseClasses;
    }
  };

  const getIconColor = (status) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success)';
      case 'active':
        return 'var(--color-primary)';
      case 'inactive':
        return 'var(--color-text-secondary)';
      default:
        return 'currentColor';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary mb-6">
        Inscription d'un Nouvel Employé
      </h2>
      
      {/* Desktop Tab Navigation */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {tabs.map((tab, index) => {
          const status = getTabStatus(tab.id);
          
          return (
            <div
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={getTabClasses(status)}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${status === 'completed' ? 'bg-success text-white' : 
                    status === 'active'? 'bg-primary text-white' : 'bg-surface-tertiary'}
                `}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={20} color="white" />
                  ) : (
                    <Icon name={tab.icon} size={20} color={status === 'active' ? 'white' : getIconColor(status)} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm leading-tight">
                    {tab.label}
                  </h3>
                  <p className="text-xs opacity-75 mt-1">
                    {tab.description}
                  </p>
                </div>
              </div>
              
              {/* Step Number */}
              <div className="text-xs font-medium opacity-60">
                {index + 1}/2
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-text-primary">
            Étape {tabs.findIndex(tab => tab.id === activeTab) + 1} sur {tabs.length}
          </h3>
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`w-2 h-2 rounded-full transition-colors ${
                  getTabStatus(tab.id) === 'completed' ? 'bg-success' :
                  getTabStatus(tab.id) === 'active'? 'bg-primary' : 'bg-surface-tertiary'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="bg-surface-secondary rounded-lg p-4">
          {tabs.map((tab) => {
            if (tab.id !== activeTab) return null;
            
            return (
              <div key={tab.id} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name={tab.icon} size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">
                    {tab.label}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {tab.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-surface-tertiary rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${((completedTabs.length + (activeTab ? 1 : 0)) / tabs.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default TabNavigation;