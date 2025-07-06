import supabase from './supabase';

class CompanyService {

  // Create a new company with admin user
  async createCompany(companyData, adminUserId) {
    try {
      // Start a transaction-like operation
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .insert({
          name: companyData.name,
          email: companyData.email,
          phone: companyData.phone,
          address: companyData.address,
          website: companyData.website,
          subscription_plan: companyData.subscriptionPlan || 'trial',
          max_employees: companyData.maxEmployees || 50
        })
        .select()
        .single();

      if (companyError) {
        return { success: false, error: companyError.message };
      }

      // Update user profile with company association
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          company_id: company.id,
          role: 'admin',
          updated_at: new Date().toISOString()
        })
        .eq('id', adminUserId);

      if (profileError) {
        // Cleanup: delete the company if profile update fails
        await supabase.from('companies').delete().eq('id', company.id);
        return { success: false, error: profileError.message };
      }

      // Create company admin relationship
      const { error: adminError } = await supabase
        .from('company_admins')
        .insert({
          company_id: company.id,
          user_id: adminUserId,
          is_primary: true
        });

      if (adminError) {
        // Cleanup if admin relationship creation fails
        await supabase.from('companies').delete().eq('id', company.id);
        return { success: false, error: adminError.message };
      }

      return { success: true, data: company };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Impossible de se connecter à la base de données. Votre projet Supabase peut être en pause ou supprimé.' 
        };
      }
      return { success: false, error: 'Erreur lors de la création de l\'entreprise.' };
    }
  }

  // Get company details
  async getCompany(companyId) {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select(`
          *,
          company_admins (
            user_id,
            is_primary,
            user_profiles (
              id,
              email,
              full_name
            )
          )
        `)
        .eq('id', companyId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Erreur lors du chargement des informations de l\'entreprise.' };
    }
  }

  // Update company details
  async updateCompany(companyId, updates) {
    try {
      const { data, error } = await supabase
        .from('companies')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', companyId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la mise à jour de l\'entreprise.' };
    }
  }

  // Get company users
  async getCompanyUsers(companyId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Erreur lors du chargement des utilisateurs de l\'entreprise.' };
    }
  }

  // Add user to company
  async addUserToCompany(companyId, userId, role = 'employee') {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          company_id: companyId,
          role: role,
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
      return { success: false, error: 'Erreur lors de l\'ajout de l\'utilisateur à l\'entreprise.' };
    }
  }

  // Remove user from company
  async removeUserFromCompany(userId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          company_id: null,
          role: 'employee',
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
      return { success: false, error: 'Erreur lors de la suppression de l\'utilisateur de l\'entreprise.' };
    }
  }

  // Check if email is available for company registration
  async checkCompanyEmailAvailability(email) {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('id')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        return { success: false, error: error.message };
      }

      return { success: true, available: !data };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la vérification de l\'email.' };
    }
  }
}

const companyService = new CompanyService();
export default companyService;