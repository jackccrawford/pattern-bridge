import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

export const SettingsScreen = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Profile</Text>
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Name</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>Pattern Bridge User</Text>
          
          <Text style={[styles.label, { color: theme.colors.text, marginTop: 16 }]}>Theme</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{theme.dark ? 'Dark' : 'Light'}</Text>
          
          <Text style={[styles.label, { color: theme.colors.text, marginTop: 16 }]}>Version</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>1.0.0</Text>
        </View>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    opacity: 0.7,
  },
  value: {
    fontSize: 16,
  },
});
