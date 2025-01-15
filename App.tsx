import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from './src/components/Toast/ToastProvider';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { ThemedNavigator } from './src/navigation/ThemedNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <ToastProvider>
              <ThemedNavigator />
            </ToastProvider>
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
