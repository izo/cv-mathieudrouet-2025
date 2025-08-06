// Environment-specific configuration
type Environment = 'development' | 'production' | 'test';

interface EnvironmentConfig {
  NODE_ENV: Environment;
  DEBUG: boolean;
  LOGGING_LEVEL: 'debug' | 'info' | 'warn' | 'error';
  ENABLE_ANALYTICS: boolean;
  ENABLE_ERROR_REPORTING: boolean;
  PERFORMANCE_MONITORING: boolean;
  CONTENT_CACHE_TTL: number;
  BUILD_OPTIMIZATION: boolean;
  API_BASE_URL?: string;
}

// Environment detection
function getEnvironment(): Environment {
  if (typeof window !== 'undefined') {
    // Browser environment
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'development' 
      : 'production';
  }
  
  // Node environment  
  return (process.env.NODE_ENV as Environment) || 'development';
}

// Environment-specific configurations
const configs: Record<Environment, EnvironmentConfig> = {
  development: {
    NODE_ENV: 'development',
    DEBUG: true,
    LOGGING_LEVEL: 'debug',
    ENABLE_ANALYTICS: false,
    ENABLE_ERROR_REPORTING: false,
    PERFORMANCE_MONITORING: true,
    CONTENT_CACHE_TTL: 0, // No caching in dev
    BUILD_OPTIMIZATION: false,
    API_BASE_URL: 'http://localhost:4321'
  },
  
  production: {
    NODE_ENV: 'production',
    DEBUG: false,
    LOGGING_LEVEL: 'error',
    ENABLE_ANALYTICS: true,
    ENABLE_ERROR_REPORTING: true,
    PERFORMANCE_MONITORING: false,
    CONTENT_CACHE_TTL: 3600000, // 1 hour
    BUILD_OPTIMIZATION: true,
    API_BASE_URL: 'https://cv.mathieu-drouet.com'
  },
  
  test: {
    NODE_ENV: 'test',
    DEBUG: false,
    LOGGING_LEVEL: 'warn',
    ENABLE_ANALYTICS: false,
    ENABLE_ERROR_REPORTING: false,
    PERFORMANCE_MONITORING: false,
    CONTENT_CACHE_TTL: 0,
    BUILD_OPTIMIZATION: false,
    API_BASE_URL: 'http://localhost:3000'
  }
};

// Get current environment configuration
export const env = configs[getEnvironment()];

// Utility functions
export const isDevelopment = () => env.NODE_ENV === 'development';
export const isProduction = () => env.NODE_ENV === 'production';
export const isTest = () => env.NODE_ENV === 'test';

// Configuration validators
export const validateConfig = (): string[] => {
  const errors: string[] = [];
  
  if (!env.NODE_ENV) {
    errors.push('NODE_ENV is required');
  }
  
  if (env.CONTENT_CACHE_TTL < 0) {
    errors.push('CONTENT_CACHE_TTL must be non-negative');
  }
  
  if (env.API_BASE_URL && !isValidUrl(env.API_BASE_URL)) {
    errors.push('API_BASE_URL must be a valid URL');
  }
  
  return errors;
};

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Feature flags
export const featureFlags = {
  enableDebugMode: env.DEBUG,
  enablePerformanceMonitoring: env.PERFORMANCE_MONITORING,
  enableErrorReporting: env.ENABLE_ERROR_REPORTING,
  enableAnalytics: env.ENABLE_ANALYTICS,
  enableContentCaching: env.CONTENT_CACHE_TTL > 0,
  enableBuildOptimization: env.BUILD_OPTIMIZATION
};

// Logging configuration
export const loggingConfig = {
  level: env.LOGGING_LEVEL,
  enabled: env.DEBUG || env.NODE_ENV !== 'production',
  modules: env.DEBUG ? ['PARSER', 'ICONS', 'RENDER', 'BUILD', 'CONTENT'] : ['ERROR']
};

// Performance configuration
export const performanceConfig = {
  monitoring: env.PERFORMANCE_MONITORING,
  budgets: {
    loadTime: isProduction() ? 3000 : 5000, // ms
    bundleSize: isProduction() ? 500 : 1000, // KB
    imageSize: isProduction() ? 100 : 200    // KB
  },
  caching: {
    enabled: env.CONTENT_CACHE_TTL > 0,
    ttl: env.CONTENT_CACHE_TTL
  }
};

// Security configuration
export const securityConfig = {
  enableCSP: true, // Force CSP activation to allow Tally
  enableHSTS: isProduction(),
  enableSecurityHeaders: isProduction(),
  allowedOrigins: isProduction() 
    ? ['https://cv.mathieu-drouet.com'] 
    : ['http://localhost:4321', 'http://localhost:3000'],
  trustedFontSources: ['self'], // Self-hosted fonts only
  trustedImageSources: ['self', 'data:']
};

// Build configuration  
export const buildConfig = {
  optimization: env.BUILD_OPTIMIZATION,
  sourcemaps: isDevelopment(),
  minification: isProduction(),
  compression: isProduction(),
  assetOptimization: isProduction(),
  bundleAnalysis: isDevelopment()
};

// Export all configurations
export default {
  env,
  featureFlags,
  loggingConfig,
  performanceConfig,
  securityConfig,
  buildConfig,
  isDevelopment,
  isProduction,
  isTest,
  validateConfig
};