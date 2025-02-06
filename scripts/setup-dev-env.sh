#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up Pattern Bridge development environment for Expo Go...${NC}"

# Install global dependencies
echo -e "\n${GREEN}Installing global dependencies...${NC}"
npm install -g expo-cli
npm install -g react-devtools

# Install project dependencies
echo -e "\n${GREEN}Installing project dependencies...${NC}"
npm install

# Clear cache
echo -e "\n${GREEN}Clearing Expo cache...${NC}"
expo start --clear

# Setup git hooks
echo -e "\n${GREEN}Setting up git hooks...${NC}"
git config core.hooksPath .github/hooks

# Create necessary directories
echo -e "\n${GREEN}Creating necessary directories...${NC}"
mkdir -p .vscode

# Create VS Code settings for debugging
echo -e "\n${GREEN}Configuring VS Code settings...${NC}"
cat > .vscode/settings.json << EOL
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always"
}
EOL

# Create VS Code launch configuration for Expo
cat > .vscode/launch.json << EOL
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug in Expo Go",
      "request": "launch",
      "type": "reactnative",
      "cwd": "\${workspaceFolder}",
      "platform": "android",
      "useExpo": true
    }
  ]
}
EOL

echo -e "\n${GREEN}Development environment setup complete!${NC}"
echo -e "\n${BLUE}Next steps:${NC}"
echo "1. Install Expo Go on your mobile device"
echo "2. Run 'npm start' to begin development"
echo "3. Scan the QR code with your mobile device to open in Expo Go"
