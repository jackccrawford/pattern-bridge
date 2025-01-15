# Haptic Feedback

pattern-bridge includes built-in haptic feedback support using Expo's haptics module for enhanced user interaction.

## Features

- 🎯 Selection feedback
- 💫 Impact feedback
- 📱 Notification feedback
- ⚡ Platform-specific adaptations

## Implementation

### Haptics Integration

```typescript
import * as Haptics from 'expo-haptics';

// Selection feedback (light)
await Haptics.selectionAsync();

// Impact feedback (medium)
await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

// Notification feedback
await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
```

## Usage Examples

### Button Feedback

```tsx
function ActionButton({ onPress, children }) {
  const handlePress = async () => {
    await Haptics.selectionAsync();
    onPress();
  };

  return (
    <Pressable onPress={handlePress}>
      {children}
    </Pressable>
  );
}
```

### Toast with Haptics

```tsx
function showToastWithHaptics() {
  const toast = useToast();
  
  const handleAction = async () => {
    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );
    toast.show({
      type: 'success',
      message: 'Action completed'
    });
  };
}
```

### Impact Feedback

```tsx
function SwipeAction() {
  const handleSwipe = async () => {
    await Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Heavy
    );
    // Handle swipe action
  };
}
```

## Best Practices

1. **Appropriate Intensity**
   - Use selection feedback for button presses
   - Use impact feedback for gestures
   - Use notification feedback for important events

2. **Platform Considerations**
   - Test on both iOS and Android
   - Provide fallbacks for unsupported devices
   - Consider battery impact

3. **User Experience**
   - Don't overuse haptics
   - Ensure feedback is meaningful
   - Keep feedback consistent

4. **Performance**
   - Handle haptics asynchronously
   - Consider debouncing rapid interactions
   - Test with slow devices

## Example: HomeScreen Implementation

```tsx
const demoSection: DemoSection = {
  title: 'Try It Out',
  description: 'Tap the button below to see haptics in action',
  action: {
    label: 'Show Demo',
    onPress: async () => {
      await Haptics.selectionAsync();
      // Additional action logic
    },
  },
};
```

## Related
- [Toast System](toast-system.md)
- [Button Components](../components/button.md)
- [Gesture Handling](../guides/gestures.md)
