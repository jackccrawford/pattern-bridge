# Pull-to-Refresh

pattern-bridge includes a theme-aware pull-to-refresh implementation with haptic feedback for a delightful user experience.

## Features

- 🎨 Theme-aware refresh indicator
- 📱 Platform-specific styling
- 💫 Haptic feedback
- 🔄 Loading state management
- ✨ Success feedback

## Implementation

The pull-to-refresh feature combines several elements:
1. React Native's `RefreshControl`
2. Theme integration
3. Haptic feedback
4. Toast notifications

```tsx
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

## User Experience

The feature provides a rich feedback loop:

1. **Visual Feedback**
   - Theme-colored loading spinner
   - Platform-specific styling
   - Success toast message

2. **Haptic Feedback**
   - Light impact when refresh starts
   - Success notification when complete

3. **Progress Indication**
   - Loading spinner while refreshing
   - Success message on completion

## Platform Considerations

### iOS
- Uses native pull-to-refresh spinner
- Supports dark/light theme adaptation
- Native haptic feedback

### Android
- Customizable spinner colors
- Progress background color
- Configurable offset
- Material Design haptics

## Best Practices

1. **Theme Integration**
   ```tsx
   <RefreshControl
     tintColor={theme.colors.primary}
     colors={[theme.colors.primary]}
     progressBackgroundColor={theme.colors.card}
   />
   ```

2. **Haptic Feedback**
   ```tsx
   // Light impact when starting
   await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
   
   // Success notification when done
   await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
   ```

3. **User Feedback**
   ```tsx
   toast.show({
     type: 'success',
     message: 'Content refreshed'
   });
   ```

## Related
- [Haptic Feedback](haptics.md)
- [Toast System](../components/toast.md)
- [Theme System](theme-system.md)
