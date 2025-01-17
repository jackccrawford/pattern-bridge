# Pull-to-Refresh

## Overview

- **Core Features**
    - **Theme-Aware Refresh Indicator**: Automatic theme adaptation
    - **Platform-Specific Styling**: Native iOS and Android styles
    - **Haptic Feedback**: Tactile feedback for refresh start and success
    - **Loading State Management**: Automatic loading state handling

- **Implementation**
    - **React Native's RefreshControl**: Native refresh control component
    - **Theme Integration**: Automatic theme color adaptation
    - **Haptic Feedback**: Tactile feedback for refresh start and success
    - **Toast Notifications**: Success toast message on refresh completion

## Features

- **Visual Feedback**
    - **Theme-Colored Loading Spinner**: Automatic theme color adaptation
    - **Platform-Specific Styling**: Native iOS and Android styles
    - **Success Toast Message**: Success message on refresh completion

- **Haptic Feedback**
    - **Light Impact**: Tactile feedback for refresh start
    - **Success Notification**: Tactile feedback for refresh success

- **Progress Indication**
    - **Loading Spinner**: Automatic loading state handling
    - **Success Message**: Success message on refresh completion

## Platform Considerations

- **iOS Features**
    - **Native Pull-to-Refresh Spinner**: Native iOS spinner
    - **Dark/Light Theme Adaptation**: Automatic theme adaptation
    - **Native Haptic Feedback**: Tactile feedback support

- **Android Features**
    - **Customizable Spinner Colors**: Custom color support
    - **Progress Background Color**: Custom progress background color
    - **Configurable Offset**: Customizable offset
    - **Material Design Haptics**: Material Design haptic feedback

## Implementation Examples

```typescript
function ExampleScreen() {
  const { theme } = useTheme();
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Your refresh logic here
    await refreshData();
    
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    toast.show({
      type: 'success',
      message: 'Content refreshed'
    });
    
    setRefreshing(false);
  }, [toast]);

  return (
    <ScrollView 
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.colors.primary}
          colors={[theme.colors.primary]} // Android
          progressBackgroundColor={theme.colors.card} // Android
          progressViewOffset={20} // Android
        />
      }
    >
      {/* Your content */}
    </ScrollView>
  );
}
```

## Best Practices

- **Theme Integration**
    - **Automatic Theme Adaptation**: Automatic theme color adaptation
    - **Dark/Light Theme Support**: Automatic theme adaptation

```typescript
<RefreshControl
  tintColor={theme.colors.primary}
  colors={[theme.colors.primary]}
  progressBackgroundColor={theme.colors.card}
/>
```

- **Haptic Feedback**
    - **Tactile Feedback**: Tactile feedback for refresh start and success

```typescript
// Light impact when starting
await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
   
// Success notification when done
await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
```

- **User Feedback**
    - **Success Toast Message**: Success message on refresh completion

```typescript
toast.show({
  type: 'success',
  message: 'Content refreshed'
});
```

## Related
- [Haptic Feedback](haptics.md)
- [Toast System](../components/toast.md)
- [Theme System](theme-system.md)
