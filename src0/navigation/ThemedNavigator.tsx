import React from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../contexts/ThemeContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ToggleScreen } from '../screens/ToggleScreen';
import { CardsScreen } from '../screens/CardsScreen';
import { Home, Settings, ToggleLeft, Layers } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export function ThemedNavigator() {
  const { styles: theme, currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopWidth: Platform.OS === 'ios' ? 0 : 1,
            borderTopColor: theme.colors.onBackgroundVariant,
            height: Platform.OS === 'ios' ? 88 : 64,
            paddingBottom: Platform.OS === 'ios' ? 28 : 12,
            paddingTop: Platform.OS === 'ios' ? 8 : 0,
            elevation: 0,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: isDark ? theme.colors.onBackgroundVariant : '#929292',
          tabBarHideOnKeyboard: true,
          headerStyle: {
            backgroundColor: theme.colors.background,
            borderBottomWidth: 0,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitleStyle: {
            fontSize: Platform.OS === 'ios' ? 17 : 20,
            fontWeight: Platform.OS === 'ios' ? '600' : '500',
            color: theme.colors.onBackground,
          },
          headerTintColor: theme.colors.onBackground,
          ...Platform.select({
            ios: {
              tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '500',
              },
              tabBarIconStyle: {
                marginTop: 0,
              },
            },
            android: {
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '500',
              },
              tabBarIconStyle: {
                marginTop: 4,
              },
            },
          }),
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Home size={Platform.OS === 'ios' ? 24 : size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Cards"
          component={CardsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Layers size={Platform.OS === 'ios' ? 24 : size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Toggle"
          component={ToggleScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <ToggleLeft size={Platform.OS === 'ios' ? 24 : size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Settings size={Platform.OS === 'ios' ? 24 : size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
