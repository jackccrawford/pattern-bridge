import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { PatternsScreen } from '../screens/PatternsScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useTheme } from '../contexts/ThemeContext';
import { Home, Library, BarChart2, Settings } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export const ThemedNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        headerShown: false,
        tabBarStyle: {
          borderTopColor: theme.colors.border,
          backgroundColor: '#fff',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Patterns"
        component={PatternsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Library size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <BarChart2 size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
