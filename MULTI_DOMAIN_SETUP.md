# 🌐 Multi-Domain Setup Guide for Resume Checker

## 📋 Overview

Your Resume Checker application is now configured to support multiple domains simultaneously. This allows you to deploy the same application across different domains while maintaining proper CORS, security, and functionality.

## 🔧 Environment Variable Configuration

### **Option 1: Comma-Separated List (RECOMMENDED)**

#### **Frontend (Vercel):**
```bash
NEXT_PUBLIC_APP_URL=resume-checker-next-git-main-kamalsoniatvercels-projects.vercel.app,resumecheckerai.info,www.resumecheckerai.info
NEXT_PUBLIC_API_URL=https://your-backend-domain.onrender.com
```

#### **Backend (Render):**
```bash
APP_URL=resume-checker-next-git-main-kamalsoniatvercels-projects.vercel.app,resumecheckerai.info,www.resumecheckerai.info
CORS_ORIGIN=resume-checker-next-git-main-kamalsoniatvercels-projects.vercel.app,resumecheckerai.info,www.resumecheckerai.info
NODE_ENV=production
PAYPAL_CLIENT_ID=your_production_client_id
PAYPAL_CLIENT_SECRET=your_production_secret_key
PAYPAL_BASE_URL=https://api-m.paypal.com
PORT=10000
```

### **Option 2: Separate Variables (Alternative)**

#### **Frontend:**
```bash
NEXT_PUBLIC_APP_URL_1=resume-checker-next-git-main-kamalsoniatvercels-projects.vercel.app
NEXT_PUBLIC_APP_URL_2=resumecheckerai.info
NEXT_PUBLIC_APP_URL_3=www.resumecheckerai.info
NEXT_PUBLIC_API_URL=https://your-backend-domain.onrender.com
```

#### **Backend:**
```bash
APP_URL_1=resume-checker-next-git-main-kamalsoniatvercels-projects.vercel.app
APP_URL_2=resumecheckerai.info
APP_URL_3=www.resumecheckerai.info
CORS_ORIGIN=resume-checker-next-git-main-kamalsoniatvercels-projects.vercel.app,resumecheckerai.info,www.resumecheckerai.info
NODE_ENV=production
PAYPAL_CLIENT_ID=your_production_client_id
PAYPAL_CLIENT_SECRET=your_production_secret_key
PAYPAL_BASE_URL=https://api-m.paypal.com
PORT=10000
```

## 🚀 Deployment Steps

### **1. Set Environment Variables in Vercel (Frontend):**

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add the following variables:

```bash
# Primary configuration
NEXT_PUBLIC_APP_URL=resume-checker-next-git-main-kamalsoniatvercels-projects.vercel.app,resumecheckerai.info,www.resumecheckerai.info
NEXT_PUBLIC_API_URL=https://your-backend-domain.onrender.com

# Optional: Analytics and monitoring
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING=true
```

3. Set environment to **Production** for all variables

### **2. Set Environment Variables in Render (Backend):**

1. Go to Render Dashboard → Your Service → Environment
2. Add the following variables:

```bash
# Domain configuration
APP_URL=resume-checker-next-git-main-kamalsoniatvercels-projects.vercel.app,resumecheckerai.info,www.resumecheckerai.info
CORS_ORIGIN=resume-checker-next-git-main-kamalsoniatvercels-projects.vercel.app,resumecheckerai.info,www.resumecheckerai.info

# Production configuration
NODE_ENV=production
PORT=10000

# PayPal configuration
PAYPAL_CLIENT_ID=your_production_client_id
PAYPAL_CLIENT_SECRET=your_production_secret_key
PAYPAL_BASE_URL=https://api-m.paypal.com
```

### **3. Deploy Backend First:**

1. Push your code to GitHub
2. Render will automatically deploy with new environment variables
3. Check logs to ensure CORS origins are configured correctly

### **4. Deploy Frontend:**

1. Vercel will automatically deploy with new environment variables
2. Test the application on all domains

## 🔍 How It Works

### **Frontend Domain Detection:**
```typescript
// Check if current domain is allowed
const isValid = isCurrentDomainAllowed();

// Get all supported domains
const domains = getAllAppUrls();

// Get primary domain (first in list)
const primaryDomain = getAppUrl();
```

