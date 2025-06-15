
-- Create the followers table to allow users to follow each other.
CREATE TABLE public.followers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid NOT NULL,      -- who is following
  following_id uuid NOT NULL,     -- who is being followed
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_follower FOREIGN KEY (follower_id) REFERENCES profiles(id) ON DELETE CASCADE,
  CONSTRAINT fk_following FOREIGN KEY (following_id) REFERENCES profiles(id) ON DELETE CASCADE,
  CONSTRAINT following_pair_unique UNIQUE (follower_id, following_id)
);

-- Enable Row Level Security
ALTER TABLE public.followers ENABLE ROW LEVEL SECURITY;

-- RLS: Only allow users to select the rows where they are either following or being followed
CREATE POLICY "Users can view followers and following" 
  ON public.followers 
  FOR SELECT
  USING (
    follower_id = auth.uid() OR following_id = auth.uid()
  );

-- RLS: Only allow users to follow others on their own behalf
CREATE POLICY "Users can follow others" 
  ON public.followers 
  FOR INSERT
  WITH CHECK (
    follower_id = auth.uid()
  );

-- RLS: Only allow users to unfollow others on their own behalf
CREATE POLICY "Users can unfollow others" 
  ON public.followers 
  FOR DELETE
  USING (
    follower_id = auth.uid()
  );
