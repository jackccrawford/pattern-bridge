import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Text } from '../../../components/Text';
import { useTheme } from '../../../contexts/ThemeContext';
import { PatternContainer } from '../../PatternContainer';

// [AI-FREEZE] Grid configuration
const COLUMN_COUNT = 2;
const GRID_PADDING = 16;
const ITEM_MARGIN = 8;

// [AI-FREEZE] Type safety for blend modes
type BlendMode = 'multiply' | 'screen' | 'overlay' | 'color-burn' | 'color-dodge';

interface GridItem {
  id: number;
  height: number;
  title: string;
  blendMode: BlendMode;
  colors: string[];
}

// [AI-FREEZE] Blend mode configurations
const BLEND_MODES: Array<{ mode: BlendMode; colors: string[] }> = [
  {
    mode: 'multiply',
    colors: ['#FF6B6B', '#4ECDC4'],
  },
  {
    mode: 'screen',
    colors: ['#45B7D1', '#FFEEAD'],
  },
  {
    mode: 'overlay',
    colors: ['#96CEB4', '#FF6B6B'],
  },
  {
    mode: 'color-burn',
    colors: ['#845EC2', '#FF9671'],
  },
  {
    mode: 'color-dodge',
    colors: ['#FFC75F', '#F9F871'],
  },
];

const generateItems = (count: number): GridItem[] => {
  return Array.from({ length: count }, (_, i) => {
    const blend = BLEND_MODES[i % BLEND_MODES.length];
    return {
      id: i,
      height: Math.random() * 100 + 100, // Random height between 100-200
      title: `Item ${i + 1}`,
      blendMode: blend.mode,
      colors: blend.colors,
    };
  });
};

export const MasonryGridDemo = () => {
  const { theme } = useTheme();
  const [items] = React.useState(() => generateItems(20));

  // Organize items into columns
  const columns = React.useMemo(() => {
    const cols: GridItem[][] = Array.from({ length: COLUMN_COUNT }, () => []);
    let colHeights = Array(COLUMN_COUNT).fill(0);

    items.forEach(item => {
      // Find shortest column
      const shortestCol = colHeights.indexOf(Math.min(...colHeights));
      cols[shortestCol].push(item);
      colHeights[shortestCol] += item.height;
    });

    return cols;
  }, [items]);

  const renderItem = React.useCallback((item: GridItem, index: number) => (
    <Animated.View
      key={item.id}
      entering={FadeIn.delay(index * 100)}
      style={[
        styles.item,
        {
          height: item.height,
          marginBottom: ITEM_MARGIN,
          backgroundColor: theme.colors.surface,
        },
      ]}
    >
      {/* Create an isolated stacking context for blend modes */}
      <View style={[styles.blendContainer, { height: item.height, isolation: 'isolate' }]}>
        {/* Base color layer */}
        <View
          style={[
            styles.blendLayer,
            {
              backgroundColor: item.colors[0],
              transform: [{ rotate: '-45deg' }],
            },
          ]}
        />
        {/* Blended color layer */}
        <View
          style={[
            styles.blendLayer,
            {
              backgroundColor: item.colors[1],
              transform: [{ rotate: '45deg' }],
              mixBlendMode: item.blendMode,
            },
          ]}
        />
      </View>
      <Text style={[styles.itemTitle, { color: theme.colors.onSurface }]}>
        {item.title}
      </Text>
    </Animated.View>
  ), [theme]);

  return (
    <PatternContainer>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {columns.map((column, columnIndex) => (
            <View key={columnIndex} style={styles.column}>
              {column.map((item, index) => renderItem(item, index))}
            </View>
          ))}
        </View>
      </ScrollView>
    </PatternContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    padding: GRID_PADDING,
    gap: ITEM_MARGIN,
  },
  column: {
    flex: 1,
  },
  item: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  blendContainer: {
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
  },
  blendLayer: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    top: '-25%',
    left: '-25%',
  },
  itemTitle: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
