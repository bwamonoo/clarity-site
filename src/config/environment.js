/**
 * ENVIRONMENT CONFIGURATION
 * Centralized environment variable management
 */

export const EnvironmentConfig = {
  // App Info
  appName: import.meta.env.VITE_APP_NAME || 'Clarity Eye Clinic',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: import.meta.env.VITE_APP_ENV || 'development',
  
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  useMockData: import.meta.env.VITE_USE_MOCK_DATA !== 'false',
  
  // Supabase
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  
  // Feature Flags
  features: {
    onlineBooking: import.meta.env.VITE_FEATURE_ONLINE_BOOKING !== 'false',
    patientPortal: import.meta.env.VITE_FEATURE_PATIENT_PORTAL === 'true',
    paymentIntegration: import.meta.env.VITE_FEATURE_PAYMENT_INTEGRATION === 'true',
    multiLanguage: import.meta.env.VITE_FEATURE_MULTI_LANGUAGE === 'true'
  },
  
  // Clinic Info (Fallbacks)
  clinic: {
    name: import.meta.env.VITE_CLINIC_NAME || 'Clarity Eye Clinic',
    phone: import.meta.env.VITE_CLINIC_PHONE || '+233-XX-XXX-XXXX',
    email: import.meta.env.VITE_CLINIC_EMAIL || 'info@clarityeye.com'
  }
}

/**
 * Check if feature is enabled
 */
export const isFeatureEnabled = (featureName) => {
  return EnvironmentConfig.features[featureName] === true
}

/**
 * Get API endpoint
 */
export const getApiEndpoint = (path) => {
  const baseUrl = EnvironmentConfig.apiUrl.replace(/\/$/, '')
  const cleanPath = path.replace(/^\//, '')
  return `${baseUrl}/${cleanPath}`
}

/**
 * Check if running in development
 */
export const isDevelopment = () => {
  return EnvironmentConfig.environment === 'development'
}

/**
 * Check if running in production
 */
export const isProduction = () => {
  return EnvironmentConfig.environment === 'production'
}