
-- Add new columns to the businesses table to store more details for the profile page
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS stage text,
  ADD COLUMN IF NOT EXISTS industry text,
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS employees text,
  ADD COLUMN IF NOT EXISTS monthly_revenue numeric,
  ADD COLUMN IF NOT EXISTS monthly_expenses numeric,
  ADD COLUMN IF NOT EXISTS funding_goal numeric,
  ADD COLUMN IF NOT EXISTS current_funding numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS use_of_funds text,
  ADD COLUMN IF NOT EXISTS verified boolean DEFAULT false;

-- Enable Row Level Security on the businesses table
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to all businesses, so anyone can view profiles
CREATE POLICY "Businesses are viewable by everyone."
  ON public.businesses FOR SELECT
  USING (true);

-- Policy: Allow authenticated users to insert businesses for themselves
CREATE POLICY "Users can insert their own businesses."
  ON public.businesses FOR INSERT
  WITH CHECK (auth.uid() = user_id);
  
-- Policy: Allow users to update their own businesses
CREATE POLICY "Users can update their own businesses."
  ON public.businesses FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Allow users to delete their own businesses
CREATE POLICY "Users can delete their own businesses."
  ON public.businesses FOR DELETE
  USING (auth.uid() = user_id);
