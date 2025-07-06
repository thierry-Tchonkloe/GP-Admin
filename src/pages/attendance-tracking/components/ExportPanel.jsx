import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ExportPanel = ({ attendanceData, onExport, isVisible, onClose }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [includeOptions, setIncludeOptions] = useState({
    summary: true,
    details: true,
    overtime: true,
    breaks: false
  });
  const [isExporting, setIsExporting] = useState(false);

  const handleEmployeeSelection = (employeeId) => {
    setSelectedEmployees(prev => {
      if (prev.includes(employeeId)) {
        return prev.filter(id => id !== employeeId);
      } else {
        return [...prev, employeeId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === attendanceData.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(attendanceData.map(emp => emp.id));
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    const exportData = {
      format: exportFormat,
      dateRange,
      employees: selectedEmployees.length > 0 ? selectedEmployees : attendanceData.map(emp => emp.id),
      options: includeOptions
    };

    try {
      await onExport(exportData);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleOptionChange = (option) => {
    setIncludeOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevation-4 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Exporter les données</h2>
            <p className="text-sm text-text-secondary mt-1">Générer un rapport de présence personnalisé</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Export Format */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">Format d'export</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setExportFormat('pdf')}
                className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                  exportFormat === 'pdf' ?'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary hover:bg-surface-secondary'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={20} />
                  <div>
                    <p className="font-medium">PDF</p>
                    <p className="text-xs opacity-75">Document formaté</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setExportFormat('excel')}
                className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                  exportFormat === 'excel' ?'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary hover:bg-surface-secondary'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name="Table" size={20} />
                  <div>
                    <p className="font-medium">Excel</p>
                    <p className="text-xs opacity-75">Feuille de calcul</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Date Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">Période</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Date de début</label>
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Date de fin</label>
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Employee Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-text-primary">Employés</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedEmployees.length === attendanceData.length ? 'Désélectionner tout' : 'Sélectionner tout'}
              </Button>
            </div>
            
            <div className="max-h-40 overflow-y-auto border border-border rounded-lg">
              {attendanceData.map(employee => (
                <label
                  key={employee.id}
                  className="flex items-center space-x-3 p-3 hover:bg-surface-secondary cursor-pointer border-b border-border last:border-b-0"
                >
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => handleEmployeeSelection(employee.id)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-secondary flex-shrink-0">
                    <img
                      src={employee.photo}
                      alt={employee.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{employee.name}</p>
                    <p className="text-xs text-text-secondary truncate">{employee.department}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Include Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">Options d'inclusion</label>
            <div className="space-y-3">
              {[
                { key: 'summary', label: 'Résumé statistique', desc: 'Totaux et moyennes' },
                { key: 'details', label: 'Détails des pointages', desc: 'Heures d\'entrée et sortie' },
                { key: 'overtime', label: 'Heures supplémentaires', desc: 'Calcul des heures sup' },
                { key: 'breaks', label: 'Temps de pause', desc: 'Durée des pauses' }
              ].map(option => (
                <label
                  key={option.key}
                  className="flex items-start space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={includeOptions[option.key]}
                    onChange={() => handleOptionChange(option.key)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{option.label}</p>
                    <p className="text-xs text-text-secondary">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-surface-secondary">
          <div className="text-sm text-text-secondary">
            {selectedEmployees.length > 0 ? selectedEmployees.length : attendanceData.length} employé(s) sélectionné(s)
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
            >
              {isExporting ? 'Export en cours...' : 'Exporter'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;