import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  currentTheme: ThemeType;
  styles: typeof baseStyles;
}

// Base styles that change based on theme
const baseStyles = {
  colors: {
    // Base colors
    background: '',
    onBackground: '',
    onBackgroundVariant: '',
    
    // Surface colors
    surface: '',
    onSurface: '',
    surfaceVariant: '',
    onSurfaceVariant: '',
    
    // Primary colors
    primary: '#007AFF',
    onPrimary: '#FFFFFF',
    primaryContainer: '',
    onPrimaryContainer: '',
    
    // State colors
    error: '#DC362E',
    onError: '#FFFFFF',
    success: '#46A758',
    onSuccess: '#FFFFFF',
  },
};

// Theme-specific colors
const lightColors = {
  ...baseStyles.colors,
  // Base colors
  background: '#FFFFFF',
  onBackground: '#1A1C1E',
  onBackgroundVariant: '#42474E',
  
  // Surface colors
  surface: '#F8F9FB',
  onSurface: '#1A1C1E',
  surfaceVariant: '#DFE3EB',
  onSurfaceVariant: '#42474E',
  
  // Primary colors
  primaryContainer: '#D3E4FF',
  onPrimaryContainer: '#001D36',
};

const darkColors = {
  ...baseStyles.colors,
  // Base colors - 15.8:1 contrast ratio
  background: '#1A1C1E',
  onBackground: '#E3E2E6',
  onBackgroundVariant: '#C4C6D0',
  
  // Surface colors - at least 7:1 contrast ratio
  surface: '#2E3134',
  onSurface: '#E3E2E6',
  surfaceVariant: '#43474E',
  onSurfaceVariant: '#C4C6D0',
  
  // Primary colors - at least 4.5:1 contrast ratio
  primaryContainer: '#004881',
  onPrimaryContainer: '#D3E4FF',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('system');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme on startup
  useEffect(() => {
    SecureStore.getItemAsync(THEME_STORAGE_KEY)
      .then((savedTheme) => {
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setTheme(savedTheme as ThemeType);
        }
      })
      .catch(() => {
        // Fallback to system theme if storage fails
        setTheme('system');
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Save theme changes
  useEffect(() => {
    if (!isLoading) {
      SecureStore.setItemAsync(THEME_STORAGE_KEY, theme).catch(() => {
        // Silently handle storage errors
        // The app can still function without persisting the theme
      });
    }
  }, [theme, isLoading]);

  const currentTheme = theme === 'system' 
    ? (systemColorScheme || 'light')
    : theme;

  // Get current theme colors
  const colors = currentTheme === 'dark' ? darkColors : lightColors;

  // Create styles based on current theme
  const styles = {
    colors,
    // Add more theme-based styles here
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        currentTheme,
        styles,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
