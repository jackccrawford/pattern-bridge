import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Container component that provides proper spacing for pattern content.
 * [AI-FREEZE] This component handles critical layout spacing to work with the floating header.
 */
export const PatternContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const insets = useSafeAreaInsets();
  // [AI-FREEZE] Critical header height values that must match Header component
  const headerHeight = Platform.select({ ios: 44, android: 56 }) ?? 56;
  
  console.log('PatternContainer padding:', {
    headerHeight,
    insetTop: insets.top,
    totalPadding: headerHeight
  });
  
  return (
    <View 
      style={[
        styles.container,
        {
          // [AI-FREEZE] Essential spacing to work with floating header
          paddingTop: headerHeight,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }
      ]}
    >
      {children}
    </View>
  );
};

// [AI-FREEZE] Critical container styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
