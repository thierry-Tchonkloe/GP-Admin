import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, color, subtitle }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      green: {
        bg: 'bg-success-50',
        border: 'border-success-200',
        icon: 'bg-success text-success-foreground',
        text: 'text-success-700'
      },
      yellow: {
        bg: 'bg-warning-50',
        border: 'border-warning-200',
        icon: 'bg-warning text-warning-foreground',
        text: 'text-warning-700'
      },
      red: {
        bg: 'bg-error-50',
        border: 'border-error-200',
        icon: 'bg-error text-error-foreground',
        text: 'text-error-700'
      },
      blue: {
        bg: 'bg-primary-50',
        border: 'border-primary-200',
        icon: 'bg-primary text-primary-foreground',
        text: 'text-primary-700'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  const colors = getColorClasses(color);

  return (
    <div className={`bg-surface border ${colors.border} rounded-lg p-6 shadow-elevation-1 transition-all duration-200 hover:shadow-elevation-2`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center`}>
              <Icon name={icon} size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
              <p className="text-2xl font-bold text-text-primary mt-1">{value}</p>
              {subtitle && (
                <p className="text-xs text-text-tertiary mt-1">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
        
        {change && (
          <div className={`flex items-center space-x-1 ${changeType === 'increase' ? 'text-success' : 'text-error'}`}>
            <Icon 
              name={changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
            />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;