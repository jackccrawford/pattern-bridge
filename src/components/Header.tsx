import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../contexts/ThemeContext';

type Pattern = 'masonry' | 'partyMode' | 'cardSwipe' | 'infiniteScroll';

interface HeaderProps {
  selectedPattern: Pattern;
  onPatternChange: (pattern: Pattern) => void;
}

const patterns = [
  { label: 'Masonry Grid', value: 'masonry' },
  { label: 'Party Mode', value: 'partyMode' },
  { label: 'Card Swipe', value: 'cardSwipe' },
  { label: 'Infinite Scroll', value: 'infiniteScroll' },
];

export const Header: React.FC<HeaderProps> = ({ selectedPattern, onPatternChange }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedPattern}
          onValueChange={(value) => onPatternChange(value as Pattern)}
          style={[
            styles.picker,
            Platform.select({
              ios: { color: theme.colors.text },
              android: { color: theme.colors.text, backgroundColor: 'transparent' },
            }),
          ]}
          itemStyle={Platform.select({
            ios: { color: theme.colors.text },
          })}
        >
          {patterns.map((pattern) => (
            <Picker.Item
              key={pattern.value}
              label={pattern.label}
              value={pattern.value}
              color={theme.colors.text}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Platform.select({ ios: 44, android: 56 }),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  picker: {
    ...Platform.select({
      ios: {
        height: 44,
      },
      android: {
        height: 56,
      },
    }),
  },
});
