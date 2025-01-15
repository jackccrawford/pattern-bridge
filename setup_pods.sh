#!/bin/bash
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
cd ios

# Clean up existing pods and workspace
rm -rf Pods PatternBridge.xcworkspace

# Install pods
pod install

echo "Pod installation complete!"
