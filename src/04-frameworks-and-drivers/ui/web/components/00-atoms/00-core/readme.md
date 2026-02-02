00-core-constants/
├── index.ts                      # Main export
├── base-atom.constants.ts        # Base constants & helpers
├── tokens/                       # Design tokens cốt lõi
│   ├── index.ts                  # Export all tokens
│   ├── colors.constants.ts       # Color palette
│   ├── spacing.constants.ts      # Spacing scale
│   ├── typography.constants.ts   # Fonts, sizes
│   ├── border.constants.ts       # Radius, widths
│   ├── elevation.constants.ts    # Shadows, z-index
│   ├── animation.constants.ts    # Transitions, easings
│   └── size.constants.ts         # Component size scales
├── responsive/                   # Responsive logic
│   ├── index.ts                  # Export all responsive utils
│   ├── breakpoints.constants.ts  # Breakpoints
│   ├── media-queries.constants.ts # Media query helpers
│   ├── responsive.constants.ts   # Responsive values
│   ├── tablet.constants.ts       # Tablet-specific
│   ├── orientation.constants.ts  # Portrait/Landscape
│   └── mobile.constants.ts       # Mobile-specific (optional)
└── themes/                       # 🔥 THÊM: Themes support
    ├── index.ts
    ├── light-theme.constants.ts
    ├── dark-theme.constants.ts
    └── theme.utils.ts            # Theme switching helpers