# Toast Component

## Overview

- **Toast System**: A type-safe, customizable way to show temporary notifications in your app.
- **Core Features**:
    - **Type-Safe Messages**: Success, error, warning, info
    - **Customizable Durations**: Configurable timing
    - **Theme Integration**: Dark mode compatible
    - **Mobile-Optimized Animations**: Smooth transitions
    - **Queue Management**: Message stacking
    - **Undo Support**: Actionable toasts

## Features

- **Visual Elements**:
    - **Status Icons**: Type-specific icons
    - **Color Coding**: Semantic colors
    - **Progress Bar**: Dismiss countdown
    - **Close Button**: Manual dismiss
- **Interaction Model**:
    - **Touch Dismiss**: Swipe to dismiss
    - **Auto Hide**: Timed dismissal
    - **Manual Close**: Button dismiss
    - **Queue System**: Message stacking

## Usage

### Basic Usage

- **Success Message**: Operation complete
- **Error Alert**: Operation failed
- **Info Notice**: Status update

```typescript
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

### Advanced Usage

- **Custom Duration**: Timing control
- **Position Override**: Placement control
- **Action Buttons**: Interactive toasts

```typescript
const toastConfig = {
  success: {
    duration: 3000,
    position: 'top',
    action: {
      text: 'Undo',
      onPress: () => handleUndo()
    }
  },
  error: {
    duration: 5000,
    position: 'bottom',
    action: {
      text: 'Retry',
      onPress: () => handleRetry()
    }
  }
};
```

## Component API

### ToastProvider

- **Wrap your app with the ToastProvider**:

```typescript
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

- **Available methods**:
    - `toast.show(options: ToastOptions): void;`
    - `toast.hide(): void;`
    - `toast.isVisible(): boolean;`

## Styling

- **The Toast component automatically integrates with your theme**:

```typescript
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

- **User Experience**:
    - **Message Clarity**: Clear, concise text
    - **Duration Control**: Appropriate timing
    - **Position Logic**: Contextual placement
    - **Visual Hierarchy**: Important messages
- **Performance**:
    - **Queue Management**: Prevent overflow
    - **Animation Frame**: Smooth transitions
    - **Memory Usage**: Clear dismissed
    - **Event Cleanup**: Remove listeners
- **Accessibility**:
    - **Screen Reader**: Clear announcements
    - **Color Contrast**: WCAG compliance
    - **Focus Management**: Keyboard access
    - **Role Labels**: ARIA attributes
- **Testing**:
    - **Message Types**: All variants
    - **Dismiss Methods**: All options
    - **Position Tests**: All placements
    - **Theme Testing**: Light/dark mode

## Related

- **Documentation**:
    - **Theme System**: Color integration
    - **Animation Guide**: Transition effects
    - **Accessibility**: ARIA patterns
