import React from 'react';
import { ScrollView, StyleSheet, View, Platform, Pressable } from 'react-native';
import { Text } from '../components/Text';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePattern } from '../contexts/PatternContext';

type Pattern = 'masonry' | 'cowbell' | 'cardswipe' | 'infinitescroll';

export const SettingsScreen = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { currentPattern, setPattern } = usePattern();

  const bottomPadding = Platform.select({
    ios: insets.bottom,
    android: 80, // Account for tab bar height on Android
  });

  const patterns: { id: Pattern; name: string }[] = [
    { id: 'masonry', name: 'Masonry Grid' },
    { id: 'cowbell', name: 'Party Mode ' },
    { id: 'cardswipe', name: 'Card Swipe' },
    { id: 'infinitescroll', name: 'Infinite Scroll' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomPadding }
        ]}
      >
        <View style={[styles.section, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Settings</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.secondary }]}>Configure your experience</Text>
        </View>

        <View style={[styles.section, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Pattern</Text>
          {patterns.map((pattern) => (
            <Pressable
              key={pattern.id}
              style={[
                styles.patternButton,
                currentPattern === pattern.id && { backgroundColor: theme.colors.primary + '20' },
              ]}
              onPress={() => setPattern(pattern.id)}
            >
              <Text
                style={[
                  styles.patternText,
                  { color: theme.colors.text },
                  currentPattern === pattern.id && { color: theme.colors.primary },
                ]}
              >
                {pattern.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  patternButton: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  patternText: {
    fontSize: 16,
  },
});
