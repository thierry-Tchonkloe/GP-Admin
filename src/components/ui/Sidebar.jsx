import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    {
      label: 'Tableau de Bord',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Vue d\'ensemble du système'
    },
    {
      label: 'Gestion Employés',
      path: '/employee-management',
      icon: 'Users',
      tooltip: 'Gérer les employés'
    },
    {
      label: 'Inscription Employé',
      path: '/employee-registration',
      icon: 'UserPlus',
      tooltip: 'Ajouter un nouvel employé'
    },
    {
      label: 'Suivi Présence',
      path: '/attendance-tracking',
      icon: 'Clock',
      tooltip: 'Suivre la présence en temps réel'
    },
    {
      label: 'Rapports & Analyses',
      path: '/reports-analytics',
      icon: 'BarChart3',
      tooltip: 'Générer des rapports'
    },
    {
      label: 'Paramètres',
      path: '/system-settings',
      icon: 'Settings',
      tooltip: 'Configuration du système'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-3 px-4 py-6">
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
        <svg
          width="24"
          height="24"
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
      <div className="flex flex-col">
        <span className="text-lg font-bold text-text-primary font-heading">
          GP-Admin
        </span>
        <span className="text-xs text-text-secondary font-caption">
          Système Biométrique
        </span>
      </div>
    </div>
  );

  const NavigationItem = ({ item }) => {
    const isActive = isActivePath(item.path);
    
    return (
      <div className="relative group">
        <button
          onClick={() => handleNavigation(item.path)}
          className={`
            w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left
            transition-all duration-200 nav-item-hover
            ${isActive 
              ? 'bg-primary text-primary-foreground shadow-elevation-1' 
              : 'text-text-primary hover:bg-surface-secondary hover:text-primary'
            }
          `}
        >
          <Icon 
            name={item.icon} 
            size={20} 
            color={isActive ? 'currentColor' : 'var(--color-text-secondary)'}
            className={`transition-colors duration-200 ${isActive ? 'text-primary-foreground' : 'group-hover:text-primary'}`}
          />
          <span className="font-medium text-sm">
            {item.label}
          </span>
          
          {/* Active Indicator */}
          {isActive && (
            <div className="absolute right-2 w-2 h-2 bg-primary-foreground rounded-full opacity-75" />
          )}
        </button>
        
        {/* Tooltip for collapsed state */}
        <div className="absolute left-full ml-2 px-2 py-1 bg-text-primary text-text-inverse text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-300 lg:hidden">
          {item.tooltip}
        </div>
      </div>
    );
  };

  const SystemStatus = () => (
    <div className="px-4 py-3 bg-success-50 border border-success-200 rounded-lg mx-4 mb-4">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-success rounded-full biometric-pulse" />
        <span className="text-xs font-medium text-success-700">
          Système Actif
        </span>
      </div>
      <p className="text-xs text-success-600 mt-1">
        Capteurs biométriques connectés
      </p>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-200 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-60 bg-surface border-r border-border z-300
          transform transition-transform duration-300 sidebar-transition
          lg:fixed lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border">
            <Logo />
            
            {/* Close Button for Mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden mr-4"
              iconName="X"
              iconSize={20}
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavigationItem key={item.path} item={item} />
            ))}
          </nav>

          {/* System Status */}
          <div className="p-4 border-t border-border">
            <SystemStatus />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;