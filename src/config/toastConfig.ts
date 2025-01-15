// Temporarily hardcoded values (normally from .env)
export const TOAST_DEFAULT_DURATION = 1000;
export const TOAST_REFRESH_DURATION = 400;

/**
 * Base duration values in milliseconds
 * These define our standard timing categories
 */
export const DURATION_VALUES = {
  QUICK: 400,     // 0.4s - Micro-interactions
  STANDARD: 1000, // 1.0s - Most notifications
  EXTENDED: 1500, // 1.5s - Complex messages
  UNDO: 3000,     // 3.0s - Undo operations (needs more time)
  DEFAULT: 1000,  // 1.0s - Default duration
  REFRESH: 400,   // 0.4s - Quick refresh notifications
} as const;

/**
 * Get the appropriate toast duration based on the context
 */
export const getToastDuration = (type: keyof typeof DURATION_VALUES): number => {
  return DURATION_VALUES[type] || DURATION_VALUES.STANDARD;
};
