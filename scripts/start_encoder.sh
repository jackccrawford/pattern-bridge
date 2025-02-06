#!/bin/bash

# Start the Pattern Bridge encoding service on port 5180
echo "Starting Pattern Bridge encoding service on port 5180..."
python -m pattern_bridge.service.main
