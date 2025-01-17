# Pattern Bridge

[![React Native](https://img.shields.io/badge/React%20Native-0.76.5-blue.svg?style=flat-square&logo=react)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg?style=flat-square&logo=react)](https://reactjs.org/)
[![Expo](https://img.shields.io/badge/Expo-52.0.24-black.svg?style=flat-square&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MkDocs](https://img.shields.io/badge/MkDocs-1.6.1-blue.svg?style=flat-square)](https://www.mkdocs.org/)
[![Status](https://img.shields.io/badge/Status-Alpha-orange.svg?style=flat-square)]()
[![License](https://img.shields.io/badge/License-Proprietary-red.svg?style=flat-square)]()

An AI-native framework demonstrating how AI can understand, translate, and implement UI patterns across platforms. Built by AI, for AI, with human collaboration in mind.

## Why Pattern Bridge?

Pattern Bridge bridges the gap between human design patterns and AI implementation by:
- **AI-First Design**: Every pattern is optimized for AI comprehension and translation
- **Cross-Platform Harmony**: Seamless implementation across iOS, Android, and Web
- **Living Documentation**: Documentation that evolves with AI capabilities
- **Type Safety**: Strong typing for reliable AI-assisted development

## Core Philosophy

1. **AI-Native Architecture**
   - Patterns designed for AI understanding
   - Clear, predictable implementations
   - Self-documenting code structures

2. **Bridge Principles**
   - **Temporary**: 6-month lifespan ensures fresh, relevant patterns
   - **Portable**: Easy adaptation across frameworks
   - **Practical**: Production-ready implementations

3. **Development Approach**
   - Clean, minimal pattern demonstrations
   - AI-optimized code organization
   - Human-friendly developer experience

## Getting Started

!!! warning "Important"
    Follow these steps in order to ensure a smooth setup:

1. Read [`docs/expo-setup.md`](docs/expo-setup.md) for platform setup
2. Follow the verification checklist
3. Check [`docs/troubleshooting.md`](docs/troubleshooting.md) if needed

## Project Structure

```
src/
  ├── components/
  │   ├── base/          # Core UI components
  │   ├── patterns/      # Pattern demonstrations
  │   └── toast/         # Notification system
  ├── core/
  │   └── types/         # Type definitions
  ├── theme/             # Theme system
  ├── navigation/        # App navigation
  └── screens/           # Main app screens
```

## Core Concepts

1. **AI-First Development**
   - Clear patterns for AI understanding
   - Type-safe implementations
   - Cross-platform verification

2. **Pattern Bridge Philosophy**
   - Temporary (6-month lifespan)
   - Portable (easy to adapt)
   - Practical (works everywhere)

3. **Development Approach**
   - Clean, minimal implementations
   - Focus on pattern clarity
   - Built for AI comprehension

## Documentation

- [Core Concepts](docs/core-concepts/universal-translation.md)
- [AI Prompts](docs/ai/prompt-engineering.md)
- [Lessons Learned](docs/core-concepts/lessons-learned.md)
- [Expo Setup](docs/expo-setup.md)
- [Troubleshooting](docs/troubleshooting.md)

## Documentation Server

### MkDocs Setup

1. Install MkDocs and the Material theme:
   ```bash
   pip install mkdocs-material
   ```

2. Additional plugins (optional but recommended):
   ```bash
   pip install pymdown-extensions
   ```

### Running the Documentation Server

From the project root (where mkdocs.yml is located):

1. Local development (default):
   ```bash
   mkdocs serve
   ```
   Access at: http://localhost:8000

2. Network accessible (recommended for team sharing):
   ```bash
   mkdocs serve -a 0.0.0.0:8000
   ```
   Access at:
   - Local: http://localhost:8000
   - Network: http://your.ip.address:8000

### Server Controls

- Start server: `mkdocs serve`
- Stop server: ++ctrl+c++
- Rebuild docs: `mkdocs build`
- Help: `mkdocs --help`

### Common Issues

- If port 8000 is in use:
  ```bash
  mkdocs serve -a 0.0.0.0:8001  # or any other port
  ```
- If changes aren't showing:
  1. Check if the server is watching files (should show "Rebuilding documentation...")
  2. Try restarting the server
  3. Clear your browser cache

For more details on documentation structure and formatting, see our [Markdown Style Guide](docs/guides/markdown-style-guide.md).

## Contributing

This project is designed to evolve rapidly. Expect significant changes as AI capabilities grow.

## License

Proprietary: This project is a work in progress and is not intended for public distribution.

---
Built by AI, for AI
