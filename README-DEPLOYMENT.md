# FarmSenseGlow - Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/farm-sense-glow)

### Option 2: Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project directory**
   ```bash
   cd farm-sense-glow-main
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? **Select your account**
   - Link to existing project? **N**
   - Project name: **farm-sense-glow**
   - Directory: **./farm-sense-glow-main**

### Option 3: GitHub Integration

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/farm-sense-glow.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select your repository
   - Deploy

## Environment Variables Setup

In Vercel Dashboard → Project → Settings → Environment Variables, add:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_SITE_URL=https://your-project.vercel.app
VITE_SITE_NAME=FarmSenseGlow
```

## Build Settings

Vercel will automatically detect:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Domain Setup

1. **Custom Domain** (Optional)
   - Go to Project → Settings → Domains
   - Add your custom domain
   - Configure DNS records

2. **SSL Certificate**
   - Automatically provided by Vercel
   - HTTPS enabled by default

## Post-Deployment

1. **Test the website**
   - Visit your Vercel URL
   - Test all features
   - Check mobile responsiveness

2. **Configure Supabase**
   - Add your Vercel domain to Supabase allowed origins
   - Update redirect URLs

3. **Monitor Performance**
   - Use Vercel Analytics
   - Check Core Web Vitals

## Troubleshooting

- **Build fails**: Check package.json dependencies
- **Environment variables**: Ensure all required vars are set
- **Routing issues**: Vercel.json handles SPA routing
- **API errors**: Check CORS settings in external APIs

Your FarmSenseGlow website will be live at: `https://your-project.vercel.app`