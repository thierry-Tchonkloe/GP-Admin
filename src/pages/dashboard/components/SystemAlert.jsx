import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemAlert = ({ type, title, message, timestamp, onDismiss, actionLabel, onAction }) => {
  const getAlertConfig = (type) => {
    const configs = {
      error: {
        icon: 'AlertTriangle',
        iconColor: 'text-error',
        bg: 'bg-error-50',
        border: 'border-error-200',
        titleColor: 'text-error-700'
      },
      warning: {
        icon: 'AlertCircle',
        iconColor: 'text-warning',
        bg: 'bg-warning-50',
        border: 'border-warning-200',
        titleColor: 'text-warning-700'
      },
      info: {
        icon: 'Info',
        iconColor: 'text-primary',
        bg: 'bg-primary-50',
        border: 'border-primary-200',
        titleColor: 'text-primary-700'
      },
      success: {
        icon: 'CheckCircle',
        iconColor: 'text-success',
        bg: 'bg-success-50',
        border: 'border-success-200',
        titleColor: 'text-success-700'
      }
    };
    return configs[type] || configs.info;
  };

  const config = getAlertConfig(type);
  const timeString = new Date(timestamp).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`${config.bg} border ${config.border} rounded-lg p-4 mb-3`}>
      <div className="flex items-start space-x-3">
        <Icon name={config.icon} size={20} className={config.iconColor} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className={`font-medium ${config.titleColor}`}>{title}</h4>
            <span className="text-xs text-text-tertiary">{timeString}</span>
          </div>
          <p className="text-sm text-text-secondary mt-1">{message}</p>
          
          {(actionLabel || onDismiss) && (
            <div className="flex items-center space-x-2 mt-3">
              {actionLabel && onAction && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={onAction}
                >
                  {actionLabel}
                </Button>
              )}
              {onDismiss && (
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={onDismiss}
                  iconName="X"
                  iconSize={14}
                >
                  Ignorer
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemAlert;