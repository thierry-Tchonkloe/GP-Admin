import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ReportTemplates = ({ onTemplateSelect, onSaveTemplate }) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const savedTemplates = [
    {
      id: 1,
      name: "Rapport Mensuel Standard",
      description: "Rapport mensuel avec toutes les métriques principales",
      config: {
        reportType: 'monthly',
        includeCharts: true,
        includeDetails: true,
        metrics: ['attendance', 'punctuality', 'overtime']
      },
      lastUsed: "2024-01-15",
      isDefault: true
    },
    {
      id: 2,
      name: "Analyse Ponctualité",
      description: "Focus sur les statistiques de ponctualité par département",
      config: {
        reportType: 'weekly',
        includeCharts: true,
        includeDetails: false,
        metrics: ['punctuality', 'attendance']
      },
      lastUsed: "2024-01-10",
      isDefault: false
    },
    {
      id: 3,
      name: "Rapport Exécutif",
      description: "Résumé exécutif avec métriques clés et tendances",
      config: {
        reportType: 'monthly',
        includeCharts: true,
        includeDetails: false,
        metrics: ['attendance', 'productivity', 'cost']
      },
      lastUsed: "2024-01-08",
      isDefault: false
    },
    {
      id: 4,
      name: "Analyse Absences",
      description: "Rapport détaillé sur les patterns d\'absence",
      config: {
        reportType: 'custom',
        includeCharts: true,
        includeDetails: true,
        metrics: ['absence', 'attendance']
      },
      lastUsed: "2024-01-05",
      isDefault: false
    }
  ];

  const quickTemplates = [
    {
      name: "Aujourd\'hui",
      icon: "Calendar",
      config: { reportType: 'daily', period: 'today' }
    },
    {
      name: "Cette Semaine",
      icon: "CalendarDays",
      config: { reportType: 'weekly', period: 'thisWeek' }
    },
    {
      name: "Ce Mois",
      icon: "CalendarRange",
      config: { reportType: 'monthly', period: 'thisMonth' }
    },
    {
      name: "Trimestre",
      icon: "Calendar",
      config: { reportType: 'custom', period: 'quarter' }
    }
  ];

  const handleTemplateSelect = (template) => {
    onTemplateSelect(template.config);
  };

  const handleSaveTemplate = () => {
    if (templateName.trim()) {
      onSaveTemplate({
        name: templateName,
        description: `Modèle personnalisé créé le ${new Date().toLocaleDateString('fr-FR')}`,
        config: {} // Current config would be passed from parent
      });
      setTemplateName('');
      setShowSaveDialog(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-1">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Modèles de Rapport</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSaveDialog(true)}
            iconName="Save"
            iconPosition="left"
          >
            Sauvegarder
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Templates */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Rapports Rapides</h4>
          <div className="grid grid-cols-2 gap-2">
            {quickTemplates.map((template, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleTemplateSelect(template)}
                className="justify-start"
                iconName={template.icon}
                iconPosition="left"
              >
                {template.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Saved Templates */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Modèles Sauvegardés</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {savedTemplates.map((template) => (
              <div
                key={template.id}
                className="p-3 border border-border rounded-lg hover:bg-surface-secondary transition-colors duration-200 cursor-pointer"
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h5 className="text-sm font-medium text-text-primary">
                        {template.name}
                      </h5>
                      {template.isDefault && (
                        <span className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                          Défaut
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      {template.description}
                    </p>
                    <p className="text-xs text-text-tertiary mt-1">
                      Dernière utilisation: {new Date(template.lastUsed).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-text-tertiary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Template Dialog */}
      {showSaveDialog && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-200" onClick={() => setShowSaveDialog(false)} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface border border-border rounded-lg shadow-elevation-4 z-300 w-96 max-w-[90vw]">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Sauvegarder le Modèle
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Nom du modèle
                  </label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Entrez le nom du modèle"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-end space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSaveDialog(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSaveTemplate}
                    disabled={!templateName.trim()}
                  >
                    Sauvegarder
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportTemplates;