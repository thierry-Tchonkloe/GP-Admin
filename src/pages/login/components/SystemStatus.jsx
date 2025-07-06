import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = () => {
  const [systemHealth, setSystemHealth] = useState({
    database: 'online',
    biometricSensors: 'online',
    apiService: 'online',
    lastUpdate: new Date()
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Simulate real-time system monitoring
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        ...prev,
        lastUpdate: new Date()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-success-600';
      case 'warning':
        return 'text-warning-600';
      case 'offline':
        return 'text-error-600';
      default:
        return 'text-text-tertiary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'offline':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return 'En ligne';
      case 'warning':
        return 'Attention';
      case 'offline':
        return 'Hors ligne';
      default:
        return 'Inconnu';
    }
  };

  const systemServices = [
    { key: 'database', name: 'Base de données', status: systemHealth.database },
    { key: 'biometricSensors', name: 'Capteurs biométriques', status: systemHealth.biometricSensors },
    { key: 'apiService', name: 'Service API', status: systemHealth.apiService }
  ];

  const allOnline = systemServices.every(service => service.status === 'online');

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-elevation-1">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${allOnline ? 'bg-success animate-pulse' : 'bg-warning'}`} />
          <div>
            <h3 className="text-sm font-medium text-text-primary">
              État du Système
            </h3>
            <p className="text-xs text-text-secondary">
              {allOnline ? 'Tous les services opérationnels' : 'Vérification en cours'}
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-tertiary"
        />
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border space-y-3">
          {systemServices.map((service) => (
            <div key={service.key} className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">{service.name}</span>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(service.status)} 
                  size={14} 
                  className={getStatusColor(service.status)}
                />
                <span className={`text-xs font-medium ${getStatusColor(service.status)}`}>
                  {getStatusText(service.status)}
                </span>
              </div>
            </div>
          ))}
          
          {/* Last Update */}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-text-tertiary">
              Dernière vérification: {systemHealth.lastUpdate.toLocaleTimeString('fr-FR')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemStatus;