import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Platform } from 'react-native';
import { useMachine } from '@xstate/react';
import * as Haptics from 'expo-haptics';
import { useToast } from '../components/Toast';
import { useTheme } from '../contexts/ThemeContext';
import { Power, RotateCcw, Activity } from 'lucide-react-native';
import { toggleMachine } from '../machines/toggleMachine';

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function ToggleScreen() {
  const [state, send] = useMachine(toggleMachine);
  const toast = useToast();
  const { styles: theme } = useTheme();

  const features: FeatureCard[] = [
    {
      title: 'State Management',
      description: 'XState handles complex state transitions with ease',
      icon: <Power size={24} color={theme.colors.primary} />,
    },
    {
      title: 'Event Tracking',
      description: 'Count and track state changes automatically',
      icon: <Activity size={24} color={theme.colors.primary} />,
    },
    {
      title: 'Reset Capability',
      description: 'Clean state reset with proper event handling',
      icon: <RotateCcw size={24} color={theme.colors.primary} />,
    },
  ];

  const handleToggle = async () => {
    try {
      if (Platform.OS !== 'web') {
        await Haptics.selectionAsync();
      }
      send({ type: 'TOGGLE' });
      toast.show({
        message: `Toggled ${state.matches('inactive') ? 'on' : 'off'}`,
        type: 'success',
      });
    } catch (error) {
      send({ 
        type: 'ERROR',
        error: 'Failed to toggle state'
      });
      toast.show({
        message: 'Error toggling state',
        type: 'error',
      });
    }
  };

  const handleReset = async () => {
    try {
      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      send({ type: 'RESET' });
      toast.show({
        message: 'Counter reset',
        type: 'success',
      });
    } catch (error) {
      send({ 
        type: 'ERROR',
        error: 'Failed to reset counter'
      });
      toast.show({
        message: 'Error resetting counter',
        type: 'error',
      });
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ padding: 16 }}
    >
      <View style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Text style={[styles.title, { color: theme.colors.onSurfaceVariant }]}>
          Status: {state.matches('active') ? 'On' : 'Off'}
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Toggled {state.context.count} times
        </Text>
        
        <Pressable
          onPress={handleToggle}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: theme.colors.primary,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>
            Toggle
          </Text>
        </Pressable>

        <Pressable
          onPress={handleReset}
          style={({ pressed }) => [
            styles.resetButton,
            {
              backgroundColor: theme.colors.primaryContainer,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.colors.onPrimaryContainer }]}>
            Reset Counter
          </Text>
        </Pressable>
      </View>

      {features.map((feature, index) => (
        <View
          key={feature.title}
          style={[
            styles.featureCard,
            { 
              backgroundColor: theme.colors.surface,
              marginTop: index === 0 ? 24 : 16,
            },
          ]}
        >
          {feature.icon}
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: theme.colors.onSurface }]}>
              {feature.title}
            </Text>
            <Text style={[styles.featureDescription, { color: theme.colors.onSurfaceVariant }]}>
              {feature.description}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  resetButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  featureCard: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  featureContent: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
