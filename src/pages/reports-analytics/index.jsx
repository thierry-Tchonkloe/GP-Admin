import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MobileNavigation from '../../components/ui/MobileNavigation';
import ReportConfigPanel from './components/ReportConfigPanel';
import AttendanceChart from './components/AttendanceChart';
import MetricsGrid from './components/MetricsGrid';
import ReportTemplates from './components/ReportTemplates';
import ExportControls from './components/ExportControls';
import AttendanceTable from './components/AttendanceTable';

const ReportsAnalytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reportConfig, setReportConfig] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for charts
  const attendanceTrendData = [
    { date: '01/01', present: 85, absent: 15, late: 8 },
    { date: '02/01', present: 92, absent: 8, late: 5 },
    { date: '03/01', present: 88, absent: 12, late: 7 },
    { date: '04/01', present: 95, absent: 5, late: 3 },
    { date: '05/01', present: 90, absent: 10, late: 6 },
    { date: '06/01', present: 87, absent: 13, late: 9 },
    { date: '07/01', present: 93, absent: 7, late: 4 }
  ];

  const punctualityData = [
    { name: 'RH', value: 95 },
    { name: 'IT', value: 88 },
    { name: 'Comptabilité', value: 92 },
    { name: 'Marketing', value: 85 },
    { name: 'Ventes', value: 90 }
  ];

  const departmentData = [
    { name: 'Ressources Humaines', value: 25 },
    { name: 'Informatique', value: 30 },
    { name: 'Comptabilité', value: 20 },
    { name: 'Marketing', value: 15 },
    { name: 'Ventes', value: 10 }
  ];

  const overtimeData = [
    { date: '01/01', overtime: 12 },
    { date: '02/01', overtime: 8 },
    { date: '03/01', overtime: 15 },
    { date: '04/01', overtime: 6 },
    { date: '05/01', overtime: 10 },
    { date: '06/01', overtime: 18 },
    { date: '07/01', overtime: 9 }
  ];

  // Mock metrics data
  const metricsData = [
    {
      type: 'attendance',
      label: 'Taux de Présence',
      value: 92.5,
      format: 'percentage',
      trend: 2.3,
      subtitle: 'Cette semaine'
    },
    {
      type: 'punctuality',
      label: 'Ponctualité',
      value: 88.7,
      format: 'percentage',
      trend: -1.2,
      subtitle: 'Moyenne mensuelle'
    },
    {
      type: 'overtime',
      label: 'Heures Supplémentaires',
      value: 156,
      format: 'time',
      trend: 5.8,
      subtitle: 'Ce mois'
    },
    {
      type: 'absence',
      label: 'Jours d\'Absence',
      value: 23,
      format: 'number',
      trend: -8.4,
      subtitle: 'Ce mois'
    },
    {
      type: 'productivity',
      label: 'Productivité',
      value: 94.2,
      format: 'percentage',
      trend: 3.1,
      subtitle: 'Score global'
    },
    {
      type: 'cost',
      label: 'Coût Salarial',
      value: 2450000,
      format: 'currency',
      trend: 1.8,
      subtitle: 'Ce mois'
    }
  ];

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleConfigChange = (config) => {
    setReportConfig(config);
  };

  const handleGenerateReport = async (config) => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    console.log('Rapport généré avec la configuration:', config);
  };

  const handleExport = async (exportConfig) => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsExporting(false);
    console.log('Export terminé avec la configuration:', exportConfig);
  };

  const handleTemplateSelect = (templateConfig) => {
    setReportConfig(templateConfig);
    console.log('Modèle sélectionné:', templateConfig);
  };

  const handleSaveTemplate = (template) => {
    console.log('Modèle sauvegardé:', template);
  };

  const handleSort = (key, direction) => {
    console.log('Tri par:', key, direction);
  };

  const handleFilter = (filters) => {
    console.log('Filtres appliqués:', filters);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'BarChart3' },
    { id: 'detailed', label: 'Données Détaillées', icon: 'Table' },
    { id: 'analytics', label: 'Analyses Avancées', icon: 'TrendingUp' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={handleToggleSidebar} isSidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-60 pt-16 pb-20 lg:pb-6">
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              Rapports & Analyses
            </h1>
            <p className="text-text-secondary">
              Générez des rapports complets et analysez les données de présence de votre équipe
            </p>
          </div>

          {/* Report Configuration */}
          <div className="mb-6">
            <ReportConfigPanel
              onConfigChange={handleConfigChange}
              onGenerateReport={handleGenerateReport}
              isGenerating={isGenerating}
            />
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Sidebar - Templates */}
            <div className="xl:col-span-1">
              <div className="space-y-6">
                <ReportTemplates
                  onTemplateSelect={handleTemplateSelect}
                  onSaveTemplate={handleSaveTemplate}
                />
                <ExportControls
                  onExport={handleExport}
                  isExporting={isExporting}
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="xl:col-span-3">
              {/* Metrics Grid */}
              <MetricsGrid metrics={metricsData} />

              {/* Tab Navigation */}
              <div className="mb-6">
                <div className="border-b border-border">
                  <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                          ${activeTab === tab.id
                            ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-secondary'
                          }
                        `}
                      >
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Charts Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AttendanceChart
                      type="line"
                      data={attendanceTrendData}
                      title="Tendance de Présence"
                      height={300}
                    />
                    <AttendanceChart
                      type="bar"
                      data={punctualityData}
                      title="Ponctualité par Département"
                      height={300}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AttendanceChart
                      type="pie"
                      data={departmentData}
                      title="Répartition par Département"
                      height={300}
                    />
                    <AttendanceChart
                      type="bar"
                      data={overtimeData}
                      title="Heures Supplémentaires"
                      height={300}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'detailed' && (
                <div className="space-y-6">
                  <AttendanceTable
                    onSort={handleSort}
                    onFilter={handleFilter}
                  />
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Analyses Avancées
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-md font-medium text-text-primary">Patterns d'Absence</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-text-secondary">Lundi</span>
                            <span className="text-sm font-medium text-text-primary">12% d'absence</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-text-secondary">Vendredi</span>
                            <span className="text-sm font-medium text-text-primary">18% d'absence</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-text-secondary">Après congés</span>
                            <span className="text-sm font-medium text-text-primary">25% d'absence</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-md font-medium text-text-primary">Corrélations Productivité</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-text-secondary">Ponctualité vs Performance</span>
                            <span className="text-sm font-medium text-success">+0.85</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-text-secondary">Heures sup. vs Satisfaction</span>
                            <span className="text-sm font-medium text-warning">-0.32</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-text-secondary">Présence vs Objectifs</span>
                            <span className="text-sm font-medium text-success">+0.76</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <MobileNavigation />
    </div>
  );
};

export default ReportsAnalytics;