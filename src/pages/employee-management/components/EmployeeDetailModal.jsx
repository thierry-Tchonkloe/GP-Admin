import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmployeeDetailModal = ({ employee, isOpen, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState('profile');

  if (!isOpen || !employee) return null;

  const tabs = [
    { id: 'profile', label: 'Profil', icon: 'User' },
    { id: 'attendance', label: 'Présence', icon: 'Clock' },
    { id: 'biometric', label: 'Biométrie', icon: 'Fingerprint' }
  ];

  const mockAttendanceHistory = [
    { date: '2024-01-15', checkIn: '08:30', checkOut: '17:45', status: 'present', hours: '9h15' },
    { date: '2024-01-14', checkIn: '08:45', checkOut: '17:30', status: 'late', hours: '8h45' },
    { date: '2024-01-13', checkIn: '08:25', checkOut: '17:50', status: 'present', hours: '9h25' },
    { date: '2024-01-12', checkIn: '-', checkOut: '-', status: 'absent', hours: '0h00' },
    { date: '2024-01-11', checkIn: '08:35', checkOut: '17:40', status: 'present', hours: '9h05' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      present: { bg: 'bg-success-100', text: 'text-success-700', label: 'Présent' },
      late: { bg: 'bg-warning-100', text: 'text-warning-700', label: 'En retard' },
      absent: { bg: 'bg-error-100', text: 'text-error-700', label: 'Absent' }
    };
    
    const config = statusConfig[status] || statusConfig.absent;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Personal Information */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4">Informations personnelles</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Nom complet</label>
            <p className="text-text-primary">{employee.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">ID Employé</label>
            <p className="text-text-primary font-data">{employee.employeeId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
            <p className="text-text-primary">{employee.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Téléphone</label>
            <p className="text-text-primary">{employee.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Département</label>
            <p className="text-text-primary">{employee.department}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Position</label>
            <p className="text-text-primary">{employee.position}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Date d'embauche</label>
            <p className="text-text-primary">{new Date(employee.hireDate).toLocaleDateString('fr-FR')}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Salaire</label>
            <p className="text-text-primary">{employee.salary?.toLocaleString('fr-FR')} FCFA</p>
          </div>
        </div>
      </div>

      {/* Status Information */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4">Statut</h4>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-secondary">Statut employé:</span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              employee.status === 'active' ? 'bg-success-100 text-success-700' :
              employee.status === 'inactive'? 'bg-error-100 text-error-700' : 'bg-warning-100 text-warning-700'
            }`}>
              {employee.status === 'active' ? 'Actif' : employee.status === 'inactive' ? 'Inactif' : 'En attente'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-secondary">Biométrie:</span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              employee.biometricEnrolled ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
            }`}>
              {employee.biometricEnrolled ? 'Inscrit' : 'Non inscrit'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAttendanceTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-text-primary">Historique de présence</h4>
        <Button variant="outline" size="sm" iconName="Download">
          Exporter
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-secondary">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Entrée</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Sortie</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Heures</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockAttendanceHistory.map((record, index) => (
              <tr key={index} className="hover:bg-surface-secondary">
                <td className="px-4 py-3 text-sm text-text-primary">
                  {new Date(record.date).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-4 py-3 text-sm text-text-primary font-data">
                  {record.checkIn}
                </td>
                <td className="px-4 py-3 text-sm text-text-primary font-data">
                  {record.checkOut}
                </td>
                <td className="px-4 py-3 text-sm text-text-primary font-data">
                  {record.hours}
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(record.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBiometricTab = () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-text-primary">Gestion biométrique</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((fingerIndex) => (
          <div key={fingerIndex} className="bg-surface-secondary rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-medium text-text-primary">Empreinte {fingerIndex}</h5>
              <Icon 
                name="Fingerprint" 
                size={20} 
                className={employee.biometricEnrolled ? 'text-success' : 'text-text-tertiary'} 
              />
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                employee.biometricEnrolled ? 'bg-success-100' : 'bg-surface-tertiary'
              }`}>
                <Icon 
                  name="Fingerprint" 
                  size={24} 
                  className={employee.biometricEnrolled ? 'text-success' : 'text-text-tertiary'} 
                />
              </div>
              <p className={`text-sm font-medium ${
                employee.biometricEnrolled ? 'text-success' : 'text-text-secondary'
              }`}>
                {employee.biometricEnrolled ? 'Enregistrée' : 'Non enregistrée'}
              </p>
              {employee.biometricEnrolled && (
                <p className="text-xs text-text-secondary mt-1">
                  Enregistrée le 12/01/2024
                </p>
              )}
            </div>
            <div className="mt-4">
              <Button
                variant={employee.biometricEnrolled ? "outline" : "primary"}
                size="sm"
                fullWidth
                iconName={employee.biometricEnrolled ? "RotateCcw" : "Plus"}
              >
                {employee.biometricEnrolled ? 'Réenregistrer' : 'Enregistrer'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-secondary rounded-lg p-4 border border-border">
        <h5 className="font-medium text-text-primary mb-3">Statut du capteur</h5>
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-success rounded-full biometric-pulse"></div>
          <span className="text-sm text-text-primary">Capteur biométrique connecté</span>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          Dernière synchronisation: il y a 2 minutes
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-500 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-surface rounded-lg text-left overflow-hidden shadow-elevation-4 transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-surface px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-tertiary">
                  <Image
                    src={employee.photo}
                    alt={employee.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{employee.name}</h3>
                  <p className="text-sm text-text-secondary">{employee.position} • {employee.department}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(employee)}
                  iconName="Edit"
                >
                  Modifier
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  iconName="X"
                  iconSize={20}
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-secondary'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'attendance' && renderAttendanceTab()}
            {activeTab === 'biometric' && renderBiometricTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;