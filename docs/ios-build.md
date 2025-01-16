# iOS Build Guide

## Prerequisites
- Xcode 14.0 or later
- CocoaPods
- Node.js and npm/yarn

## Important Environment Setup
Before starting, ensure proper character encoding for CocoaPods:
```bash
LANG=en_US.UTF-8
```
This environment variable is REQUIRED for all pod commands due to Ruby's Unicode normalization requirements in CocoaPods. This is not optional and should be included in all pod-related commands proactively, not as a fix after encountering errors.

## Build Steps

1. Install JavaScript dependencies:
```bash
npm install
```

2. Generate native iOS project:
```bash
npx expo prebuild -p ios --clean
```

3. Install CocoaPods dependencies:
```bash
cd ios
LANG=en_US.UTF-8 pod install
```

4. Open the workspace:
```bash
xed PatternBridge.xcworkspace
```
Note: Run this from the ios directory. The command needs the workspace to be in the current directory.

5. Build and run the project in Xcode using the Play button or `Cmd + R`

## Build System Requirements

### CocoaPods Environment
CocoaPods (via Ruby) requires UTF-8 encoding for path processing. This is a fundamental requirement, not a bug or error condition. Always prefix pod commands with `LANG=en_US.UTF-8` to ensure proper operation. This should be done proactively, not as a response to errors.

### Clean Build Process
If rebuilding is necessary:
1. Remove Pods directory: `rm -rf ios/Pods`
2. Clear Xcode derived data: `rm -rf ~/Library/Developer/Xcode/DerivedData/*`
3. Remove build directory: `rm -rf ios/build`
4. Remove ios directory entirely: `rm -rf ios`
5. Start fresh from step 2 in Build Steps

### Native Module Integration
When adding native modules:
1. Ensure the module is listed in package.json
2. ALWAYS use prebuild with --clean flag
3. ALWAYS use LANG=en_US.UTF-8 with pod install
4. Rebuild in Xcode

### Xcode Setup Verification
Before building:
1. Open Xcode
2. Go to Xcode > Settings > Locations
3. Verify Command Line Tools is set to your Xcode version
