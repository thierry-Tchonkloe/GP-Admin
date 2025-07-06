import React, { useState } from 'react';
import AttendanceCard from './AttendanceCard';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const [showAll, setShowAll] = useState(false);

  const recentActivities = [
    {
      id: 1,
      employee: {
        name: 'Marie Kouassi',
        position: 'Développeuse',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      timestamp: new Date(Date.now() - 300000),
      type: 'entry',
      location: 'Bureau Principal'
    },
    {
      id: 2,
      employee: {
        name: 'Jean Baptiste',
        position: 'Chef de Projet',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      timestamp: new Date(Date.now() - 600000),
      type: 'exit',
      location: 'Bureau Principal'
    },
    {
      id: 3,
      employee: {
        name: 'Fatou Diallo',
        position: 'Comptable',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      timestamp: new Date(Date.now() - 900000),
      type: 'entry',
      location: 'Bureau Principal'
    },
    {
      id: 4,
      employee: {
        name: 'Amadou Traoré',
        position: 'Technicien',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      timestamp: new Date(Date.now() - 1200000),
      type: 'entry',
      location: 'Atelier'
    },
    {
      id: 5,
      employee: {
        name: 'Aisha Kone',
        position: 'Assistante RH',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
      },
      timestamp: new Date(Date.now() - 1500000),
      type: 'exit',
      location: 'Bureau Principal'
    },
    {
      id: 6,
      employee: {
        name: 'Ibrahim Sanogo',
        position: 'Vendeur',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
      },
      timestamp: new Date(Date.now() - 1800000),
      type: 'entry',
      location: 'Magasin'
    }
  ];

  const displayedActivities = showAll ? recentActivities : recentActivities.slice(0, 4);

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Activité Récente</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full biometric-pulse" />
          <span className="text-xs text-success-700 font-medium">En direct</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {displayedActivities.map((activity) => (
          <AttendanceCard
            key={activity.id}
            employee={activity.employee}
            timestamp={activity.timestamp}
            type={activity.type}
            location={activity.location}
          />
        ))}
      </div>
      
      {recentActivities.length > 4 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            iconName={showAll ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
            fullWidth
            className="justify-center"
          >
            {showAll ? 'Voir moins' : `Voir ${recentActivities.length - 4} de plus`}
          </Button>
        </div>
      )}
      
      {recentActivities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={32} className="text-text-tertiary mx-auto mb-2" />
          <p className="text-sm text-text-secondary">Aucune activité récente</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;