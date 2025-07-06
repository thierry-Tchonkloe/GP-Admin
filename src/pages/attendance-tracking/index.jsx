import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MobileNavigation from '../../components/ui/MobileNavigation';
import AttendanceFilters from './components/AttendanceFilters';
import AttendanceList from './components/AttendanceList';
import TimelineView from './components/TimelineView';
import ExportPanel from './components/ExportPanel';

import Button from '../../components/ui/Button';

const AttendanceTracking = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [activeView, setActiveView] = useState('split'); // 'split', 'list', 'timeline'
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: selectedDate, end: selectedDate },
    department: 'all',
    search: '',
    status: 'all',
    sort: 'name'
  });

  // Mock attendance data
  const mockAttendanceData = [
    {
      id: 1,
      name: "Amadou Diallo",
      position: "Développeur Senior",
      department: "Informatique",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "present",
      punches: [
        { time: new Date().setHours(8, 15, 0), type: "entry" },
        { time: new Date().setHours(12, 30, 0), type: "exit" },
        { time: new Date().setHours(13, 30, 0), type: "entry" }
      ],
      overtime: 0
    },
    {
      id: 2,
      name: "Fatou Sow",
      position: "Responsable RH",
      department: "Ressources Humaines",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "present",
      punches: [
        { time: new Date().setHours(8, 0, 0), type: "entry" },
        { time: new Date().setHours(12, 0, 0), type: "exit" },
        { time: new Date().setHours(13, 0, 0), type: "entry" },
        { time: new Date().setHours(17, 30, 0), type: "exit" }
      ],
      overtime: 0.5
    },
    {
      id: 3,
      name: "Moussa Traoré",
      position: "Analyste Financier",
      department: "Finance",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      status: "late",
      punches: [
        { time: new Date().setHours(9, 45, 0), type: "entry" }
      ],
      overtime: 0
    },
    {
      id: 4,
      name: "Aïcha Koné",
      position: "Chef Marketing",
      department: "Marketing",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "absent",
      punches: [],
      overtime: 0
    },
    {
      id: 5,
      name: "Ibrahim Camara",
      position: "Technicien IT",
      department: "Informatique",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      status: "present",
      punches: [
        { time: new Date().setHours(7, 30, 0), type: "entry" },
        { time: new Date().setHours(11, 45, 0), type: "exit" },
        { time: new Date().setHours(12, 45, 0), type: "entry" }
      ],
      overtime: 0
    },
    {
      id: 6,
      name: "Mariama Bah",
      position: "Assistante Administrative",
      department: "Operations",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      status: "present",
      punches: [
        { time: new Date().setHours(8, 30, 0), type: "entry" }
      ],
      overtime: 0
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredData(mockAttendanceData);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...mockAttendanceData];

    // Department filter
    if (filters.department !== 'all') {
      filtered = filtered.filter(emp => 
        emp.department.toLowerCase().includes(filters.department.toLowerCase())
      );
    }

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        emp.position.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(emp => emp.status === filters.status);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'time':
          const aTime = a.punches.length > 0 ? new Date(a.punches[0].time) : new Date(0);
          const bTime = b.punches.length > 0 ? new Date(b.punches[0].time) : new Date(0);
          return aTime - bTime;
        case 'department':
          return a.department.localeCompare(b.department);
        default:
          return 0;
      }
    });

    setFilteredData(filtered);
  }, [filters]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDateRangeChange = (range) => {
    setFilters(prev => ({ ...prev, dateRange: range }));
    setSelectedDate(range.start);
  };

  const handleDepartmentChange = (department) => {
    setFilters(prev => ({ ...prev, department }));
  };

  const handleSearchChange = (search) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleStatusFilter = (status) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const handleSortChange = (sort) => {
    setFilters(prev => ({ ...prev, sort }));
  };

  const handleViewDetails = (employee) => {
    console.log('View details for:', employee);
    // Navigate to employee details or open modal
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate new data
      console.log('Data refreshed');
    }, 1000);
  };

  const handleExport = async (exportData) => {
    console.log('Exporting data:', exportData);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowExportPanel(false);
    // Show success message
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'add-employee': navigate('/employee-registration');
        break;
      case 'view-reports': navigate('/reports-analytics');
        break;
      case 'settings': navigate('/system-settings');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-60' : 'lg:ml-60'} pt-16 pb-20 lg:pb-4`}>
        <div className="p-4 lg:p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">Suivi de Présence</h1>
              <p className="text-text-secondary">
                Surveillance en temps réel de la présence des employés avec capteurs biométriques
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              {/* View Toggle */}
              <div className="hidden lg:flex items-center bg-surface-secondary rounded-lg p-1">
                <button
                  onClick={() => setActiveView('split')}
                  className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                    activeView === 'split' ?'bg-surface text-text-primary shadow-elevation-1' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Vue partagée
                </button>
                <button
                  onClick={() => setActiveView('list')}
                  className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                    activeView === 'list' ?'bg-surface text-text-primary shadow-elevation-1' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Liste seule
                </button>
                <button
                  onClick={() => setActiveView('timeline')}
                  className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                    activeView === 'timeline' ?'bg-surface text-text-primary shadow-elevation-1' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Timeline seule
                </button>
              </div>

              {/* Quick Actions */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuickAction('add-employee')}
                iconName="UserPlus"
                iconSize={16}
                className="hidden lg:flex"
              >
                Ajouter
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowExportPanel(true)}
                iconName="Download"
                iconSize={16}
              >
                Exporter
              </Button>
            </div>
          </div>

          {/* Filters */}
          <AttendanceFilters
            onDateRangeChange={handleDateRangeChange}
            onDepartmentChange={handleDepartmentChange}
            onSearchChange={handleSearchChange}
            onStatusFilter={handleStatusFilter}
            onSortChange={handleSortChange}
            totalCount={mockAttendanceData.length}
            filteredCount={filteredData.length}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Attendance List */}
            <div className={`
              ${activeView === 'split' ? 'lg:col-span-7' : 
                activeView === 'list'? 'lg:col-span-12' : 'hidden lg:block lg:col-span-0'}
            `}>
              {(activeView === 'split' || activeView === 'list') && (
                <AttendanceList
                  attendanceData={filteredData}
                  onViewDetails={handleViewDetails}
                  onRefresh={handleRefresh}
                  isLoading={isLoading}
                />
              )}
            </div>

            {/* Timeline View */}
            <div className={`
              ${activeView === 'split' ? 'lg:col-span-5' : 
                activeView === 'timeline'? 'lg:col-span-12' : 'hidden lg:block lg:col-span-0'}
            `}>
              {(activeView === 'split' || activeView === 'timeline') && (
                <TimelineView
                  selectedDate={selectedDate}
                  attendanceData={filteredData}
                />
              )}
            </div>
          </div>

          {/* Mobile View Toggle */}
          <div className="lg:hidden mt-6">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant={activeView === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('list')}
                iconName="List"
                iconSize={16}
              >
                Liste
              </Button>
              <Button
                variant={activeView === 'timeline' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('timeline')}
                iconName="Clock"
                iconSize={16}
              >
                Timeline
              </Button>
            </div>
          </div>

          {/* Quick Actions Mobile */}
          <div className="lg:hidden mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleQuickAction('add-employee')}
              iconName="UserPlus"
              iconPosition="left"
            >
              Ajouter Employé
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickAction('view-reports')}
              iconName="BarChart3"
              iconPosition="left"
            >
              Voir Rapports
            </Button>
          </div>
        </div>
      </main>

      <MobileNavigation />
      
      {/* Export Panel */}
      <ExportPanel
        attendanceData={filteredData}
        onExport={handleExport}
        isVisible={showExportPanel}
        onClose={() => setShowExportPanel(false)}
      />
    </div>
  );
};

export default AttendanceTracking;