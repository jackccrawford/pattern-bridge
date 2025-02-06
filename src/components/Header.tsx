import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../contexts/ThemeContext';
import { usePattern } from '../contexts/PatternContext';
import { Picker } from '@react-native-picker/picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { currentPattern, setPattern } = usePattern();

  const patterns = [
    { id: 'masonry', name: 'Masonry Grid' },
    { id: 'cowbell', name: 'Party Mode' },
    { id: 'cardswipe', name: 'Card Swipe' },
    { id: 'infinitescroll', name: 'Infinite Scroll' },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
          paddingTop: Platform.OS === 'ios' ? insets.top : 0,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={currentPattern}
            onValueChange={(value) => setPattern(value)}
            style={styles.picker}
            dropdownIconColor={theme.colors.text}
          >
            {patterns.map((pattern) => (
              <Picker.Item
                key={pattern.id}
                label={pattern.name}
                value={pattern.id}
                color={theme.colors.text}
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  pickerContainer: {
    flex: 1,
    maxWidth: 200,
  },
  picker: {
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
      },
      android: {
        backgroundColor: 'transparent',
        color: '#000',
      },
      web: {
        backgroundColor: 'transparent',
        height: 40,
      },
    }),
  },
});
