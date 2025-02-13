import React from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { Text } from '../components/Text';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export const PatternsScreen = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const bottomPadding = Platform.select({
    ios: insets.bottom,
    android: 80, // Account for tab bar height on Android
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomPadding }
        ]}
      >
        <Text style={styles.title}>Pattern Library</Text>
        
        {/* Pattern Categories */}
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Navigation Patterns</Text>
          <Text style={styles.categoryDescription}>
            Smart navigation patterns that adapt to user behavior
          </Text>
        </View>

        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Data Display</Text>
          <Text style={styles.categoryDescription}>
            Intelligent ways to present and organize information
          </Text>
        </View>

        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Input & Forms</Text>
          <Text style={styles.categoryDescription}>
            Context-aware input patterns that enhance user experience
          </Text>
        </View>

        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Feedback & States</Text>
          <Text style={styles.categoryDescription}>
            Responsive feedback patterns that guide users
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  category: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});
