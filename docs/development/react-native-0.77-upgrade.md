# React Native 0.77 Upgrade Guide

## Overview

React Native 0.77 brings significant improvements to styling capabilities, animation systems, and platform support. This guide provides a structured approach to upgrading your React Native application.

## Key Changes in 0.77

### New Features
1. **Enhanced Styling**
   - `display: contents` - Remove wrapper's visual box while preserving children
   - `box-sizing` - Support for both border-box and content-box
   - `mix-blend-mode` - Photoshop-style blending of UI elements
   - Outline properties - Non-layout-affecting outlines for accessibility

2. **Platform Updates**
   - Android 15 16KB page support
   - Enforced edge-to-edge UI on Android 15
   - Improved memory management

3. **Animation System**
   - Reanimated 4 with CSS-style animations
   - Backward compatibility with Reanimated 3
   - CSS animation translator tool available

4. **Development Changes**
   - Removal of console.log forwarding in Metro
   - New debugging workflow using Chrome DevTools Protocol (CDP)

## Pre-Upgrade Checklist

### 1. Debugging Setup (CRITICAL)
```bash
# Install React Native DevTools
npm install -g react-native-debugger

# For VS Code users, install one of:
# - Expo Tools
# - Radon IDE
```

### 2. Dependencies Audit
Check your package.json for these key dependencies:
```json
{
  "dependencies": {
    "react-native": "0.77.x",
    "react-native-reanimated": "4.x.x",
    // Update other react-native-* packages as needed
  }
}
```

### 3. Environment Setup
```bash
# Create upgrade branch
git checkout -b feature/rn-0.77-upgrade

# Clean project
rm -rf node_modules
rm -rf ios/Pods
rm -rf android/build

# Clear Metro cache
npm start -- --reset-cache
```

## Upgrade Process

### Phase 1: Core Upgrade

1. **Update Core Dependencies**
   ```bash
   # Update React Native
   npm install react-native@0.77

   # Update Reanimated (if using)
   npm install react-native-reanimated@4
   ```

2. **Update iOS Pods**
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Clean Android Build**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

### Phase 2: Debug Tools Migration

1. **Remove console.log Calls**
   - Search for console.log usage
   - Replace with React Native DevTools logging
   - Update development documentation

2. **Setup New Debugging Tools**
   ```bash
   # Start React Native DevTools
   react-native-debugger
   
   # Or use Expo CLI for log streaming
   npx expo start --dev-client
   ```

### Phase 3: Code Updates

1. **Animation Updates**
   - Migrate to Reanimated 4 CSS-style syntax (optional)
   - Test existing animations
   - Verify performance

2. **Layout Adjustments**
   - Implement `display: contents` where beneficial
   - Review and test box-sizing changes
   - Add mix-blend-mode effects where appropriate

3. **Android Edge-to-Edge**
   - Update layout for system bar insets
   - Test on Android 15 devices/emulators
   - Implement safe area handling

## Testing Checklist

### Functionality
- [ ] All existing features work
- [ ] Navigation flows properly
- [ ] Forms and inputs function correctly
- [ ] Data persistence works

### Visual
- [ ] Layouts render correctly
- [ ] Animations are smooth
- [ ] Edge-to-edge content displays properly
- [ ] No visual regressions

### Performance
- [ ] App startup time
- [ ] Animation performance
- [ ] Memory usage (especially on Android)
- [ ] Network requests

### Platform-Specific
- [ ] iOS functionality
- [ ] Android edge-to-edge
- [ ] Web compatibility (if applicable)

## Rollback Plan

### Quick Rollback
```bash
# Revert to previous version
git checkout main
git branch -D feature/rn-0.77-upgrade

# Clean and reinstall
rm -rf node_modules
npm install
```

### Full Rollback
1. Document current working versions
2. Create restore points
3. Test downgrade procedure
4. Document manual intervention steps

## Common Issues and Solutions

### Metro Bundler Issues
```bash
# Clear Metro cache
npm start -- --reset-cache

# If persists, try:
watchman watch-del-all
```

### iOS Build Issues
```bash
cd ios
pod deintegrate
pod install
```

### Android Build Issues
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

## Resources

- [Official React Native 0.77 Release Notes](https://reactnative.dev/blog/2025/01/21/version-0.77)
- [React Native DevTools Documentation](https://reactnative.dev/docs/react-native-devtools)
- [Reanimated 4 Migration Guide](https://docs.swmansion.com/react-native-reanimated/)
- [Android Edge-to-Edge Guide](https://developer.android.com/develop/ui/views/layout/edge-to-edge)

## Support

For issues during upgrade:
1. Check React Native GitHub issues
2. Review Expo forums (if using Expo)
3. Consult React Native Discord community

Remember to test thoroughly in a staging environment before upgrading production apps.
