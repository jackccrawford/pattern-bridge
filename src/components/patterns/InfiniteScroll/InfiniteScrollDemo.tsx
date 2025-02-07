import React, { useCallback, useState, useEffect } from 'react';
import { RefreshControl, StyleSheet, View, ActivityIndicator, ScrollView, Platform, Image } from 'react-native';
import { Text } from '../../Text';
import { useTheme } from '../../../contexts/ThemeContext';
import { PatternContainer } from '../../PatternContainer';
import Animated, { FadeIn } from 'react-native-reanimated';

interface Item {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  blendMode: 'luminosity' | 'hue' | 'saturation' | 'soft-light';
  overlayColor: string;
}

// [AI-FREEZE] Blend mode configurations
const BLEND_CONFIGS = [
  { mode: 'luminosity' as const, color: '#FF6B6B' },
  { mode: 'hue' as const, color: '#4ECDC4' },
  { mode: 'saturation' as const, color: '#45B7D1' },
  { mode: 'soft-light' as const, color: '#96CEB4' },
];

export const InfiniteScrollDemo = () => {
  const { theme } = useTheme();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate fetching data with images
  const fetchItems = useCallback(async (refresh = false) => {
    const start = refresh ? 0 : items.length;
    const newItems: Item[] = Array.from({ length: 10 }, (_, i) => {
      const config = BLEND_CONFIGS[i % BLEND_CONFIGS.length];
      return {
        id: start + i,
        title: `Item ${start + i + 1}`,
        subtitle: `Blend mode: ${config.mode}`,
        imageUrl: `https://picsum.photos/500/300?random=${start + i}`,
        blendMode: config.mode,
        overlayColor: config.color,
      };
    });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (refresh) {
      setItems(newItems);
    } else {
      setItems(prevItems => [...prevItems, ...newItems]);
    }
  }, [items]);

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

  // Detect when we're near the end
  const handleScroll = useCallback((event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom) {
      onEndReached();
    }
  }, [onEndReached]);

  return (
    <PatternContainer>
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.list}>
          {items.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeIn.delay(index * 100)}
              style={[
                styles.item,
                {
                  backgroundColor: theme.colors.surface,
                  marginBottom: index === items.length - 1 ? 20 : 12,
                },
              ]}
            >
              <View style={styles.imageContainer}>
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
                      mixBlendMode: item.blendMode,
                    },
                  ]}
                />
              </View>
              <View style={styles.content}>
                <Text style={[styles.title, { color: theme.colors.onSurface }]}>
                  {item.title}
                </Text>
                <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
                  {item.subtitle}
                </Text>
              </View>
            </Animated.View>
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
  list: {
    padding: 16,
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
  imageContainer: {
    height: 200,
    width: '100%',
    position: 'relative',
    isolation: 'isolate', // Create stacking context for blend modes
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  loader: {
    marginVertical: 20,
  },
});
