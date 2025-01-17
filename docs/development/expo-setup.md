# Expo Setup Guide

## Prerequisites

Node.js
:   Version 18.x or later required for optimal compatibility

npm/yarn
:   Package manager for dependency installation

iOS Simulator
:   Required for iOS development on Mac (Mac users only)

Android Studio
:   Required for Android development

## Critical Installation Order

!!! warning "Important"
    The order of installation is crucial for a stable setup. Following this exact order prevents common dependency conflicts and setup issues.

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

> :mag: **Verification After Each Layer**
> 
> After installing each layer, verify:
> - [ ] Core functionality works
> - [ ] No TypeScript errors
> - [ ] No console warnings
> - [ ] Dependencies resolved correctly
> - [ ] Build succeeds

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

!!! warning "Critical"
    **CRITICAL: CocoaPods UTF-8 Requirement** 

Before running ANY CocoaPods commands, you **MUST** use this exact command:
```bash
env LANG=en_US.UTF-8 pod install
```
!!! warning "Important"
    Failure to do this will result in encoding errors and pod installation will fail.

#### First-Time Setup

1. Install Xcode from the Mac App Store
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```
4. Install pods (IMPORTANT: use the UTF-8 environment setting):
   ```bash
   cd ios
   env LANG=en_US.UTF-8 pod install
   cd ..
   ```
5. Open the workspace in Xcode:
   ```bash
   open ios/PatternBridge.xcworkspace
   ```
6. In Xcode:
   - Select your development team
   - Build and run the project (▶️ button)
   - This initial build in Xcode is required for proper setup

#### Subsequent Development

After the initial Xcode setup:
- Use `expo start` and press `i` in the Metro bundler
- Or use `npm run ios` if you prefer npm scripts
- For Expo Go, follow the Expo CLI instructions for running on iOS

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

## Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Dependency Errors | Peer dependency conflicts | Set legacy-peer-deps to true |
| SVG/Icon Issues | Missing dependencies | Install react-native-svg |
| iOS Build Issues | CocoaPods setup | Run pod install with UTF-8 |
| Build Failures | Cache/environment issues | Clean build and reinstall |

## Additional Resources

- <a href="https://docs.expo.dev/" target="_blank">Official Expo Documentation</a>
- <a href="https://reactnative.dev/docs/getting-started" target="_blank">React Native Documentation</a>
- <a href="https://docs.expo.dev/troubleshooting/troubleshooting/" target="_blank">Troubleshooting Guide</a>

## Setup Verification Checklist

!!! warning "Verify"
    Verify each layer before proceeding to the next steps

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

## Final Verification

- [ ] All dependencies installed
- [ ] TypeScript compilation succeeds
- [ ] Tests pass (if implemented)
- [ ] No type errors in editor
- [ ] No console warnings

!!! danger "Critical"
    **Do not proceed** to the next layer until all checks pass for the current layer. Fixing setup issues later will cost significantly more time.

Good luck!
