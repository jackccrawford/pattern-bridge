# PNG Diagram Generation Pattern

## Overview

This pattern demonstrates how to generate static PNG images from Mermaid diagrams with consistent styling and WCAG compliance across light and dark modes.

## Implementation

### 1. Style Definitions
```mermaid
%%{init: {'themeVariables': { 'primaryColor': '#999999', 'lineColor': '#999999'}}}%%
classDef stateNode fill:#f3f0ff,stroke:#9b4dca,stroke-width:2px,color:#000000
classDef decisionNode fill:#f3f0ff,stroke:#9b4dca,stroke-width:2px,color:#000000,shape:diamond
classDef resourceNode fill:#f3f0ff,stroke:#9b4dca,stroke-width:2px,color:#000000,shape:cylinder
```

### 2. Generation Script
```bash
mmdc -i diagram.mmd -o output.png -b transparent
```

### 3. Example Implementation
See the complete implementation in `generate-diagrams.sh`:
```bash
#!/bin/bash

# Directory structure
mkdir -p docs/assets/images

# For each Mermaid file
for file in *.mmd; do
    output="docs/assets/images/${file%.mmd}.png"
    mmdc -i "$file" -o "$output" -b transparent
done
```

## Why This Pattern?

While we prefer using MkDocs' native Mermaid rendering for documentation, this pattern is valuable when:
1. You need pixel-perfect control over diagram styling
2. You're generating diagrams for platforms without Mermaid support
3. You need to ensure consistent rendering across all environments

## WCAG Compliance

Our color choices ensure:
- Contrast ratio ≥ 4.5:1 for text
- Visible lines in both light and dark modes
- Consistent branding with Pattern Bridge's theme

## Related Patterns
- [Material Design Documentation](../material-design/README.md)
- [Accessibility Patterns](../accessibility/README.md)
