# State Management

## Overview
State management in this agent is built upon the error handling patterns defined in [Error Handling](04-error-handling.md). This ensures that state transitions are resilient and recoverable.

## Session Parameters

### Core Parameters
1. `card_verified`
   - Type: Boolean (string representation)
   - Scope: Session
   - Usage: Security validation tracking
   - Set by: Account Validation flow

2. `card_operation`
   - Type: Enum string
   - Values: ["replace", "lock", "lost"]
   - Scope: Session
   - Usage: Card service type tracking
   - Set by: Default Start Flow

3. `in_hours`
   - Type: Boolean (string representation)
   - Scope: Session
   - Usage: Business hours tracking
   - Set by: Welcome intent

## State Transitions

### Card Services
```mermaid
graph TD
    A[User Intent] -->|"card_operation=replace"| B[Replace Card]
    A -->|"card_operation=lock"| C[Lock Card]
    A -->|"card_operation=lost"| D[Lost Card]
    B --> E{Verified?}
    C --> E
    D --> E
    E -->|"card_verified=true"| F[Process Request]
    E -->|"card_verified=false"| G[Account Validation]
```

### Payment Flow
```mermaid
graph TD
    A[Payment Intent] --> B{Verified?}
    B -->|"card_verified=true"| C[Collect Payment]
    B -->|"card_verified=false"| D[Account Validation]
    D -->|"Success"| E[Set card_verified=true]
    D -->|"Failure"| F[Error Handler]
```
