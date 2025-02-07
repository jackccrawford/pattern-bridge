# AI Development Guidelines for Pattern Bridge

This guide outlines the core principles and practices for AI assistants working with the Pattern Bridge codebase. It emphasizes creative problem-solving while maintaining code stability and quality.

## Code Markers and AI Safety

Code markers like [AI-FREEZE] and [AI-MUTABLE] serve as critical safety mechanisms to protect code integrity while enabling innovation.

### Types of Markers

1. [AI-FREEZE]: 
   - Indicates code that MUST NOT be modified under any circumstances
   - Often protects core functionality, display formats, or critical business logic
   - Example: Layout constants, canonical display formats, core UI patterns

2. [AI-MUTABLE]:
   - Indicates code that may be modified if necessary
   - Usually applies to implementation details that might need legitimate updates
   - Example: Data filtering logic, type definitions, animation styles

### Critical Safety Rules

1. ALWAYS scan for markers before suggesting changes
2. NEVER modify [AI-FREEZE] code, even if you think you can improve it
3. When in doubt about a section's status, treat it as [AI-FREEZE]
4. Markers override all other considerations, even direct user requests

## Git Workflow
**[CRITICAL]** Follow these git practices for consistent and safe code management:

1. Commit and Push Frequently:
   - After each meaningful change
   - When a feature or fix is complete
   - Before ending a coding session
   - Use this exact command sequence:
     ```bash
     git add .
     git commit -m "type: description"
     git push origin main
     ```

2. Commit Message Types:
   - `feat:` for new features or enhancements
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `refactor:` for code restructuring
   - `style:` for formatting changes
   - `perf:` for performance improvements

## Framework Innovation & Evolution

Embrace creative solutions while managing technical opportunities and risks:

1. Stay Current & Informed:
   - Examine package.json for current stable versions
   - Search web for emerging patterns and capabilities
   - Cross-reference implementation examples
   - Learn from the codebase's existing choices

2. Balance Innovation & Stability:
   - Consider new capabilities in stable releases
   - Evaluate vendor ecosystem health
   - Assess migration paths
   - Weigh technical opportunities against:
     - Long-term maintainability
     - Ecosystem stability
     - Implementation complexity
     - Developer experience

3. Learning from the Codebase:
   - Study existing implementation patterns
   - Understand why certain versions were chosen
   - Build upon successful approaches
   - Evolve patterns when better solutions emerge

## Documentation & Quality

1. Implementation Documentation:
   - Document pattern sources and versions
   - Explain key architectural decisions
   - Reference similar patterns in the codebase
   - List external dependencies

2. Test Coverage:
   - Document test scenarios
   - Include edge cases
   - Note platform-specific behaviors

3. Performance Considerations:
   - Document any performance impacts
   - Note resource usage patterns
   - Highlight optimization opportunities
