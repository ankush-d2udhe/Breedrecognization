/**
 * Safe configuration object for environment variables
 * This centralizes all environment variable access and provides defaults
 */

interface Config {
  // API Keys (these should eventually be moved to backend)
  openAiApiKey: string | undefined;
  googleMapsApiKey: string | undefined;
  
  // Site information
  siteUrl: string;
  siteName: string;
  
  // Environment
  isDevelopment: boolean;
  isProduction: boolean;
}

// Check if we're in a production build
const isProduction = import.meta.env.MODE === 'production';

const config: Config = {
  // API Keys
  openAiApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  
  // Site information
  siteUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:8080',
  siteName: import.meta.env.VITE_SITE_NAME || 'FarmSenseGlow',
  
  // Environment
  isDevelopment: !isProduction,
  isProduction
};

// Validate required configuration
const validateConfig = () => {
  const requiredVars = [
    { key: 'openAiApiKey', name: 'VITE_OPENAI_API_KEY' },
    { key: 'googleMapsApiKey', name: 'VITE_GOOGLE_MAPS_API_KEY' }
  ];
  
  if (isProduction) {
    const missingVars = requiredVars.filter(
      ({ key }) => !config[key as keyof Config]
    );
    
    if (missingVars.length > 0) {
      console.warn(
        `Missing required environment variables: ${missingVars.map(v => v.name).join(', ')}`
      );
    }
  }
};

// Run validation in development to catch issues early
if (!isProduction) {
  validateConfig();
}

export default config;