#!/bin/bash
lsof -ti :5401 | xargs kill -9 2>/dev/null
PORT=5401 npm start
