import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { CardSwipeDemo } from '../components/patterns/CardSwipe/CardSwipeDemo';
import { MasonryGridDemo } from '../components/patterns/MasonryGrid/MasonryGridDemo';
import { InfiniteScrollDemo } from '../components/patterns/InfiniteScroll/InfiniteScrollDemo';
import { CowbellDemo } from '../components/patterns/PartyMode/CowbellDemo';
import { Header } from '../components/Header';

type Pattern = 'masonry' | 'partyMode' | 'cardSwipe' | 'infiniteScroll';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const [selectedPattern, setSelectedPattern] = React.useState<Pattern>('masonry');

  const renderPattern = () => {
    switch (selectedPattern) {
      case 'masonry':
        return <MasonryGridDemo />;
      case 'cardSwipe':
        return <CardSwipeDemo />;
      case 'infiniteScroll':
        return <InfiniteScrollDemo />;
      case 'partyMode':
        return <CowbellDemo />;
      default:
        return <MasonryGridDemo />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <Header selectedPattern={selectedPattern} onPatternChange={setSelectedPattern} />
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
