# Message Room Pattern

## Overview
A simple, isolated processing space where tasks flow in and results flow out through a clean interface. Based on the philosophical concept of isolated processing rooms, this pattern enables clear, unidirectional communication without requiring knowledge of the processor's implementation.

## Structure
```
message-room/
├── inbox/
│   └── task.md    # Instructions arrive here
├── outbox/
│   └── work.md    # Results appear here
└── README.md      # This file
```

## How It Works

1. **Task Delivery**
   - Place task instructions in `inbox/task.md`
   - Use clear markdown formatting
   - Include all necessary context
   - One task at a time

2. **Processing**
   - Room processor monitors inbox
   - Processes according to instructions
   - Works in isolation
   - Maintains own state if needed

3. **Result Collection**
   - Results appear in `outbox/work.md`
   - Clear completion indicators
   - Structured response format
   - Task reference maintained

## Usage

1. **Create Room**
   ```bash
   cp -r message-room/ my-project/room-1
   ```

2. **Send Task**
   ```markdown
   # Task: [Name]
   [Instructions]
   ```

3. **Receive Result**
   ```markdown
   # Result: [Task Name]
   [Output]
   ```

## Benefits

1. **Simplicity**
   - Minimal structure
   - Clear flow
   - Easy to understand
   - Quick to implement

2. **Isolation**
   - Clean interfaces
   - Independent processing
   - State containment
   - Error isolation

3. **Flexibility**
   - Any processor type
   - Any task type
   - Easy to modify
   - Simple to extend

## Implementation Notes

1. **File Watching**
   - Monitor inbox for changes
   - Detect task completion
   - Handle file updates
   - Maintain consistency

2. **Error Handling**
   - Clear error formats
   - Status indicators
   - Recovery options
   - Clean failure states

3. **Extensions**
   - Add logging if needed
   - State files optional
   - Config files optional
   - Keep it simple

Remember: The power is in the simplicity. Don't add complexity unless absolutely necessary.
