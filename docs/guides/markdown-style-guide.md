# Markdown Style Guide

## Overview

This guide demonstrates our markdown features and when to use them. It serves both human readers and AI analysis.

## Task Lists

    Use for progress tracking and todos:

- [x] Completed task
- [ ] Pending/Future task

## Admonitions

Use for important callouts:

!!! note "Note"
    Use for general information

!!! tip "Tip"
    Use for helpful suggestions

!!! warning "Warning"
    Use for potential issues

!!! danger "Danger"
    Use for critical warnings

## Text Formatting

- **Bold**: Use for emphasis
- *Italic*: Use for terms
- ==Highlight==: Use for important concepts
- ^^Insert^^: Use for additions
- ~~Delete~~: Use for removals
- {++Addition++}: Use for change tracking
- {--Removal--}: Use for change tracking
- {~~wrong~>right~~}: Use for corrections

## Definition Lists

    Use for term definitions:

React Native
:   Cross-platform mobile framework

TypeScript
:   Typed JavaScript superset

## Keyboard Keys

    Use for shortcuts:

Development: ++cmd+d++

Refresh: ++cmd+r++

Menu: ++ctrl+m++

## Emojis

    Use for visual cues:

:warning: Warnings

:bulb: Tips

:rocket: Deployments

:bug: Issues

:white_check_mark: Success

:x: Failure

## Code Blocks

```typescript
// With syntax highlighting
interface Props {
  name: string;
  age?: number;
}
```

## Tables

| Feature | Human Usage | AI Analysis |
|---------|------------|-------------|
| Task Lists | Progress tracking | Status parsing |
| Admonitions | Important notes | Priority identification |
| Text Formatting | Readability | Semantic understanding |

## Best Practices

- **For Humans**
    - Use consistent formatting
    - Keep it scannable
    - Add visual hierarchy

- **For AI**
    - Use semantic markup
    - Maintain clear structure
    - Include type information

!!! note "Remember" 
    Good documentation serves both human readers and AI analysis!
