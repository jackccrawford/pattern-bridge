# State Management in Pattern Bridge

Pattern Bridge uses React Context for state management, favoring simplicity and built-in React patterns over complex state management libraries.

## Core Principles

1. **Simplicity First**
   - Use React Context for shared state
   - Keep state logic close to where it's used
   - Minimize state complexity

2. **TypeScript Integration**
   - Leverage TypeScript for type safety
   - Define clear state interfaces
   - Use discriminated unions for complex states

## Implementation

### Context Setup

```typescript
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
});
```

### Provider Pattern

```typescript
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Custom Hooks

```typescript
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

## State Management Patterns

### 1. Simple State
- Use local `useState` for component-specific state
- Keep state as close to where it's used as possible
- Lift state up only when necessary

### 2. Shared State
- Use React Context for shared state
- Create custom hooks for state access
- Keep context providers focused and specific

### 3. Complex State
- Use reducers for complex state logic
- Define clear action types
- Maintain type safety with discriminated unions

## Testing

### 1. Context Testing
```typescript
describe('ThemeContext', () => {
  it('provides theme values to children', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    expect(result.current.theme).toBeDefined();
  });
});
```

### 2. Integration Testing
```typescript
test('theme changes propagate to components', () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
  // Test state changes
});
```

## Best Practices

1. **State Organization**
   - Group related state in contexts
   - Use separate contexts for different concerns
   - Keep provider hierarchy shallow

2. **Performance**
   - Use context splitting to prevent unnecessary rerenders
   - Memoize values when needed
   - Use context selectors for large state objects

3. **Type Safety**
   - Define strict types for state
   - Use TypeScript's discriminated unions
   - Leverage type inference

## Resources

- <a href="https://reactjs.org/docs/context.html" target="_blank">React Context Documentation</a>
- <a href="https://www.typescriptlang.org/docs/handbook/react.html" target="_blank">TypeScript Handbook</a>
- <a href="https://reactjs.org/docs/hooks-reference.html" target="_blank">React Hooks Guide</a>
