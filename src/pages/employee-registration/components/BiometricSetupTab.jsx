import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BiometricSetupTab = ({ formData, onFormDataChange }) => {
  const [enrollmentStep, setEnrollmentStep] = useState('instructions');
  const [currentFingerprint, setCurrentFingerprint] = useState(1);
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);
  const [sensorStatus, setSensorStatus] = useState('connected');
  const [enrolledFingerprints, setEnrolledFingerprints] = useState([]);

  const fingerprintSlots = [
    { id: 1, name: 'Empreinte 1', finger: 'Index Droit', status: 'empty' },
    { id: 2, name: 'Empreinte 2', finger: 'Pouce Droit', status: 'empty' },
    { id: 3, name: 'Empreinte 3', finger: 'Index Gauche', status: 'empty' }
  ];

  const startEnrollment = (fingerprintId) => {
    setCurrentFingerprint(fingerprintId);
    setEnrollmentStep('scanning');
    setEnrollmentProgress(0);
    simulateEnrollment();
  };

  const simulateEnrollment = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setEnrollmentProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setEnrollmentStep('success');
        setEnrolledFingerprints(prev => [...prev, currentFingerprint]);
        
        setTimeout(() => {
          setEnrollmentStep('instructions');
          setEnrollmentProgress(0);
        }, 2000);
      }
    }, 800);
  };

  const deleteFingerprint = (fingerprintId) => {
    setEnrolledFingerprints(prev => prev.filter(id => id !== fingerprintId));
  };

  const testFingerprint = (fingerprintId) => {
    console.log(`Testing fingerprint ${fingerprintId}`);
    // Simulate fingerprint test
  };

  const SensorStatusIndicator = () => (
    <div className="bg-surface-secondary rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${
            sensorStatus === 'connected' ? 'bg-success biometric-pulse' : 'bg-error'
          }`} />
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Capteur Biométrique
            </h3>
            <p className="text-sm text-text-secondary">
              {sensorStatus === 'connected' ?'Connecté et prêt à l\'utilisation' :'Déconnecté - Vérifiez la connexion'
              }
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSensorStatus(sensorStatus === 'connected' ? 'disconnected' : 'connected')}
          iconName="RefreshCw"
        >
          Tester
        </Button>
      </div>
    </div>
  );

  const InstructionsView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Fingerprint" size={48} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Configuration Biométrique
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          Enregistrez jusqu'à 3 empreintes digitales pour cet employé. Chaque empreinte servira de sauvegarde pour l'authentification.
        </p>
      </div>

      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-warning-800">Instructions Importantes</h4>
            <ul className="text-sm text-warning-700 mt-2 space-y-1">
              <li>• Assurez-vous que le doigt est propre et sec</li>
              <li>• Placez fermement le doigt sur le capteur</li>
              <li>• Ne bougez pas pendant l'enregistrement</li>
              <li>• Répétez le processus si demandé</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fingerprintSlots.map((slot) => {
          const isEnrolled = enrolledFingerprints.includes(slot.id);
          return (
            <div
              key={slot.id}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                isEnrolled 
                  ? 'border-success bg-success-50' :'border-border-secondary hover:border-primary'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                isEnrolled ? 'bg-success text-white' : 'bg-surface-tertiary'
              }`}>
                <Icon 
                  name={isEnrolled ? "Check" : "Fingerprint"} 
                  size={24} 
                  className={isEnrolled ? 'text-white' : 'text-text-tertiary'}
                />
              </div>
              <h4 className="font-medium text-text-primary mb-1">{slot.name}</h4>
              <p className="text-sm text-text-secondary mb-4">{slot.finger}</p>
              
              {isEnrolled ? (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testFingerprint(slot.id)}
                    iconName="Play"
                    className="w-full"
                  >
                    Tester
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteFingerprint(slot.id)}
                    iconName="Trash2"
                    className="w-full"
                  >
                    Supprimer
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => startEnrollment(slot.id)}
                  iconName="Plus"
                  className="w-full"
                  disabled={sensorStatus !== 'connected'}
                >
                  Enregistrer
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const ScanningView = () => (
    <div className="text-center space-y-6">
      <div className="w-32 h-32 bg-primary-50 rounded-full flex items-center justify-center mx-auto relative">
        <Icon name="Fingerprint" size={64} className="text-primary" />
        <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-75" />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Enregistrement en cours...
        </h3>
        <p className="text-text-secondary">
          Maintenez votre doigt sur le capteur
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="flex justify-between text-sm text-text-secondary mb-2">
          <span>Progression</span>
          <span>{enrollmentProgress}%</span>
        </div>
        <div className="w-full bg-surface-tertiary rounded-full h-3">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${enrollmentProgress}%` }}
          />
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          setEnrollmentStep('instructions');
          setEnrollmentProgress(0);
        }}
      >
        Annuler
      </Button>
    </div>
  );

  const SuccessView = () => (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 bg-success-50 rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle" size={48} className="text-success" />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Empreinte Enregistrée !
        </h3>
        <p className="text-text-secondary">
          L'empreinte digitale a été enregistrée avec succès
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <SensorStatusIndicator />
      
      {enrollmentStep === 'instructions' && <InstructionsView />}
      {enrollmentStep === 'scanning' && <ScanningView />}
      {enrollmentStep === 'success' && <SuccessView />}

      {/* Enrollment Summary */}
      {enrolledFingerprints.length > 0 && enrollmentStep === 'instructions' && (
        <div className="bg-success-50 border border-success-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={20} className="text-success-600" />
            <div>
              <h4 className="font-medium text-success-800">
                Configuration Biométrique Active
              </h4>
              <p className="text-sm text-success-700">
                {enrolledFingerprints.length} empreinte(s) enregistrée(s). 
                L'employé peut maintenant utiliser l'authentification biométrique.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Skip Biometric Option */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">
              Ignorer la Configuration Biométrique
            </h4>
            <p className="text-sm text-text-secondary">
              L'employé pourra configurer ses empreintes plus tard
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => onFormDataChange('skipBiometric', true)}
          >
            Ignorer pour l'instant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BiometricSetupTab;