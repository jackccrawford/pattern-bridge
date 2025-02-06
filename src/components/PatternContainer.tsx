import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Container component that provides proper spacing for pattern content,
 * using a "ghost header" technique similar to tab navigator pattern.
 */
export const PatternContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const headerHeight = Platform.select({ ios: 44, android: 56 });
  
  return (
    <View style={styles.container}>
      {/* Ghost header in normal flow */}
      <View style={{ height: insets.top }} /> {/* Safe area spacer */}
      <View style={{ height: headerHeight }} /> {/* Header spacer */}

      {/* Content area */}
      <View 
        style={[
          styles.content,
          {
            paddingLeft: insets.left,
            paddingRight: insets.right,
            paddingBottom: insets.bottom,
          }
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
