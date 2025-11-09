# Marketplace Deployment Fix Guide

## Issue: Marketplace feature not visible after deployment

### Step 1: Database Setup
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the `fix-marketplace.sql` script provided
4. Verify the `marketplace_items` table exists and has proper RLS policies

### Step 2: Environment Variables Check
Ensure these environment variables are set in your deployment platform:

**Required for Supabase:**
- `NEXT_PUBLIC_SUPABASE_URL=https://ibckoaekfcefniquqcnu.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**For Vite (if using Vite env vars):**
- `VITE_SUPABASE_URL=https://ibckoaekfcefniquqcnu.supabase.co`
- `VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 3: Verify Navigation
The marketplace should appear in navigation. Check:
1. User is logged in (marketplace requires authentication)
2. Navigation includes "Marketplace" link
3. Route `/marketplace` is accessible

### Step 4: Test Locally First
```bash
npm run dev
```
1. Login to your app
2. Navigate to `/marketplace`
3. Try creating a test post
4. Verify images upload to Supabase storage

### Step 5: Deployment Platform Specific

**For Vercel:**
1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Add all required environment variables
3. Redeploy the project

**For Netlify:**
1. Go to Netlify dashboard → Your site → Site settings → Environment variables
2. Add all required environment variables
3. Redeploy the project

### Step 6: Debug Steps
If still not working:

1. **Check browser console for errors**
2. **Check network tab for failed API calls**
3. **Verify Supabase connection:**
   ```javascript
   // Add this temporarily to your Marketplace.tsx
   console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL);
   console.log('User:', user);
   ```

4. **Check Supabase logs:**
   - Go to Supabase dashboard → Logs
   - Look for authentication or RLS policy errors

### Step 7: Common Issues

**Issue: "No cattle listings available"**
- Database is empty (normal for new deployment)
- Try creating a test post

**Issue: Can't create posts**
- Check authentication (user must be logged in)
- Check RLS policies in Supabase
- Check storage bucket permissions

**Issue: Images not uploading**
- Verify 'images' storage bucket exists
- Check storage policies
- Verify bucket is public

**Issue: Navigation not showing Marketplace**
- Check if user is authenticated
- Verify Layout.tsx includes marketplace in navItems

### Step 8: Quick Test
After deployment, test this URL directly:
`https://your-domain.com/marketplace`

If you get a 404, the routing might be the issue.
If you get the page but it's empty, it's likely a database/API issue.