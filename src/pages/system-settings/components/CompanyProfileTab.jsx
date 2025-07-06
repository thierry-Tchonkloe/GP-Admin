import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CompanyProfileTab = () => {
  const [companyData, setCompanyData] = useState({
    name: "TechCorp Solutions",
    email: "admin@techcorp.com",
    phone: "+225 07 12 34 56 78",
    address: "123 Avenue de la République, Abidjan, Côte d\'Ivoire",
    website: "www.techcorp.com",
    timezone: "Africa/Abidjan",
    currency: "XOF",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  const timezones = [
    { value: "Africa/Abidjan", label: "Abidjan (GMT+0)" },
    { value: "Africa/Lagos", label: "Lagos (GMT+1)" },
    { value: "Africa/Cairo", label: "Le Caire (GMT+2)" },
    { value: "Africa/Nairobi", label: "Nairobi (GMT+3)" },
    { value: "Africa/Johannesburg", label: "Johannesburg (GMT+2)" }
  ];

  const currencies = [
    { value: "XOF", label: "Franc CFA (XOF)" },
    { value: "XAF", label: "Franc CFA Central (XAF)" },
    { value: "NGN", label: "Naira Nigérian (NGN)" },
    { value: "GHS", label: "Cedi Ghanéen (GHS)" },
    { value: "ZAR", label: "Rand Sud-Africain (ZAR)" }
  ];

  const handleInputChange = (field, value) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyData(prev => ({
          ...prev,
          logo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save company profile logic
    console.log('Saving company profile:', companyData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Profil de l'Entreprise</h3>
          <p className="text-sm text-text-secondary mt-1">
            Gérez les informations de base de votre entreprise
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
              onClick={handleCancel}
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

      {/* Company Logo */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-text-primary mb-4">Logo de l'Entreprise</h4>
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-surface-secondary border-2 border-dashed border-border rounded-lg flex items-center justify-center overflow-hidden">
            {companyData.logo ? (
              <Image
                src={companyData.logo}
                alt="Logo de l'entreprise"
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="Building" size={32} className="text-text-tertiary" />
            )}
          </div>
          {isEditing && (
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="mb-2"
              />
              <p className="text-xs text-text-secondary">
                Formats acceptés: JPG, PNG, SVG. Taille maximale: 2MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-text-primary mb-4">Informations Générales</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Nom de l'Entreprise *
            </label>
            <Input
              type="text"
              value={companyData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEditing}
              placeholder="Nom de votre entreprise"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Principal *
            </label>
            <Input
              type="email"
              value={companyData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              placeholder="email@entreprise.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Téléphone
            </label>
            <Input
              type="tel"
              value={companyData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              placeholder="+225 XX XX XX XX XX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Site Web
            </label>
            <Input
              type="url"
              value={companyData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              disabled={!isEditing}
              placeholder="www.entreprise.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Adresse Complète
            </label>
            <Input
              type="text"
              value={companyData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              placeholder="Adresse complète de l'entreprise"
            />
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-text-primary mb-4">Paramètres Régionaux</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Fuseau Horaire
            </label>
            <select
              value={companyData.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary disabled:bg-surface-secondary disabled:text-text-secondary"
            >
              {timezones.map(tz => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Devise
            </label>
            <select
              value={companyData.currency}
              onChange={(e) => handleInputChange('currency', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary disabled:bg-surface-secondary disabled:text-text-secondary"
            >
              {currencies.map(curr => (
                <option key={curr.value} value={curr.value}>{curr.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-text-primary mb-4">Informations Système</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-secondary rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm font-medium text-text-primary">Date de Création</span>
            </div>
            <p className="text-lg font-semibold text-text-primary">15/03/2024</p>
          </div>
          <div className="bg-surface-secondary rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-text-primary">Employés Actifs</span>
            </div>
            <p className="text-lg font-semibold text-text-primary">127</p>
          </div>
          <div className="bg-surface-secondary rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Fingerprint" size={16} className="text-accent" />
              <span className="text-sm font-medium text-text-primary">Capteurs Connectés</span>
            </div>
            <p className="text-lg font-semibold text-text-primary">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileTab;