import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { usePattern } from '../contexts/PatternContext';
import { MasonryGridDemo } from '../components/patterns/MasonryGrid/MasonryGridDemo';
import { CowbellDemo } from '../components/patterns/PartyMode/CowbellDemo';
import { CardSwipeDemo } from '../components/patterns/CardSwipe/CardSwipeDemo';
import { InfiniteScrollDemo } from '../components/patterns/InfiniteScroll/InfiniteScrollDemo';
import { Header } from '../components/Header';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const { currentPattern } = usePattern();

  const patternTitles = {
    masonry: { title: 'Masonry Grid Pattern', subtitle: 'A Pinterest-style layout' },
    cowbell: { title: 'Party Mode 🔔', subtitle: 'Interactive animations' },
    cardswipe: { title: 'Card Swipe Pattern', subtitle: 'Tinder-style interactions' },
    infinitescroll: { title: 'Infinite Scroll Pattern', subtitle: 'Endless content loading' },
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
        return null;
    }
  };

  const currentPatternInfo = patternTitles[currentPattern];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <Header 
        title={currentPatternInfo.title}
        subtitle={currentPatternInfo.subtitle}
      />
      <View style={styles.content}>
        {renderPattern()}
      </View>
    </SafeAreaView>
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
