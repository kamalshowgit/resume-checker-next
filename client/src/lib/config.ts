// Configuration file for the application
export const config = {
  // API Configuration
  api: {
    // Backend API URL - Update this with your actual Render backend URL
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-name.onrender.com',
    
    // Fallback to localhost only in development
    fallbackURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : undefined,
    
    // Timeout settings
    timeout: 30000,
    uploadTimeout: 60000,
  },
  
  // App Configuration
  app: {
    name: 'ResumeCheck',
    version: '1.0.0',
    baseURL: process.env.NEXT_PUBLIC_APP_URL || 'https://your-app-name.vercel.app',
  },
  
  // Payment Configuration
  payment: {
    razorpay: {
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'your_razorpay_key_id',
      keySecret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET || 'your_razorpay_key_secret',
    },
  },
  
  // Feature Flags
  features: {
    mockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
    debugMode: process.env.NODE_ENV === 'development',
  },
};

// Helper function to get the correct API URL
export function getApiUrl(): string {
  // If we have a production API URL, use it
  if (config.api.baseURL && config.api.baseURL !== 'https://your-backend-name.onrender.com') {
    return config.api.baseURL;
  }
  
  // In development, fall back to localhost
  if (config.api.fallbackURL) {
    return config.api.fallbackURL;
  }
  
  // Default fallback
  return 'http://localhost:4000';
}

// Helper function to check if we're using production URLs
export function isProductionConfigured(): boolean {
  return config.api.baseURL !== 'https://your-backend-name.onrender.com' && 
         config.app.baseURL !== 'https://your-app-name.vercel.app';
}
