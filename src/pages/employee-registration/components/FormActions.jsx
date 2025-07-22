import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormActions = ({
  onSave,
  onSaveAsDraft,
  onCancel,
  isLoading,
  isValid,
  showSuccess,
  onAddAnother,
  onViewEmployee
}) => {
  if (showSuccess) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 lg:pl-64">
        <div className="max-w-4xl mx-auto">
          <div className="bg-success-50 border border-success-200 rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-success-800">
                  Employé Enregistré avec Succès !
                </h3>
                <p className="text-success-700">
                  Les informations de l'employé ont été sauvegardées dans le système.
                </p>

                {/* Ajout ici du nom et du code */}
                {showSuccess?.name && showSuccess?.employeeId && (
                  <div className="mt-3 bg-white border border-success-300 rounded px-4 py-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-success-800 font-medium">{showSuccess.name}</p>
                      <p className="text-xs text-success-600">
                        Code Unique : <span className="font-mono">{showSuccess.employeeId}</span>
                      </p>
                    </div>
                    <button
                      className="text-success-700 hover:text-success-900 text-sm"
                      onClick={() => {
                        navigator.clipboard.writeText(showSuccess.employeeId);
                      }}
                    >
                      Copier
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button variant="success" onClick={onViewEmployee} iconName="Eye">
                Voir le Profil
              </Button>
              <Button variant="primary" onClick={onAddAnother} iconName="UserPlus">
                Ajouter un Autre Employé
              </Button>
              <Button variant="outline" onClick={onCancel} iconName="ArrowLeft">
                Retour à la Liste
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ⬇️ Sinon, afficher les actions du formulaire
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 lg:pl-64 shadow-elevation-3">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            onClick={onSave}
            loading={isLoading}
            disabled={!isValid || isLoading}
            iconName="Save"
            className="flex-1 sm:flex-none order-1 sm:order-3"
          >
            {isLoading ? "Enregistrement..." : "Enregistrer l'Employé"}
          </Button>

          <Button
            variant="outline"
            onClick={onSaveAsDraft}
            disabled={isLoading}
            iconName="FileText"
            className="flex-1 sm:flex-none order-2"
          >
            Sauvegarder comme Brouillon
          </Button>

          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
            iconName="X"
            className="flex-1 sm:flex-none order-3 sm:order-1"
          >
            Annuler
          </Button>
        </div>

        {!isValid && (
          <div className="mt-3 text-center">
            <p className="text-sm text-error">
              Veuillez remplir tous les champs obligatoires avant d'enregistrer
            </p>
          </div>
        )}
      </div>
      <div className="h-4 lg:hidden" />
    </div>
  );
};

export default FormActions;
