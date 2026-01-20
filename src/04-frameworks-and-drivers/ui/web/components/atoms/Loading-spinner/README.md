# Loading-spinner Component

A highly configurable loading-spinner component with variants, sizes, status indicators, and i18n support.

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
npm run generate:atom Loading-spinner
```

## Usage
```tsx
import { Loading-spinner, Loading-spinnerWithStatus, Loading-spinnerGroup } from './components/atoms/Loading-spinner';

// Basic usage
<Loading-spinner variant="primary" size="md">
  Button
</Loading-spinner>

// With status indicator
<Loading-spinnerWithStatus 
  variant="default" 
  size="lg"
  status="online"
>
  Online User
</Loading-spinnerWithStatus>

// Group of items
<Loading-spinnerGroup max={3}>
  <Loading-spinner variant="primary">Item 1</Loading-spinner>
  <Loading-spinner variant="secondary">Item 2</Loading-spinner>
  <Loading-spinner variant="default">Item 3</Loading-spinner>
</Loading-spinnerGroup>
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
// In Loading-spinner.constants.ts
export const LOADING-SPINNER_VARIANTS = [
  'default', 
  'primary', 
  'secondary',
  'success', // 👈 Add new variant
] as const;

export const LOADING-SPINNER_VARIANT_CONFIG = {
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
// In Loading-spinner.constants.ts
export const LOADING-SPINNER_SIZES = [
  'xs', 'sm', 'md', 'lg', 'xl',
  'xxl' // 👈 Add new size
] as const;

export const LOADING-SPINNER_SIZE_CONFIG = {
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
'loading-spinner.defaultLabel': 'Loading-spinner',
'loading-spinner.altText': 'Loading-spinner',
'loading-spinner.ariaLabel': 'Loading-spinner',
'loading-spinner.clickMessage': 'Loading-spinner clicked!',
'loading-spinner.loadingText': 'Loading...',

// vi.ts
'loading-spinner.defaultLabel': 'Loading-spinner',
'loading-spinner.altText': 'Loading-spinner',
'loading-spinner.ariaLabel': 'Loading-spinner',
'loading-spinner.clickMessage': 'Đã nhấn Loading-spinner!',
'loading-spinner.loadingText': 'Đang tải...',
```

## Testing
Run the test component in App.tsx:
```tsx
import { Loading-spinnerTest } from './components/atoms/Loading-spinner/Loading-spinner-test';
```

## Development
This component follows the constants-driven pattern:
1. **Constants**: Define variants, sizes, styles in constants file
2. **Types**: Auto-generated from constants
3. **Component**: Uses config from constants
4. **Easy extension**: Add variants/sizes in one place
