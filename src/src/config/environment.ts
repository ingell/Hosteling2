/**
 * Environment configuration for Hosteling app
 * This file contains environment-specific settings for Azure deployment
 */

export interface AppConfig {
  apiBaseUrl: string;
  azureAppInsightsKey?: string;
  azureFunctionUrl?: string;
  prelaunchApiEndpoint: string;
  environment: 'development' | 'staging' | 'production';
  version: string;
}

export const config: AppConfig = {
  // API Base URL - will be different for local dev vs Azure
  apiBaseUrl: 'http://localhost:3001/api',
  
  // Azure Application Insights (for analytics tracking)
  azureAppInsightsKey: undefined, // Set this when deploying to Azure
  
  // Azure Functions URL for serverless functions
  azureFunctionUrl: 'https://hosteling-functions.azurewebsites.net/api',
  
  // Pre-launch form submission endpoint
  prelaunchApiEndpoint: '/api/prelaunch/submit',
  
  // Environment detection
  environment: 'development',
  
  // App version
  version: '1.0.0',
};

/**
 * Azure-specific configuration
 */
export const azureConfig = {
  // Storage account for images and files
  storageAccountUrl: undefined, // Set when deploying to Azure
  
  // Cosmos DB endpoint (if using)
  cosmosDbEndpoint: undefined, // Set when deploying to Azure
  
  // Service Bus for messaging (if using)
  serviceBusNamespace: undefined, // Set when deploying to Azure
  
  // Key Vault for secrets (configured server-side)
  keyVaultUrl: undefined, // Set when deploying to Azure
};

/**
 * Feature flags for different deployment environments
 */
export const featureFlags = {
  // Enable pre-launch mode (shows pre-launch page instead of full app)
  prelaunchMode: true, // Default to true for now
  
  // Enable analytics tracking
  enableAnalytics: true,
  
  // Enable email notifications
  enableEmailNotifications: false, // Disabled until Azure setup
  
  // Enable admin features
  enableAdminFeatures: true,
};

export default config;