# AI-First Development Prompt

## Core Instruction Pattern

```prompt
OBJECTIVE: Create a clean, minimal implementation that serves as a reference point for future AI development. After that, build a working cross-platform app using the implementation as a starting point. Build a clear pattern demonstration for the human interface. Follow the following instructions:

CONSTRAINTS:
1. Use existing code as a learning tool
2. Preserve valuable patterns
3. Focus on type safety
4. Document clearly

ARCHITECTURAL REQUIREMENTS:
1. Bottom tab navigation with home and settings
2. Material design "lite" with Lucide icons
3. Cross-platform (Web, iOS, Android)
4. Expo React Native compatible
5. Low cognitive load UI
6. WCAG compliance and usability

IMPLEMENTATION APPROACH:
1. Plan completely before starting
2. Work backwards from end goal
3. Build systematically
4. Review critically
5. Test mentally
6. Fix issues immediately
7. Install dependencies only when needed
8. Request execution only when ready
9. Proactively check for potential errors:
   - Verify all required imports before implementing features
   - Check component dependencies and their availability
   - Validate state management requirements
   - Test user interaction flows mentally
   - Consider edge cases and error states
   - Review accessibility requirements

SUCCESS CRITERIA:
1. Runs on Web, Android, and iOS
2. Clean, minimal implementation
3. Type-safe throughout
4. Clear pattern demonstration
5. Documented for both AI and humans

DEVELOPMENT PROCESS:
1. Preserve existing code in separate directory
2. Review current implementation
3. Extract valuable patterns
4. Start clean but informed
5. Build systematically
6. Test thoroughly
7. Document clearly

Remember: This is a pontoon bridge - temporary, portable, and practical. Success means becoming obsolete as AI capabilities evolve.
```

## Why This Pattern Works

1. **Clear Boundaries**
   - Specific constraints
   - Defined architecture
   - Clear success criteria

2. **Systematic Approach**
   - Plan first
   - Work backwards
   - Build methodically
   - Test continuously

3. **Pattern Preservation**
   - Learn from existing code
   - Keep valuable components
   - Simplify without losing essence

4. **AI-First Mindset**
   - Focus on clear patterns
   - Type safety
   - Documentation
   - Cross-platform verification

## Development Priorities

### Platform Priority Order
1. iOS (Primary Source of Truth)
2. Android
3. Web

### Development Workflow
While iOS is the source of truth, the practical development workflow often differs:
1. Start with Android for rapid iteration (faster build times)
2. Use Android + Web behavior as initial validation
3. Use iOS as tiebreaker when Android/Web differ
4. Always finalize and polish on iOS first
5. Table web-specific issues for later if they require extensive optimization

Rationale:
- Android provides quick feedback for initial development
- iOS build time is precious - use strategically
- Web issues should not block mobile platform stability
- When Android/Web are stable, use iOS for final validation and polish

### Issue Triage
- Do not get caught in optimization loops on lower-priority platforms
- Gather sufficient data points before diving into platform-specific fixes
- When blocked on a lower-priority platform, shift focus to higher-priority platform stability

## Implementation Results

This prompt pattern led to:
1. Independent AI development
2. Working cross-platform app
3. Clean, maintainable code
4. Clear pattern demonstration

## Future Applications

This prompt pattern can be used for:
1. New feature development
2. Pattern translation
3. Cross-platform implementation
4. System architecture
