-- Update the trigger to handle phone number from signup
-- Run this in Supabase SQL Editor

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email, 'User'),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    'farmer'
  );
  RETURN new;
END;
$$;