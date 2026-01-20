# Radio Component

A highly configurable radio component with variants, sizes, status indicators, and i18n support.

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
npm run generate:atom Radio
```

## Usage
```tsx
import { Radio, RadioWithStatus, RadioGroup } from './components/atoms/Radio';

// Basic usage
<Radio variant="primary" size="md">
  Button
</Radio>

// With status indicator
<RadioWithStatus 
  variant="default" 
  size="lg"
  status="online"
>
  Online User
</RadioWithStatus>

// Group of items
<RadioGroup max={3}>
  <Radio variant="primary">Item 1</Radio>
  <Radio variant="secondary">Item 2</Radio>
  <Radio variant="default">Item 3</Radio>
</RadioGroup>
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
// In Radio.constants.ts
export const RADIO_VARIANTS = [
  'default', 
  'primary', 
  'secondary',
  'success', // 👈 Add new variant
] as const;

export const RADIO_VARIANT_CONFIG = {
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
// In Radio.constants.ts
export const RADIO_SIZES = [
  'xs', 'sm', 'md', 'lg', 'xl',
  'xxl' // 👈 Add new size
] as const;

export const RADIO_SIZE_CONFIG = {
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
'radio.defaultLabel': 'Radio',
'radio.altText': 'Radio',
'radio.ariaLabel': 'Radio',
'radio.clickMessage': 'Radio clicked!',
'radio.loadingText': 'Loading...',

// vi.ts
'radio.defaultLabel': 'Radio',
'radio.altText': 'Radio',
'radio.ariaLabel': 'Radio',
'radio.clickMessage': 'Đã nhấn Radio!',
'radio.loadingText': 'Đang tải...',
```

## Testing
Run the test component in App.tsx:
```tsx
import { RadioTest } from './components/atoms/Radio/Radio-test';
```

## Development
This component follows the constants-driven pattern:
1. **Constants**: Define variants, sizes, styles in constants file
2. **Types**: Auto-generated from constants
3. **Component**: Uses config from constants
4. **Easy extension**: Add variants/sizes in one place
