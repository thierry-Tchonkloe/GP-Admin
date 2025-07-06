import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const HardwareConfigTab = () => {
  const [sensors, setSensors] = useState([
    {
      id: 1,
      name: "Capteur Principal - Entrée",
      deviceId: "ESP32_001",
      ipAddress: "192.168.1.100",
      location: "Hall d\'Entrée Principal",
      status: "connected",
      lastSeen: new Date(Date.now() - 300000),
      firmware: "v2.1.3",
      batteryLevel: null,
      signalStrength: 85
    },
    {
      id: 2,
      name: "Capteur Secondaire - Bureau",
      deviceId: "ESP32_002",
      ipAddress: "192.168.1.101",
      location: "Bureau Direction",
      status: "connected",
      lastSeen: new Date(Date.now() - 120000),
      firmware: "v2.1.3",
      batteryLevel: null,
      signalStrength: 92
    },
    {
      id: 3,
      name: "Capteur Mobile - Chantier",
      deviceId: "ESP32_003",
      ipAddress: "192.168.1.102",
      location: "Site Externe A",
      status: "disconnected",
      lastSeen: new Date(Date.now() - 3600000),
      firmware: "v2.0.8",
      batteryLevel: 45,
      signalStrength: 0
    }
  ]);

  const [newSensor, setNewSensor] = useState({
    name: "",
    deviceId: "",
    ipAddress: "",
    location: ""
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [testingConnection, setTestingConnection] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'disconnected': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'connected': return 'bg-success-50 border-success-200';
      case 'disconnected': return 'bg-error-50 border-error-200';
      case 'warning': return 'bg-warning-50 border-warning-200';
      default: return 'bg-surface-secondary border-border';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected': return 'Connecté';
      case 'disconnected': return 'Déconnecté';
      case 'warning': return 'Attention';
      default: return 'Inconnu';
    }
  };

  const handleTestConnection = async (sensorId) => {
    setTestingConnection(sensorId);
    
    // Simulate connection test
    setTimeout(() => {
      setSensors(prev => prev.map(sensor => 
        sensor.id === sensorId 
          ? { ...sensor, status: 'connected', lastSeen: new Date() }
          : sensor
      ));
      setTestingConnection(null);
    }, 2000);
  };

  const handleAddSensor = () => {
    if (newSensor.name && newSensor.deviceId && newSensor.ipAddress && newSensor.location) {
      setSensors(prev => [...prev, {
        id: Date.now(),
        ...newSensor,
        status: 'disconnected',
        lastSeen: null,
        firmware: 'v2.1.3',
        batteryLevel: null,
        signalStrength: 0
      }]);
      setNewSensor({ name: "", deviceId: "", ipAddress: "", location: "" });
      setShowAddForm(false);
    }
  };

  const handleRemoveSensor = (id) => {
    setSensors(prev => prev.filter(sensor => sensor.id !== id));
  };

  const formatLastSeen = (date) => {
    if (!date) return 'Jamais';
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Configuration Matérielle</h3>
          <p className="text-sm text-text-secondary mt-1">
            Gérez vos capteurs biométriques et dispositifs connectés
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowAddForm(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Ajouter Capteur
        </Button>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Wifi" size={16} className="text-success" />
            <span className="text-sm font-medium text-text-primary">Capteurs Actifs</span>
          </div>
          <p className="text-2xl font-bold text-success">
            {sensors.filter(s => s.status === 'connected').length}
          </p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="WifiOff" size={16} className="text-error" />
            <span className="text-sm font-medium text-text-primary">Hors Ligne</span>
          </div>
          <p className="text-2xl font-bold text-error">
            {sensors.filter(s => s.status === 'disconnected').length}
          </p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Fingerprint" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Total Capteurs</span>
          </div>
          <p className="text-2xl font-bold text-primary">{sensors.length}</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={16} className="text-accent" />
            <span className="text-sm font-medium text-text-primary">Uptime Moyen</span>
          </div>
          <p className="text-2xl font-bold text-accent">98.5%</p>
        </div>
      </div>

      {/* Add Sensor Form */}
      {showAddForm && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-text-primary">Ajouter un Nouveau Capteur</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddForm(false)}
              iconName="X"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Nom du Capteur *
              </label>
              <Input
                type="text"
                placeholder="Ex: Capteur Entrée Principale"
                value={newSensor.name}
                onChange={(e) => setNewSensor(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                ID Dispositif *
              </label>
              <Input
                type="text"
                placeholder="Ex: ESP32_004"
                value={newSensor.deviceId}
                onChange={(e) => setNewSensor(prev => ({ ...prev, deviceId: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Adresse IP *
              </label>
              <Input
                type="text"
                placeholder="Ex: 192.168.1.103"
                value={newSensor.ipAddress}
                onChange={(e) => setNewSensor(prev => ({ ...prev, ipAddress: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Emplacement *
              </label>
              <Input
                type="text"
                placeholder="Ex: Hall d'Accueil"
                value={newSensor.location}
                onChange={(e) => setNewSensor(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="primary"
              onClick={handleAddSensor}
              disabled={!newSensor.name || !newSensor.deviceId || !newSensor.ipAddress || !newSensor.location}
              iconName="Plus"
              iconPosition="left"
            >
              Ajouter Capteur
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowAddForm(false)}
            >
              Annuler
            </Button>
          </div>
        </div>
      )}

      {/* Sensors List */}
      <div className="space-y-4">
        {sensors.map(sensor => (
          <div key={sensor.id} className={`border rounded-lg p-6 ${getStatusBg(sensor.status)}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  sensor.status === 'connected' ? 'bg-success text-success-foreground' :
                  sensor.status === 'disconnected' ? 'bg-error text-error-foreground' :
                  'bg-warning text-warning-foreground'
                }`}>
                  <Icon name="Fingerprint" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-primary">{sensor.name}</h4>
                  <p className="text-sm text-text-secondary">{sensor.location}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}>
                      <div className={`w-2 h-2 rounded-full mr-1 ${
                        sensor.status === 'connected' ? 'bg-success' :
                        sensor.status === 'disconnected' ? 'bg-error' : 'bg-warning'
                      }`} />
                      {getStatusText(sensor.status)}
                    </span>
                    <span className="text-xs text-text-secondary">
                      Dernière activité: {formatLastSeen(sensor.lastSeen)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTestConnection(sensor.id)}
                  loading={testingConnection === sensor.id}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Tester
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSensor(sensor.id)}
                  iconName="Trash2"
                  className="text-error hover:text-error hover:bg-error-50"
                />
              </div>
            </div>

            {/* Sensor Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-surface rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Monitor" size={14} className="text-text-secondary" />
                  <span className="text-xs font-medium text-text-secondary">ID Dispositif</span>
                </div>
                <p className="text-sm font-mono text-text-primary">{sensor.deviceId}</p>
              </div>
              <div className="bg-surface rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Globe" size={14} className="text-text-secondary" />
                  <span className="text-xs font-medium text-text-secondary">Adresse IP</span>
                </div>
                <p className="text-sm font-mono text-text-primary">{sensor.ipAddress}</p>
              </div>
              <div className="bg-surface rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Cpu" size={14} className="text-text-secondary" />
                  <span className="text-xs font-medium text-text-secondary">Firmware</span>
                </div>
                <p className="text-sm text-text-primary">{sensor.firmware}</p>
              </div>
              <div className="bg-surface rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Signal" size={14} className="text-text-secondary" />
                  <span className="text-xs font-medium text-text-secondary">Signal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-surface-secondary rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        sensor.signalStrength > 70 ? 'bg-success' :
                        sensor.signalStrength > 40 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${sensor.signalStrength}%` }}
                    />
                  </div>
                  <span className="text-sm text-text-primary">{sensor.signalStrength}%</span>
                </div>
              </div>
            </div>

            {/* Battery Level (for mobile sensors) */}
            {sensor.batteryLevel !== null && (
              <div className="mt-4 bg-surface rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Battery" size={16} className="text-text-secondary" />
                    <span className="text-sm font-medium text-text-primary">Niveau de Batterie</span>
                  </div>
                  <span className="text-sm text-text-primary">{sensor.batteryLevel}%</span>
                </div>
                <div className="mt-2 bg-surface-secondary rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      sensor.batteryLevel > 50 ? 'bg-success' :
                      sensor.batteryLevel > 20 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${sensor.batteryLevel}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Network Configuration */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Network" size={20} className="mr-2 text-primary" />
          Configuration Réseau
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-sm font-medium text-text-primary mb-3">Paramètres Serveur</h5>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Port d'Écoute
                </label>
                <Input type="number" value="8080" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Timeout Connexion (secondes)
                </label>
                <Input type="number" value="30" disabled />
              </div>
            </div>
          </div>
          <div>
            <h5 className="text-sm font-medium text-text-primary mb-3">Sécurité</h5>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="encryption"
                  checked
                  disabled
                  className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary"
                />
                <label htmlFor="encryption" className="text-sm text-text-primary">
                  Chiffrement SSL/TLS
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="authentication"
                  checked
                  disabled
                  className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary"
                />
                <label htmlFor="authentication" className="text-sm text-text-primary">
                  Authentification par Token
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareConfigTab;