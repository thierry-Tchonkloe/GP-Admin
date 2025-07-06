import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AttendanceCard = ({ employee, timestamp, type, location }) => {
  const getTypeConfig = (type) => {
    const configs = {
      entry: {
        icon: 'LogIn',
        color: 'text-success',
        bg: 'bg-success-50',
        border: 'border-success-200',
        label: 'Entrée'
      },
      exit: {
        icon: 'LogOut',
        color: 'text-error',
        bg: 'bg-error-50',
        border: 'border-error-200',
        label: 'Sortie'
      }
    };
    return configs[type] || configs.entry;
  };

  const config = getTypeConfig(type);
  const timeString = new Date(timestamp).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-all duration-200">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={employee.avatar}
              alt={employee.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${config.bg} ${config.border} border-2 rounded-full flex items-center justify-center`}>
            <Icon name={config.icon} size={12} className={config.color} />
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium text-text-primary">{employee.name}</h4>
          <p className="text-sm text-text-secondary">{employee.position}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-xs font-medium ${config.color}`}>
              {config.label}
            </span>
            <span className="text-xs text-text-tertiary">•</span>
            <span className="text-xs text-text-tertiary">{timeString}</span>
            {location && (
              <>
                <span className="text-xs text-text-tertiary">•</span>
                <span className="text-xs text-text-tertiary">{location}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;