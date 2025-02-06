#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Pattern Bridge development server...${NC}"

# Check for existing Expo processes
EXPO_PIDS=$(pgrep -f "expo start")
METRO_PIDS=$(pgrep -f "cli/bin/metro")

if [ ! -z "$EXPO_PIDS" ] || [ ! -z "$METRO_PIDS" ]; then
    echo -e "${YELLOW}Found existing processes, cleaning up...${NC}"
    
    if [ ! -z "$EXPO_PIDS" ]; then
        echo -e "Killing Expo processes: ${YELLOW}$EXPO_PIDS${NC}"
        kill $EXPO_PIDS
    fi
    
    if [ ! -z "$METRO_PIDS" ]; then
        echo -e "Killing Metro processes: ${YELLOW}$METRO_PIDS${NC}"
        kill $METRO_PIDS
    fi
    
    # Wait a moment for processes to clean up
    sleep 2
fi

# Clear Metro bundler cache
echo -e "${GREEN}Clearing Metro bundler cache...${NC}"
rm -rf $HOME/.expo/web-build-cache/* &>/dev/null
rm -rf $HOME/.expo/metro-cache/* &>/dev/null

# Start Expo Go
echo -e "${GREEN}Starting Expo Go...${NC}"
npx expo start --clear
