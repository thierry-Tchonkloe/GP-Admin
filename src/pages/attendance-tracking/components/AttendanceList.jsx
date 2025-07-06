import React, { useState } from 'react';
import AttendanceCard from './AttendanceCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceList = ({ attendanceData, onViewDetails, onRefresh, isLoading }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleRefresh = () => {
    onRefresh();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg p-4 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-surface-secondary rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-surface-secondary rounded w-32 mb-2"></div>
                <div className="h-3 bg-surface-secondary rounded w-24"></div>
              </div>
              <div className="h-6 bg-surface-secondary rounded w-16"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="h-8 bg-surface-secondary rounded"></div>
              <div className="h-8 bg-surface-secondary rounded"></div>
            </div>
            <div className="h-4 bg-surface-secondary rounded w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* List Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-text-primary">
            Liste de présence
          </h3>
          <div className="flex items-center space-x-1 text-sm text-text-secondary">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Mise à jour en temps réel</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-surface-secondary rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all duration-200 ${
                viewMode === 'grid' ?'bg-surface text-text-primary shadow-elevation-1' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all duration-200 ${
                viewMode === 'list' ?'bg-surface text-text-primary shadow-elevation-1' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="List" size={16} />
            </button>
          </div>
          
          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            iconName="RefreshCw"
            iconSize={16}
          >
            Actualiser
          </Button>
        </div>
      </div>

      {/* Attendance Cards */}
      {attendanceData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icon name="Users" size={48} className="text-text-tertiary mb-4" />
          <h4 className="text-lg font-medium text-text-primary mb-2">Aucune donnée de présence</h4>
          <p className="text-text-secondary mb-4">
            Aucun employé n'a encore pointé aujourd'hui
          </p>
          <Button
            variant="primary"
            onClick={handleRefresh}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Actualiser les données
          </Button>
        </div>
      ) : (
        <div className={`
          ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' :'space-y-3'
          }
        `}>
          {attendanceData.map(employee => (
            <AttendanceCard
              key={employee.id}
              employee={employee}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}

      {/* Quick Stats */}
      {attendanceData.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-success-50 border border-success-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-success">
              {attendanceData.filter(emp => emp.status === 'present').length}
            </p>
            <p className="text-sm text-success-700">Présents</p>
          </div>
          
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-warning">
              {attendanceData.filter(emp => emp.status === 'late').length}
            </p>
            <p className="text-sm text-warning-700">En retard</p>
          </div>
          
          <div className="bg-error-50 border border-error-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-error">
              {attendanceData.filter(emp => emp.status === 'absent').length}
            </p>
            <p className="text-sm text-error-700">Absents</p>
          </div>
          
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {attendanceData.reduce((total, emp) => {
                return total + (emp.punches ? emp.punches.length : 0);
              }, 0)}
            </p>
            <p className="text-sm text-primary-700">Pointages</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceList;