import React, { useState } from 'react';
import Input from '../../../components/ui/Input';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PersonalInfoTab = ({ formData, onFormDataChange, errors }) => {
  const [profilePreview, setProfilePreview] = useState(null);

  const handleInputChange = (field, value) => {
    onFormDataChange(field, value);
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target.result);
        handleInputChange('profilePhoto', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePhoto = () => {
    setProfilePreview(null);
    handleInputChange('profilePhoto', null);
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo Section */}
      <div className="bg-surface-secondary rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Photo de Profil</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            {profilePreview ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary-100">
                <Image
                  src={profilePreview}
                  alt="Aperçu photo de profil"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={removeProfilePhoto}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-error rounded-full flex items-center justify-center text-white hover:bg-error-600 transition-colors"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-surface-tertiary border-2 border-dashed border-border-secondary flex items-center justify-center">
                <Icon name="User" size={32} className="text-text-tertiary" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <Input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              className="mb-2"
            />
            <p className="text-sm text-text-secondary">
              Formats acceptés: JPG, PNG, GIF (max 5MB)
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Nom Complet *
          </label>
          <Input
            type="text"
            placeholder="Entrez le nom complet"
            value={formData.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            required
          />
          {errors.fullName && (
            <p className="text-error text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Adresse Email *
          </label>
          <Input
            type="email"
            placeholder="exemple@entreprise.com"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Numéro de Téléphone *
          </label>
          <Input
            type="tel"
            placeholder="+225 XX XX XX XX XX"
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
          {errors.phone && (
            <p className="text-error text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Date de Naissance
          </label>
          <Input
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Adresse Complète
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows="3"
            placeholder="Entrez l'adresse complète"
            value={formData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Sexe
          </label>
          <select
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.gender || ''}
            onChange={(e) => handleInputChange('gender', e.target.value)}
          >
            <option value="">Sélectionner</option>
            <option value="male">Masculin</option>
            <option value="female">Féminin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Situation Matrimoniale
          </label>
          <select
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.maritalStatus || ''}
            onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
          >
            <option value="">Sélectionner</option>
            <option value="single">Célibataire</option>
            <option value="married">Marié(e)</option>
            <option value="divorced">Divorcé(e)</option>
            <option value="widowed">Veuf/Veuve</option>
          </select>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-surface-secondary rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Contact d'Urgence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Nom du Contact
            </label>
            <Input
              type="text"
              placeholder="Nom du contact d'urgence"
              value={formData.emergencyContactName || ''}
              onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Téléphone du Contact
            </label>
            <Input
              type="tel"
              placeholder="+225 XX XX XX XX XX"
              value={formData.emergencyContactPhone || ''}
              onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Relation
            </label>
            <Input
              type="text"
              placeholder="Ex: Époux/Épouse, Parent, Ami"
              value={formData.emergencyContactRelation || ''}
              onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;