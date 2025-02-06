import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { CardSwipeDemo } from '../components/patterns/CardSwipe/CardSwipeDemo';
import { MasonryGridDemo } from '../components/patterns/MasonryGrid/MasonryGridDemo';
import { InfiniteScrollDemo } from '../components/patterns/InfiniteScroll/InfiniteScrollDemo';
import { CowbellDemo } from '../components/patterns/PartyMode/CowbellDemo';
import { Header } from '../components/Header';

type Pattern = 'masonry' | 'cowbell' | 'cardswipe' | 'infinitescroll';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const [selectedPattern, setSelectedPattern] = useState<Pattern>('masonry');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePatternChange = useCallback((newPattern: Pattern) => {
    if (isTransitioning) return; // Prevent multiple rapid switches
    setIsTransitioning(true);
    
    // Allow time for cleanup
    setTimeout(() => {
      setSelectedPattern(newPattern);
      setIsTransitioning(false);
    }, 100); // Short delay for cleanup
  }, [isTransitioning]);

  const renderPattern = useCallback(() => {
    if (isTransitioning) {
      return null; // Show nothing during transition
    }

    switch (selectedPattern) {
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
  }, [selectedPattern, isTransitioning]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <Header selectedPattern={selectedPattern} onPatternChange={handlePatternChange} />
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
