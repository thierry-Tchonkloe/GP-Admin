import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AttendanceTable = ({ data, onSort, onFilter }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const attendanceData = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'Marie Dubois',
      department: 'Ressources Humaines',
      date: '2024-01-15',
      checkIn: '08:30',
      checkOut: '17:45',
      hoursWorked: '8h 45m',
      status: 'present',
      overtime: '0h 45m',
      punctuality: 'on-time'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Jean Martin',
      department: 'Informatique',
      date: '2024-01-15',
      checkIn: '09:15',
      checkOut: '18:00',
      hoursWorked: '8h 45m',
      status: 'present',
      overtime: '1h 00m',
      punctuality: 'late'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Sophie Laurent',
      department: 'Comptabilité',
      date: '2024-01-15',
      checkIn: '08:00',
      checkOut: '17:30',
      hoursWorked: '9h 30m',
      status: 'present',
      overtime: '1h 30m',
      punctuality: 'early'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Pierre Moreau',
      department: 'Marketing',
      date: '2024-01-15',
      checkIn: '-',
      checkOut: '-',
      hoursWorked: '0h 00m',
      status: 'absent',
      overtime: '0h 00m',
      punctuality: 'absent'
    },
    {
      id: 5,
      employeeId: 'EMP005',
      name: 'Claire Bernard',
      department: 'Ventes',
      date: '2024-01-15',
      checkIn: '08:45',
      checkOut: '17:15',
      hoursWorked: '8h 30m',
      status: 'present',
      overtime: '0h 30m',
      punctuality: 'on-time'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      present: { color: 'bg-success text-success-foreground', label: 'Présent' },
      absent: { color: 'bg-error text-error-foreground', label: 'Absent' },
      late: { color: 'bg-warning text-warning-foreground', label: 'En retard' },
      'half-day': { color: 'bg-accent text-accent-foreground', label: 'Demi-journée' }
    };
    
    const config = statusConfig[status] || statusConfig.absent;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPunctualityIcon = (punctuality) => {
    const iconConfig = {
      'on-time': { icon: 'CheckCircle', color: 'text-success' },
      'late': { icon: 'Clock', color: 'text-warning' },
      'early': { icon: 'Zap', color: 'text-primary' },
      'absent': { icon: 'XCircle', color: 'text-error' }
    };
    
    const config = iconConfig[punctuality] || iconConfig.absent;
    return <Icon name={config.icon} size={16} className={config.color} />;
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    onSort && onSort(key, direction);
  };

  const filteredData = attendanceData.filter(item =>
    item.name.toLowerCase().includes(filterText.toLowerCase()) ||
    item.department.toLowerCase().includes(filterText.toLowerCase()) ||
    item.employeeId.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-tertiary" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-1">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h3 className="text-lg font-semibold text-text-primary">Détails de Présence</h3>
          
          {/* Search and Filters */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <Input
                type="text"
                placeholder="Rechercher employé..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm" iconName="Filter">
              Filtrer
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-secondary">
            <tr>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  <span>Employé</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  <span>Département</span>
                  {getSortIcon('department')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('checkIn')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  <span>Arrivée</span>
                  {getSortIcon('checkIn')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('checkOut')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  <span>Départ</span>
                  {getSortIcon('checkOut')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('hoursWorked')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  <span>Heures</span>
                  {getSortIcon('hoursWorked')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-text-primary">Statut</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-text-primary">Ponctualité</span>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('overtime')}
                  className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  <span>Heures Sup.</span>
                  {getSortIcon('overtime')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.map((row) => (
              <tr key={row.id} className="hover:bg-surface-secondary transition-colors duration-200">
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{row.name}</p>
                    <p className="text-xs text-text-secondary">{row.employeeId}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary">{row.department}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary font-data">{row.checkIn}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary font-data">{row.checkOut}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary font-data">{row.hoursWorked}</span>
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(row.status)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    {getPunctualityIcon(row.punctuality)}
                    <span className="text-sm text-text-secondary capitalize">{row.punctuality}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-primary font-data">{row.overtime}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Affichage {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} sur {filteredData.length} résultats
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              iconName="ChevronLeft"
            />
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              iconName="ChevronRight"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;