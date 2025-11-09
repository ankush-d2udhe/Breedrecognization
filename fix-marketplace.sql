-- Run this in your Supabase SQL Editor to fix marketplace issues

-- 1. Ensure the images storage bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true) 
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Enable RLS on marketplace_items (if not already enabled)
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can view active marketplace items" ON marketplace_items;
DROP POLICY IF EXISTS "Authenticated users can create marketplace items" ON marketplace_items;
DROP POLICY IF EXISTS "Users can update own marketplace items" ON marketplace_items;
DROP POLICY IF EXISTS "Users can delete own marketplace items" ON marketplace_items;

-- 4. Create fresh policies
CREATE POLICY "Anyone can view active marketplace items" ON marketplace_items
FOR SELECT USING (status = 'active');

CREATE POLICY "Authenticated users can create marketplace items" ON marketplace_items
FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update own marketplace items" ON marketplace_items
FOR UPDATE USING (auth.uid() = seller_id);

CREATE POLICY "Users can delete own marketplace items" ON marketplace_items
FOR DELETE USING (auth.uid() = seller_id);

-- 5. Storage policies for images bucket
DROP POLICY IF EXISTS "Anyone can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own images" ON storage.objects;

CREATE POLICY "Anyone can view images" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own images" ON storage.objects
FOR UPDATE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own images" ON storage.objects
FOR DELETE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 6. Insert a test marketplace item (optional - for testing)
-- Replace 'your-user-id' with an actual user ID from your profiles table
-- INSERT INTO marketplace_items (title, price, description, images, seller_id, category, status)
-- VALUES ('Test Cow', 50000, 'Test listing', '["https://example.com/cow.jpg"]', 'your-user-id', 'cattle', 'active');