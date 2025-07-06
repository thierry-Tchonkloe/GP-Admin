import supabase from './supabase';

class AuthService {
  
  // Sign in with email and password
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        return { 
          success: false, 
          error: 'Impossible de se connecter au service d\'authentification. Votre projet Supabase peut être en pause ou inactif. Veuillez vérifier votre tableau de bord Supabase et reprendre votre projet si nécessaire.' 
        };
      }
      return { success: false, error: 'Une erreur est survenue lors de la connexion. Veuillez réessayer.' };
    }
  }

  // Sign up with email, password and additional data
  async signUp(email, password, userData = {}) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.fullName || '',
            role: userData?.role || 'employee'
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        return { 
          success: false, 
          error: 'Impossible de se connecter au service d\'authentification. Votre projet Supabase peut être en pause ou inactif.' 
        };
      }
      return { success: false, error: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.' };
    }
  }

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Une erreur est survenue lors de la déconnexion.' };
    }
  }

  // Get current session
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Impossible de se connecter à la base de données. Votre projet Supabase peut être en pause ou supprimé.' 
        };
      }
      return { success: false, error: 'Erreur lors de la récupération de la session.' };
    }
  }

  // Get user profile
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          companies (
            id,
            name,
            email,
            status,
            subscription_plan
          )
        `)
        .eq('id', userId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Impossible de se connecter à la base de données. Votre projet Supabase peut être en pause ou supprimé.' 
        };
      }
      return { success: false, error: 'Erreur lors du chargement du profil utilisateur.' };
    }
  }

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la mise à jour du profil.' };
    }
  }

  // Reset password
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erreur lors de l\'envoi de l\'email de réinitialisation.' };
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }

  // Get current user
  getCurrentUser() {
    return supabase.auth.getUser();
  }
}

const authService = new AuthService();
export default authService;