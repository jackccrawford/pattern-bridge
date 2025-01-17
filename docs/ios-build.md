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

- **Initial Setup**
    - **Dependencies**: Install JavaScript dependencies
        ```bash
        npm install
        ```

    - **Project Generation**: Generate native iOS project
        ```bash
        npx expo prebuild --platform ios --clean
        ```

    - **CocoaPods**: Install CocoaPods dependencies
        ```bash
        cd ios && LANG=en_US.UTF-8 pod install && cd ..
        ```

    - **Workspace**: Open the workspace
        ```bash
        open ios/PatternBridge.xcworkspace
        ```

    - **Build & Run**: Use Play button or ++cmd+r++ in Xcode

## Build System Requirements

### CocoaPods Environment
CocoaPods (via Ruby) requires UTF-8 encoding for path processing. This is a fundamental requirement, not a bug or error condition. Always prefix pod commands with `LANG=en_US.UTF-8` to ensure proper operation. This should be done proactively, not as a response to errors.

## Clean Build

- **Clean Steps**
    - **Pods**: Remove Pods directory
        ```bash
        rm -rf ios/Pods
        ```
    - **Derived Data**: Clear Xcode derived data
        ```bash
        rm -rf ~/Library/Developer/Xcode/DerivedData/*
        ```
    - **Build Directory**: Remove build directory
        ```bash
        rm -rf ios/build
        ```
    - **iOS Directory**: Remove ios directory entirely
        ```bash
        rm -rf ios
        ```
    - **Fresh Start**: Start fresh from project generation step

## Native Module Integration

- **Module Installation**
    - **Package Check**: Ensure module is listed in package.json
    - **Clean Prebuild**: ALWAYS use prebuild with --clean flag
    - **Pod Install**: ALWAYS use LANG=en_US.UTF-8 with pod install
    - **Xcode Build**: Rebuild in Xcode

## Xcode Setup Verification

- **Command Line Tools**
    - **Open Settings**: Open Xcode
    - **Locations**: Go to Xcode > Settings > Locations
    - **Version Check**: Verify Command Line Tools matches Xcode version
