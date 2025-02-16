# Troubleshooting Guide

> ⚠️ **Important Setup Note**
> 
> Most issues documented here are setup-related and should be addressed BEFORE beginning development. A clean, proper setup is crucial for avoiding these issues which can significantly slow down development if encountered later.
> 
> **Prevention is better than cure:**
> - Follow the setup guide exactly
> - Install all dependencies in the correct order
> - Verify each platform works before starting development
> - Don't skip any setup steps, even if they seem optional
> - Test basic functionality (e.g., SVG icons, navigation) right after setup

This guide covers common issues encountered in React Native/Expo development and their solutions.

## Quick Checklist

- [x] Node.js and npm installed
- [x] Expo CLI installed globally
- [ ] Dependencies installed
- [ ] iOS/Android development environment set up
- [ ] Environment variables configured

## Dependency Installation Issues

### 1. Peer Dependency Conflicts
```bash
npm ERR! ERESOLVE unable to resolve dependency tree
```

!!! warning "Peer Dependency Conflicts"
    Common when installing new packages or updating existing ones.

    **Quick Fix**:
    - Remove node_modules: `rm -rf node_modules`
    - Clear npm cache: `npm cache clean --force`
    - Reinstall: `npm install`

**Solution:**
```bash
npm config set legacy-peer-deps true
```
This is required because modern versions of React Native and Expo often have peer dependency conflicts, especially with newer versions of React.

### 2. Multiple React Versions
```bash
Invalid hook call. Hooks can only be called inside of the body of a function component
```

!!! info "Multiple React Versions"
    If you're seeing multiple React versions:

    **Resolution Steps**:
    ```bash
    npm ls react
    ```

    If you see multiple versions:
    1. Remove node_modules and package-lock.json
    2. Clear npm cache: `npm cache clean --force`
    3. Reinstall: `npm install`

## Build Issues

### iOS

#### 1. CocoaPods Issues
```bash
[!] No podspec found for `React-Core` in `../node_modules/react-native`
```

!!! info "CocoaPods Issues"
    If you're seeing CocoaPods errors:

    1. Clean Pods:
        ```bash
        cd ios
        rm -rf Pods
        pod install
        ```

    2. If that doesn't work:
        ```bash
        pod deintegrate
        pod setup
        pod install
        ```

**Solution:**
```bash
cd ios
pod deintegrate
pod cache clean --all
pod install
```

#### 2. M1/M2 Mac Issues
If experiencing architecture-related errors:
```bash
sudo arch -x86_64 gem install ffi
arch -x86_64 pod install
```

### Android

#### 1. Gradle Build Failures
```bash
Task :app:mergeDexDebug FAILED
```

!!! info "Gradle Build Failures"
    Common after dependency changes or React Native updates.

    **Resolution Steps**:
    ```bash
    cd android
    ./gradlew clean
    cd ..
    npm run android
    ```

**Solution:**
1. Clean Android build:
```bash
cd android
./gradlew clean
```
2. If using Windows, check ANDROID_HOME:
```bash
echo %ANDROID_HOME%
```

## UI Component Issues

### 1. SVG and Icon Problems

#### Missing Icons
If icons appear as empty boxes:
```typescript
import { Camera } from 'lucide-react-native'; // ❌ Icons not showing
```

!!! tip "SVG and Icon Problems"
    If SVGs aren't rendering:

    1. Check dependencies:
    ```bash
    npm install react-native-svg
    ```

    2. Verify imports:
    ```typescript
    import { SvgXml } from 'react-native-svg';
    ```

**Solution:**
1. Verify SVG support is installed:
```bash
npm install react-native-svg
```
2. For iOS, reinstall pods:
```bash
cd ios && pod install
```
3. Import check:
```typescript
import { Camera } from 'lucide-react-native'; // ✅ Correct
import { Camera } from 'lucide-react';        // ❌ Wrong
```

#### SVG Invariant Violations
```
Invariant Violation: Element type is invalid: expected a string... but got: undefined
```

**Solution:**
1. Check SVG component imports
2. Ensure Metro bundler is using correct resolver:
```js
// metro.config.js
module.exports = {
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'svg']
  }
};
```

### 2. Layout Issues

#### Safe Area Problems
Content getting cut off by notches or system bars:

**Solution:**
```typescript
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// In your app root
export default function App() {
  return (
    <SafeAreaProvider>
      <YourApp />
    </SafeAreaProvider>
  );
}

// In your screens
function Screen() {
  return (
    <SafeAreaView edges={['top', 'bottom']}>
      <YourContent />
    </SafeAreaView>
  );
}
```

## Development Environment Issues

### 1. Metro Bundler

#### Cache Issues
If changes aren't reflecting:
```bash
# Clear metro bundler cache
npm start -- --reset-cache
```

#### Port Conflicts
```
Error: Listen EADDRINUSE: address already in use :::8081
```

**Solution:**
```bash
# Find and kill process using port 8081
lsof -i :8081
kill -9 <PID>
```

### 2. Expo Issues

#### Expo Go App Not Connecting
```
Something went wrong: Error: Connecting to Metro bundler failed.
```

**Solutions:**
1. Check same WiFi network
2. Try tunnel connection:
```bash
expo start --tunnel
```
3. Use local connection:
```bash
expo start --localhost
```

## Performance Issues

### 1. Slow Development Builds

**Solutions:**
1. Use Hermes engine:
```json
// app.json
{
  "expo": {
    "jsEngine": "hermes"
  }
}
```

2. Enable Fast Refresh only:
```bash
expo start --no-dev --minify
```

### 2. Production Performance

If experiencing slow production performance:
1. Enable Hermes
2. Configure ProGuard for Android
3. Enable RAM bundles for iOS

## Web-Specific Issues

### 1. Web Support Missing
```
Error: Couldn't find a loader for ...
```

**Solution:**
Install web dependencies:
```bash
npm install react-dom @expo/webpack-config
```

### 2. CSS/Style Issues
If styles work on mobile but break on web:
1. Use platform-specific styles:
```typescript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
      default: {
        // mobile styles
      },
    }),
  },
});
```

## Additional Resources

- <a href="https://docs.expo.dev/" target="_blank">:book: Expo Documentation</a>
- <a href="https://reactnative.dev/docs/getting-started" target="_blank">:rocket: React Native Documentation</a>
- <a href="https://github.com/react-native-community" target="_blank">:people_holding_hands: React Native Community GitHub</a>
- <a href="https://github.com/expo/expo/issues" target="_blank">:bug: Expo GitHub Issues</a>

!!! note "Remember"
    If you're stuck, don't hesitate to check the documentation or open an issue!
