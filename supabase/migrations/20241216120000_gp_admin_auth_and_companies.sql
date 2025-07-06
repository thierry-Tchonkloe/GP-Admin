-- Location: supabase/migrations/20241216120000_gp_admin_auth_and_companies.sql
-- GP-Admin Authentication and Company Management Module

-- 1. Custom Types
CREATE TYPE public.user_role AS ENUM ('admin', 'manager', 'employee');
CREATE TYPE public.company_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE public.subscription_plan AS ENUM ('trial', 'basic', 'premium', 'enterprise');

-- 2. User Profiles Table (Critical intermediary for auth)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'employee'::public.user_role,
    company_id UUID,
    phone TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Companies Table
CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    address TEXT,
    website TEXT,
    logo_url TEXT,
    status public.company_status DEFAULT 'active'::public.company_status,
    subscription_plan public.subscription_plan DEFAULT 'trial'::public.subscription_plan,
    subscription_expires_at TIMESTAMPTZ,
    max_employees INTEGER DEFAULT 50,
    timezone TEXT DEFAULT 'Africa/Casablanca',
    language TEXT DEFAULT 'fr',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Company Admins Table (Junction table for company ownership)
CREATE TABLE public.company_admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id, user_id)
);

-- 5. Add foreign key from user_profiles to companies
ALTER TABLE public.user_profiles
ADD CONSTRAINT fk_user_profiles_company
FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE SET NULL;

-- 6. Essential Indexes
CREATE INDEX idx_user_profiles_company_id ON public.user_profiles(company_id);
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_companies_email ON public.companies(email);
CREATE INDEX idx_companies_status ON public.companies(status);
CREATE INDEX idx_company_admins_company_id ON public.company_admins(company_id);
CREATE INDEX idx_company_admins_user_id ON public.company_admins(user_id);

-- 7. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_admins ENABLE ROW LEVEL SECURITY;

-- 8. Helper Functions for RLS
CREATE OR REPLACE FUNCTION public.get_user_company_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT company_id FROM public.user_profiles WHERE id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION public.is_company_admin(target_company_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.company_admins ca
    WHERE ca.company_id = target_company_id AND ca.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.is_same_company_user(target_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up1
    JOIN public.user_profiles up2 ON up1.company_id = up2.company_id
    WHERE up1.id = auth.uid() AND up2.id = target_user_id
    AND up1.company_id IS NOT NULL
)
$$;

-- 9. Automatic Profile Creation Function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'employee')::public.user_role
  );
  RETURN NEW;
END;
$$;

-- 10. Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 11. RLS Policies
-- User profiles: Users can view/edit their own profile and company admin can view all company users
CREATE POLICY "users_own_profile"
ON public.user_profiles
FOR ALL
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "company_admin_view_users"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (public.is_company_admin(company_id));

-- Companies: Admins can manage their companies
CREATE POLICY "company_admin_access"
ON public.companies
FOR ALL
TO authenticated
USING (public.is_company_admin(id))
WITH CHECK (public.is_company_admin(id));

-- Company admins: Admins can manage admin assignments for their companies
CREATE POLICY "manage_company_admins"
ON public.company_admins
FOR ALL
TO authenticated
USING (public.is_company_admin(company_id))
WITH CHECK (public.is_company_admin(company_id));

-- 12. Update Functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 13. Update Triggers
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON public.companies
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 14. Mock Data for Development
DO $$
DECLARE
    company1_id UUID := gen_random_uuid();
    company2_id UUID := gen_random_uuid();
    admin1_id UUID := gen_random_uuid();
    admin2_id UUID := gen_random_uuid();
    user1_id UUID := gen_random_uuid();
BEGIN
    -- Create complete auth.users records
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin1_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@techcorp.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin TechCorp", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (admin2_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@innovate.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin Innovate", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user1_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'employe@techcorp.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Employé TechCorp", "role": "employee"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create companies
    INSERT INTO public.companies (id, name, email, phone, address, status, subscription_plan, max_employees) VALUES
        (company1_id, 'TechCorp SARL', 'contact@techcorp.com', '+212 5 22 45 67 89', 
         '123 Avenue Mohammed V, Casablanca, Maroc', 'active'::public.company_status, 'premium'::public.subscription_plan, 100),
        (company2_id, 'Innovate Solutions', 'contact@innovate.com', '+225 07 12 34 56 78',
         '456 Boulevard Félix Houphouët-Boigny, Abidjan, Côte d''Ivoire', 'active'::public.company_status, 'basic'::public.subscription_plan, 50);

    -- Update user profiles with company assignments
    UPDATE public.user_profiles SET company_id = company1_id WHERE id = admin1_id;
    UPDATE public.user_profiles SET company_id = company1_id WHERE id = user1_id;
    UPDATE public.user_profiles SET company_id = company2_id WHERE id = admin2_id;

    -- Create company admin relationships
    INSERT INTO public.company_admins (company_id, user_id, is_primary) VALUES
        (company1_id, admin1_id, true),
        (company2_id, admin2_id, true);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;

-- 15. Cleanup Function for Development
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs to delete
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email LIKE '%@techcorp.com' OR email LIKE '%@innovate.com';

    -- Delete in dependency order
    DELETE FROM public.company_admins WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.companies WHERE email LIKE '%techcorp.com' OR email LIKE '%innovate.com';
    
    -- Delete auth.users last
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;