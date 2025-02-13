import React from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { Text } from '../components/Text';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export const AnalyticsScreen = () => {
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
        <Text style={styles.title}>Analytics</Text>

        {/* Overview Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pattern Usage</Text>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>2,456</Text>
            <Text style={styles.statLabel}>Total Implementations</Text>
          </View>
        </View>

        {/* Performance Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Performance</Text>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>98%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>

        {/* Engagement Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>User Engagement</Text>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Retention Rate</Text>
          </View>
        </View>

        {/* ROI Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Business Impact</Text>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>3.5x</Text>
            <Text style={styles.statLabel}>ROI Improvement</Text>
          </View>
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
  card: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});
