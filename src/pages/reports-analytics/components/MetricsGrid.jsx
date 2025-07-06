import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsGrid = ({ metrics }) => {
  const getMetricIcon = (type) => {
    const iconMap = {
      attendance: 'Users',
      punctuality: 'Clock',
      overtime: 'Timer',
      absence: 'UserX',
      productivity: 'TrendingUp',
      cost: 'DollarSign'
    };
    return iconMap[type] || 'BarChart3';
  };

  const getMetricColor = (type) => {
    const colorMap = {
      attendance: 'text-primary',
      punctuality: 'text-success',
      overtime: 'text-warning',
      absence: 'text-error',
      productivity: 'text-accent',
      cost: 'text-secondary'
    };
    return colorMap[type] || 'text-primary';
  };

  const getBackgroundColor = (type) => {
    const bgMap = {
      attendance: 'bg-primary-50',
      punctuality: 'bg-success-50',
      overtime: 'bg-warning-50',
      absence: 'bg-error-50',
      productivity: 'bg-accent-50',
      cost: 'bg-secondary-50'
    };
    return bgMap[type] || 'bg-primary-50';
  };

  const formatValue = (value, format) => {
    switch (format) {
      case 'percentage':
        return `${value}%`;
      case 'currency':
        return `${value.toLocaleString()} FCFA`;
      case 'time':
        return `${value}h`;
      case 'number':
        return value.toLocaleString();
      default:
        return value;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-surface border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${getBackgroundColor(metric.type)} flex items-center justify-center`}>
              <Icon 
                name={getMetricIcon(metric.type)} 
                size={20} 
                className={getMetricColor(metric.type)}
              />
            </div>
            {metric.trend && (
              <div className={`flex items-center space-x-1 ${metric.trend > 0 ? 'text-success' : 'text-error'}`}>
                <Icon 
                  name={metric.trend > 0 ? 'TrendingUp' : 'TrendingDown'} 
                  size={16} 
                />
                <span className="text-xs font-medium">
                  {Math.abs(metric.trend)}%
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-text-primary">
              {formatValue(metric.value, metric.format)}
            </h3>
            <p className="text-sm text-text-secondary">{metric.label}</p>
            {metric.subtitle && (
              <p className="text-xs text-text-tertiary">{metric.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;