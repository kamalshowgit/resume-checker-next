# 🚨 Production Backend Connection Troubleshooting Guide

## 🚨 **URGENT: Backend Connection Issues in Production**

If your backend is not connecting properly in production, follow this step-by-step troubleshooting guide.

## 🔍 **Step 1: Immediate Diagnosis**

### **Check the Production Debugger**
1. **Look for the red "🐛 Debug Backend" button** in the bottom-left corner of your production site
2. **Click it** to open the comprehensive debug panel
3. **Review all information** displayed

### **Common Issues Found:**
- ❌ `NEXT_PUBLIC_API_URL` not set
- ❌ Backend server not running
- ❌ CORS configuration errors
- ❌ Wrong backend URL
- ❌ Environment variables missing

## 🔧 **Step 2: Environment Variable Configuration**

### **Frontend (Vercel) - REQUIRED:**
```bash
# Set these in Vercel Dashboard → Settings → Environment Variables
NEXT_PUBLIC_API_URL=https://your-backend-domain.onrender.com
NEXT_PUBLIC_APP_URL=resume-checker-next-git-main-kamalsoniatvercels-projects.vercel.app,resumecheckerai.info,www.resumecheckerai.info
```

### **Backend (Render) - REQUIRED:**
```bash
# Set these in Render Dashboard → Your Service → Environment
APP_URL=resume-checker-next-git-main-kamalsoniatvercels-projects.vercel.app,resumecheckerai.info,www.resumecheckerai.info
CORS_ORIGIN=resume-checker-next-git-main-kit-main-kamalsoniatvercels-projects.vercel.app,resumecheckerai.info,www.resumecheckerai.info
NODE_ENV=production
PORT=10000
PAYPAL_CLIENT_ID=your_production_client_id
PAYPAL_CLIENT_SECRET=your_production_secret_key
PAYPAL_BASE_URL=https://api-m.paypal.com
```

## 🚀 **Step 3: Backend Deployment Check**

### **Verify Backend is Running:**
1. **Go to Render Dashboard**
2. **Check if your service is "Running"**
3. **Click on your service**
4. **Go to "Logs" tab**
5. **Look for these success messages:**

```bash
✅ server listening on http://localhost:10000
✅ 🌐 CORS Origins configured: [your-domains]
✅ === Environment Variables Loaded ===
```

### **If Backend is NOT Running:**
1. **Check "Events" tab** for deployment errors
2. **Verify environment variables** are set correctly
3. **Check "Build" tab** for build failures
4. **Restart the service** if needed

## 🌐 **Step 4: CORS Configuration Check**

### **Expected CORS Logs:**
```bash
🌐 CORS Origins configured: [
  'resume-checker-next-git-main-kamalsoniatvercels-projects.vercel.app',
  'resumecheckerai.info',
  'www.resumecheckerai.info'
]
```

### **If CORS Logs Show Wrong Values:**
1. **Check `CORS_ORIGIN` environment variable**
2. **Check `APP_URL` environment variable**
3. **Ensure no extra spaces** in comma-separated values
4. **Redeploy backend** after fixing environment variables

## 🔌 **Step 5: API Connection Test**

### **Using the Production Debugger:**
1. **Click "Test Connection" button**
2. **Check Health Endpoint** - should return status 200
3. **Check CORS Preflight** - should return status 200
4. **Review any error messages**

### **Manual Test (Browser Console):**
```javascript
// Test health endpoint
fetch('https://your-backend-domain.onrender.com/health')
  .then(response => console.log('Health:', response.status))
  .catch(error => console.error('Health Error:', error));

// Test CORS
fetch('https://your-backend-domain.onrender.com/api/resume', {
  method: 'OPTIONS',
  headers: {
    'Origin': window.location.origin,
    'Access-Control-Request-Method': 'POST'
  }
})
.then(response => console.log('CORS:', response.status))
.catch(error => console.error('CORS Error:', error));
```

## 🚨 **Step 6: Common Error Solutions**

### **Error: "Failed to fetch"**
**Solution:** Backend server is not running or URL is wrong
1. Check Render dashboard for service status
2. Verify `NEXT_PUBLIC_API_URL` is correct
3. Ensure backend is accessible from browser

### **Error: "CORS policy blocked"**
**Solution:** CORS configuration issue
1. Check `CORS_ORIGIN` environment variable
2. Verify frontend domain is in CORS list
3. Redeploy backend after fixing CORS

### **Error: "Network Error"**
**Solution:** Network connectivity issue
1. Check if backend URL is accessible
2. Verify no firewall blocking
3. Test from different network

### **Error: "Environment variables not set"**
**Solution:** Missing environment configuration
1. Set all required environment variables
2. Redeploy both frontend and backend
3. Clear browser cache

## 🔄 **Step 7: Redeployment Process**

### **Backend First:**
1. **Fix environment variables** in Render
2. **Redeploy backend** service
3. **Check logs** for successful startup
4. **Verify CORS origins** are correct

### **Frontend Second:**
1. **Fix environment variables** in Vercel
2. **Redeploy frontend** (automatic with git push)
3. **Clear browser cache**
4. **Test connection** using debugger

## 📱 **Step 8: Testing After Fix**

### **Test Checklist:**
- ✅ **Health Endpoint:** `/health` returns 200
- ✅ **CORS Preflight:** OPTIONS request succeeds
- ✅ **Resume Upload:** File upload works
- ✅ **AI Analysis:** Analysis completes successfully
- ✅ **Payment System:** Payment flow works
- ✅ **No Console Errors:** Browser console is clean

### **Test on All Domains:**
1. **Vercel Preview Domain**
2. **resumecheckerai.info**
3. **www.resumecheckerai.info**

## 🆘 **Step 9: Emergency Contact**

### **If Still Not Working:**
1. **Email Support:** rsmchckrspprt@gmail.com
2. **Include Debug Info:** Copy from production debugger
3. **Describe Issue:** What you're seeing and what you've tried
4. **Attach Screenshots:** Of error messages and debug panel

## 🔍 **Step 10: Prevention for Future**

### **Best Practices:**
1. **Always test locally** before deploying
2. **Use environment-specific** configurations
3. **Monitor logs** after deployment
4. **Test all features** after changes
5. **Keep backup** of working configurations

### **Environment Variable Checklist:**
- [ ] `NEXT_PUBLIC_API_URL` set correctly
- [ ] `NEXT_PUBLIC_APP_URL` includes all domains
- [ ] `APP_URL` matches frontend domains
- [ ] `CORS_ORIGIN` includes all frontend domains
- [ ] `NODE_ENV` set to `production`
- [ ] `PORT` set to `10000` (or your preferred port)
- [ ] PayPal credentials configured
- [ ] All variables set for **Production** environment

---

## 🚀 **Quick Fix Commands**

### **For Render Backend:**
```bash
# Check service status
# Go to Render Dashboard → Your Service → Check if "Running"

# Check logs
# Go to Render Dashboard → Your Service → Logs tab

# Restart service if needed
# Go to Render Dashboard → Your Service → Manual Deploy
```

### **For Vercel Frontend:**
```bash
# Check deployment status
# Go to Vercel Dashboard → Your Project → Deployments

# Check environment variables
# Go to Vercel Dashboard → Your Project → Settings → Environment Variables

# Force redeploy
git commit --allow-empty -m "Force redeploy"
git push origin main
```

---

**🚨 Remember: Backend must be running and accessible before frontend can connect!**

**Your Resume Checker will work perfectly once the backend connection is established!** 🎯
