import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const ReportConfigPanel = ({ onConfigChange, onGenerateReport, isGenerating }) => {
  const [config, setConfig] = useState({
    dateRange: {
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    },
    reportType: 'daily',
    selectedEmployees: [],
    selectedDepartments: [],
    includeCharts: true,
    includeDetails: true
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const reportTypes = [
    { value: 'daily', label: 'Rapport Quotidien' },
    { value: 'weekly', label: 'Rapport Hebdomadaire' },
    { value: 'monthly', label: 'Rapport Mensuel' },
    { value: 'custom', label: 'Période Personnalisée' }
  ];

  const departments = [
    { id: 1, name: 'Ressources Humaines' },
    { id: 2, name: 'Informatique' },
    { id: 3, name: 'Comptabilité' },
    { id: 4, name: 'Marketing' },
    { id: 5, name: 'Ventes' }
  ];

  const employees = [
    { id: 1, name: 'Marie Dubois', department: 'RH' },
    { id: 2, name: 'Jean Martin', department: 'IT' },
    { id: 3, name: 'Sophie Laurent', department: 'Comptabilité' },
    { id: 4, name: 'Pierre Moreau', department: 'Marketing' },
    { id: 5, name: 'Claire Bernard', department: 'Ventes' }
  ];

  const handleConfigUpdate = (field, value) => {
    const newConfig = { ...config, [field]: value };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  const handleDateRangeUpdate = (field, value) => {
    const newDateRange = { ...config.dateRange, [field]: value };
    handleConfigUpdate('dateRange', newDateRange);
  };

  const handleEmployeeToggle = (employeeId) => {
    const newSelected = config.selectedEmployees.includes(employeeId)
      ? config.selectedEmployees.filter(id => id !== employeeId)
      : [...config.selectedEmployees, employeeId];
    handleConfigUpdate('selectedEmployees', newSelected);
  };

  const handleDepartmentToggle = (deptId) => {
    const newSelected = config.selectedDepartments.includes(deptId)
      ? config.selectedDepartments.filter(id => id !== deptId)
      : [...config.selectedDepartments, deptId];
    handleConfigUpdate('selectedDepartments', newSelected);
  };

  const handleGenerate = () => {
    onGenerateReport(config);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Configuration du Rapport</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          Options Avancées
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Date Range */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-text-primary">Période</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-text-secondary mb-1">Date de début</label>
              <Input
                type="date"
                value={config.dateRange.startDate}
                onChange={(e) => handleDateRangeUpdate('startDate', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-text-secondary mb-1">Date de fin</label>
              <Input
                type="date"
                value={config.dateRange.endDate}
                onChange={(e) => handleDateRangeUpdate('endDate', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Report Type */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-text-primary">Type de Rapport</h3>
          <div className="space-y-2">
            {reportTypes.map((type) => (
              <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                <Input
                  type="checkbox"
                  checked={config.reportType === type.value}
                  onChange={() => handleConfigUpdate('reportType', type.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-primary">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-text-primary">Actions Rapides</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date().toISOString().split('T')[0];
                handleConfigUpdate('dateRange', { startDate: today, endDate: today });
              }}
              className="w-full justify-start"
              iconName="Calendar"
            >
              Aujourd'hui
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date();
                const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                handleConfigUpdate('dateRange', {
                  startDate: weekAgo.toISOString().split('T')[0],
                  endDate: today.toISOString().split('T')[0]
                });
              }}
              className="w-full justify-start"
              iconName="Calendar"
            >
              7 Derniers Jours
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date();
                const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                handleConfigUpdate('dateRange', {
                  startDate: monthAgo.toISOString().split('T')[0],
                  endDate: today.toISOString().split('T')[0]
                });
              }}
              className="w-full justify-start"
              iconName="Calendar"
            >
              30 Derniers Jours
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-text-primary">Départements</h3>
              <div className="max-h-32 overflow-y-auto space-y-2 border border-border rounded-lg p-3">
                {departments.map((dept) => (
                  <label key={dept.id} className="flex items-center space-x-2 cursor-pointer">
                    <Input
                      type="checkbox"
                      checked={config.selectedDepartments.includes(dept.id)}
                      onChange={() => handleDepartmentToggle(dept.id)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-text-primary">{dept.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Employee Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-text-primary">Employés Spécifiques</h3>
              <div className="max-h-32 overflow-y-auto space-y-2 border border-border rounded-lg p-3">
                {employees.map((emp) => (
                  <label key={emp.id} className="flex items-center space-x-2 cursor-pointer">
                    <Input
                      type="checkbox"
                      checked={config.selectedEmployees.includes(emp.id)}
                      onChange={() => handleEmployeeToggle(emp.id)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-text-primary">{emp.name}</span>
                    <span className="text-xs text-text-secondary">({emp.department})</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Report Options */}
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-medium text-text-primary">Options du Rapport</h3>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <Input
                  type="checkbox"
                  checked={config.includeCharts}
                  onChange={(e) => handleConfigUpdate('includeCharts', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-primary">Inclure les graphiques</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <Input
                  type="checkbox"
                  checked={config.includeDetails}
                  onChange={(e) => handleConfigUpdate('includeDetails', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-primary">Inclure les détails</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Période: {config.dateRange.startDate} - {config.dateRange.endDate}
          </div>
          <Button
            variant="primary"
            onClick={handleGenerate}
            loading={isGenerating}
            iconName="FileText"
            iconPosition="left"
          >
            Générer le Rapport
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportConfigPanel;