import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState({
    email: {
      enabled: true,
      server: "smtp.gmail.com",
      port: 587,
      username: "admin@techcorp.com",
      password: "••••••••",
      fromName: "GP-Admin System"
    },
    sms: {
      enabled: true,
      provider: "orange",
      apiKey: "••••••••••••••••",
      senderId: "GP-ADMIN"
    },
    alerts: {
      prolongedAbsence: {
        enabled: true,
        threshold: 30,
        recipients: ["hr@techcorp.com", "admin@techcorp.com"]
      },
      sensorDisconnection: {
        enabled: true,
        threshold: 5,
        recipients: ["tech@techcorp.com", "admin@techcorp.com"]
      },
      systemErrors: {
        enabled: true,
        recipients: ["admin@techcorp.com"]
      },
      dailyReports: {
        enabled: true,
        time: "18:00",
        recipients: ["hr@techcorp.com"]
      }
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);
  const [testingSMS, setTestingSMS] = useState(false);
  const [newRecipient, setNewRecipient] = useState("");
  const [activeAlert, setActiveAlert] = useState(null);

  const smsProviders = [
    { value: "orange", label: "Orange CI" },
    { value: "mtn", label: "MTN CI" },
    { value: "moov", label: "Moov Africa" },
    { value: "custom", label: "Fournisseur Personnalisé" }
  ];

  const handleNotificationChange = (section, field, value) => {
    setNotifications(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAlertChange = (alertType, field, value) => {
    setNotifications(prev => ({
      ...prev,
      alerts: {
        ...prev.alerts,
        [alertType]: {
          ...prev.alerts[alertType],
          [field]: value
        }
      }
    }));
  };

  const handleAddRecipient = (alertType) => {
    if (newRecipient && newRecipient.includes('@')) {
      setNotifications(prev => ({
        ...prev,
        alerts: {
          ...prev.alerts,
          [alertType]: {
            ...prev.alerts[alertType],
            recipients: [...prev.alerts[alertType].recipients, newRecipient]
          }
        }
      }));
      setNewRecipient("");
      setActiveAlert(null);
    }
  };

  const handleRemoveRecipient = (alertType, email) => {
    setNotifications(prev => ({
      ...prev,
      alerts: {
        ...prev.alerts,
        [alertType]: {
          ...prev.alerts[alertType],
          recipients: prev.alerts[alertType].recipients.filter(r => r !== email)
        }
      }
    }));
  };

  const handleTestEmail = async () => {
    setTestingEmail(true);
    // Simulate email test
    setTimeout(() => {
      setTestingEmail(false);
      alert('Email de test envoyé avec succès!');
    }, 2000);
  };

  const handleTestSMS = async () => {
    setTestingSMS(true);
    // Simulate SMS test
    setTimeout(() => {
      setTestingSMS(false);
      alert('SMS de test envoyé avec succès!');
    }, 2000);
  };

  const handleSave = () => {
    console.log('Saving notification settings:', notifications);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
          <p className="text-sm text-text-secondary mt-1">
            Configurez les alertes et notifications du système
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

      {/* Email Configuration */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-text-primary flex items-center">
            <Icon name="Mail" size={20} className="mr-2 text-primary" />
            Configuration Email
          </h4>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="emailEnabled"
                checked={notifications.email.enabled}
                onChange={(e) => handleNotificationChange('email', 'enabled', e.target.checked)}
                disabled={!isEditing}
                className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary"
              />
              <label htmlFor="emailEnabled" className="text-sm font-medium text-text-primary">
                Activé
              </label>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestEmail}
              loading={testingEmail}
              disabled={!notifications.email.enabled}
              iconName="Send"
              iconPosition="left"
            >
              Tester
            </Button>
          </div>
        </div>

        {notifications.email.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Serveur SMTP
              </label>
              <Input
                type="text"
                value={notifications.email.server}
                onChange={(e) => handleNotificationChange('email', 'server', e.target.value)}
                disabled={!isEditing}
                placeholder="smtp.gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Port
              </label>
              <Input
                type="number"
                value={notifications.email.port}
                onChange={(e) => handleNotificationChange('email', 'port', parseInt(e.target.value))}
                disabled={!isEditing}
                placeholder="587"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Nom d'utilisateur
              </label>
              <Input
                type="email"
                value={notifications.email.username}
                onChange={(e) => handleNotificationChange('email', 'username', e.target.value)}
                disabled={!isEditing}
                placeholder="admin@entreprise.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Mot de passe
              </label>
              <Input
                type="password"
                value={notifications.email.password}
                onChange={(e) => handleNotificationChange('email', 'password', e.target.value)}
                disabled={!isEditing}
                placeholder="••••••••"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Nom de l'expéditeur
              </label>
              <Input
                type="text"
                value={notifications.email.fromName}
                onChange={(e) => handleNotificationChange('email', 'fromName', e.target.value)}
                disabled={!isEditing}
                placeholder="GP-Admin System"
              />
            </div>
          </div>
        )}
      </div>

      {/* SMS Configuration */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-text-primary flex items-center">
            <Icon name="MessageSquare" size={20} className="mr-2 text-secondary" />
            Configuration SMS
          </h4>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="smsEnabled"
                checked={notifications.sms.enabled}
                onChange={(e) => handleNotificationChange('sms', 'enabled', e.target.checked)}
                disabled={!isEditing}
                className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary"
              />
              <label htmlFor="smsEnabled" className="text-sm font-medium text-text-primary">
                Activé
              </label>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestSMS}
              loading={testingSMS}
              disabled={!notifications.sms.enabled}
              iconName="Send"
              iconPosition="left"
            >
              Tester
            </Button>
          </div>
        </div>

        {notifications.sms.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Fournisseur SMS
              </label>
              <select
                value={notifications.sms.provider}
                onChange={(e) => handleNotificationChange('sms', 'provider', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary disabled:bg-surface-secondary disabled:text-text-secondary"
              >
                {smsProviders.map(provider => (
                  <option key={provider.value} value={provider.value}>{provider.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                ID Expéditeur
              </label>
              <Input
                type="text"
                value={notifications.sms.senderId}
                onChange={(e) => handleNotificationChange('sms', 'senderId', e.target.value)}
                disabled={!isEditing}
                placeholder="GP-ADMIN"
                maxLength="11"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Clé API
              </label>
              <Input
                type="password"
                value={notifications.sms.apiKey}
                onChange={(e) => handleNotificationChange('sms', 'apiKey', e.target.value)}
                disabled={!isEditing}
                placeholder="••••••••••••••••"
              />
            </div>
          </div>
        )}
      </div>

      {/* Alert Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Bell" size={20} className="mr-2 text-warning" />
          Paramètres d'Alertes
        </h4>

        <div className="space-y-6">
          {/* Prolonged Absence Alert */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h5 className="font-medium text-text-primary">Absence Prolongée</h5>
                <p className="text-sm text-text-secondary">
                  Alerte lorsqu'un employé est absent pendant une durée déterminée
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.alerts.prolongedAbsence.enabled}
                onChange={(e) => handleAlertChange('prolongedAbsence', 'enabled', e.target.checked)}
                disabled={!isEditing}
                className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary"
              />
            </div>
            {notifications.alerts.prolongedAbsence.enabled && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-text-primary">Seuil:</label>
                  <Input
                    type="number"
                    value={notifications.alerts.prolongedAbsence.threshold}
                    onChange={(e) => handleAlertChange('prolongedAbsence', 'threshold', parseInt(e.target.value))}
                    disabled={!isEditing}
                    className="w-20"
                    min="1"
                    max="120"
                  />
                  <span className="text-sm text-text-secondary">minutes</span>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-text-primary">Destinataires:</label>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveAlert('prolongedAbsence')}
                        iconName="Plus"
                        iconPosition="left"
                      >
                        Ajouter
                      </Button>
                    )}
                  </div>
                  <div className="space-y-1">
                    {notifications.alerts.prolongedAbsence.recipients.map(email => (
                      <div key={email} className="flex items-center justify-between bg-surface-secondary rounded px-3 py-2">
                        <span className="text-sm text-text-primary">{email}</span>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveRecipient('prolongedAbsence', email)}
                            iconName="X"
                            className="text-error hover:text-error"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {activeAlert === 'prolongedAbsence' && (
                    <div className="flex space-x-2 mt-2">
                      <Input
                        type="email"
                        placeholder="email@exemple.com"
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleAddRecipient('prolongedAbsence')}
                        iconName="Plus"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveAlert(null)}
                        iconName="X"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sensor Disconnection Alert */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h5 className="font-medium text-text-primary">Déconnexion Capteur</h5>
                <p className="text-sm text-text-secondary">
                  Alerte lorsqu'un capteur biométrique se déconnecte
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.alerts.sensorDisconnection.enabled}
                onChange={(e) => handleAlertChange('sensorDisconnection', 'enabled', e.target.checked)}
                disabled={!isEditing}
                className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary"
              />
            </div>
            {notifications.alerts.sensorDisconnection.enabled && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-text-primary">Délai:</label>
                  <Input
                    type="number"
                    value={notifications.alerts.sensorDisconnection.threshold}
                    onChange={(e) => handleAlertChange('sensorDisconnection', 'threshold', parseInt(e.target.value))}
                    disabled={!isEditing}
                    className="w-20"
                    min="1"
                    max="60"
                  />
                  <span className="text-sm text-text-secondary">minutes</span>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-text-primary">Destinataires:</label>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveAlert('sensorDisconnection')}
                        iconName="Plus"
                        iconPosition="left"
                      >
                        Ajouter
                      </Button>
                    )}
                  </div>
                  <div className="space-y-1">
                    {notifications.alerts.sensorDisconnection.recipients.map(email => (
                      <div key={email} className="flex items-center justify-between bg-surface-secondary rounded px-3 py-2">
                        <span className="text-sm text-text-primary">{email}</span>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveRecipient('sensorDisconnection', email)}
                            iconName="X"
                            className="text-error hover:text-error"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {activeAlert === 'sensorDisconnection' && (
                    <div className="flex space-x-2 mt-2">
                      <Input
                        type="email"
                        placeholder="email@exemple.com"
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleAddRecipient('sensorDisconnection')}
                        iconName="Plus"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveAlert(null)}
                        iconName="X"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Daily Reports */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h5 className="font-medium text-text-primary">Rapports Quotidiens</h5>
                <p className="text-sm text-text-secondary">
                  Envoi automatique des rapports de présence quotidiens
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.alerts.dailyReports.enabled}
                onChange={(e) => handleAlertChange('dailyReports', 'enabled', e.target.checked)}
                disabled={!isEditing}
                className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary"
              />
            </div>
            {notifications.alerts.dailyReports.enabled && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-text-primary">Heure d'envoi:</label>
                  <Input
                    type="time"
                    value={notifications.alerts.dailyReports.time}
                    onChange={(e) => handleAlertChange('dailyReports', 'time', e.target.value)}
                    disabled={!isEditing}
                    className="w-32"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-text-primary">Destinataires:</label>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveAlert('dailyReports')}
                        iconName="Plus"
                        iconPosition="left"
                      >
                        Ajouter
                      </Button>
                    )}
                  </div>
                  <div className="space-y-1">
                    {notifications.alerts.dailyReports.recipients.map(email => (
                      <div key={email} className="flex items-center justify-between bg-surface-secondary rounded px-3 py-2">
                        <span className="text-sm text-text-primary">{email}</span>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveRecipient('dailyReports', email)}
                            iconName="X"
                            className="text-error hover:text-error"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {activeAlert === 'dailyReports' && (
                    <div className="flex space-x-2 mt-2">
                      <Input
                        type="email"
                        placeholder="email@exemple.com"
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleAddRecipient('dailyReports')}
                        iconName="Plus"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveAlert(null)}
                        iconName="X"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;