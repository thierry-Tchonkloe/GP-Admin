import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const EmploymentDetailsTab = ({ formData, onFormDataChange, errors }) => {
  const departments = [
    "Ressources Humaines",
    "Informatique",
    "Comptabilité",
    "Marketing",
    "Ventes",
    "Production",
    "Logistique",
    "Administration",
    "Sécurité",
    "Maintenance"
  ];

  const positions = [
    "Directeur Général",
    "Directeur des Ressources Humaines",
    "Responsable IT",
    "Développeur",
    "Comptable",
    "Assistant Comptable",
    "Responsable Marketing",
    "Commercial",
    "Technicien",
    "Agent de Sécurité",
    "Secrétaire",
    "Stagiaire"
  ];

  const contractTypes = [
    "CDI - Contrat à Durée Indéterminée",
    "CDD - Contrat à Durée Déterminée",
    "Stage",
    "Freelance",
    "Consultant"
  ];

  const managers = [
    { id: "MGR001", name: "Jean Baptiste Kouassi", position: "Directeur Général" },
    { id: "MGR002", name: "Marie Claire Diabaté", position: "Directrice RH" },
    { id: "MGR003", name: "Amadou Traoré", position: "Responsable IT" },
    { id: "MGR004", name: "Fatou Bamba", position: "Responsable Marketing" },
    { id: "MGR005", name: "Kofi Asante", position: "Responsable Production" }
  ];

  const handleInputChange = (field, value) => {
    onFormDataChange(field, value);
  };

  const generateEmployeeCode = () => {
    const prefix = formData.department ? formData.department.substring(0, 3).toUpperCase() : 'EMP';
    const timestamp = Date.now().toString().slice(-4);
    const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const code = `${prefix}${timestamp}${randomNum}`;
    handleInputChange('employeeCode', code);
  };

  return (
    <div className="space-y-6">
      {/* Employee Code Section */}
      <div className="bg-surface-secondary rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Code Employé</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Code généré automatiquement"
              value={formData.employeeCode || ''}
              onChange={(e) => handleInputChange('employeeCode', e.target.value)}
              readOnly={!formData.manualCodeEntry}
            />
          </div>
          <button
            type="button"
            onClick={generateEmployeeCode}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Icon name="RefreshCw" size={16} />
            <span>Générer</span>
          </button>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.manualCodeEntry || false}
              onChange={(e) => handleInputChange('manualCodeEntry', e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm text-text-secondary">Saisie manuelle</span>
          </label>
        </div>
        {errors.employeeCode && (
          <p className="text-error text-sm mt-1">{errors.employeeCode}</p>
        )}
      </div>

      {/* Employment Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Poste *
          </label>
          <select
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.position || ''}
            onChange={(e) => handleInputChange('position', e.target.value)}
            required
          >
            <option value="">Sélectionner un poste</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
          {errors.position && (
            <p className="text-error text-sm mt-1">{errors.position}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Département *
          </label>
          <select
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.department || ''}
            onChange={(e) => handleInputChange('department', e.target.value)}
            required
          >
            <option value="">Sélectionner un département</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-error text-sm mt-1">{errors.department}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Date d'Embauche *
          </label>
          <Input
            type="date"
            value={formData.hireDate || ''}
            onChange={(e) => handleInputChange('hireDate', e.target.value)}
            required
          />
          {errors.hireDate && (
            <p className="text-error text-sm mt-1">{errors.hireDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Type de Contrat *
          </label>
          <select
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.contractType || ''}
            onChange={(e) => handleInputChange('contractType', e.target.value)}
            required
          >
            <option value="">Sélectionner le type</option>
            {contractTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.contractType && (
            <p className="text-error text-sm mt-1">{errors.contractType}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Salaire (FCFA) *
          </label>
          <div className="relative">
            <Input
              type="number"
              placeholder="0"
              value={formData.salary || ''}
              onChange={(e) => handleInputChange('salary', e.target.value)}
              required
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary text-sm">
              FCFA
            </span>
          </div>
          {errors.salary && (
            <p className="text-error text-sm mt-1">{errors.salary}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Responsable Hiérarchique
          </label>
          <select
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.manager || ''}
            onChange={(e) => handleInputChange('manager', e.target.value)}
          >
            <option value="">Sélectionner un responsable</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name} - {manager.position}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Date de Fin de Contrat
          </label>
          <Input
            type="date"
            value={formData.contractEndDate || ''}
            onChange={(e) => handleInputChange('contractEndDate', e.target.value)}
            disabled={formData.contractType === 'CDI - Contrat à Durée Indéterminée'}
          />
          {formData.contractType === 'CDI - Contrat à Durée Indéterminée' && (
            <p className="text-text-secondary text-sm mt-1">
              Non applicable pour les CDI
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Horaires de Travail
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="time"
              placeholder="Début"
              value={formData.workStartTime || '08:00'}
              onChange={(e) => handleInputChange('workStartTime', e.target.value)}
            />
            <Input
              type="time"
              placeholder="Fin"
              value={formData.workEndTime || '17:00'}
              onChange={(e) => handleInputChange('workEndTime', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-surface-secondary rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Informations Complémentaires</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Niveau d'Études
            </label>
            <select
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.educationLevel || ''}
              onChange={(e) => handleInputChange('educationLevel', e.target.value)}
            >
              <option value="">Sélectionner</option>
              <option value="primary">Primaire</option>
              <option value="secondary">Secondaire</option>
              <option value="bachelor">Licence/Bachelor</option>
              <option value="master">Master</option>
              <option value="phd">Doctorat</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Années d'Expérience
            </label>
            <Input
              type="number"
              placeholder="0"
              min="0"
              max="50"
              value={formData.experience || ''}
              onChange={(e) => handleInputChange('experience', e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Compétences Particulières
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows="3"
            placeholder="Décrivez les compétences particulières de l'employé"
            value={formData.skills || ''}
            onChange={(e) => handleInputChange('skills', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EmploymentDetailsTab;