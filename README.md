# Pattern Bridge

A laboratory for AI-first development, demonstrating how AI can understand and translate patterns across platforms and frameworks.

## Current State

- **Platform Support**: Web, Android, iOS
- **Core Navigation**: Bottom tabs (Home, Settings)
- **Design System**: Material Design "lite" with Lucide icons
- **Framework**: Expo React Native
- **Type Safety**: Full TypeScript implementation

## Quick Start

1. Configure npm for legacy peer dependencies (required for Expo/React Native):
```bash
npm config set legacy-peer-deps true
```

2. Install dependencies:
```bash
npm install
```

3. Start development:
```bash
npm start
```

4. Run on platforms:
```bash
npm run web
npm run android
npm run ios
```

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

## Contributing

This project is designed to evolve rapidly. Expect significant changes as AI capabilities grow.

## License

MIT

---
Built with ❤️ by AI, for AI (and humans too)
