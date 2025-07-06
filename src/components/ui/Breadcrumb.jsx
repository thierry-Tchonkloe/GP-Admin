import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMap = {
    '/dashboard': { label: 'Tableau de Bord', parent: null },
    '/employee-management': { label: 'Gestion des Employés', parent: '/dashboard' },
    '/employee-registration': { label: 'Inscription Employé', parent: '/employee-management' },
    '/attendance-tracking': { label: 'Suivi de Présence', parent: '/dashboard' },
    '/reports-analytics': { label: 'Rapports & Analyses', parent: '/dashboard' },
    '/system-settings': { label: 'Paramètres Système', parent: '/dashboard' },
    '/company-registration': { label: 'Inscription Entreprise', parent: null },
    '/login': { label: 'Connexion', parent: null }
  };

  const generateBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentPath = location.pathname;
    
    while (currentPath && pathMap[currentPath]) {
      const pathInfo = pathMap[currentPath];
      breadcrumbs.unshift({
        label: pathInfo.label,
        path: currentPath,
        isActive: currentPath === location.pathname
      });
      currentPath = pathInfo.parent;
    }

    // Add home if not already present and not on login/registration pages
    if (breadcrumbs.length > 0 && breadcrumbs[0].path !== '/dashboard' && !location.pathname.includes('login') && !location.pathname.includes('company-registration')) {
      breadcrumbs.unshift({
        label: 'Accueil',
        path: '/dashboard',
        isActive: false
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on login or company registration pages
  if (location.pathname === '/login' || location.pathname === '/company-registration') {
    return null;
  }

  // Don't show breadcrumbs if only one item (current page)
  if (breadcrumbs.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <Icon name="Home" size={16} className="text-text-secondary" />
      
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-text-tertiary" />
          )}
          
          {crumb.isActive ? (
            <span className="text-text-primary font-medium">
              {crumb.label}
            </span>
          ) : (
            <Button
              variant="link"
              size="sm"
              onClick={() => handleNavigation(crumb.path)}
              className="text-text-secondary hover:text-primary p-0 h-auto font-normal"
            >
              {crumb.label}
            </Button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;