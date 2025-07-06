import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AttendancePoliciesTab = () => {
  const [policies, setPolicies] = useState({
    workingHours: {
      startTime: "08:00",
      endTime: "17:00",
      lunchBreakStart: "12:00",
      lunchBreakEnd: "13:00",
      workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"]
    },
    overtime: {
      enabled: true,
      threshold: 8,
      rate: 1.5,
      maxDaily: 4,
      requireApproval: true
    },
    attendance: {
      graceTime: 15,
      lateThreshold: 30,
      halfDayThreshold: 4,
      minimumWorkHours: 8
    },
    leaves: {
      annualLeave: 21,
      sickLeave: 10,
      maternityLeave: 90,
      paternityLeave: 3,
      carryForward: true,
      maxCarryForward: 5
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [holidays, setHolidays] = useState([
    { id: 1, name: "Jour de l\'An", date: "2024-01-01", type: "national" },
    { id: 2, name: "Fête de l\'Indépendance", date: "2024-08-07", type: "national" },
    { id: 3, name: "Noël", date: "2024-12-25", type: "national" },
    { id: 4, name: "Fête du Travail", date: "2024-05-01", type: "national" }
  ]);

  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
    type: "national"
  });

  const weekDays = [
    { key: "monday", label: "Lundi" },
    { key: "tuesday", label: "Mardi" },
    { key: "wednesday", label: "Mercredi" },
    { key: "thursday", label: "Jeudi" },
    { key: "friday", label: "Vendredi" },
    { key: "saturday", label: "Samedi" },
    { key: "sunday", label: "Dimanche" }
  ];

  const handlePolicyChange = (section, field, value) => {
    setPolicies(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleWorkingDayToggle = (day) => {
    setPolicies(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        workingDays: prev.workingHours.workingDays.includes(day)
          ? prev.workingHours.workingDays.filter(d => d !== day)
          : [...prev.workingHours.workingDays, day]
      }
    }));
  };

  const handleAddHoliday = () => {
    if (newHoliday.name && newHoliday.date) {
      setHolidays(prev => [...prev, {
        id: Date.now(),
        ...newHoliday
      }]);
      setNewHoliday({ name: "", date: "", type: "national" });
    }
  };

  const handleRemoveHoliday = (id) => {
    setHolidays(prev => prev.filter(h => h.id !== id));
  };

  const handleSave = () => {
    console.log('Saving attendance policies:', policies);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Politiques de Présence</h3>
          <p className="text-sm text-text-secondary mt-1">
            Configurez les règles de présence et les horaires de travail
          </p>
        </div>
        {!isEditing ? (
          <Button
            variant="primary"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Modifier
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => setIsEditing(false)}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Enregistrer
            </Button>
          </div>
        )}
      </div>

      {/* Working Hours */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Clock" size={20} className="mr-2 text-primary" />
          Horaires de Travail
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Heure de Début
            </label>
            <Input
              type="time"
              value={policies.workingHours.startTime}
              onChange={(e) => handlePolicyChange('workingHours', 'startTime', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Heure de Fin
            </label>
            <Input
              type="time"
              value={policies.workingHours.endTime}
              onChange={(e) => handlePolicyChange('workingHours', 'endTime', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Début Pause Déjeuner
            </label>
            <Input
              type="time"
              value={policies.workingHours.lunchBreakStart}
              onChange={(e) => handlePolicyChange('workingHours', 'lunchBreakStart', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Fin Pause Déjeuner
            </label>
            <Input
              type="time"
              value={policies.workingHours.lunchBreakEnd}
              onChange={(e) => handlePolicyChange('workingHours', 'lunchBreakEnd', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Jours de Travail
          </label>
          <div className="flex flex-wrap gap-2">
            {weekDays.map(day => (
              <button
                key={day.key}
                onClick={() => isEditing && handleWorkingDayToggle(day.key)}
                disabled={!isEditing}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  policies.workingHours.workingDays.includes(day.key)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary'
                } ${!isEditing ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Rules */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-text-primary mb-4 flex items-center">
          <Icon name="UserCheck" size={20} className="mr-2 text-secondary" />
          Règles de Présence
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Temps de Grâce (minutes)
            </label>
            <Input
              type="number"
              value={policies.attendance.graceTime}
              onChange={(e) => handlePolicyChange('attendance', 'graceTime', parseInt(e.target.value))}
              disabled={!isEditing}
              min="0"
              max="60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Seuil de Retard (minutes)
            </label>
            <Input
              type="number"
              value={policies.attendance.lateThreshold}
              onChange={(e) => handlePolicyChange('attendance', 'lateThreshold', parseInt(e.target.value))}
              disabled={!isEditing}
              min="0"
              max="120"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Seuil Demi-Journée (heures)
            </label>
            <Input
              type="number"
              value={policies.attendance.halfDayThreshold}
              onChange={(e) => handlePolicyChange('attendance', 'halfDayThreshold', parseInt(e.target.value))}
              disabled={!isEditing}
              min="1"
              max="8"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Heures Minimum/Jour
            </label>
            <Input
              type="number"
              value={policies.attendance.minimumWorkHours}
              onChange={(e) => handlePolicyChange('attendance', 'minimumWorkHours', parseInt(e.target.value))}
              disabled={!isEditing}
              min="1"
              max="12"
            />
          </div>
        </div>
      </div>

      {/* Overtime Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Timer" size={20} className="mr-2 text-warning" />
          Heures Supplémentaires
        </h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="overtimeEnabled"
              checked={policies.overtime.enabled}
              onChange={(e) => handlePolicyChange('overtime', 'enabled', e.target.checked)}
              disabled={!isEditing}
              className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary"
            />
            <label htmlFor="overtimeEnabled" className="text-sm font-medium text-text-primary">
              Activer les heures supplémentaires
            </label>
          </div>
          
          {policies.overtime.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Seuil (heures/jour)
                </label>
                <Input
                  type="number"
                  value={policies.overtime.threshold}
                  onChange={(e) => handlePolicyChange('overtime', 'threshold', parseInt(e.target.value))}
                  disabled={!isEditing}
                  min="6"
                  max="12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Taux de Majoration
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={policies.overtime.rate}
                  onChange={(e) => handlePolicyChange('overtime', 'rate', parseFloat(e.target.value))}
                  disabled={!isEditing}
                  min="1"
                  max="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Maximum/Jour (heures)
                </label>
                <Input
                  type="number"
                  value={policies.overtime.maxDaily}
                  onChange={(e) => handlePolicyChange('overtime', 'maxDaily', parseInt(e.target.value))}
                  disabled={!isEditing}
                  min="1"
                  max="8"
                />
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="requireApproval"
                  checked={policies.overtime.requireApproval}
                  onChange={(e) => handlePolicyChange('overtime', 'requireApproval', e.target.checked)}
                  disabled={!isEditing}
                  className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary"
                />
                <label htmlFor="requireApproval" className="text-sm font-medium text-text-primary">
                  Approbation Requise
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Leave Policies */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Calendar" size={20} className="mr-2 text-accent" />
          Politiques de Congés
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Congés Annuels (jours)
            </label>
            <Input
              type="number"
              value={policies.leaves.annualLeave}
              onChange={(e) => handlePolicyChange('leaves', 'annualLeave', parseInt(e.target.value))}
              disabled={!isEditing}
              min="0"
              max="50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Congés Maladie (jours)
            </label>
            <Input
              type="number"
              value={policies.leaves.sickLeave}
              onChange={(e) => handlePolicyChange('leaves', 'sickLeave', parseInt(e.target.value))}
              disabled={!isEditing}
              min="0"
              max="30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Congé Maternité (jours)
            </label>
            <Input
              type="number"
              value={policies.leaves.maternityLeave}
              onChange={(e) => handlePolicyChange('leaves', 'maternityLeave', parseInt(e.target.value))}
              disabled={!isEditing}
              min="0"
              max="180"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Congé Paternité (jours)
            </label>
            <Input
              type="number"
              value={policies.leaves.paternityLeave}
              onChange={(e) => handlePolicyChange('leaves', 'paternityLeave', parseInt(e.target.value))}
              disabled={!isEditing}
              min="0"
              max="30"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="carryForward"
              checked={policies.leaves.carryForward}
              onChange={(e) => handlePolicyChange('leaves', 'carryForward', e.target.checked)}
              disabled={!isEditing}
              className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary"
            />
            <label htmlFor="carryForward" className="text-sm font-medium text-text-primary">
              Report de Congés
            </label>
          </div>
          {policies.leaves.carryForward && (
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-text-primary">Maximum:</label>
              <Input
                type="number"
                value={policies.leaves.maxCarryForward}
                onChange={(e) => handlePolicyChange('leaves', 'maxCarryForward', parseInt(e.target.value))}
                disabled={!isEditing}
                min="0"
                max="20"
                className="w-20"
              />
              <span className="text-sm text-text-secondary">jours</span>
            </div>
          )}
        </div>
      </div>

      {/* Holidays Management */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-text-primary mb-4 flex items-center">
          <Icon name="CalendarDays" size={20} className="mr-2 text-error" />
          Jours Fériés
        </h4>
        
        {/* Add New Holiday */}
        {isEditing && (
          <div className="bg-surface-secondary rounded-lg p-4 mb-4">
            <h5 className="text-sm font-medium text-text-primary mb-3">Ajouter un Jour Férié</h5>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input
                type="text"
                placeholder="Nom du jour férié"
                value={newHoliday.name}
                onChange={(e) => setNewHoliday(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                type="date"
                value={newHoliday.date}
                onChange={(e) => setNewHoliday(prev => ({ ...prev, date: e.target.value }))}
              />
              <select
                value={newHoliday.type}
                onChange={(e) => setNewHoliday(prev => ({ ...prev, type: e.target.value }))}
                className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary"
              >
                <option value="national">National</option>
                <option value="religious">Religieux</option>
                <option value="company">Entreprise</option>
              </select>
              <Button
                variant="primary"
                onClick={handleAddHoliday}
                iconName="Plus"
                iconPosition="left"
                disabled={!newHoliday.name || !newHoliday.date}
              >
                Ajouter
              </Button>
            </div>
          </div>
        )}

        {/* Holidays List */}
        <div className="space-y-2">
          {holidays.map(holiday => (
            <div key={holiday.id} className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  holiday.type === 'national' ? 'bg-primary' :
                  holiday.type === 'religious' ? 'bg-accent' : 'bg-secondary'
                }`} />
                <div>
                  <p className="font-medium text-text-primary">{holiday.name}</p>
                  <p className="text-sm text-text-secondary">
                    {new Date(holiday.date).toLocaleDateString('fr-FR')} • {holiday.type}
                  </p>
                </div>
              </div>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveHoliday(holiday.id)}
                  iconName="Trash2"
                  className="text-error hover:text-error hover:bg-error-50"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendancePoliciesTab;