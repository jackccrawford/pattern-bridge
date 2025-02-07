import React, { useCallback, useState, useEffect } from 'react';
import { RefreshControl, StyleSheet, View, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { Text } from '../../Text';
import { useTheme } from '../../../contexts/ThemeContext';
import { PatternContainer } from '../../PatternContainer';

interface Item {
  id: number;
  title: string;
  subtitle: string;
}

export const InfiniteScrollDemo = () => {
  const { theme } = useTheme();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate fetching data
  const fetchItems = useCallback(async (refresh = false) => {
    const start = refresh ? 0 : items.length;
    const newItems: Item[] = Array.from({ length: 10 }, (_, i) => ({
      id: start + i,
      title: `Item ${start + i + 1}`,
      subtitle: `This is item number ${start + i + 1}`
    }));
    
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

  return (
    <PatternContainer>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
        onScroll={({ nativeEvent }) => {
          if (Platform.OS === 'web') {
            const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
            const paddingToBottom = 50;
            const isCloseToBottom = 
              layoutMeasurement.height + contentOffset.y >= 
              contentSize.height - paddingToBottom;
              
            if (isCloseToBottom && !loading) {
              onEndReached();
            }
          }
        }}
        onMomentumScrollEnd={({ nativeEvent }) => {
          if (Platform.OS !== 'web') {
            const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
            const paddingToBottom = 50;
            const isCloseToBottom = 
              layoutMeasurement.height + contentOffset.y >= 
              contentSize.height - paddingToBottom;
              
            if (isCloseToBottom && !loading) {
              onEndReached();
            }
          }
        }}
        scrollEventThrottle={16}
      >
        {items.map(item => (
          <View
            key={item.id}
            style={[
              styles.item,
              { backgroundColor: theme.colors.background, borderColor: theme.colors.border }
            ]}
            accessible={true}
            accessibilityLabel={`${item.title}: ${item.subtitle}`}
          >
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>
              {item.subtitle}
            </Text>
          </View>
        ))}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={theme.colors.primary} />
            <Text style={[styles.loadingText, { color: theme.colors.secondary }]}>
              Loading more items...
            </Text>
          </View>
        )}
      </ScrollView>
    </PatternContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
  }
});
