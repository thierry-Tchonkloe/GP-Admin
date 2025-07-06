import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn, resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn(data.email, data.password);

      if (result?.success) {
        // Store auth state for backwards compatibility
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      } else {
        setError(result?.error || 'Erreur de connexion');
      }
    } catch (error) {
      console.log('Login error:', error);
      setError('Une erreur inattendue est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = getValues('email');
    
    if (!email) {
      setError('Veuillez saisir votre adresse email pour réinitialiser votre mot de passe.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await resetPassword(email);
      
      if (result?.success) {
        setResetEmailSent(true);
        setShowForgotPassword(false);
      } else {
        setError(result?.error || 'Erreur lors de l\'envoi de l\'email de réinitialisation');
      }
    } catch (error) {
      console.log('Reset password error:', error);
      setError('Une erreur est survenue lors de l\'envoi de l\'email.');
    } finally {
      setIsLoading(false);
    }
  };

  if (resetEmailSent) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={24} color="var(--color-success)" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Email Envoyé !
        </h3>
        <p className="text-text-secondary mb-6">
          Un email de réinitialisation a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception et suivre les instructions.
        </p>
        <Button
          variant="ghost"
          onClick={() => {
            setResetEmailSent(false);
            setShowForgotPassword(false);
          }}
        >
          Retour à la connexion
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-red-800">Erreur de connexion</h4>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <Input
          label="Adresse email"
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
          placeholder="votre.email@entreprise.com"
          autoComplete="email"
        />

        {/* Password Input */}
        <Input
          label="Mot de passe"
          type="password"
          required
          {...register('password', {
            required: 'Le mot de passe est requis'
          })}
          error={errors?.password?.message}
          placeholder="Votre mot de passe"
          autoComplete="current-password"
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              {...register('remember')}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-text-secondary">
              Se souvenir de moi
            </label>
          </div>
          
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-primary hover:underline"
          >
            Mot de passe oublié ?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isLoading}
          iconName={isLoading ? undefined : "LogIn"}
          iconPosition="right"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Connexion...
            </div>
          ) : (
            'Se connecter'
          )}
        </Button>
      </form>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Réinitialiser le mot de passe
            </h3>
            <p className="text-text-secondary mb-4">
              Saisissez votre adresse email ci-dessus et cliquez sur "Envoyer" pour recevoir un lien de réinitialisation.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                onClick={() => setShowForgotPassword(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                variant="primary"
                onClick={handleForgotPassword}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? 'Envoi...' : 'Envoyer'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Link */}
      <div className="text-center pt-6 border-t border-gray-200">
        <p className="text-sm text-text-secondary">
          Pas encore de compte ?{' '}
          <button
            type="button"
            onClick={() => navigate('/company-registration')}
            className="text-primary hover:underline font-medium"
          >
            Créer un compte entreprise
          </button>
        </p>
      </div>

      {/* Demo Credentials */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Comptes de démonstration</h4>
        <div className="text-xs text-blue-700 space-y-1">
          <p><strong>Admin TechCorp:</strong> admin@techcorp.com / password123</p>
          <p><strong>Admin Innovate:</strong> admin@innovate.com / password123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;