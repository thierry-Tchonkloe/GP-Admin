import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AttendanceCard = ({ employee, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-success text-success-foreground';
      case 'late':
        return 'bg-warning text-warning-foreground';
      case 'absent':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-text-secondary text-text-inverse';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'present':
        return 'Présent';
      case 'late':
        return 'En retard';
      case 'absent':
        return 'Absent';
      default:
        return 'Inconnu';
    }
  };

  const formatTime = (time) => {
    if (!time) return '--:--';
    return new Date(time).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotalHours = (punches) => {
    if (!punches || punches.length === 0) return '0h 00m';
    
    let totalMinutes = 0;
    for (let i = 0; i < punches.length - 1; i += 2) {
      if (punches[i + 1]) {
        const entry = new Date(punches[i].time);
        const exit = new Date(punches[i + 1].time);
        totalMinutes += (exit - entry) / (1000 * 60);
      }
    }
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
  };

  const getLastPunchType = (punches) => {
    if (!punches || punches.length === 0) return null;
    return punches[punches.length - 1].type;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-secondary">
              <Image
                src={employee.photo}
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Status Indicator */}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface ${getStatusColor(employee.status)}`}></div>
          </div>
          
          <div>
            <h3 className="font-semibold text-text-primary">{employee.name}</h3>
            <p className="text-sm text-text-secondary">{employee.position}</p>
            <p className="text-xs text-text-tertiary">{employee.department}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
            {getStatusText(employee.status)}
          </span>
          
          <button
            onClick={() => onViewDetails(employee)}
            className="p-1 hover:bg-surface-secondary rounded-full transition-colors duration-200"
          >
            <Icon name="MoreVertical" size={16} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Punch Times */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <Icon name="LogIn" size={14} className="text-success" />
            <span className="text-xs text-text-secondary">Entrée</span>
          </div>
          <p className="text-sm font-medium text-text-primary">
            {employee.punches && employee.punches.length > 0 ? formatTime(employee.punches[0].time) : '--:--'}
          </p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <Icon name="LogOut" size={14} className="text-error" />
            <span className="text-xs text-text-secondary">Sortie</span>
          </div>
          <p className="text-sm font-medium text-text-primary">
            {employee.punches && employee.punches.length > 1 && employee.punches.length % 2 === 0 
              ? formatTime(employee.punches[employee.punches.length - 1].time) 
              : '--:--'}
          </p>
        </div>
      </div>

      {/* Total Hours and Last Action */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="space-y-1">
          <span className="text-xs text-text-secondary">Temps total</span>
          <p className="text-sm font-semibold text-text-primary">
            {calculateTotalHours(employee.punches)}
          </p>
        </div>
        
        {getLastPunchType(employee.punches) && (
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              getLastPunchType(employee.punches) === 'entry' ? 'bg-success' : 'bg-error'
            }`}></div>
            <span className="text-xs text-text-secondary">
              {getLastPunchType(employee.punches) === 'entry' ? 'Entré' : 'Sorti'}
            </span>
          </div>
        )}
      </div>

      {/* Overtime Indicator */}
      {employee.overtime && employee.overtime > 0 && (
        <div className="mt-2 flex items-center space-x-1 text-xs text-warning">
          <Icon name="Clock" size={12} />
          <span>+{employee.overtime}h supplémentaires</span>
        </div>
      )}
    </div>
  );
};

export default AttendanceCard;