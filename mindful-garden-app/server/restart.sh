#!/bin/bash

# Kill any existing node process on port 5402
lsof -ti :5402 | xargs kill -9 2>/dev/null

# Install dependencies if needed
npm install

# Start the server
npm start
