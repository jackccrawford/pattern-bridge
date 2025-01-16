# Expo Setup Guide

## Prerequisites

Before starting with Expo setup, ensure you have:
- Node.js installed (recommended version: 18.x or later)
- npm or yarn package manager
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Critical Installation Order

> ⚠️ **The order of installation is crucial for a stable setup**
> 
> Following this exact order prevents common dependency conflicts and setup issues.

### 1. Configure npm (REQUIRED FIRST STEP)
```bash
# Required before any package installation
npm config set legacy-peer-deps true
```

### 2. Create Project
```bash
mkdir your-project-name
cd your-project-name
npx create-expo-app . --template blank-typescript
```

### 3. Core Dependencies Layer
```bash
# Install SVG support first - other UI packages depend on this
npm install react-native-svg
```

### 4. Navigation Layer
```bash
# Install navigation after core dependencies
npm install @react-navigation/native @react-navigation/bottom-tabs
```

### 5. UI Components Layer
```bash
# Install UI packages after navigation is set up
npm install lucide-react-native
```

### 6. Web Support Layer
```bash
# Add web support last to avoid native dependency conflicts
npm install react-dom @expo/webpack-config
```

### 7. iOS Setup (Mac Only)
```bash
cd ios && pod install && cd ..
```

> 🔍 **Verification After Each Layer**
> - Test core functionality before adding the next layer
> - Run basic tests if available
> - Check for any warning messages
> - Verify types are working correctly

## UI Components and Icons

### Icon Support
For using Lucide icons in your app:
1. Install required dependencies:
   - `lucide-react-native`: Modern icon library
   - `react-native-svg`: Required for rendering SVG icons on React Native

```typescript
// Example usage
import { Camera, Heart } from 'lucide-react-native';

function MyComponent() {
  return (
    <>
      <Camera size={24} color="#000000" />
      <Heart size={24} color="#FF0000" />
    </>
  );
}
```

Note: Make sure `react-native-svg` is installed before using any Lucide icons, as it's a required peer dependency.

## Development Environment Setup

### iOS Development (Mac only)
1. Install Xcode from the Mac App Store
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```

### Android Development
1. Install Android Studio
2. Install Android SDK
3. Configure environment variables (ANDROID_HOME, etc.)

## Web Support

For web platform support, ensure you have installed the required web dependencies:
- `react-dom`: React's DOM-specific methods
- `@expo/webpack-config`: Expo's webpack configuration for web support

These dependencies enable your Expo app to run in a web browser. After installation, you can:
1. Start the web version with `npm run web`
2. Debug using browser developer tools
3. Use web-specific APIs and components when needed

Note: Some React Native components may behave differently on web. Always test your app on web after making significant changes.

## Running Your App

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## Common Issues

### Dependency Installation Errors
If you encounter errors during `npm install`, especially with React Native dependencies, ensure you have set:
```bash
npm config set legacy-peer-deps true
```

### SVG and Icon Issues
- If icons appear as empty boxes or don't render:
  1. Verify `react-native-svg` is installed
  2. For iOS, run `pod install` in the ios directory
  3. For Android, clean and rebuild the project
- If getting "Invariant Violation" with SVG:
  1. Check that you're importing from `lucide-react-native` and not `lucide-react`
  2. Ensure all SVG-related dependencies are at compatible versions

### iOS Build Issues
- Make sure CocoaPods is properly installed
- Try cleaning the build:
  ```bash
  cd ios
  pod deintegrate
  pod install
  ```

### Android Build Issues
- Verify Android SDK installation
- Check environment variables
- Clean the Android build:
  ```bash
  cd android
  ./gradlew clean
  ```

## Additional Resources

- [Official Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Troubleshooting Guide](https://docs.expo.dev/troubleshooting/troubleshooting/)

## Setup Verification Checklist

> ⚠️ **Verify each layer before proceeding to the next**

### 1. Core Setup
- [ ] npm configured with legacy-peer-deps
- [ ] Project created with TypeScript template
- [ ] SVG support installed and verified
- [ ] No peer dependency warnings (or only expected ones)

### 2. Navigation Layer
- [ ] Navigation packages installed
- [ ] Navigation container works
- [ ] Stack/tab navigation functions
- [ ] Type checking passes

### 3. UI Components Layer
- [ ] Lucide icons render correctly
- [ ] SVG components work in all components
- [ ] No console errors related to UI
- [ ] Components are type-safe

### 4. Platform Support
- [ ] iOS builds successfully (`pod install` complete)
- [ ] Android builds successfully
- [ ] Web support working
- [ ] Hot reload functions on all platforms

### 5. Development Environment
- [ ] Metro bundler runs without errors
- [ ] TypeScript compilation succeeds
- [ ] Tests pass (if implemented)
- [ ] No type errors in editor

🚫 **Do not proceed to the next layer until all checks pass for the current layer**. Fixing setup issues later will cost significantly more time.
