-- Complete fresh setup for farm-sense-glow
-- Run this in your new Supabase project's SQL Editor

-- 1. Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'farmer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create marketplace_items table
CREATE TABLE marketplace_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  images JSONB,
  seller_id UUID REFERENCES profiles(id) NOT NULL,
  category TEXT NOT NULL DEFAULT 'cattle',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'inactive')),
  location TEXT,
  negotiable BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;

-- 4. Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR ALL USING (auth.uid() = id);

-- 5. Marketplace policies
CREATE POLICY "Anyone can view active items" ON marketplace_items FOR SELECT USING (status = 'active');
CREATE POLICY "Users can create items" ON marketplace_items FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Users can update own items" ON marketplace_items FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "Users can delete own items" ON marketplace_items FOR DELETE USING (auth.uid() = seller_id);

-- 6. Auto-create profiles for new users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, full_name, role)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', new.email), 'farmer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- 7. Create storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- 8. Storage policies
CREATE POLICY "Anyone can view images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Users can upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own images" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
CREATE POLICY "Users can delete own images" ON storage.objects FOR DELETE USING (bucket_id = 'images');