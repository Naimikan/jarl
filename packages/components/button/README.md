# @jarl/button

Accessible button component for React.

## Installation

```bash
pnpm add @jarl/button
```

## Usage

```tsx
import { Button } from '@jarl/button';

function App () {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style of the button |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the button |
| isLoading | `boolean` | `false` | Shows loading state |
| disabled | `boolean` | `false` | Disables the button |

## Examples

### Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Loading state

```tsx
<Button isLoading>Loading...</Button>
```

## Accessibility

- Uses native `<button>` element
- Supports keyboard navigation
- Includes focus styles
- Loading state uses `aria-busy`
