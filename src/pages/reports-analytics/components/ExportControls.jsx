import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ExportControls = ({ onExport, isExporting }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    includeCharts: true,
    includeDetails: true,
    includeBranding: true,
    orientation: 'portrait',
    pageSize: 'A4'
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const exportFormats = [
    { value: 'pdf', label: 'PDF', icon: 'FileText', description: 'Document PDF formaté' },
    { value: 'excel', label: 'Excel', icon: 'FileSpreadsheet', description: 'Feuille de calcul Excel' },
    { value: 'csv', label: 'CSV', icon: 'Database', description: 'Données CSV brutes' },
    { value: 'json', label: 'JSON', icon: 'Code', description: 'Données JSON structurées' }
  ];

  const orientations = [
    { value: 'portrait', label: 'Portrait' },
    { value: 'landscape', label: 'Paysage' }
  ];

  const pageSizes = [
    { value: 'A4', label: 'A4' },
    { value: 'A3', label: 'A3' },
    { value: 'Letter', label: 'Letter' }
  ];

  const handleConfigChange = (field, value) => {
    setExportConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleExport = (format) => {
    const config = { ...exportConfig, format };
    onExport(config);
  };

  const getFormatIcon = (format) => {
    const formatData = exportFormats.find(f => f.value === format);
    return formatData ? formatData.icon : 'FileText';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Exporter le Rapport</h2>
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

      {/* Quick Export Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {exportFormats.map((format) => (
          <Button
            key={format.value}
            variant="outline"
            onClick={() => handleExport(format.value)}
            loading={isExporting && exportConfig.format === format.value}
            className="flex flex-col items-center p-4 h-auto"
            disabled={isExporting}
          >
            <Icon name={format.icon} size={24} className="mb-2" />
            <span className="text-sm font-medium">{format.label}</span>
            <span className="text-xs text-text-secondary text-center mt-1">
              {format.description}
            </span>
          </Button>
        ))}
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="space-y-6 pt-6 border-t border-border">
          {/* Export Content Options */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Contenu à Inclure</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <Input
                  type="checkbox"
                  checked={exportConfig.includeCharts}
                  onChange={(e) => handleConfigChange('includeCharts', e.target.checked)}
                  className="w-4 h-4"
                />
                <div>
                  <span className="text-sm text-text-primary">Inclure les graphiques</span>
                  <p className="text-xs text-text-secondary">Ajouter tous les graphiques et visualisations</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <Input
                  type="checkbox"
                  checked={exportConfig.includeDetails}
                  onChange={(e) => handleConfigChange('includeDetails', e.target.checked)}
                  className="w-4 h-4"
                />
                <div>
                  <span className="text-sm text-text-primary">Inclure les détails</span>
                  <p className="text-xs text-text-secondary">Ajouter les tableaux détaillés et données brutes</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <Input
                  type="checkbox"
                  checked={exportConfig.includeBranding}
                  onChange={(e) => handleConfigChange('includeBranding', e.target.checked)}
                  className="w-4 h-4"
                />
                <div>
                  <span className="text-sm text-text-primary">Inclure le branding</span>
                  <p className="text-xs text-text-secondary">Ajouter le logo et les informations de l'entreprise</p>
                </div>
              </label>
            </div>
          </div>

          {/* PDF Specific Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">Orientation</h3>
              <div className="space-y-2">
                {orientations.map((orientation) => (
                  <label key={orientation.value} className="flex items-center space-x-2 cursor-pointer">
                    <Input
                      type="checkbox"
                      checked={exportConfig.orientation === orientation.value}
                      onChange={() => handleConfigChange('orientation', orientation.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-text-primary">{orientation.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">Taille de Page</h3>
              <div className="space-y-2">
                {pageSizes.map((size) => (
                  <label key={size.value} className="flex items-center space-x-2 cursor-pointer">
                    <Input
                      type="checkbox"
                      checked={exportConfig.pageSize === size.value}
                      onChange={() => handleConfigChange('pageSize', size.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-text-primary">{size.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Export Button */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="primary"
              onClick={() => handleExport(exportConfig.format)}
              loading={isExporting}
              iconName={getFormatIcon(exportConfig.format)}
              iconPosition="left"
              className="w-full"
            >
              Exporter avec Options Personnalisées
            </Button>
          </div>
        </div>
      )}

      {/* Export History */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-text-primary mb-3">Exports Récents</h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {[
            { name: 'Rapport_Mensuel_Janvier_2024.pdf', date: '2024-01-15 14:30', size: '2.3 MB' },
            { name: 'Analyse_Ponctualite_Semaine_2.xlsx', date: '2024-01-10 09:15', size: '1.8 MB' },
            { name: 'Donnees_Presence_Q4_2023.csv', date: '2024-01-08 16:45', size: '856 KB' }
          ].map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-surface-secondary rounded-lg transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <Icon name="Download" size={16} className="text-text-secondary" />
                <div>
                  <p className="text-sm text-text-primary">{file.name}</p>
                  <p className="text-xs text-text-secondary">{file.date} • {file.size}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" iconName="Download" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportControls;