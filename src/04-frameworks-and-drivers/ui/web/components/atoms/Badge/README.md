# Badge Component

A highly configurable badge component with variants, sizes, status indicators, and i18n support.

## Features
- 🎨 Multiple variants (default, primary, secondary)
- 📏 5 sizes (xs, sm, md, lg, xl) with consistent scaling
- 🔴 Status indicators (online, away, busy, offline)
- 👥 Group component with max limits
- 🌐 Full i18n support
- ♿ Accessibility compliant
- ⚡ Loading, disabled, selected states
- 🔧 Easy to extend with new variants/sizes

## Installation
```bash
npm run generate:atom Badge
```

## Usage
```tsx
import { Badge, BadgeWithStatus, BadgeGroup } from './components/atoms/Badge';

// Basic usage
<Badge variant="primary" size="md">
  Button
</Badge>

// With status indicator
<BadgeWithStatus 
  variant="default" 
  size="lg"
  status="online"
>
  Online User
</BadgeWithStatus>

// Group of items
<BadgeGroup max={3}>
  <Badge variant="primary">Item 1</Badge>
  <Badge variant="secondary">Item 2</Badge>
  <Badge variant="default">Item 3</Badge>
</BadgeGroup>
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'primary' \| 'secondary' | 'default' | Visual style |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Size |
| disabled | boolean | false | Disabled state |
| loading | boolean | false | Loading state |
| selected | boolean | false | Selected state |
| status | 'online' \| 'offline' \| 'away' \| 'busy' \| 'none' | 'none' | Status indicator |
| onClick | () => void | - | Click handler |

## Adding New Variants
```typescript
// In Badge.constants.ts
export const BADGE_VARIANTS = [
  'default', 
  'primary', 
  'secondary',
  'success', // 👈 Add new variant
] as const;

export const BADGE_VARIANT_CONFIG = {
  // ... existing variants
  success: { // 👈 Add config
    color: '#ffffff',
    bgColor: '#10b981',
    borderColor: '#059669',
    fontSize: 14,
    iconSize: 16,
    statusSize: 8,
  },
};
```

## Adding New Sizes
```typescript
// In Badge.constants.ts
export const BADGE_SIZES = [
  'xs', 'sm', 'md', 'lg', 'xl',
  'xxl' // 👈 Add new size
] as const;

export const BADGE_SIZE_CONFIG = {
  // ... existing sizes
  xxl: { // 👈 Add config
    size: 72,
    fontSize: 20,
    padding: '12px 24px',
    iconSize: 22,
    borderRadius: 12,
    statusSize: 16,
    lineHeight: 1.7,
  },
};
```

## I18N Setup
Add these keys to your i18n files:

```typescript
// en.ts
'badge.defaultLabel': 'Badge',
'badge.altText': 'Badge',
'badge.ariaLabel': 'Badge',
'badge.clickMessage': 'Badge clicked!',
'badge.loadingText': 'Loading...',

// vi.ts
'badge.defaultLabel': 'Badge',
'badge.altText': 'Badge',
'badge.ariaLabel': 'Badge',
'badge.clickMessage': 'Đã nhấn Badge!',
'badge.loadingText': 'Đang tải...',
```

## Testing
Run the test component in App.tsx:
```tsx
import { BadgeTest } from './components/atoms/Badge/Badge-test';
```

## Development
This component follows the constants-driven pattern:
1. **Constants**: Define variants, sizes, styles in constants file
2. **Types**: Auto-generated from constants
3. **Component**: Uses config from constants
4. **Easy extension**: Add variants/sizes in one place
