import React, { useCallback, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from '../../Text';
import { useTheme } from '../../../contexts/ThemeContext';

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
      setItems([...items, ...newItems]);
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
  React.useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.colors.primary}
        />
      }
      onScroll={({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const paddingToBottom = 20;
        if (layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom) {
          onEndReached();
        }
      }}
      scrollEventThrottle={400}
    >
      {items.map(item => (
        <View
          key={item.id}
          style={[
            styles.item,
            { borderBottomColor: theme.colors.border }
          ]}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      ))}
      {loading && (
        <View style={styles.loading}>
          <Text>Loading more items...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  loading: {
    padding: 16,
    alignItems: 'center',
  },
});
