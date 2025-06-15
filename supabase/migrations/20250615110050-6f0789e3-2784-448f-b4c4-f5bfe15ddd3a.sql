
-- Add 'supporting' to the contribution_mode enum if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumtypid = 'public.contribution_mode'::regtype AND enumlabel = 'supporting') THEN
        ALTER TYPE public.contribution_mode ADD VALUE 'supporting';
    END IF;
END$$;

-- Create businesses table to store business entities
CREATE TABLE IF NOT EXISTS public.businesses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add RLS to businesses table
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view businesses" ON public.businesses FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create businesses" ON public.businesses FOR INSERT WITH CHECK (auth.role() = 'authenticated');


-- Create business_validations table to track supporter validations
CREATE TABLE IF NOT EXISTS public.business_validations (
  business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (business_id, user_id)
);

-- Add RLS to business_validations table
ALTER TABLE public.business_validations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view validations" ON public.business_validations FOR SELECT USING (true);
CREATE POLICY "Users can create their own validations" ON public.business_validations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own validations" ON public.business_validations FOR DELETE USING (auth.uid() = user_id);

-- Insert mock businesses for demo purposes if they don't exist
INSERT INTO public.businesses (id, name, description)
VALUES
  ('8f5c9a9b-6b7c-4f1a-8e9a-9b6c4f1a8e9a', 'EcoFarm Nigeria', 'Sustainable farming initiative connecting rural farmers with urban markets.'),
  ('9f6c9a9b-7b8c-4f1a-8e9a-9b6c4f1a8e9b', 'AgriTech Solutions', 'Market validation completed, requesting next funding tranche'),
  ('1f7c9a9b-8b9c-4f1a-8e9a-9b6c4f1a8e9c', 'EduConnect Africa', 'Connecting students and teachers across Africa.'),
  ('2f8c9a9b-9b0c-4f1a-8e9a-9b6c4f1a8e9d', 'HealthTech Nigeria', 'Improving healthcare access through technology.')
ON CONFLICT (name) DO NOTHING;
