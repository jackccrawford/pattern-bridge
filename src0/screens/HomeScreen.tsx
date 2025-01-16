import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, RefreshControl, Platform } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../components/Toast';
import { Sparkles, Palette, Navigation } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface DemoSection {
  title: string;
  description: string;
  action: {
    label: string;
    onPress: () => Promise<void>;
  };
}

export function HomeScreen() {
  const { styles: theme } = useTheme();
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      // Silently handle haptics errors
    }
    
    toast.show({
      message: 'Content refreshed',
      type: 'success'
    });
    
    setRefreshing(false);
  }, [toast]);

  const featureCards: FeatureCard[] = [
    {
      title: 'Theme System',
      description: 'Customize your app appearance',
      icon: <Palette size={24} color={theme.colors.primary} />,
    },
    {
      title: 'Toast Messages',
      description: 'Interactive notifications with undo support',
      icon: <Sparkles size={24} color={theme.colors.primary} />,
    },
    {
      title: 'Navigation',
      description: 'Type-safe navigation with platform adaptations',
      icon: <Navigation size={24} color={theme.colors.primary} />,
    },
  ];

  const demoSection: DemoSection = {
    title: 'Try It Out',
    description: 'Tap the button below to see the toast system in action',
    action: {
      label: 'Show Demo Toast',
      onPress: async () => {
        try {
          await Haptics.selectionAsync();
        } catch (error) {
          // Silently handle haptics errors
        }
        toast.show({
          message: 'Welcome to the demo!',
          type: 'success',
          action: {
            label: 'Undo',
            onPress: () => {
              toast.show({
                message: 'Action undone',
                type: 'info'
              });
            },
          },
        });
      },
    },
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.colors.primary}
          colors={[theme.colors.primary]}
          progressBackgroundColor={theme.colors.surfaceVariant}
          progressViewOffset={20}
        />
      }
      contentContainerStyle={styles.content}
    >
      {/* Welcome Section */}
      <View style={styles.section}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Welcome to Expo Starter
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onBackgroundVariant }]}>
          A minimal, type-safe template for your next project
        </Text>
      </View>

      {/* Feature Cards */}
      <View style={styles.section}>
        {featureCards.map((feature, index) => (
          <View 
            key={feature.title}
            style={[
              styles.card,
              { 
                backgroundColor: theme.colors.primaryContainer,
                marginBottom: index === featureCards.length - 1 ? 0 : 8,
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

      {/* Demo Section */}
      <View style={[styles.section, styles.demoSection]}>
        <Text style={[styles.demoTitle, { color: theme.colors.onBackground }]}>
          {demoSection.title}
        </Text>
        <Text style={[styles.demoDescription, { color: theme.colors.onBackgroundVariant }]}>
          {demoSection.description}
        </Text>
        <Pressable
          onPress={demoSection.action.onPress}
          style={({ pressed }) => [
            styles.button,
            { 
              backgroundColor: pressed ? theme.colors.surfaceVariant : theme.colors.primaryContainer,
            },
          ]}
        >
          <Text style={[
            styles.buttonText,
            { color: theme.colors.onPrimaryContainer }
          ]}>
            {demoSection.action.label}
          </Text>
        </Pressable>
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
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: 0,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
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
  demoSection: {
    marginTop: 8,
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: 0,
    marginBottom: 8,
  },
  demoDescription: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});
