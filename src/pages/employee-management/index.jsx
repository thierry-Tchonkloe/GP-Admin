import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [employees, setEmployees] = useState([]); // 🟢 ajouter ça
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/employes/");

        const formattedData = response.data.map((e) => ({
          id: e.id,
          name: e.full_name,
          email: e.email,
          phone: e.phone,
          employeeId: e.code_unique,
          department: e.department,
          position: e.position,
          hireDate: e.hire_date,
          salary: e.salary,
          status: e.actif ? "active" : "inactive",
          biometricEnrolled: e.fingerprints_enrolled > 0,
          lastAttendance: e.last_attendance,
          photo: e.photo ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(e.full_name)}&background=random&size=150`,
        }));

        setEmployees(formattedData); // 🟢 envoie les données dans le state
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
      }
    };

    fetchData();
  }, []);

  // Filtrer les employés selon les filtres
  const filteredEmployees = employees.filter(employee => {
    if (filters.department && employee.department !== filters.department) return false;
    if (filters.status && employee.status !== filters.status) return false;
    if (filters.biometric !== '' && employee.biometricEnrolled !== (filters.biometric === 'true')) return false;
    if (filters.dateFrom && new Date(employee.hireDate) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(employee.hireDate) > new Date(filters.dateTo)) return false;
    return true;
  });

  // Trier les employés filtrés
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmployees(
      selectedEmployees.length === sortedEmployees.length
        ? []
        : sortedEmployees.map(emp => emp.id)
    );
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
  };

  const handleExport = (format) => {
    console.log('Exporting in format:', format);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEmployee(null);
  };

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
