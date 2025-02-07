import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, Image } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Text } from '../../../components/Text';
import { useTheme } from '../../../contexts/ThemeContext';
import { PatternContainer } from '../../PatternContainer';

// [AI-FREEZE] Grid configuration
const COLUMN_COUNT = 2;
const GRID_PADDING = 16;
const ITEM_MARGIN = 8;
const ITEMS_PER_PAGE = 10;

// [AI-FREEZE] Type safety for blend modes
type ColorBlendMode = 'multiply' | 'screen' | 'overlay' | 'color-burn' | 'color-dodge';
type ImageBlendMode = 'luminosity' | 'hue' | 'saturation' | 'soft-light';
type ItemType = 'color' | 'image';

interface GridItem {
  id: number;
  height: number;
  title: string;
  type: ItemType;
  imageUrl?: string;
  imageBlendMode?: ImageBlendMode;
  colorBlendMode?: ColorBlendMode;
  colors?: string[];
  overlayColor?: string;
}

// [AI-FREEZE] Blend mode configurations
const COLOR_BLEND_CONFIGS: Array<{ mode: ColorBlendMode; colors: string[] }> = [
  {
    mode: 'multiply' as const,
    colors: ['#FF6B6B', '#4ECDC4'],
  },
  {
    mode: 'screen' as const,
    colors: ['#45B7D1', '#FFEEAD'],
  },
  {
    mode: 'overlay' as const,
    colors: ['#96CEB4', '#FF6B6B'],
  },
  {
    mode: 'color-burn' as const,
    colors: ['#845EC2', '#FF9671'],
  },
  {
    mode: 'color-dodge' as const,
    colors: ['#FFC75F', '#F9F871'],
  },
];

const IMAGE_BLEND_CONFIGS: Array<{ mode: ImageBlendMode; color: string }> = [
  { mode: 'luminosity', color: '#FF6B6B' },
  { mode: 'hue', color: '#4ECDC4' },
  { mode: 'saturation', color: '#45B7D1' },
  { mode: 'soft-light', color: '#96CEB4' },
];

const generateItems = (start: number, count: number): GridItem[] => {
  return Array.from({ length: count }, (_, i) => {
    const isImage = i % 2 === 0; // Alternate between image and color items
    
    if (isImage) {
      const blend = IMAGE_BLEND_CONFIGS[i % IMAGE_BLEND_CONFIGS.length];
      return {
        id: start + i,
        height: Math.random() * 100 + 200, // Slightly taller for images
        title: `Image ${start + i + 1}`,
        type: 'image',
        imageUrl: `https://picsum.photos/500/300?random=${start + i}`,
        imageBlendMode: blend.mode,
        overlayColor: blend.color,
      };
    } else {
      const blend = COLOR_BLEND_CONFIGS[i % COLOR_BLEND_CONFIGS.length];
      return {
        id: start + i,
        height: Math.random() * 100 + 100,
        title: `Color ${start + i + 1}`,
        type: 'color',
        colorBlendMode: blend.mode,
        colors: blend.colors,
      };
    }
  });
};

export const MasonryGridDemo = () => {
  const { theme } = useTheme();
  const [items, setItems] = useState<GridItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate fetching data
  const fetchItems = useCallback(async (refresh = false) => {
    const start = refresh ? 0 : items.length;
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newItems = generateItems(start, ITEMS_PER_PAGE);
    
    if (refresh) {
      setItems(newItems);
    } else {
      setItems(prevItems => [...prevItems, ...newItems]);
    }
  }, [items.length]);

  // Handle pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchItems(true);
    setRefreshing(false);
  }, [fetchItems]);

  // Handle reaching end of list
  const onEndReached = useCallback(async () => {
    if (!loading) {
      setLoading(true);
      await fetchItems();
      setLoading(false);
    }
  }, [loading, fetchItems]);

  // Initial load
  useEffect(() => {
    fetchItems();
  }, []);

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

  // Detect when we're near the end
  const handleScroll = useCallback((event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom) {
      onEndReached();
    }
  }, [onEndReached]);

  const renderColorItem = (item: GridItem) => (
    <View style={[styles.blendContainer, { height: item.height, isolation: 'isolate' }]}>
      {/* Base color layer */}
      <View
        style={[
          styles.blendLayer,
          {
            backgroundColor: item.colors![0],
            transform: [{ rotate: '-45deg' }],
          },
        ]}
      />
      {/* Blended color layer */}
      <View
        style={[
          styles.blendLayer,
          {
            backgroundColor: item.colors![1],
            transform: [{ rotate: '45deg' }],
            mixBlendMode: item.colorBlendMode,
          },
        ]}
      />
    </View>
  );

  const renderImageItem = (item: GridItem) => (
    <View style={[styles.blendContainer, { height: item.height, isolation: 'isolate' }]}>
      {/* Base image */}
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      {/* Blend mode overlay */}
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: item.overlayColor,
            mixBlendMode: item.imageBlendMode,
          },
        ]}
      />
    </View>
  );

  return (
    <PatternContainer>
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {columns.map((column, columnIndex) => (
            <View key={columnIndex} style={styles.column}>
              {column.map((item, index) => (
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
                  {item.type === 'color' ? renderColorItem(item) : renderImageItem(item)}
                  <Text style={[styles.itemTitle, { color: theme.colors.onSurface }]}>
                    {item.title}
                  </Text>
                </Animated.View>
              ))}
            </View>
          ))}
        </View>
        {loading && (
          <ActivityIndicator style={styles.loader} size="large" />
        )}
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
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
  itemTitle: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  loader: {
    marginVertical: 20,
  },
});
