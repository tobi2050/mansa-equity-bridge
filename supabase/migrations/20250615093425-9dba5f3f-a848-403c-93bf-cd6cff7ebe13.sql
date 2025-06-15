
-- Define user roles, now only 'entrepreneur' and 'investor'
CREATE TYPE public.user_role AS ENUM ('entrepreneur', 'investor');

-- Define investor organization types
CREATE TYPE public.investor_org_type AS ENUM ('Individual', 'NGO', 'Charity', 'Investment Firm');

-- Define investment motivation types
CREATE TYPE public.investor_motivation AS ENUM ('ROI-focused', 'Impact-focused', 'Mixed');

-- Create a table for public user profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE,
  full_name TEXT,
  role user_role,
  -- Investor-specific fields
  organization_type investor_org_type,
  investment_motivation investor_motivation,
  industry_preferences TEXT[],
  -- Entrepreneur-specific fields
  business_name TEXT,
  business_description TEXT,
  bio TEXT,
  location TEXT,
  profile_image_url TEXT
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- This trigger automatically creates a profile for new users.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    (new.raw_user_meta_data->>'user_type')::user_role
  );
  return new;
END;
$$;

-- trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
