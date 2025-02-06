#!/bin/bash

# Clear Metro bundler cache
rm -rf $TMPDIR/metro-* 2>/dev/null

# Start Expo with specific port and clear cache
EXPO_DEBUG=true npx expo start --port 19000 --clear
