# Navigation System

The pattern-bridge navigation system provides a type-safe, platform-adaptive navigation solution built on top of React Navigation.

## Features

- **Type Safety**
    - **Route Definitions**: Strongly typed navigation paths
    - **Parameter Validation**: Type-checked route params
    - **Link Checking**: Compile-time route validation

- **Cross-Platform**
    - **iOS Navigation**: Native gestures and animations
    - **Android Support**: Material design patterns
    - **Web Routing**: URL-based navigation

- **User Experience**
    - **Smooth Transitions**: Fluid animations
    - **Deep Linking**: Universal link support
    - **State Preservation**: Route history management

## Implementation

### Type-Safe Navigation

```typescript
// Navigation types
type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Details: {
    id: string;
    title: string;
  };
};

// Type-safe navigation hook
const navigation = useNavigation<NavigationProp<RootStackParamList>>();

// Type-safe route access
const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
```

### Platform Adaptations

The navigation system automatically adapts to platform conventions:

```tsx
// ThemedNavigator.tsx
export function ThemedNavigator() {
  const { theme, isDark } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={{
        // iOS-specific back button title
        headerBackTitleVisible: Platform.OS === 'ios',
        // Android-specific ripple effect
        android_ripple: Platform.OS === 'android' ? { color: theme.colors.ripple } : undefined,
        // Platform-specific tab bar style
        tabBarStyle: Platform.select({
          ios: styles.iosTabBar,
          android: styles.androidTabBar,
        }),
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

## Usage

### Basic Navigation

```tsx
function HomeScreen() {
  const navigation = useNavigation();
  
  return (
    <Pressable
      onPress={() => navigation.navigate('Details', {
        id: '123',
        title: 'Example'
      })}
    >
      <Text>Go to Details</Text>
    </Pressable>
  );
}
```

### Theme Integration

The navigation system automatically integrates with the theme system:

```tsx
const navigationTheme = {
  dark: isDark,
  colors: {
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.text,
    border: theme.colors.border,
    notification: theme.colors.notification,
  },
};
```

### Deep Linking

Configure deep links with type safety:

```typescript
const linking = {
  prefixes: ['pattern-bridge://'],
  config: {
    screens: {
      Home: 'home',
      Details: {
        path: 'details/:id',
        parse: {
          id: (id: string) => id,
        },
      },
    },
  },
};
```

## Best Practices

1. **Type Safety**
   - Always use typed navigation hooks
   - Define route params interface
   - Use constants for route names

2. **Platform Adaptations**
   - Use Platform.select for OS-specific styles
   - Follow platform conventions for navigation patterns
   - Test on both iOS and Android

3. **Theme Integration**
   - Use theme colors for navigation elements
   - Ensure proper contrast in both light/dark modes
   - Test navigation transitions with theme changes

4. **Performance**
   - Lazy load screens when possible
   - Optimize navigation options
   - Use navigation events judiciously

## Related
- [Theme System](theme-system.md)
- [ThemedNavigator Component](../components/themed-navigator.md)
- [Deep Linking](../guides/deep-linking.md)
