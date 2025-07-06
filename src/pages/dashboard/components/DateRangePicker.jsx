import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DateRangePicker = ({ onDateChange, initialStartDate, initialEndDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(initialStartDate || new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(initialEndDate || new Date().toISOString().split('T')[0]);

  const quickRanges = [
    {
      label: 'Aujourd\'hui',
      getValue: () => {
        const today = new Date().toISOString().split('T')[0];
        return { start: today, end: today };
      }
    },
    {
      label: 'Cette semaine',
      getValue: () => {
        const today = new Date();
        const monday = new Date(today);
        monday.setDate(today.getDate() - today.getDay() + 1);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        return {
          start: monday.toISOString().split('T')[0],
          end: sunday.toISOString().split('T')[0]
        };
      }
    },
    {
      label: 'Ce mois',
      getValue: () => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return {
          start: firstDay.toISOString().split('T')[0],
          end: lastDay.toISOString().split('T')[0]
        };
      }
    },
    {
      label: '7 derniers jours',
      getValue: () => {
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        return {
          start: sevenDaysAgo.toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        };
      }
    }
  ];

  const handleQuickRange = (range) => {
    const dates = range.getValue();
    setStartDate(dates.start);
    setEndDate(dates.end);
    if (onDateChange) {
      onDateChange(dates.start, dates.end);
    }
    setIsOpen(false);
  };

  const handleApply = () => {
    if (onDateChange) {
      onDateChange(startDate, endDate);
    }
    setIsOpen(false);
  };

  const formatDisplayDate = (start, end) => {
    const startFormatted = new Date(start).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
    const endFormatted = new Date(end).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
    
    if (start === end) {
      return startFormatted;
    }
    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Calendar"
        iconPosition="left"
        className="min-w-48"
      >
        {formatDisplayDate(startDate, endDate)}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-200" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-lg shadow-elevation-3 z-300">
            <div className="p-4">
              <h4 className="font-medium text-text-primary mb-3">Sélectionner une période</h4>
              
              {/* Quick Ranges */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {quickRanges.map((range, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickRange(range)}
                    className="justify-start text-xs"
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
              
              {/* Custom Date Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Date de début
                  </label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Date de fin
                  </label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-end space-x-2 mt-4 pt-3 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  Annuler
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleApply}
                >
                  Appliquer
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateRangePicker;