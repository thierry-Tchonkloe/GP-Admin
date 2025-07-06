import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Tableau',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Employés',
      path: '/employee-management',
      icon: 'Users'
    },
    {
      label: 'Présence',
      path: '/attendance-tracking',
      icon: 'Clock'
    },
    {
      label: 'Rapports',
      path: '/reports-analytics',
      icon: 'BarChart3'
    },
    {
      label: 'Paramètres',
      path: '/system-settings',
      icon: 'Settings'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Don't show on login or company registration pages
  if (location.pathname === '/login' || location.pathname === '/company-registration') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-100 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const isActive = isActivePath(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex flex-col items-center justify-center p-2 min-w-0 flex-1
                transition-colors duration-200
                ${isActive 
                  ? 'text-primary' :'text-text-secondary hover:text-primary'
                }
              `}
            >
              <div className={`
                p-1 rounded-lg transition-all duration-200
                ${isActive ? 'bg-primary-50' : ''}
              `}>
                <Icon 
                  name={item.icon} 
                  size={20} 
                  color={isActive ? 'var(--color-primary)' : 'currentColor'}
                />
              </div>
              <span className={`
                text-xs mt-1 font-medium truncate w-full text-center
                ${isActive ? 'text-primary' : 'text-text-secondary'}
              `}>
                {item.label}
              </span>
              
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-surface" />
    </nav>
  );
};

export default MobileNavigation;