# 🚀 Deployment Guide for Resume Checker

This guide will help you deploy your Resume Checker application to free hosting platforms.

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Render account (free)
- Your API keys (Groq, OpenAI, Razorpay)

## 🎯 Deployment Strategy

- **Frontend**: Vercel (Next.js optimized, free tier)
- **Backend**: Render (Node.js hosting, free tier)
- **Database**: SQLite (file-based, included with backend)

## 🚀 Step 1: Deploy Backend to Render

### 1.1 Prepare Your Repository
```bash
# Ensure your backend is in a Git repository
cd server
git init
git add .
git commit -m "Initial commit for deployment"
```

### 1.2 Deploy to Render
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `resume-checker-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 1.3 Set Environment Variables
In Render dashboard, add these environment variables:
```
PORT=10000
CORS_ORIGIN=https://your-frontend-url.vercel.app
ENABLE_RESUME_ANALYSIS=true
ENABLE_ATS_SCORING=true
ENABLE_CONTENT_IMPROVEMENT=true
ENABLE_CHAT_ASSISTANT=true
ENABLE_JOB_SEARCH=true
GROQ_API_KEY=your_groq_api_key
OPENAI_API_KEY=your_openai_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 1.4 Get Your Backend URL
After deployment, note your backend URL (e.g., `https://resume-checker-backend.onrender.com`)

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1 Prepare Your Repository
```bash
# Ensure your frontend is in a Git repository
cd client
git init
git add .
git commit -m "Initial commit for deployment"
```

### 2.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 2.3 Set Environment Variables
In Vercel dashboard, add these environment variables:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
# Do NOT add the secret in the frontend; keep it in the backend only.

### 2.4 Deploy
Click "Deploy" and wait for the build to complete.

## 🔧 Step 3: Update API Configuration

### 3.1 Update Frontend API Calls
Ensure your frontend is using the correct backend URL from the environment variables.

### 3.2 Test the Connection
Visit your deployed frontend and test the resume upload functionality.

## 📊 Step 4: Monitor and Maintain

### 4.1 Render Dashboard
- Monitor your backend service
- Check logs for any errors
- Monitor resource usage (free tier limits)

### 4.2 Vercel Dashboard
- Monitor frontend performance
- Check build logs
- Monitor analytics

## 🆘 Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure `CORS_ORIGIN` is set correctly
2. **Build Failures**: Check package.json scripts and dependencies
3. **Environment Variables**: Verify all required variables are set
4. **Database Issues**: Ensure the data directory is writable

### Free Tier Limitations:
- **Render**: 750 hours/month, 15-minute inactivity timeout
- **Vercel**: 100GB bandwidth/month, serverless function limits

## 🔄 Continuous Deployment

Both platforms support automatic deployments:
- Push to your main branch → automatic deployment
- Preview deployments for pull requests
- Easy rollback to previous versions

## 📱 Final URLs

After deployment, you'll have:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-backend-name.onrender.com`

## 🎉 Congratulations!

Your Resume Checker is now live on the internet! Share the frontend URL with users to start analyzing resumes.

---

**Need Help?** Check the platform documentation or reach out to their support teams.
