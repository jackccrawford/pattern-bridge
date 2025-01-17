# Haptic Feedback

## Overview

- **Core Features**
    - **Impact Feedback**: Light, medium, heavy impacts
    - **Notification Types**: Success, warning, error
    - **Selection Changes**: Subtle selection feedback
    - **Platform Support**: iOS and Android haptics

- **Implementation**
    - **Expo Haptics**: Cross-platform haptics
    - **Platform Detection**: OS-specific feedback
    - **Error Handling**: Graceful fallbacks
    - **Battery Awareness**: Power-efficient feedback

## Platform Adaptation

- **iOS Features**
    - **Taptic Engine**: Native haptic engine
    - **Impact Styles**: Multiple impact levels
    - **Notification Types**: Rich notification feel
    - **Selection Changes**: Subtle selection feedback

- **Android Features**
    - **Vibration API**: Standard vibration
    - **Material Design**: Haptic patterns
    - **Notification Types**: Basic notifications
    - **Fallback Patterns**: Graceful degradation

## Implementation Examples

- **Basic Usage**
    - **Impact Feedback**: Simple impact response
    - **Notification Types**: Status notifications
    - **Selection Changes**: Selection feedback

```typescript
function HapticButton() {
  const handlePress = async () => {
    try {
      await Haptics.impactAsync(
        Haptics.ImpactFeedbackStyle.Light
      );
    } catch (error) {
      console.warn('Haptics not available');
    }
  };

  return (
    <Button
      onPress={handlePress}
      title="Tap for Feedback"
    />
  );
}
```

- **Advanced Patterns**
    - **Success Flow**: Multi-step feedback
    - **Error States**: Warning patterns
    - **Selection**: Selection feedback

```typescript
const hapticPatterns = {
  success: async () => {
    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );
  },
  warning: async () => {
    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Warning
    );
  },
  error: async () => {
    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Error
    );
  }
};
```

## Best Practices

- **User Experience**
    - **Appropriate Timing**: Right moment for feedback
    - **Feedback Level**: Correct intensity level
    - **Context Awareness**: Meaningful feedback
    - **Battery Impact**: Power consumption care

- **Performance**
    - **Error Handling**: Graceful fallbacks
    - **Platform Check**: OS capability check
    - **Battery State**: Power state awareness
    - **Throttling**: Prevent feedback spam

- **Accessibility**
    - **Optional Feedback**: User preference check
    - **Alternative Feedback**: Visual alternatives
    - **Intensity Control**: Adjustable strength
    - **Clear Purpose**: Meaningful patterns

- **Testing**
    - **Platform Testing**: Cross-device validation
    - **Battery States**: Different power states
    - **Error Cases**: Fallback behavior
    - **User Settings**: Preference handling

## Related
- **Documentation**
    - **Pull to Refresh**: Refresh feedback
    - **Toast System**: Status notifications
    - **Button Component**: Interactive elements
