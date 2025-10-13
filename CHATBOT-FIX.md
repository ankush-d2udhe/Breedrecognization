# 🤖 Fix Chatbot - Add API Key to Vercel

## 🚨 Quick Fix for https://breed-topaz.vercel.app/

Your website is live but the chatbot needs an API key. Here's how to fix it:

### Step 1: Get OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up/Login
3. Go to **API Keys** section
4. Click **"Create new secret key"**
5. Copy the key (starts with `sk-...`)

### Step 2: Add to Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your **breed-topaz** project
3. Go to **Settings** → **Environment Variables**
4. Add this variable:
   ```
   Name: VITE_OPENAI_API_KEY
   Value: sk-your-actual-api-key-here
   ```
5. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click **"Redeploy"** on latest deployment
3. Wait 2 minutes for rebuild

### Alternative: Free Chatbot (No API Key Needed)
If you don't want to pay for OpenAI, I can create a mock chatbot that works without API keys.

## 🎯 After Adding API Key:
- ✅ Chatbot will work in all 3 languages
- ✅ Voice input/output will function
- ✅ Image upload for farming questions
- ✅ Smart farming advice

**Your chatbot will be live in 3 minutes after adding the API key!**

---
**Need the free version?** Let me know and I'll create a mock chatbot.