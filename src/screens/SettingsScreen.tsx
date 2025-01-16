import React from 'react';
import { ScrollView, StyleSheet, View, Switch, Platform } from 'react-native';
import { Text } from '../components/Text';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export const SettingsScreen = () => {
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
        <Text style={styles.title}>Settings</Text>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Reduce Motion</Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Haptic Feedback</Text>
            <Switch value={true} onValueChange={() => {}} />
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Analytics</Text>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Build</Text>
            <Text style={styles.infoValue}>2025.01</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
});
