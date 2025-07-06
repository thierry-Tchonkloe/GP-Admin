import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../contexts/AuthContext';
import companyService from '../../../utils/companyService';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError: setFormError
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Check if company email is available
      const emailCheck = await companyService.checkCompanyEmailAvailability(data.companyEmail);
      if (!emailCheck?.success) {
        setError(emailCheck?.error || 'Erreur lors de la vérification de l\'email');
        setIsLoading(false);
        return;
      }

      if (!emailCheck?.available) {
        setFormError('companyEmail', { 
          type: 'manual', 
          message: 'Cette adresse email est déjà utilisée par une autre entreprise' 
        });
        setIsLoading(false);
        return;
      }

      // Step 2: Create user account
      const signUpResult = await signUp(data.email, data.password, {
        fullName: data.fullName,
        role: 'admin'
      }, {
        emailRedirectTo: null // ou null si désactivé
      });

      if (!signUpResult?.success) {
        setError(signUpResult?.error || 'Erreur lors de la création du compte utilisateur');
        setIsLoading(false);
        return;
      }

      // Step 3: Create company
      const companyData = {
        name: data.companyName,
        email: data.companyEmail,
        phone: data.phone || null,
        address: data.address || null,
        website: data.website || null,
        subscriptionPlan: 'trial',
        maxEmployees: 50
      };

      const companyResult = await companyService.createCompany(
        companyData, 
        signUpResult.data.user.id
      );

      if (!companyResult?.success) {
        setError(companyResult?.error || 'Erreur lors de la création de l\'entreprise');
        setIsLoading(false);
        return;
      }

      // Success - redirect to dashboard
      navigate('/dashboard');

    } catch (error) {
      console.log('Registration error:', error);
      setError('Une erreur inattendue est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 2) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Check" size={24} color="var(--color-success)" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Inscription Réussie !
        </h3>
        <p className="text-text-secondary mb-6">
          Votre compte et votre entreprise ont été créés avec succès. Vous allez être redirigé vers le tableau de bord.
        </p>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-text-secondary">Redirection en cours...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-red-800">Erreur d'inscription</h4>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Personal Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="User" size={20} className="mr-2" />
          Informations Personnelles
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Nom complet"
            type="text"
            required
            {...register('fullName', {
              required: 'Le nom complet est requis',
              minLength: {
                value: 2,
                message: 'Le nom doit contenir au moins 2 caractères'
              }
            })}
            error={errors?.fullName?.message}
            placeholder="Ex: Jean Dupont"
          />

          <Input
            label="Adresse email personnelle"
            type="email"
            required
            {...register('email', {
              required: 'L\'adresse email est requise',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Adresse email invalide'
              }
            })}
            error={errors?.email?.message}
            placeholder="votre.email@exemple.com"
          />

          <Input
            label="Mot de passe"
            type="password"
            required
            {...register('password', {
              required: 'Le mot de passe est requis',
              minLength: {
                value: 8,
                message: 'Le mot de passe doit contenir au moins 8 caractères'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'
              }
            })}
            error={errors?.password?.message}
            placeholder="Mot de passe sécurisé"
          />

          <Input
            label="Confirmer le mot de passe"
            type="password"
            required
            {...register('confirmPassword', {
              required: 'La confirmation du mot de passe est requise',
              validate: value =>
                value === password || 'Les mots de passe ne correspondent pas'
            })}
            error={errors?.confirmPassword?.message}
            placeholder="Confirmez votre mot de passe"
          />
        </div>
      </div>

      {/* Company Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Building" size={20} className="mr-2" />
          Informations de l'Entreprise
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Nom de l'entreprise"
            type="text"
            required
            {...register('companyName', {
              required: 'Le nom de l\'entreprise est requis',
              minLength: {
                value: 2,
                message: 'Le nom de l\'entreprise doit contenir au moins 2 caractères'
              }
            })}
            error={errors?.companyName?.message}
            placeholder="Ex: Mon Entreprise SARL"
          />

          <Input
            label="Email de l'entreprise"
            type="email"
            required
            {...register('companyEmail', {
              required: 'L\'email de l\'entreprise est requis',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Adresse email invalide'
              }
            })}
            error={errors?.companyEmail?.message}
            placeholder="contact@monentreprise.com"
          />

          <Input
            label="Téléphone (optionnel)"
            type="tel"
            {...register('phone')}
            error={errors?.phone?.message}
            placeholder="+212 5 22 45 67 89"
          />

          <Input
            label="Adresse (optionnel)"
            type="text"
            {...register('address')}
            error={errors?.address?.message}
            placeholder="123 Avenue Mohammed V, Casablanca"
          />

          <Input
            label="Site web (optionnel)"
            type="url"
            {...register('website', {
              pattern: {
                value: /^https?:\/\/.+/,
                message: 'URL invalide (doit commencer par http:// ou https://)'
              }
            })}
            error={errors?.website?.message}
            placeholder="https://www.monentreprise.com"
          />
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            {...register('acceptTerms', {
              required: 'Vous devez accepter les conditions d\'utilisation'
            })}
            className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="terms" className="text-sm text-text-secondary">
            J'accepte les{' '}
            <a href="#" className="text-primary hover:underline">
              conditions d'utilisation
            </a>{' '}
            et la{' '}
            <a href="#" className="text-primary hover:underline">
              politique de confidentialité
            </a>{' '}
            de GP-Admin
          </label>
        </div>
        {errors?.acceptTerms && (
          <p className="text-red-600 text-sm mt-1">{errors.acceptTerms.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isLoading}
        iconName={isLoading ? undefined : "ArrowRight"}
        iconPosition="right"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Création en cours...
          </div>
        ) : (
          'Créer mon compte'
        )}
      </Button>

      {/* Login Link */}
      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-text-secondary">
          Vous avez déjà un compte ?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-primary hover:underline font-medium"
          >
            Se connecter
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;