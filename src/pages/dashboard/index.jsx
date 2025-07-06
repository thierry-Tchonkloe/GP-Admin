import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MobileNavigation from '../../components/ui/MobileNavigation';
import KPICard from './components/KPICard';
import AttendanceChart from './components/AttendanceChart';
import SystemAlert from './components/SystemAlert';
import QuickActions from './components/QuickActions';
import HolidayCard from './components/HolidayCard';
import RecentActivity from './components/RecentActivity';
import DateRangePicker from './components/DateRangePicker';
import Button from '../../components/ui/Button';


const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Capteur Déconnecté',
      message: 'Le capteur biométrique du bureau principal ne répond pas depuis 15 minutes.',
      timestamp: new Date(Date.now() - 900000),
      actionLabel: 'Vérifier',
      onAction: () => navigate('/system-settings')
    },
    {
      id: 2,
      type: 'info',
      title: 'Rapport Mensuel',
      message: 'Le rapport de présence du mois dernier est prêt à être téléchargé.',
      timestamp: new Date(Date.now() - 1800000),
      actionLabel: 'Télécharger',
      onAction: () => navigate('/reports-analytics')
    }
  ]);

  const kpiData = [
    {
      title: 'Employés Présents',
      value: '42',
      subtitle: 'sur 50 employés',
      change: '+5%',
      changeType: 'increase',
      icon: 'Users',
      color: 'green'
    },
    {
      title: 'Absents',
      value: '6',
      subtitle: 'non justifiés: 2',
      change: '-12%',
      changeType: 'decrease',
      icon: 'UserX',
      color: 'red'
    },
    {
      title: 'En Retard',
      value: '2',
      subtitle: 'retard moyen: 15min',
      change: '-25%',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'yellow'
    },
    {
      title: 'Sorties Anticipées',
      value: '1',
      subtitle: 'avec autorisation',
      change: '0%',
      changeType: 'increase',
      icon: 'LogOut',
      color: 'blue'
    }
  ];

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setSelectedDateRange({ start: startDate, end: endDate });
    // Here you would typically fetch new data based on the date range
    console.log('Date range changed:', startDate, 'to', endDate);
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const handleRefreshData = () => {
    // Simulate data refresh
    console.log('Refreshing dashboard data...');
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update KPI data or add new activities
      console.log('Real-time update...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="lg:ml-60 pt-16 pb-20 lg:pb-6">
        <div className="p-4 lg:p-6">
          <Breadcrumb />
          
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Tableau de Bord
              </h1>
              <p className="text-text-secondary">
                Vue d'ensemble de la présence en temps réel
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <DateRangePicker
                onDateChange={handleDateRangeChange}
                initialStartDate={selectedDateRange.start}
                initialEndDate={selectedDateRange.end}
              />
              <Button
                variant="outline"
                onClick={handleRefreshData}
                iconName="RefreshCw"
                iconSize={16}
              >
                Actualiser
              </Button>
            </div>
          </div>

          {/* System Alerts */}
          {alerts.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-text-primary mb-3">Alertes Système</h2>
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <SystemAlert
                    key={alert.id}
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    timestamp={alert.timestamp}
                    actionLabel={alert.actionLabel}
                    onAction={alert.onAction}
                    onDismiss={() => handleDismissAlert(alert.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                subtitle={kpi.subtitle}
                change={kpi.change}
                changeType={kpi.changeType}
                icon={kpi.icon}
                color={kpi.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Charts and Activity */}
            <div className="lg:col-span-2 space-y-6">
              {/* Charts */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <AttendanceChart type="bar" title="Présence Hebdomadaire" />
                <AttendanceChart type="pie" title="Statut Aujourd'hui" />
              </div>
              
              {/* Recent Activity */}
              <RecentActivity />
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActions />
              
              {/* Holidays */}
              <HolidayCard />
              
              {/* System Status */}
              <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
                <h3 className="text-lg font-semibold text-text-primary mb-4">État du Système</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success rounded-full biometric-pulse" />
                      <span className="text-sm font-medium text-text-primary">Capteurs Biométriques</span>
                    </div>
                    <span className="text-xs text-success-700 font-medium">3/4 Actifs</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success rounded-full" />
                      <span className="text-sm font-medium text-text-primary">Base de Données</span>
                    </div>
                    <span className="text-xs text-success-700 font-medium">Connectée</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-warning rounded-full" />
                      <span className="text-sm font-medium text-text-primary">Synchronisation</span>
                    </div>
                    <span className="text-xs text-warning-700 font-medium">En cours</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/system-settings')}
                  iconName="Settings"
                  iconPosition="left"
                  fullWidth
                  className="mt-4"
                >
                  Voir Détails
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <MobileNavigation />
    </div>
  );
};

export default Dashboard;