import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  activeFiltersCount 
}) => {
  const departments = [
    'Tous les départements',
    'Ressources Humaines',
    'Informatique',
    'Finance',
    'Marketing',
    'Ventes',
    'Production',
    'Logistique'
  ];

  const statuses = [
    'Tous les statuts',
    'Actif',
    'Inactif',
    'En attente'
  ];

  const biometricStatuses = [
    'Tous',
    'Inscrit',
    'Non inscrit'
  ];

  const handleDepartmentChange = (e) => {
    const value = e.target.value === 'Tous les départements' ? '' : e.target.value;
    onFilterChange('department', value);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value === 'Tous les statuts' ? '' : e.target.value.toLowerCase();
    onFilterChange('status', value);
  };

  const handleBiometricChange = (e) => {
    const value = e.target.value === 'Tous' ? '' : e.target.value === 'Inscrit';
    onFilterChange('biometric', value);
  };

  const handleDateFromChange = (e) => {
    onFilterChange('dateFrom', e.target.value);
  };

  const handleDateToChange = (e) => {
    onFilterChange('dateTo', e.target.value);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Filtres
        </h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconSize={16}
          >
            Effacer ({activeFiltersCount})
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Département
          </label>
          <select
            value={filters.department || 'Tous les départements'}
            onChange={handleDepartmentChange}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Statut
          </label>
          <select
            value={filters.status ? filters.status.charAt(0).toUpperCase() + filters.status.slice(1) : 'Tous les statuts'}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Biometric Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Biométrie
          </label>
          <select
            value={filters.biometric === '' ? 'Tous' : filters.biometric ? 'Inscrit' : 'Non inscrit'}
            onChange={handleBiometricChange}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {biometricStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Date From Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Embauché depuis
          </label>
          <input
            type="date"
            value={filters.dateFrom || ''}
            onChange={handleDateFromChange}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Date To Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Embauché jusqu'à
          </label>
          <input
            type="date"
            value={filters.dateTo || ''}
            onChange={handleDateToChange}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {filters.department && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                Département: {filters.department}
                <button
                  onClick={() => onFilterChange('department', '')}
                  className="ml-2 hover:text-primary-900"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                Statut: {filters.status.charAt(0).toUpperCase() + filters.status.slice(1)}
                <button
                  onClick={() => onFilterChange('status', '')}
                  className="ml-2 hover:text-primary-900"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.biometric !== '' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                Biométrie: {filters.biometric ? 'Inscrit' : 'Non inscrit'}
                <button
                  onClick={() => onFilterChange('biometric', '')}
                  className="ml-2 hover:text-primary-900"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.dateFrom && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                Depuis: {new Date(filters.dateFrom).toLocaleDateString('fr-FR')}
                <button
                  onClick={() => onFilterChange('dateFrom', '')}
                  className="ml-2 hover:text-primary-900"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.dateTo && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                Jusqu'à: {new Date(filters.dateTo).toLocaleDateString('fr-FR')}
                <button
                  onClick={() => onFilterChange('dateTo', '')}
                  className="ml-2 hover:text-primary-900"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;