-- Add foreign key relationship between marketplace_items and profiles
-- This will improve query performance and data integrity

-- Step 1: Remove existing constraint if it exists
ALTER TABLE marketplace_items DROP CONSTRAINT IF EXISTS marketplace_items_seller_id_fkey;

-- Step 2: Clean up orphaned records (seller_ids that don't exist in profiles)
DELETE FROM marketplace_items 
WHERE seller_id NOT IN (SELECT id FROM profiles WHERE id IS NOT NULL);

-- Step 3: Add the foreign key constraint
ALTER TABLE marketplace_items 
ADD CONSTRAINT marketplace_items_seller_id_fkey 
FOREIGN KEY (seller_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Alternative: If you want to keep orphaned records, create missing profiles first
-- INSERT INTO profiles (id, full_name, role)
-- SELECT DISTINCT seller_id, 'Unknown User', 'farmer'
-- FROM marketplace_items 
-- WHERE seller_id NOT IN (SELECT id FROM profiles WHERE id IS NOT NULL)
-- ON CONFLICT (id) DO NOTHING;