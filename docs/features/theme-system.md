# Theme System

The pattern-bridge theme system provides a robust, type-safe theming solution that adapts to user preferences and system settings.

## Features

- **Core Features**
    - **Dark/Light Modes**: Automatic theme switching
    - **Custom Colors**: Theme customization
    - **Consistent Styling**: Global theme application

- **Implementation**
    - **Context Based**: React Context for theme
    - **Type Safe**: Strong TypeScript types
    - **Performant**: Minimal re-renders

- **User Experience**
    - **System Match**: OS theme detection
    - **Smooth Transitions**: Theme animations
    - **Accessibility**: WCAG compliance

## Usage

### Theme Provider

The theme system is built around a central `ThemeProvider` that makes theme values available throughout your app:

```typescript
import { ThemeProvider } from './src/theme';

export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}
```

### Using Themes in Components

Access theme values using the `useTheme` hook:

```typescript
import { useTheme } from '../theme';

export function MyComponent() {
  const { theme, isDark } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>
        Current theme: {isDark ? 'Dark' : 'Light'}
      </Text>
    </View>
  );
}
```

### Switching Themes

The theme system provides a simple API for theme switching:

```typescript
import { useTheme } from '../theme';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  
  return (
    <Button
      onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      title="Toggle Theme"
    />
  );
}
```

## Theme Types

The theme system includes comprehensive TypeScript definitions:

```typescript
interface Theme {
  colors: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    // ... more colors
  };
  // ... other theme values
}
```

## Best Practices

1. **Use Theme Hooks**: Always use the `useTheme` hook to access theme values
2. **Type Safety**: Leverage TypeScript to ensure theme-safe components
3. **System Integration**: Respect system theme preferences by default
4. **Consistent Usage**: Use theme values for all visual properties

## Example: Theme-Aware Component

Here's an example of a fully theme-aware component:

```typescript
import { StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export function ThemedCard({ children }) {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      padding: 16,
      shadowColor: theme.colors.shadow,
      // ... more styles
    },
  });
  
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
}
```

## Related
- [Theme Configuration](../architecture/theme-configuration.md)
- [Component Theming](../components/themed-components.md)
