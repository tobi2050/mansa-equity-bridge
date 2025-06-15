
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'contribution_mode' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) THEN
        CREATE TYPE public.contribution_mode AS ENUM ('investing', 'donating', 'supporting');
    END IF;
END$$;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS default_contribution_mode public.contribution_mode NOT NULL DEFAULT 'investing';

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _role user_role;
  _industry_preferences text[];
BEGIN
  _role := (new.raw_user_meta_data->>'user_type')::user_role;

  IF _role = 'investor' AND new.raw_user_meta_data ? 'industry_preferences' THEN
    SELECT ARRAY(SELECT jsonb_array_elements_text(new.raw_user_meta_data->'industry_preferences'))
    INTO _industry_preferences;
  END IF;

  INSERT INTO public.profiles (
    id,
    full_name,
    role,
    phone_number,
    organization_type,
    investment_motivation,
    industry_preferences,
    default_contribution_mode
  )
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    _role,
    CASE WHEN _role = 'entrepreneur' THEN new.raw_user_meta_data->>'phone_number' ELSE NULL END,
    CASE WHEN _role = 'investor' THEN (new.raw_user_meta_data->>'organization_type')::investor_org_type ELSE NULL END,
    CASE WHEN _role = 'investor' THEN (new.raw_user_meta_data->>'investment_motivation')::investor_motivation ELSE NULL END,
    _industry_preferences,
    CASE
      WHEN _role = 'investor' AND new.raw_user_meta_data ? 'default_contribution_mode'
      THEN (new.raw_user_meta_data->>'default_contribution_mode')::contribution_mode
      ELSE 'investing'::contribution_mode
    END
  );
  return new;
END;
$function$