### **Backend CORS Handling:**
```typescript
// CORS origins are automatically parsed from environment variables
const corsOrigins = [
  'resume-checker-next-git-main-kamalsoniatvercels-projects.vercel.app',
  'resumecheckerai.info',
  'www.resumecheckerai.info'
];

// All origins are allowed for CORS requests
app.use(cors({ origin: corsOrigins }));
```

### **Domain Validation:**
- **Automatic Detection:** App detects current domain at runtime
- **Validation:** Checks if current domain is in allowed list
- **Fallback:** Shows error page for unsupported domains
- **Debug Info:** Optional domain information display

## 🛡️ Security Features

### **CORS Protection:**
- Only configured domains can make API requests
- Automatic origin validation
- Secure headers and methods

### **Domain Validation:**
- Runtime domain checking
- Fallback error pages
- Support for multiple protocols (HTTP/HTTPS)

### **Environment Isolation:**
- Development vs production configuration
- Secure environment variable handling
- No hardcoded domains in production

## 📱 Using the Domain Validator Component

### **Basic Usage:**
```tsx
import { DomainValidator } from '../components/ui/domain-validator';

export default function App() {
  return (
    <DomainValidator>
      <YourAppContent />
    </DomainValidator>
  );
}
```

### **With Domain Info Display:**
```tsx
<DomainValidator showDomainInfo={true}>
  <YourAppContent />
</DomainValidator>
```

### **Using the Hook:**
```tsx
import { useDomainValidation } from '../components/ui/domain-validator';

export default function MyComponent() {
  const { isValidDomain, allowedDomains, currentDomain } = useDomainValidation();
  
  if (!isValidDomain) {
    return <div>Domain not supported</div>;
  }
  
  return (
    <div>
      <p>Current domain: {currentDomain}</p>
      <p>Supported domains: {allowedDomains.join(', ')}</p>
    </div>
  );
}
```

## 🔧 Troubleshooting

### **Common Issues:**

1. **CORS Errors:**
   - Check that all domains are properly listed in CORS_ORIGIN
   - Ensure no extra spaces in comma-separated values
   - Verify backend is deployed with new environment variables

2. **Domain Not Supported Error:**
   - Check NEXT_PUBLIC_APP_URL includes current domain
   - Ensure no typos in domain names
   - Verify environment variables are set in production

3. **API Connection Issues:**
   - Check NEXT_PUBLIC_API_URL is correct
   - Verify backend is running and accessible
   - Check CORS configuration on backend

### **Debug Steps:**

1. **Check Environment Variables:**
   ```bash
   # In Vercel/Render dashboard
   # Verify all variables are set correctly
   # Check for typos or extra spaces
   ```

2. **Check Browser Console:**
   - Look for CORS errors
   - Check network requests
   - Verify domain validation

3. **Check Backend Logs:**
   - Look for CORS origin configuration
   - Check for environment variable loading
   - Verify server startup

## 📊 Monitoring and Analytics

### **Domain Usage Tracking:**
```typescript
// Track which domains are being used
const { currentDomain, allowedDomains } = useDomainValidation();

// Send analytics data
if (typeof window !== 'undefined') {
  // Track domain usage
  analytics.track('domain_accessed', { domain: currentDomain });
}
```

### **Performance Monitoring:**
```typescript
// Monitor performance across different domains
const { currentDomain } = useDomainValidation();

// Track page load times
performance.mark('page_start');
// ... page loads
performance.mark('page_end');
performance.measure('page_load', 'page_start', 'page_end');
```

## 🎯 Best Practices

1. **Always use HTTPS** in production
2. **Keep domain list updated** when adding/removing domains
3. **Test on all domains** after deployment
4. **Monitor CORS errors** in production logs
5. **Use environment-specific** configurations
6. **Validate domains** before adding to list

## 📞 Support

For issues with multi-domain setup:
- **Email**: rsmchckrspprt@gmail.com
- **Check logs** for CORS and environment variable errors
- **Verify domain names** are correct and accessible
- **Test deployment** on staging environment first

---

**Your Resume Checker is now ready to run on multiple domains with proper CORS, security, and domain validation!** 🚀
