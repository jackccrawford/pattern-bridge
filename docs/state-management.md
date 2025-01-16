# State Management in Pattern Bridge

## Installation Requirements

Before installing the state management dependencies, ensure you have the following npm configuration set due to peer dependency requirements in the React Native and Expo ecosystem:

```bash
# Required for installing dependencies with modern package versions
npm config set legacy-peer-deps true
```

This is necessary because some of our dependencies (particularly in the Expo/React Native ecosystem) have peer dependency conflicts with newer versions of React and React Native.

Then you can install the required packages:

```bash
npm install xstate @xstate/react
```

## XState State Machines

### Key Concepts

1. **Machine Configuration**
   - Use TypeScript types for context and events
   - Define explicit state types
   - Use proper type assertions for state values

```typescript
// Define types first
type Status = 'idle' | 'active' | 'completed' | 'skipped';

interface MachineContext {
  status: Status;
  // ... other context properties
}

// Define event types separately for better maintainability
type ViewEvent = { type: 'VIEW' }
type StartEvent = { type: 'START' }
// ... other event types

export type MachineEvents = ViewEvent | StartEvent | /* ... other events */;
```

2. **XState v5 Best Practices**
   - Use property-based assign instead of object-based assign
   - Explicitly type the machine configuration
   - Use proper context and event types

```typescript
return createMachine({
  types: {} as {
    context: MachineContext;
    events: MachineEvents;
  },
  initial: 'idle',
  context: {
    status: 'idle',
    // ... initial context
  },
  states: {
    idle: {
      on: {
        VIEW: {
          target: 'active',
          actions: [
            // Property-based assign with explicit typing
            assign({
              status: (_) => 'active' as Status,
              someProperty: ({ context, event }) => ({
                ...context.someProperty,
                // ... updates
              })
            })
          ]
        }
      }
    }
  }
});
```

3. **Common TypeScript Gotchas**
   - Always use type assertions for status/enum values: `'active' as Status`
   - Use property-based assign for partial context updates
   - Define event types separately for better type inference
   - Use `satisfies` keyword when needed for type checking

## React Context

We use React Context for simpler shared state that doesn't require complex state machines.

### When to Use React Context

1. **Simple Shared State**
   - Theme preferences
   - User settings
   - Authentication state
   - Simple UI state

2. **Provider Pattern**
```typescript
import { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <ThemeContext.Provider 
      value={{
        isDark,
        toggleTheme: () => setIsDark(!isDark)
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using the context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### Best Practices

1. **Type Safety**
   - Always define explicit types for context values
   - Use undefined as initial context value for type safety
   - Create custom hooks for consuming context

2. **Performance**
   - Split contexts by domain to prevent unnecessary re-renders
   - Use `useMemo` for complex context values
   - Consider using `useReducer` for complex state logic

3. **Organization**
   - Keep context providers close to where they're needed
   - Combine multiple contexts using composition when needed
   - Use context selectors to optimize re-renders

## Choosing Between XState and React Context

### Use XState When:
- Complex state transitions
- Multiple states with different behaviors
- Need for state history
- Complex async operations
- State visualization is helpful
- Need for strict state management

### Use React Context When:
- Simple shared state
- Theme/preferences management
- Authentication state
- Simple UI state
- No complex state transitions
- No need for state history

## Example: Combining Both

```typescript
// Using XState for complex pattern state
const patternMachine = createMachine({
  types: {} as {
    context: PatternContext;
    events: PatternEvents;
  },
  // ... machine config
});

// Using React Context for theme
export function PatternProvider({ children }: { children: React.ReactNode }) {
  const [current, send] = useMachine(patternMachine);
  const theme = useTheme();

  return (
    <PatternContext.Provider value={{ current, send }}>
      <div className={theme.isDark ? 'dark' : 'light'}>
        {children}
      </div>
    </PatternContext.Provider>
  );
}
```

## Testing

1. **XState Testing**
   - Use `createModel` for model-based testing
   - Test state transitions
   - Verify context updates
   - Test side effects

2. **React Context Testing**
   - Test custom hooks
   - Verify context updates
   - Test provider behavior
   - Mock context values when needed

## Resources

- [XState Documentation](https://xstate.js.org/docs/)
- [React Context Documentation](https://react.dev/reference/react/createContext)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
