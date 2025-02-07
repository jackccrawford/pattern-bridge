import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Container component that provides proper spacing for pattern content.
 */
export const PatternContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const headerHeight = Platform.select({ ios: 44, android: 56 }) ?? 56;
  
  // Since header already handles insets.top in its positioning,
  // we only need headerHeight for content padding
  const topPadding = headerHeight;
  
  console.log('PatternContainer padding:', {
    headerHeight,
    insetTop: insets.top,
    totalPadding: topPadding
  });
  
  return (
    <View 
      style={[
        styles.container,
        {
          paddingTop: topPadding,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
        }
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
