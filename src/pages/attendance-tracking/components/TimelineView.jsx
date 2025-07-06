import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const TimelineView = ({ selectedDate, attendanceData }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const generateTimelineEvents = () => {
    const events = [];
    
    attendanceData.forEach(employee => {
      if (employee.punches && employee.punches.length > 0) {
        employee.punches.forEach((punch, index) => {
          events.push({
            id: `${employee.id}-${index}`,
            employeeId: employee.id,
            employeeName: employee.name,
            employeePhoto: employee.photo,
            time: punch.time,
            type: punch.type,
            punchNumber: index + 1,
            isOdd: (index + 1) % 2 === 1
          });
        });
      }
    });

    return events.sort((a, b) => new Date(a.time) - new Date(b.time));
  };

  const timelineEvents = generateTimelineEvents();

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeForGroup = (time) => {
    return new Date(time).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getEventIcon = (type, isOdd) => {
    if (isOdd) {
      return { icon: 'LogIn', color: 'text-success', bg: 'bg-success-50' };
    } else {
      return { icon: 'LogOut', color: 'text-error', bg: 'bg-error-50' };
    }
  };

  const groupEventsByHour = (events) => {
    const groups = {};
    events.forEach(event => {
      const hour = new Date(event.time).getHours();
      if (!groups[hour]) {
        groups[hour] = [];
      }
      groups[hour].push(event);
    });
    return groups;
  };

  const eventGroups = groupEventsByHour(timelineEvents);

  return (
    <div className="bg-surface border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-text-primary">Timeline Quotidienne</h3>
            <p className="text-sm text-text-secondary">
              {new Date(selectedDate).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Entrée</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span>Sortie</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {timelineEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Icon name="Clock" size={48} className="text-text-tertiary mb-4" />
            <h4 className="text-lg font-medium text-text-primary mb-2">Aucun événement</h4>
            <p className="text-text-secondary">Aucune activité enregistrée pour cette date</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(eventGroups).map(([hour, events]) => (
              <div key={hour} className="relative">
                {/* Hour Header */}
                <div className="flex items-center mb-4">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {hour.toString().padStart(2, '0')}:00
                  </div>
                  <div className="flex-1 h-px bg-border ml-4"></div>
                </div>

                {/* Events for this hour */}
                <div className="space-y-3 ml-4">
                  {events.map((event, index) => {
                    const eventStyle = getEventIcon(event.type, event.isOdd);
                    
                    return (
                      <div key={event.id} className="flex items-center space-x-3 group">
                        {/* Timeline Dot */}
                        <div className={`w-8 h-8 rounded-full ${eventStyle.bg} flex items-center justify-center flex-shrink-0`}>
                          <Icon name={eventStyle.icon} size={16} className={eventStyle.color} />
                        </div>

                        {/* Event Content */}
                        <div className="flex-1 bg-surface-secondary rounded-lg p-3 group-hover:shadow-elevation-1 transition-all duration-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full overflow-hidden bg-surface">
                                <img
                                  src={event.employeePhoto}
                                  alt={event.employeeName}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = '/assets/images/no_image.png';
                                  }}
                                />
                              </div>
                              
                              <div>
                                <p className="font-medium text-text-primary">{event.employeeName}</p>
                                <p className="text-xs text-text-secondary">
                                  {event.isOdd ? 'Entrée' : 'Sortie'} #{event.punchNumber}
                                </p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-medium text-text-primary">{formatTimeForGroup(event.time)}</p>
                              <p className="text-xs text-text-secondary">
                                {event.isOdd ? 'Pointage impair' : 'Pointage pair'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-surface-secondary">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-text-primary">{timelineEvents.filter(e => e.isOdd).length}</p>
            <p className="text-xs text-text-secondary">Entrées</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-text-primary">{timelineEvents.filter(e => !e.isOdd).length}</p>
            <p className="text-xs text-text-secondary">Sorties</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-text-primary">{new Set(timelineEvents.map(e => e.employeeId)).size}</p>
            <p className="text-xs text-text-secondary">Employés actifs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;