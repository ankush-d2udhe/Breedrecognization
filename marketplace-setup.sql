-- Ensure marketplace_items table has proper structure
-- This should already exist based on your types.ts file

-- Create storage bucket for marketplace images if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true) 
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on marketplace_items
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view all active marketplace items
CREATE POLICY "Anyone can view active marketplace items" ON marketplace_items
FOR SELECT USING (status = 'active');

-- Policy: Authenticated users can create marketplace items
CREATE POLICY "Authenticated users can create marketplace items" ON marketplace_items
FOR INSERT WITH CHECK (auth.uid() = seller_id);

-- Policy: Users can update their own marketplace items
CREATE POLICY "Users can update own marketplace items" ON marketplace_items
FOR UPDATE USING (auth.uid() = seller_id);

-- Policy: Users can delete their own marketplace items
CREATE POLICY "Users can delete own marketplace items" ON marketplace_items
FOR DELETE USING (auth.uid() = seller_id);

-- Storage policies for images bucket
CREATE POLICY "Anyone can view images" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own images" ON storage.objects
FOR UPDATE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own images" ON storage.objects
FOR DELETE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);