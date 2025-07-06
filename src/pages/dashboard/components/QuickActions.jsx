import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Ajouter Employé',
      icon: 'UserPlus',
      variant: 'primary',
      path: '/employee-registration'
    },
    {
      label: 'Voir Présence',
      icon: 'Clock',
      variant: 'secondary',
      path: '/attendance-tracking'
    },
    {
      label: 'Générer Rapport',
      icon: 'FileText',
      variant: 'outline',
      path: '/reports-analytics'
    },
    {
      label: 'Paramètres',
      icon: 'Settings',
      variant: 'ghost',
      path: '/system-settings'
    }
  ];

  const handleAction = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Actions Rapides</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            onClick={() => handleAction(action.path)}
            iconName={action.icon}
            iconPosition="left"
            fullWidth
            className="justify-start"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;