import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionPanel = ({ 
  selectedCount, 
  totalCount, 
  onAddEmployee, 
  onBulkAction, 
  onExport 
}) => {
  const [bulkMenuOpen, setBulkMenuOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  const handleBulkAction = (action) => {
    onBulkAction(action);
    setBulkMenuOpen(false);
  };

  const handleExport = (format) => {
    onExport(format);
    setExportMenuOpen(false);
  };

  const statisticsCards = [
    {
      label: 'Total Employés',
      value: totalCount,
      icon: 'Users',
      color: 'text-primary'
    },
    {
      label: 'Actifs',
      value: Math.floor(totalCount * 0.85),
      icon: 'UserCheck',
      color: 'text-success'
    },
    {
      label: 'Biométrie OK',
      value: Math.floor(totalCount * 0.72),
      icon: 'Fingerprint',
      color: 'text-accent'
    },
    {
      label: 'Sélectionnés',
      value: selectedCount,
      icon: 'CheckSquare',
      color: 'text-secondary'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
        {statisticsCards.map((stat, index) => (
          <div key={index} className="bg-surface rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">{stat.label}</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg bg-surface-secondary ${stat.color}`}>
                <Icon name={stat.icon} size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Actions */}
      <div className="space-y-4">
        <Button
          variant="primary"
          size="lg"
          onClick={onAddEmployee}
          iconName="UserPlus"
          iconPosition="left"
          fullWidth
        >
          Nouvel Employé
        </Button>

        {/* Bulk Actions */}
        {selectedCount > 0 && (
          <div className="relative">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setBulkMenuOpen(!bulkMenuOpen)}
              iconName="Settings"
              iconPosition="left"
              fullWidth
            >
              Actions groupées ({selectedCount})
            </Button>

            {bulkMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-200" 
                  onClick={() => setBulkMenuOpen(false)}
                />
                <div className="absolute top-full mt-2 w-full bg-surface border border-border rounded-lg shadow-elevation-3 z-300">
                  <div className="py-2">
                    <button
                      onClick={() => handleBulkAction('activate')}
                      className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors"
                    >
                      <Icon name="UserCheck" size={16} className="mr-3 text-success" />
                      Activer
                    </button>
                    <button
                      onClick={() => handleBulkAction('deactivate')}
                      className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors"
                    >
                      <Icon name="UserX" size={16} className="mr-3 text-error" />
                      Désactiver
                    </button>
                    <button
                      onClick={() => handleBulkAction('export')}
                      className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors"
                    >
                      <Icon name="Download" size={16} className="mr-3 text-accent" />
                      Exporter sélection
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Export Actions */}
        <div className="relative">
          <Button
            variant="outline"
            size="md"
            onClick={() => setExportMenuOpen(!exportMenuOpen)}
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Exporter
          </Button>

          {exportMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-200" 
                onClick={() => setExportMenuOpen(false)}
              />
              <div className="absolute top-full mt-2 w-full bg-surface border border-border rounded-lg shadow-elevation-3 z-300">
                <div className="py-2">
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors"
                  >
                    <Icon name="FileText" size={16} className="mr-3 text-error" />
                    Exporter en PDF
                  </button>
                  <button
                    onClick={() => handleExport('excel')}
                    className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors"
                  >
                    <Icon name="FileSpreadsheet" size={16} className="mr-3 text-success" />
                    Exporter en Excel
                  </button>
                  <button
                    onClick={() => handleExport('csv')}
                    className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors"
                  >
                    <Icon name="Database" size={16} className="mr-3 text-accent" />
                    Exporter en CSV
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Actions rapides</h4>
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="UserPlus"
            iconPosition="left"
            fullWidth
            onClick={onAddEmployee}
          >
            Inscription rapide
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Fingerprint"
            iconPosition="left"
            fullWidth
            onClick={() => onBulkAction('biometric')}
          >
            Gestion biométrie
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Clock"
            iconPosition="left"
            fullWidth
            onClick={() => window.location.href = '/attendance-tracking'}
          >
            Voir présences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;