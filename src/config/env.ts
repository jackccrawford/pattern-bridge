import { Platform } from 'react-native';

// Temporarily hardcoded values until we restore .env support
export const API_URL = 'http://localhost:3000';
export const API_TIMEOUT = 5000;
export const TOAST_DEFAULT_DURATION = 1000;
export const TOAST_REFRESH_DURATION = 400;

const ENV = {
  // Toast Configuration
  TOAST_DEFAULT_DURATION: TOAST_DEFAULT_DURATION,
  TOAST_REFRESH_DURATION: TOAST_REFRESH_DURATION,

  // API Configuration
  API_URL: API_URL,
  API_TIMEOUT: API_TIMEOUT,
  
  // Feature Flags
  IS_DEV: __DEV__,
  IS_IOS: Platform.OS === 'ios',
  IS_ANDROID: Platform.OS === 'android',
} as const;

// Type-safe environment variables
export type ENV = typeof ENV;
export default ENV;
