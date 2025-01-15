import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useMachine } from '@xstate/react';
import { createMachine, assign } from 'xstate';
import * as Haptics from 'expo-haptics';
import { useToast } from '../components/Toast';
import { useTheme } from '../contexts/ThemeContext';
import { Power, RotateCcw, Activity } from 'lucide-react-native';

// Define types for our machine
type ToggleContext = {
  count: number;
};

type ToggleEvents = {
  type: 'TOGGLE';
} | {
  type: 'RESET';
};

// Create a simple state machine
const toggleMachine = createMachine({
  types: {} as {
    context: ToggleContext;
    events: ToggleEvents;
  },
  id: 'toggle',
  initial: 'inactive',
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: { 
        TOGGLE: {
          target: 'active',
          actions: assign({
            count: ({ context }) => context.count + 1,
          }),
        },
      },
    },
    active: {
      on: { 
        TOGGLE: {
          target: 'inactive',
          actions: assign({
            count: ({ context }) => context.count + 1,
          }),
        },
      },
    },
  },
  on: {
    RESET: {
      actions: assign({
        count: () => 0,
      }),
    },
  },
});

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
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      // Silently handle haptics errors
    }
    send({ type: 'TOGGLE' });
    toast.show({
      message: `Switched ${state.value === 'inactive' ? 'on' : 'off'}`,
      type: 'info',
    });
  };

  const handleReset = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      // Silently handle haptics errors
    }
    send({ type: 'RESET' });
    toast.show({
      message: 'Counter reset',
      type: 'success',
    });
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* State Display */}
      <View style={styles.stateSection}>
        <Text style={[styles.status, { color: theme.colors.onBackground }]}>
          Status: {state.value === 'inactive' ? 'Off' : 'On'}
        </Text>
        <Text style={[styles.count, { color: theme.colors.onBackgroundVariant }]}>
          Toggled {state.context.count} times
        </Text>
      </View>

      {/* Interactive Demo */}
      <View style={styles.demoSection}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: state.matches('active') 
                ? theme.colors.success
                : theme.colors.primaryContainer,
              opacity: pressed ? 0.92 : 1,
            },
          ]}
          onPress={handleToggle}
        >
          <Text style={[
            styles.buttonText,
            { color: theme.colors.onSuccess }
          ]}>
            Toggle
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.resetButton,
            { 
              backgroundColor: pressed 
                ? theme.colors.surfaceVariant
                : theme.colors.primaryContainer,
            },
          ]}
          onPress={handleReset}
        >
          <Text style={[
            styles.resetButtonText,
            { color: theme.colors.onPrimaryContainer }
          ]}>
            Reset Counter
          </Text>
        </Pressable>
      </View>

      {/* Feature Cards */}
      <View style={styles.section}>
        {features.map((feature, index) => (
          <View 
            key={feature.title}
            style={[
              styles.card,
              { 
                backgroundColor: theme.colors.primaryContainer,
                marginBottom: index === features.length - 1 ? 0 : 8,
              },
            ]}
          >
            <View style={styles.cardIcon}>{feature.icon}</View>
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: theme.colors.onPrimaryContainer }]}>
                {feature.title}
              </Text>
              <Text style={[styles.cardDescription, { color: theme.colors.onPrimaryContainer, opacity: 0.7 }]}>
                {feature.description}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  stateSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  status: {
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: 0,
    marginBottom: 8,
  },
  count: {
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  demoSection: {
    marginBottom: 32,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  resetButton: {
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  section: {
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
  },
  cardIcon: {
    marginRight: 16,
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
});
