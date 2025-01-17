# AI-First Development Prompt

## Core Instruction Pattern

```prompt
OBJECTIVE: Create a clean, minimal implementation that serves as a reference point for future AI development. After that, build a working cross-platform app using the implementation as a starting point. Build a clear pattern demonstration for the human interface. Follow the following instructions:

CONSTRAINTS:
- **Learning Focus**
    - **Code as Teacher**: Use existing code as a learning tool
    - **Pattern Preservation**: Preserve valuable patterns
    - **Type Safety**: Focus on type safety
    - **Documentation**: Document clearly

ARCHITECTURAL REQUIREMENTS:
- **Navigation**
    - **Tab Structure**: Bottom tab navigation with home and settings
    - **Design System**: Material design "lite" with Lucide icons
    - **Platform Support**: Cross-platform (Web, iOS, Android)
    - **Framework**: Expo React Native compatible
    - **User Experience**: Low cognitive load UI
    - **Accessibility**: WCAG compliance and usability

IMPLEMENTATION APPROACH:
- **Planning**
    - **Complete Design**: Plan completely before starting
    - **Goal Focus**: Work backwards from end goal
    - **Systematic Build**: Build systematically
    - **Critical Review**: Review critically

- **Implementation**
    - **Mental Testing**: Test mentally
    - **Issue Resolution**: Fix issues immediately
    - **Dependency Management**: Install dependencies only when needed
    - **Execution Control**: Request execution only when ready

- **Error Prevention**
    - **Type Checking**: Verify all required imports before implementing features
    - **Path Verification**: Check component dependencies and their availability
    - **Import Validation**: Validate state management requirements
    - **Platform Testing**: Test user interaction flows mentally
    - **Edge Case Consideration**: Consider edge cases and error states
    - **Accessibility Review**: Review accessibility requirements

SUCCESS CRITERIA:
- **Platform Support**
    - **Cross-Platform**: Runs on Web, Android, and iOS
    - **Clean Code**: Clean, minimal implementation
    - **Type Safety**: Type-safe throughout
    - **Pattern Clarity**: Clear pattern demonstration

DEVELOPMENT PROCESS:
- **Preservation**
    - **Code Preservation**: Preserve existing code in separate directory
    - **Pattern Extraction**: Review current implementation
    - **Pattern Preservation**: Extract valuable patterns
    - **Informed Start**: Start clean but informed

- **Systematic Development**
    - **Systematic Build**: Build systematically
    - **Thorough Testing**: Test thoroughly
    - **Clear Documentation**: Document clearly

Remember: This is a pontoon bridge - temporary, portable, and practical. Success means becoming obsolete as AI capabilities evolve.
```

## Why This Pattern Works

- **Clear Boundaries**
    - **Specific Constraints**
    - **Defined Architecture**
    - **Clear Success Criteria**

- **Systematic Approach**
    - **Plan First**
    - **Work Backwards**
    - **Build Methodically**
    - **Test Continuously**

- **Pattern Preservation**
    - **Learn from Existing Code**
    - **Keep Valuable Components**
    - **Simplify without Losing Essence**

- **AI-First Mindset**
    - **Focus on Clear Patterns**
    - **Type Safety**
    - **Consistent Interfaces**

## Development Priorities

### Platform Priority Order
- **Primary Platform**: iOS (Primary Source of Truth)
- **Secondary Platforms**: Android, Web

### Development Workflow
While iOS is the source of truth, the practical development workflow often differs:
- **Rapid Iteration**: Start with Android for rapid iteration (faster build times)
- **Initial Validation**: Use Android + Web behavior as initial validation
- **Tiebreaker**: Use iOS as tiebreaker when Android/Web differ
- **Finalize and Polish**: Always finalize and polish on iOS first
- **Web-Specific Issues**: Table web-specific issues for later if they require extensive optimization

Rationale:
- **Android for Rapid Iteration**: Android provides quick feedback for initial development
- **iOS Build Time**: iOS build time is precious - use strategically
- **Web Issues**: Web issues should not block mobile platform stability
- **Platform Stability**: When Android/Web are stable, use iOS for final validation and polish

### Issue Triage
- **Avoid Optimization Loops**: Do not get caught in optimization loops on lower-priority platforms
- **Data-Driven Decisions**: Gather sufficient data points before diving into platform-specific fixes
- **Shift Focus**: When blocked on a lower-priority platform, shift focus to higher-priority platform stability

## Implementation Results

This prompt pattern led to:

- **Independent AI Development**
    - **Self-Guided Implementation**: Self-guided implementation
    - **Pattern-Based Decisions**: Pattern-based decisions
    - **Autonomous Problem-Solving**: Autonomous problem-solving

- **Working Cross-Platform App**
    - **iOS Compatibility**: iOS compatibility
    - **Android Support**: Android support
    - **Web Responsiveness**: Web responsiveness

- **Clean, Maintainable Code**
    - **Clear Structure**: Clear structure
    - **Consistent Patterns**: Consistent patterns
    - **Well-Documented Components**: Well-documented components

- **Clear Pattern Demonstration**
    - **Reusable Examples**: Reusable examples
    - **Documented Workflows**: Documented workflows
    - **Verifiable Results**: Verifiable results

## Future Applications

This prompt pattern can be used for:

- **New Feature Development**
    - **Component Creation**: Component creation
    - **Feature Integration**: Feature integration
    - **System Expansion**: System expansion

- **Pattern Translation**
    - **Cross-Language Adaptation**: Cross-language adaptation
    - **Framework Migration**: Framework migration
    - **Architecture Mapping**: Architecture mapping

- **Cross-Platform Implementation**
    - **Mobile Development**: Mobile development
    - **Web Applications**: Web applications
    - **Desktop Software**: Desktop software

- **System Architecture**
    - **Service Design**: Service design
    - **Component Relationships**: Component relationships
    - **Integration Patterns**: Integration patterns
