import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Text } from '../../Text';
import { useTheme } from '../../../contexts/ThemeContext';
import Animated, { FadeIn } from 'react-native-reanimated';
import { PatternContainer } from '../../PatternContainer';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const GRID_PADDING = 8;
const ITEM_MARGIN = 8;
const COLUMN_WIDTH = (SCREEN_WIDTH - (GRID_PADDING * 2) - (ITEM_MARGIN * (COLUMN_COUNT - 1))) / COLUMN_COUNT;

interface GridItem {
  id: number;
  height: number;
  color: string;
  title: string;
}

const generateItems = (count: number): GridItem[] => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    height: Math.floor(Math.random() * 100 + 100), // Random height between 100-200
    color: colors[i % colors.length],
    title: `Item ${i + 1}`
  }));
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
          backgroundColor: item.color,
          marginBottom: ITEM_MARGIN,
          width: COLUMN_WIDTH,
        }
      ]}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </Animated.View>
  ), []);

  return (
    <PatternContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.grid}>
          {columns.map((column, colIndex) => (
            <View
              key={colIndex}
              style={[
                styles.column,
                colIndex < COLUMN_COUNT - 1 && { marginRight: ITEM_MARGIN }
              ]}
            >
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
  content: {
    padding: GRID_PADDING,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  item: {
    borderRadius: 12,
    padding: 16,
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
