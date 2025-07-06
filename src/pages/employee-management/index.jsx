import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MobileNavigation from '../../components/ui/MobileNavigation';
import EmployeeTable from './components/EmployeeTable';
import FilterPanel from './components/FilterPanel';
import ActionPanel from './components/ActionPanel';
import EmployeeDetailModal from './components/EmployeeDetailModal';

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    biometric: '',
    dateFrom: '',
    dateTo: ''
  });

  // Mock employee data
  const [employees] = useState([
    {
      id: 1,
      name: "Amadou Diallo",
      email: "amadou.diallo@company.com",
      phone: "+221 77 123 4567",
      employeeId: "EMP001",
      department: "Informatique",
      position: "Développeur Senior",
      hireDate: "2023-01-15",
      salary: 850000,
      status: "active",
      biometricEnrolled: true,
      lastAttendance: "2024-01-15T08:30:00",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Fatou Sow",
      email: "fatou.sow@company.com",
      phone: "+221 76 234 5678",
      employeeId: "EMP002",
      department: "Ressources Humaines",
      position: "Responsable RH",
      hireDate: "2022-11-20",
      salary: 950000,
      status: "active",
      biometricEnrolled: true,
      lastAttendance: "2024-01-15T08:15:00",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Ousmane Ba",
      email: "ousmane.ba@company.com",
      phone: "+221 78 345 6789",
      employeeId: "EMP003",
      department: "Finance",
      position: "Comptable",
      hireDate: "2023-03-10",
      salary: 650000,
      status: "active",
      biometricEnrolled: false,
      lastAttendance: "2024-01-14T09:00:00",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Aïssatou Ndiaye",
      email: "aissatou.ndiaye@company.com",
      phone: "+221 77 456 7890",
      employeeId: "EMP004",
      department: "Marketing",
      position: "Chef de Projet",
      hireDate: "2023-06-01",
      salary: 750000,
      status: "active",
      biometricEnrolled: true,
      lastAttendance: "2024-01-15T08:45:00",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Mamadou Cissé",
      email: "mamadou.cisse@company.com",
      phone: "+221 76 567 8901",
      employeeId: "EMP005",
      department: "Ventes",
      position: "Commercial",
      hireDate: "2023-08-15",
      salary: 550000,
      status: "inactive",
      biometricEnrolled: false,
      lastAttendance: "2024-01-10T08:30:00",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Khady Fall",
      email: "khady.fall@company.com",
      phone: "+221 78 678 9012",
      employeeId: "EMP006",
      department: "Production",
      position: "Superviseur",
      hireDate: "2022-09-20",
      salary: 700000,
      status: "active",
      biometricEnrolled: true,
      lastAttendance: "2024-01-15T07:45:00",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 7,
      name: "Ibrahima Sarr",
      email: "ibrahima.sarr@company.com",
      phone: "+221 77 789 0123",
      employeeId: "EMP007",
      department: "Logistique",
      position: "Responsable Entrepôt",
      hireDate: "2023-04-12",
      salary: 600000,
      status: "pending",
      biometricEnrolled: false,
      lastAttendance: null,
      photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 8,
      name: "Mariama Diop",
      email: "mariama.diop@company.com",
      phone: "+221 76 890 1234",
      employeeId: "EMP008",
      department: "Informatique",
      position: "Analyste Système",
      hireDate: "2023-07-03",
      salary: 720000,
      status: "active",
      biometricEnrolled: true,
      lastAttendance: "2024-01-15T08:20:00",
      photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
    }
  ]);

  // Filter employees based on current filters
  const filteredEmployees = employees.filter(employee => {
    if (filters.department && employee.department !== filters.department) return false;
    if (filters.status && employee.status !== filters.status) return false;
    if (filters.biometric !== '' && employee.biometricEnrolled !== filters.biometric) return false;
    if (filters.dateFrom && new Date(employee.hireDate) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(employee.hireDate) > new Date(filters.dateTo)) return false;
    return true;
  });

  // Sort employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Calculate active filters count
  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === sortedEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(sortedEmployees.map(emp => emp.id));
    }
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    navigate('/employee-registration', { state: { employee } });
  };

  const handleToggleStatus = (employee) => {
    console.log('Toggle status for:', employee.name);
    // Implementation for status toggle
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      department: '',
      status: '',
      biometric: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleAddEmployee = () => {
    navigate('/employee-registration');
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for employees:', selectedEmployees);
    // Implementation for bulk actions
    if (action === 'biometric') {
      // Navigate to biometric management
      console.log('Opening biometric management for selected employees');
    }
  };

  const handleExport = (format) => {
    console.log('Exporting in format:', format);
    // Implementation for export functionality
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEmployee(null);
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={handleToggleSidebar} isSidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-60 pt-16 pb-20 lg:pb-8">
        <div className="px-4 lg:px-6 py-6">
          <Breadcrumb />
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">Gestion des Employés</h1>
                  <p className="text-text-secondary mt-1">
                    Gérez les informations et la présence de vos employés
                  </p>
                </div>
                <div className="hidden lg:block">
                  <span className="text-sm text-text-secondary">
                    {sortedEmployees.length} employé{sortedEmployees.length > 1 ? 's' : ''} 
                    {activeFiltersCount > 0 && ` (${activeFiltersCount} filtre${activeFiltersCount > 1 ? 's' : ''})`}
                  </span>
                </div>
              </div>

              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                activeFiltersCount={activeFiltersCount}
              />

              <EmployeeTable
                employees={sortedEmployees}
                selectedEmployees={selectedEmployees}
                onSelectEmployee={handleSelectEmployee}
                onSelectAll={handleSelectAll}
                onViewEmployee={handleViewEmployee}
                onEditEmployee={handleEditEmployee}
                onToggleStatus={handleToggleStatus}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </div>

            {/* Action Panel */}
            <div className="lg:w-80">
              <ActionPanel
                selectedCount={selectedEmployees.length}
                totalCount={employees.length}
                onAddEmployee={handleAddEmployee}
                onBulkAction={handleBulkAction}
                onExport={handleExport}
              />
            </div>
          </div>
        </div>
      </main>

      <MobileNavigation />

      <EmployeeDetailModal
        employee={selectedEmployee}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onEdit={handleEditEmployee}
      />
    </div>
  );
};

export default EmployeeManagement;