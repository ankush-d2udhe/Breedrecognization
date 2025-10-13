# Fix Vercel Environment Variables

## The 401 Error Issue
Your chatbot is getting a 401 error because the OpenAI API key isn't available in Vercel's environment.

## Quick Fix Steps:

### Option 1: Via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Click on your project "breed-topaz"
3. Go to Settings → Environment Variables
4. Add these variables:

```
VITE_OPENAI_API_KEY = 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
VITE_SITE_URL = https://breed-topaz.vercel.app
VITE_SITE_NAME = FarmSenseGlow
```

5. Click "Save"
6. Go to Deployments tab and click "Redeploy" on the latest deployment

### Option 2: Via Vercel CLI
```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add VITE_OPENAI_API_KEY
# Paste: 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

vercel env add VITE_SITE_URL
# Paste: https://breed-topaz.vercel.app

vercel env add VITE_SITE_NAME
# Paste: FarmSenseGlow

# Redeploy
vercel --prod
```

## Test After Setup:
1. Visit https://breed-topaz.vercel.app/ai-chatbot
2. Send a message
3. Check browser console (F12) for "API Key status: Present"
4. The chatbot should now work with real AI responses instead of mock responses

## Current Status:
- ✅ Mock responses work (fallback system)
- ❌ Real AI responses fail due to missing API key in Vercel
- ✅ All other features work (voice, image upload, etc.)