import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EmployeeTable = ({ 
  employees, 
  selectedEmployees, 
  onSelectEmployee, 
  onSelectAll, 
  onViewEmployee, 
  onEditEmployee, 
  onToggleStatus,
  sortConfig,
  onSort 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) {
      return <Icon name="ArrowUpDown" size={16} className="text-text-tertiary" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="text-primary" />
      : <Icon name="ArrowDown" size={16} className="text-primary" />;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-success-100', text: 'text-success-700', label: 'Actif' },
      inactive: { bg: 'bg-error-100', text: 'text-error-700', label: 'Inactif' },
      pending: { bg: 'bg-warning-100', text: 'text-warning-700', label: 'En attente' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-1 ${status === 'active' ? 'bg-success' : status === 'inactive' ? 'bg-error' : 'bg-warning'}`} />
        {config.label}
      </span>
    );
  };

  const getBiometricStatus = (enrolled) => {
    return enrolled ? (
      <Icon name="Fingerprint" size={16} className="text-success" />
    ) : (
      <Icon name="AlertCircle" size={16} className="text-warning" />
    );
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-2">
      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <Input
            type="search"
            placeholder="Rechercher par nom, ID ou département..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-secondary">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Photo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Nom</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('employeeId')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>ID Employé</span>
                  {getSortIcon('employeeId')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('department')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Département</span>
                  {getSortIcon('department')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Position
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('hireDate')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Date d'embauche</span>
                  {getSortIcon('hireDate')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Statut
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Biométrie
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Dernière présence
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredEmployees.map((employee) => (
              <tr 
                key={employee.id} 
                className="hover:bg-surface-secondary transition-colors cursor-pointer"
                onClick={() => onViewEmployee(employee)}
              >
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => onSelectEmployee(employee.id)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-tertiary">
                    <Image
                      src={employee.photo}
                      alt={employee.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-text-primary">{employee.name}</div>
                  <div className="text-sm text-text-secondary">{employee.email}</div>
                </td>
                <td className="px-4 py-4 text-sm text-text-primary font-data">
                  {employee.employeeId}
                </td>
                <td className="px-4 py-4 text-sm text-text-primary">
                  {employee.department}
                </td>
                <td className="px-4 py-4 text-sm text-text-primary">
                  {employee.position}
                </td>
                <td className="px-4 py-4 text-sm text-text-primary">
                  {new Date(employee.hireDate).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-4 py-4">
                  {getStatusBadge(employee.status)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-1">
                    {getBiometricStatus(employee.biometricEnrolled)}
                    <span className="text-xs text-text-secondary">
                      {employee.biometricEnrolled ? '3/3' : '0/3'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-text-secondary">
                  {employee.lastAttendance ? new Date(employee.lastAttendance).toLocaleDateString('fr-FR') : 'Jamais'}
                </td>
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconSize={16}
                      onClick={() => onViewEmployee(employee)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      iconSize={16}
                      onClick={() => onEditEmployee(employee)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName={employee.status === 'active' ? 'UserX' : 'UserCheck'}
                      iconSize={16}
                      onClick={() => onToggleStatus(employee)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden divide-y divide-border">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedEmployees.includes(employee.id)}
                onChange={() => onSelectEmployee(employee.id)}
                className="mt-1 rounded border-border text-primary focus:ring-primary"
              />
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-tertiary flex-shrink-0">
                <Image
                  src={employee.photo}
                  alt={employee.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-text-primary truncate">
                      {employee.name}
                    </h3>
                    <p className="text-xs text-text-secondary">{employee.email}</p>
                    <p className="text-xs text-text-secondary font-data">{employee.employeeId}</p>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconSize={16}
                      onClick={() => onViewEmployee(employee)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      iconSize={16}
                      onClick={() => onEditEmployee(employee)}
                    />
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(employee.status)}
                    <div className="flex items-center space-x-1">
                      {getBiometricStatus(employee.biometricEnrolled)}
                      <span className="text-xs text-text-secondary">
                        {employee.biometricEnrolled ? '3/3' : '0/3'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-text-secondary">
                  <span>{employee.department} • {employee.position}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="mx-auto text-text-tertiary mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">Aucun employé trouvé</h3>
          <p className="text-text-secondary">
            {searchTerm ? 'Aucun résultat pour votre recherche.' : 'Commencez par ajouter des employés.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;