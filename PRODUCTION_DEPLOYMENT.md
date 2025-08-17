# 🚀 Resume Checker - Production Deployment Guide

## 📋 Prerequisites

- PayPal Business Account with production API access
- Domain name for your application
- Render or Vercel account
- Git repository set up

## 🔑 Environment Variables Setup

### **Required Environment Variables**

#### **For Server (Backend):**
```bash
# PayPal Production Configuration
PAYPAL_CLIENT_ID=your_production_client_id_here
PAYPAL_CLIENT_SECRET=your_production_secret_key_here
PAYPAL_BASE_URL=https://api-m.paypal.com

# App Configuration
NODE_ENV=production
APP_URL=https://your-domain.com
CORS_ORIGIN=https://your-domain.com
PORT=4000

# Database (if using external database)
DATABASE_URL=your_database_connection_string
```

#### **For Client (Frontend):**
```bash
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_production_client_id_here

# App Configuration
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXT_PUBLIC_APP_URL=https://your-frontend-domain.com

# Optional: Analytics and Monitoring
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING=true
```

## 🌐 Deployment Options

### **Option 1: Vercel (Recommended for Frontend)**

#### **Frontend Deployment:**
1. **Connect Repository:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project directory
   cd client
   vercel --prod
   ```

2. **Set Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all `NEXT_PUBLIC_*` variables
   - Set environment to **Production**

3. **Custom Domain:**
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

#### **Backend Deployment:**
1. **Deploy to Render:**
   - Connect your GitHub repository
   - Set build command: `npm install && npm run build`
   - Set start command: `npm start`
   - Set environment variables

2. **Or Deploy to Railway:**
   - Connect GitHub repository
   - Set environment variables
   - Deploy automatically

### **Option 2: Render (Full Stack)**

#### **Frontend + Backend:**
1. **Create Web Service:**
   - Connect GitHub repository
   - Set build command: `cd client && npm install && npm run build`
   - Set start command: `cd client && npm start`

2. **Create API Service:**
   - Connect GitHub repository
   - Set build command: `cd server && npm install && npm run build`
   - Set start command: `cd server && npm start`

3. **Set Environment Variables:**
   - Add all required variables to both services
   - Ensure `NODE_ENV=production`

## 🔧 Production Configuration

### **1. Update PayPal Keys**

Replace the development keys in your code with production keys:

```typescript
// server/src/routes/pay.ts
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = 'https://api-m.paypal.com'; // Production URL
```

```typescript
// client/src/components/resume/payment-modal.tsx
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
```

### **2. Database Configuration**

#### **For Production Database:**
```bash
# If using external database (PostgreSQL, MongoDB, etc.)
DATABASE_URL=postgresql://username:password@host:port/database
# or
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

#### **For SQLite (Current Setup):**
- SQLite database will be created automatically
- Ensure the server has write permissions to the data directory

### **3. CORS Configuration**

```typescript
// server/src/index.ts
app.use(cors({ 
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN || process.env.APP_URL
    : '*'
}));
```

## 📱 Frontend Production Build

### **Build Commands:**
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### **Environment Variables:**
Create `.env.local` file in the client directory:
```bash
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_production_paypal_client_id
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXT_PUBLIC_APP_URL=https://your-frontend-domain.com
```

## 🗄️ Backend Production Build

### **Build Commands:**
```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start production server
npm start
```

### **Environment Variables:**
Create `.env` file in the server directory:
```bash
NODE_ENV=production
PAYPAL_CLIENT_ID=your_production_paypal_client_id
PAYPAL_CLIENT_SECRET=your_production_paypal_secret
PAYPAL_BASE_URL=https://api-m.paypal.com
APP_URL=https://your-domain.com
CORS_ORIGIN=https://your-domain.com
PORT=4000
```

## 🔒 Security Considerations

### **1. HTTPS Only:**
- Ensure all production URLs use HTTPS
- Set up SSL certificates (automatic with Vercel/Render)

### **2. Environment Variables:**
- Never commit `.env` files to Git
- Use production environment variable management
- Rotate API keys regularly

### **3. CORS Protection:**
- Restrict CORS to your domain only
- Validate all incoming requests

### **4. Rate Limiting:**
- Implement rate limiting for API endpoints
- Monitor for abuse and DDoS attacks

## 📊 Monitoring and Analytics

### **1. Error Tracking:**
```bash
# Add Sentry or similar error tracking
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### **2. Performance Monitoring:**
```bash
# Enable performance monitoring
NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING=true
```

### **3. Analytics:**
```bash
# Google Analytics or similar
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 🚀 Deployment Checklist

### **Pre-Deployment:**
- [ ] Update PayPal keys to production
- [ ] Set all environment variables
- [ ] Test payment flow in sandbox
- [ ] Verify database connections
- [ ] Check CORS settings

### **Deployment:**
- [ ] Deploy backend first
- [ ] Test backend endpoints
- [ ] Deploy frontend
- [ ] Test frontend functionality
- [ ] Verify payment integration

### **Post-Deployment:**
- [ ] Monitor error logs
- [ ] Test payment flow with real PayPal
- [ ] Verify email notifications
- [ ] Check performance metrics
- [ ] Monitor user feedback

## 🆘 Troubleshooting

### **Common Issues:**

1. **CORS Errors:**
   - Check `CORS_ORIGIN` environment variable
   - Ensure frontend and backend URLs match

2. **PayPal Integration Issues:**
   - Verify production PayPal keys
   - Check PayPal webhook configuration
   - Test in PayPal sandbox first

3. **Database Connection Issues:**
   - Verify database credentials
   - Check network access
   - Ensure proper permissions

4. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript compilation errors

## 📞 Support

For deployment issues:
- **Email**: rsmchckrspprt@gmail.com
- **Documentation**: Check this guide and code comments
- **Logs**: Monitor application logs for errors

## 🔄 Update Process

### **For Future Updates:**
1. Push changes to Git repository
2. Production will auto-deploy (if configured)
3. Monitor deployment logs
4. Test critical functionality
5. Rollback if issues arise

---

**Remember**: Always test in staging environment before deploying to production!
