import React from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { Text } from '../components/Text';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DraggablePatternCard } from '../components/DraggablePatternCard';
import { FeedbackPatternCard } from '../components/FeedbackPatternCard';
import { AnimationPatternCard } from '../components/AnimationPatternCard';
import { ValueCarousel } from '../components/ValueCarousel';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const bottomPadding = Platform.select({
    ios: insets.bottom,
    android: 80, // Account for tab bar height on Android
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Branded Header */}
      <View style={[styles.header]}>
        <Text style={[
          styles.headerTitle,
          { color: theme.colors.primary }
        ]}>
          Pattern Bridge
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomPadding }
        ]}
      >
        {/* Subtitle as first item in scroll */}
        <Text style={styles.subtitle}>
          Bridging Human Psychology with AI Capabilities
        </Text>

        {/* Pattern Cards */}
        <View style={styles.patterns}>
          <DraggablePatternCard />
          <FeedbackPatternCard />
          <AnimationPatternCard />
        </View>

        {/* Value Carousel at bottom */}
        <ValueCarousel />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  patterns: {
    padding: 20,
    paddingTop: 0,
    flex: 1, // This will push the carousel to the bottom
  },
});
