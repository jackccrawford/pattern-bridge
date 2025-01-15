# Theme System

The pattern-bridge theme system provides a robust, type-safe theming solution that adapts to user preferences while maintaining a clean, maintainable codebase.

## Features

### System Theme Integration
- Automatic light/dark mode switching
- System preference detection
- Smooth theme transitions
- Persistent theme preferences

### Type-Safe Themes
```typescript
interface Theme {
  colors: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    // ... more colors
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  // ... other theme values
}
```

### Theme Context
```typescript
interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
}
```

## Usage

### Theme Provider
Wrap your app with the ThemeProvider:

```tsx
import { ThemeProvider } from './src/contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}
```

### Using Themes
Access theme values in your components:

```tsx
import { useTheme } from '../contexts/ThemeContext';

export function ThemedComponent() {
  const { theme, isDark } = useTheme();
  
  return (
    <View style={{ 
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md 
    }}>
      <Text style={{ color: theme.colors.text }}>
        Current theme: {isDark ? 'Dark' : 'Light'}
      </Text>
    </View>
  );
}
```

### Theme Switching
Implement theme switching in your UI:

```tsx
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();
  
  return (
    <Pressable onPress={toggleTheme}>
      <Text>Switch to {isDark ? 'Light' : 'Dark'} Mode</Text>
    </Pressable>
  );
}
```

## Best Practices

### 1. Use Theme Context
Always access theme values through the `useTheme` hook instead of hardcoding values.

### 2. Type Safety
Leverage TypeScript's type system to ensure theme-safe components:

```typescript
type ThemedStyleSheet<T> = {
  [K in keyof T]: StyleProp<ViewStyle | TextStyle | ImageStyle>;
};

const createThemedStyles = <T extends {}>(
  styleFactory: (theme: Theme) => ThemedStyleSheet<T>
) => styleFactory;
```

### 3. Component Theming
Create theme-aware components that automatically adapt to theme changes:

```tsx
const ThemedCard = styled.View`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md}px;
  padding: ${props => props.theme.spacing.md}px;
`;
```

### 4. Theme Persistence
The theme system automatically persists user preferences using secure storage:

```typescript
const persistTheme = async (theme: 'light' | 'dark' | 'system') => {
  await SecureStore.setItemAsync('theme', theme);
};
```

## Related
- [Secure Storage](../features/secure-storage.md)
- [Component Theming](../components/themed-components.md)
- [Navigation Theming](../features/navigation.md)
