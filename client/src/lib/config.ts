/**
 * Configuration for production optimization and API management
 */

// API URL configuration
export function getApiUrl(): string {
  // Check for production API URL first
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:5000';
}

// App URL configuration
export function getAppUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:3000';
}

// Check if production is properly configured
export function isProductionConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_APP_URL);
}

// Performance optimization settings
export const PERFORMANCE_CONFIG = {
  // AI analysis timeouts
  FAST_ANALYSIS_TIMEOUT: 10000, // 10 seconds for fast analysis
  FULL_ANALYSIS_TIMEOUT: 45000, // 45 seconds for full AI analysis
  
  // Content improvement limits
  MAX_LINES_TO_IMPROVE: 2, // Reduce from 3 to 2 for faster processing
  IMPROVEMENT_DELAY: 3000, // 3 seconds between improvements
  
  // Rate limiting
  MAX_REQUESTS_PER_MINUTE: 20,
  RATE_LIMIT_WINDOW: 60000, // 1 minute
  
  // Cache settings
  ANALYSIS_CACHE_TTL: 300000, // 5 minutes
  USER_SESSION_TTL: 1800000, // 30 minutes
};

// Feature flags for production
export const FEATURE_FLAGS = {
  ENABLE_PROGRESSIVE_ANALYSIS: true,
  ENABLE_FAST_INITIAL_SCORE: true,
  ENABLE_BACKGROUND_AI: true,
  ENABLE_CONTENT_IMPROVEMENT: true,
  ENABLE_DEVICE_TRACKING: true,
  ENABLE_PAYMENT_SYSTEM: true,
};

// Environment detection
export const ENV = {
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_TEST: process.env.NODE_ENV === 'test',
};

// Logging configuration
export const LOGGING_CONFIG = {
  LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_PERFORMANCE_MONITORING: process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING === 'true',
};
