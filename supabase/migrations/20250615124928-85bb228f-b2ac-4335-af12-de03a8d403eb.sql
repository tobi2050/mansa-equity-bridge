
-- Create ENUM types for verification
CREATE TYPE public.verification_document_type AS ENUM ('identity_card', 'passport', 'drivers_license', 'business_registration', 'proof_of_address');
CREATE TYPE public.verification_status AS ENUM ('pending', 'approved', 'rejected');

-- Add verification columns to the profiles table
ALTER TABLE public.profiles
ADD COLUMN email_verified BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN identity_verified BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN business_verified BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN trust_score INT NOT NULL DEFAULT 0;

-- Create a table for verification documents
CREATE TABLE public.verification_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  document_type public.verification_document_type NOT NULL,
  file_url TEXT NOT NULL,
  status public.verification_status NOT NULL DEFAULT 'pending',
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Add Row Level Security (RLS) to verification_documents
ALTER TABLE public.verification_documents ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own documents
CREATE POLICY "Users can view their own verification documents"
  ON public.verification_documents
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can upload their own documents
CREATE POLICY "Users can create their own verification documents"
  ON public.verification_documents
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create a storage bucket for verification documents.
INSERT INTO storage.buckets (id, name, public)
VALUES ('verification-documents', 'verification-documents', FALSE);

-- Add RLS policies for the storage bucket.
-- Allow users to upload their verification documents into a folder named with their user_id
CREATE POLICY "Allow users to upload verification documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'verification-documents' AND
  auth.uid() = (storage.foldername(name))[1]::uuid
);

-- Allow users to view their own uploaded documents
CREATE POLICY "Allow users to view their own verification documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'verification-documents' AND
  auth.uid() = (storage.foldername(name))[1]::uuid
);

