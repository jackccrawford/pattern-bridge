import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import * as Haptics from 'expo-haptics';
import { Moon, Sun, Smartphone } from 'lucide-react-native';

type ThemeOption = 'light' | 'dark' | 'system';

const themeOptions: Array<{
  value: ThemeOption;
  label: string;
  icon: React.ReactNode;
}> = [
  {
    value: 'light',
    label: 'Light',
    icon: <Sun size={20} />,
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: <Moon size={20} />,
  },
  {
    value: 'system',
    label: 'System',
    icon: <Smartphone size={20} />,
  },
];

export function SettingsScreen() {
  const { theme, setTheme, styles } = useTheme();

  const handleThemeChange = async (newTheme: ThemeOption) => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.selectionAsync();
      } catch (error) {
        // Silently handle haptics errors
      }
    }
    setTheme(newTheme);
  };

  return (
    <View style={[defaultStyles.container, { backgroundColor: styles.colors.background }]}>
      <View style={[defaultStyles.section, { backgroundColor: styles.colors.surfaceVariant }]}>
        <Text style={[defaultStyles.sectionTitle, { color: styles.colors.onSurfaceVariant }]}>
          Appearance
        </Text>
        <View style={[defaultStyles.segmentedControl, { backgroundColor: styles.colors.surface }]}>
          {themeOptions.map(({ value, label, icon }) => (
            <Pressable
              key={value}
              style={({ pressed }) => [
                defaultStyles.option,
                {
                  backgroundColor: theme === value 
                    ? styles.colors.primaryContainer
                    : 'transparent',
                  opacity: pressed ? 0.8 : 1,
                  cursor: Platform.OS === 'web' ? 'pointer' : undefined,
                },
              ]}
              onPress={() => handleThemeChange(value)}
            >
              <View style={defaultStyles.optionContent}>
                <View style={[defaultStyles.icon, { opacity: theme === value ? 1 : 0.5 }]}>
                  {React.cloneElement(icon as React.ReactElement, {
                    color: theme === value 
                      ? styles.colors.onPrimaryContainer
                      : styles.colors.onSurface,
                  })}
                </View>
                <Text
                  style={[
                    defaultStyles.optionLabel,
                    {
                      color: theme === value 
                        ? styles.colors.onPrimaryContainer
                        : styles.colors.onSurface,
                      fontWeight: theme === value ? '600' : '400',
                    },
                  ]}
                >
                  {label}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});
