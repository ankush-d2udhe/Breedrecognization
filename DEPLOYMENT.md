# FarmSenseGlow Deployment Guide

## 🚀 Quick Deploy to Vercel

### 1. Environment Variables Setup
Add these to your Vercel project settings:

```
VITE_GEMINI_API_KEY=your_actual_gemini_api_key
VITE_SUPABASE_URL=https://gvtvbeadrzlwwfwkbgfb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2dHZiZWFkcnpsd3dmd2tiZ2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1Mjc2NTYsImV4cCI6MjA3ODEwMzY1Nn0.zlaWatnGuIQ8RZRD6qqHQSHDxXUchYP_FrR96RVCxGs
VITE_SITE_URL=https://your-app-name.vercel.app
VITE_SITE_NAME=FarmSenseGlow
VITE_GOOGLE_MAPS_API_KEY=AIzaSyA6mfeu_bDZyU7-4np4bF56daOL4R6IFb0
VITE_PUBLIC_BUILDER_KEY=d2a1cc8fe75f48b69ffaf6c06d9f3d31
```

### 2. Deploy Steps

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/farm-sense-glow.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

### 3. Features Included
- ✅ User Authentication (Signup/Login with phone)
- ✅ Marketplace (Create/View cattle posts)
- ✅ AI Chatbot (Gemini-powered farming assistant)
- ✅ Multi-language support (English/Hindi/Marathi)
- ✅ Responsive design
- ✅ Image upload for marketplace

### 4. Post-Deployment
- Test user registration
- Test marketplace posting
- Test AI chatbot with your Gemini API key
- Verify all features work correctly