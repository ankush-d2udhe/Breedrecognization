# Cattle Marketplace Feature

## Overview
A minimal cattle marketplace system that allows authenticated users to create, view, and interact with cattle listings.

## Features Implemented

### 1. User Authentication
- Only authenticated users can create posts
- Authentication handled by existing AuthContext

### 2. Create Post
- Upload cattle image
- Enter breed name, price, description
- Form validation for required fields
- Image upload to Supabase storage

### 3. Backend Storage
- Images stored in Supabase storage bucket 'images'
- Post data saved to 'marketplace_items' table
- Includes: breed, price, description, image URL, contact, user ID, timestamp

### 4. Display Feed
- Shows all active posts
- Displays: image, breed, price, description, contact, timestamp
- Sorted by latest posts first
- Responsive grid layout

### 5. User Interaction
- Call seller button (opens phone dialer)
- View seller name and contact info

### 6. Backend Management (CRUD)
- ✅ Create post (authenticated users only)
- ✅ Retrieve posts for feed
- ✅ Update post (owner only - via RLS policies)
- ✅ Delete post (owner only - via RLS policies)
- ✅ Security via Row Level Security (RLS)

## Files Created
- `src/pages/Marketplace.tsx` - Main marketplace component
- `src/services/marketplace.ts` - Backend service functions
- `src/components/AuthGuard.tsx` - Authentication guard
- `marketplace-setup.sql` - Database setup script

## Setup Instructions
1. Run the SQL script in your Supabase dashboard to set up policies
2. Ensure the 'images' storage bucket exists
3. Navigate to `/marketplace` in your app

## Usage
1. Login to your account
2. Navigate to Marketplace
3. Click "Create Post" to add a new cattle listing
4. Fill in breed name, price, description, and upload image
5. View all listings in the feed
6. Click "Call" button to contact sellers

## Database Schema Used
- Uses existing `marketplace_items` table
- Uses existing `profiles` table for user info
- Images stored in Supabase storage