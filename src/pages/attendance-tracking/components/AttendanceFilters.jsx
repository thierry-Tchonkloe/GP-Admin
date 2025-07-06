import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AttendanceFilters = ({ 
  onDateRangeChange, 
  onDepartmentChange, 
  onSearchChange, 
  onStatusFilter,
  onSortChange,
  totalCount,
  filteredCount 
}) => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const departments = [
    { value: 'all', label: 'Tous les départements' },
    { value: 'rh', label: 'Ressources Humaines' },
    { value: 'it', label: 'Informatique' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'operations', label: 'Opérations' }
  ];

  const statusFilters = [
    { value: 'all', label: 'Tous', color: 'text-text-primary' },
    { value: 'present', label: 'Présent', color: 'text-success' },
    { value: 'absent', label: 'Absent', color: 'text-error' },
    { value: 'late', label: 'En retard', color: 'text-warning' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Nom' },
    { value: 'time', label: 'Heure' },
    { value: 'department', label: 'Département' }
  ];

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    onDateRangeChange({ start: newStartDate, end: endDate });
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    onDateRangeChange({ start: startDate, end: newEndDate });
  };

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    onDepartmentChange(department);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    onSearchChange(search);
  };

  const handleStatusFilter = (status) => {
    setActiveStatus(status);
    onStatusFilter(status);
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortBy(sort);
    onSortChange(sort);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6 shadow-elevation-1">
      {/* Top Row - Date Range and Department */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Date de début</label>
          <Input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Date de fin</label>
          <Input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Département</label>
          <select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {departments.map(dept => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Middle Row - Search and Sort */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <Input
            type="search"
            placeholder="Rechercher un employé..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Trier par</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bottom Row - Status Filters and Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {statusFilters.map(status => (
            <Button
              key={status.value}
              variant={activeStatus === status.value ? "primary" : "ghost"}
              size="sm"
              onClick={() => handleStatusFilter(status.value)}
              className={`${status.color} ${activeStatus === status.value ? '' : 'hover:bg-surface-secondary'}`}
            >
              {status.label}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <span>
            Affichage: <span className="font-medium text-text-primary">{filteredCount}</span> sur <span className="font-medium text-text-primary">{totalCount}</span>
          </span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs">Temps réel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilters;