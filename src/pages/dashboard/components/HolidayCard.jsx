import React from 'react';
import Icon from '../../../components/AppIcon';

const HolidayCard = ({ holidays }) => {
  const upcomingHolidays = [
    {
      id: 1,
      name: 'Fête de l\'Indépendance',
      date: '2024-08-15',
      type: 'national',
      daysLeft: 12
    },
    {
      id: 2,
      name: 'Aïd al-Fitr',
      date: '2024-09-02',
      type: 'religious',
      daysLeft: 30
    },
    {
      id: 3,
      name: 'Journée de la Jeunesse',
      date: '2024-09-20',
      type: 'national',
      daysLeft: 48
    }
  ];

  const getTypeConfig = (type) => {
    const configs = {
      national: {
        icon: 'Flag',
        color: 'text-primary',
        bg: 'bg-primary-50'
      },
      religious: {
        icon: 'Star',
        color: 'text-accent',
        bg: 'bg-accent-50'
      },
      company: {
        icon: 'Building',
        color: 'text-secondary',
        bg: 'bg-secondary-50'
      }
    };
    return configs[type] || configs.national;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long'
    });
  };

  const data = holidays || upcomingHolidays;

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Jours Fériés</h3>
        <Icon name="Calendar" size={20} className="text-text-secondary" />
      </div>
      
      <div className="space-y-3">
        {data.map((holiday) => {
          const config = getTypeConfig(holiday.type);
          
          return (
            <div key={holiday.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors duration-200">
              <div className={`w-10 h-10 ${config.bg} rounded-lg flex items-center justify-center`}>
                <Icon name={config.icon} size={16} className={config.color} />
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-text-primary text-sm">{holiday.name}</h4>
                <p className="text-xs text-text-secondary">{formatDate(holiday.date)}</p>
              </div>
              
              <div className="text-right">
                <span className="text-xs font-medium text-text-tertiary">
                  {holiday.daysLeft} jours
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={32} className="text-text-tertiary mx-auto mb-2" />
          <p className="text-sm text-text-secondary">Aucun jour férié à venir</p>
        </div>
      )}
    </div>
  );
};

export default HolidayCard;