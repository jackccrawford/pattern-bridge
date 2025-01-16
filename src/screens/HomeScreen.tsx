import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Text } from '../components/Text';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MasonryGridDemo } from '../components/patterns/MasonryGrid/MasonryGridDemo';
import { CowbellDemo } from '../components/patterns/PartyMode/CowbellDemo';
import { CardSwipeDemo } from '../components/patterns/CardSwipe/CardSwipeDemo';
import { InfiniteScrollDemo } from '../components/patterns/InfiniteScroll/InfiniteScrollDemo';
import { usePattern } from '../contexts/PatternContext';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { currentPattern } = usePattern();

  const bottomPadding = Platform.select({
    ios: insets.bottom,
    android: 80, // Account for tab bar height on Android
  });

  const patternTitles = {
    masonry: 'Masonry Grid Pattern',
    cowbell: 'Party Mode 🔔',
    cardswipe: 'Card Swipe Pattern',
    infinitescroll: 'Infinite Scroll Pattern',
  };

  const renderPattern = () => {
    switch (currentPattern) {
      case 'masonry':
        return <MasonryGridDemo />;
      case 'cowbell':
        return <CowbellDemo />;
      case 'cardswipe':
        return <CardSwipeDemo />;
      case 'infinitescroll':
        return <InfiniteScrollDemo />;
      default:
        return <MasonryGridDemo />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Pattern Bridge</Text>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>{patternTitles[currentPattern]}</Text>
      </View>
      <View style={[styles.content, { paddingBottom: bottomPadding }]}>
        {renderPattern()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
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
  content: {
    flex: 1,
  },
});
