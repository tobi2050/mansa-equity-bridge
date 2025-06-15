
-- Create a new ENUM type for contribution modes
CREATE TYPE public.contribution_mode AS ENUM ('investing', 'donating');

-- Add a column to the profiles table to store the default contribution mode for users.
-- It defaults to 'investing' for all users.
ALTER TABLE public.profiles
ADD COLUMN default_contribution_mode public.contribution_mode NOT NULL DEFAULT 'investing';
