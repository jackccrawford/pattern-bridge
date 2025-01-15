# Toast Component

The Toast system provides a type-safe, customizable way to show temporary notifications in your app.

## Features

- 🎯 Type-safe toast messages
- ⏱️ Customizable durations
- 🎨 Theme integration
- 📱 Mobile-optimized animations
- 🔄 Queue management
- ↩️ Undo support

## Usage

### Basic Usage

```tsx
import { useToast } from '../components/Toast';

export function MyComponent() {
  const toast = useToast();
  
  const handlePress = () => {
    toast.show({
      type: 'success',
      message: 'Operation completed successfully'
    });
  };
  
  return (
    <Button
      onPress={handlePress}
      title="Show Toast"
    />
  );
}
```

### Toast Types

The system supports different toast types out of the box:

```typescript
type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  type: ToastType;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}
```

### Customizing Duration

```tsx
toast.show({
  type: 'info',
  message: 'Custom duration message',
  duration: 5000 // 5 seconds
});
```

### Toast with Undo Support

```tsx
const toast = useToast();

const handleAction = async () => {
  const undoAction = () => {
    // Revert the action
    console.log('Action undone');
  };

  toast.show({
    type: 'success',
    message: 'Item deleted',
    action: {
      label: 'Undo',
      onPress: undoAction
    }
  });
};
```

## Component API

### ToastProvider

Wrap your app with the ToastProvider:

```tsx
import { ToastProvider } from '../components/Toast';

export default function App() {
  return (
    <ToastProvider>
      <Navigation />
    </ToastProvider>
  );
}
```

### useToast Hook

```typescript
const toast = useToast();

// Available methods
toast.show(options: ToastOptions): void;
toast.hide(): void;
toast.isVisible(): boolean;
```

## Styling

The Toast component automatically integrates with your theme:

```tsx
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: 16,
    margin: 16,
    // ... more styles
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
  }
});
```

## Best Practices

1. **Duration**: Use appropriate durations for different message types
   - Quick feedback: 2000ms
   - Important messages: 3000ms
   - Critical errors: 4000ms

2. **Message Length**: Keep messages concise and clear

3. **Queue Management**: The system automatically handles multiple toasts

4. **Error Handling**: Use error toasts for actionable errors only

## Example: Error Handling

```tsx
try {
  await saveData();
  toast.show({
    type: 'success',
    message: 'Data saved successfully'
  });
} catch (error) {
  toast.show({
    type: 'error',
    message: 'Failed to save data',
    duration: 4000
  });
}
```

## Real World Example

Here's how we implement the demo toast in HomeScreen:

```tsx
const demoSection: DemoSection = {
  title: 'Try It Out',
  description: 'Tap the button below to see the toast system in action',
  action: {
    label: 'Show Demo Toast',
    onPress: async () => {
      await Haptics.selectionAsync();
      toast.show({
        type: 'success',
        message: 'This is a demo toast message',
        action: {
          label: 'Undo',
          onPress: () => {
            toast.show({
              type: 'info',
              message: 'Action undone!'
            });
          }
        }
      });
    }
  }
};
```

## Related
- [Toast Types](../types/toast-types.md)
- [Theme Integration](../features/theme-system.md)
