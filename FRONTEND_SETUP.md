# 🚀 Frontend Setup Guide - Connect to Render Backend

## 🔍 Current Issue
Your frontend is still trying to connect to `localhost:4000` instead of your deployed Render backend.

## ✅ What I've Fixed
1. **Created a configuration system** (`src/lib/config.ts`)
2. **Updated the API service** to use proper configuration
3. **Enhanced the connection test** component with setup instructions
4. **Added environment variable validation**

## 🔧 Setup Steps

### Step 1: Get Your Render Backend URL
1. Go to [render.com](https://render.com) and sign in
2. Find your backend service (should be named something like `resume-checker-backend`)
3. Copy the URL (e.g., `https://resume-checker-backend.onrender.com`)

### Step 2: Set Environment Variables in Vercel
1. Go to your [Vercel dashboard](https://vercel.com/dashboard)
2. Select your Resume Checker project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
NEXT_PUBLIC_API_URL=https://your-actual-backend-url.onrender.com
NEXT_PUBLIC_APP_URL=https://your-actual-frontend-url.vercel.app
```

**Replace the URLs with your actual deployed URLs!**

### Step 3: Redeploy
1. Push these changes to GitHub:
   ```bash
   git add .
   git commit -m "Add configuration system and connection test improvements"
   git push origin main
   ```

2. Vercel will automatically redeploy with the new environment variables

### Step 4: Test the Connection
1. Visit your deployed frontend
2. Use the connection test component to verify the backend connection
3. You should see "✅ Production Configuration" instead of "⚠️ Development Configuration"

## 📋 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Your Render backend URL | `https://resume-checker-backend.onrender.com` |
| `NEXT_PUBLIC_APP_URL` | Your Vercel frontend URL | `https://resume-checker.vercel.app` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay payment key (optional) | `rzp_test_...` |
| `NEXT_PUBLIC_RAZORPAY_KEY_SECRET` | Razorpay payment secret (optional) | `...` |

## 🔍 Troubleshooting

### Still seeing localhost:4000?
1. **Check Vercel environment variables** - Make sure they're set correctly
2. **Verify the variable names** - They must start with `NEXT_PUBLIC_`
3. **Check deployment logs** - Ensure the variables are loaded
4. **Clear browser cache** - Sometimes old values persist

### Backend connection fails?
1. **Verify your Render backend is running** - Check the Render dashboard
2. **Test the backend URL directly** - Visit `https://your-backend.onrender.com/health`
3. **Check CORS settings** - Ensure your backend allows requests from your frontend domain

### Environment variables not loading?
1. **Redeploy after setting variables** - Vercel needs a fresh deployment
2. **Check variable scope** - Make sure they're set for the correct environment (Production/Preview)
3. **Verify variable names** - No typos, exact case matching

## 🎯 Expected Result
After setup, your connection test should show:
- ✅ Production Configuration
- Current API URL: `https://your-backend.onrender.com`
- Connection successful to your Render backend

## 📞 Need Help?
1. Check the connection test component for real-time status
2. Verify your Render backend is deployed and running
3. Ensure environment variables are set correctly in Vercel
4. Test the backend health endpoint directly

Your Resume Checker should now properly connect to your deployed backend instead of localhost! 🚀
