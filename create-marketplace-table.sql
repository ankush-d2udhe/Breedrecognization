-- Create marketplace_items table
CREATE TABLE IF NOT EXISTS marketplace_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  images JSONB,
  seller_id UUID REFERENCES auth.users(id) NOT NULL,
  category TEXT NOT NULL DEFAULT 'cattle',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'inactive')),
  animal_id UUID,
  location TEXT,
  negotiable BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active marketplace items" ON marketplace_items
FOR SELECT USING (status = 'active');

CREATE POLICY "Authenticated users can create marketplace items" ON marketplace_items
FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update own marketplace items" ON marketplace_items
FOR UPDATE USING (auth.uid() = seller_id);

CREATE POLICY "Users can delete own marketplace items" ON marketplace_items
FOR DELETE USING (auth.uid() = seller_id);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true) 
ON CONFLICT (id) DO NOTHING;