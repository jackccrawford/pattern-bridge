import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TestPatternScreen } from '../screens/TestPatternScreen';
import { Home, Settings, Layout } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

const Tab = createBottomTabNavigator();

export const ThemedNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Test"
        component={TestPatternScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Layout size={size} color={color} />
          ),
        }}
      />
      {/* Add more screens here as we build them */}
    </Tab.Navigator>
  );
};
