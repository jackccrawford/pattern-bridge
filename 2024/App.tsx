import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from './src/components/Toast/ToastProvider';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { PatternProvider } from './src/contexts/PatternContext';
import { ThemedNavigator } from './src/navigation/ThemedNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <PatternProvider>
            <NavigationContainer>
              <ToastProvider>
                <ThemedNavigator />
              </ToastProvider>
            </NavigationContainer>
          </PatternProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
