# AGENTS.md - Best Practices for JARL

This document outlines the coding standards and best practices for contributing to JARL.

## TypeScript

- **Strict mode is mandatory**: Always enable strict TypeScript checking
- **No `any`**: Use `unknown` or explicit types instead
- **Explicit return types**: Define return types for functions
- **Explicit parameter types**: Define types for function parameters
- **Use utility types**: Prefer `Partial<T>`, `Omit<T>`, `Pick<T>` over manual types

```typescript
// Bad
function foo(x) { return x; }

// Good
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

## React

- **No `React.FC`**: Use destructured props instead
- **Use `useId`**: For unique IDs (SSR-safe)
- **Complete dependencies**: Always include all dependencies in `useCallback` and `useMemo`
- **Fragment shorthand**: Use `<>` instead of `<React.Fragment>`
- **Event handlers**: Type event handlers properly

```tsx
// Bad
const Button: React.FC<{ text: string }> = ({ text }) => (
  <button>{text}</button>
);

// Good
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

## Vanilla Extract

- **Use recipes**: Create variants with `recipe()`
- **Use `createVar`**: For CSS custom properties
- **Zero runtime styles**: Avoid dynamic template literals in styles
- **Theme contracts**: Define theme contracts for type-safe theming

```typescript
import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

const buttonRecipe = recipe({
  base: {
    padding: '8px 16px',
    borderRadius: '4px',
  },
  variants: {
    variant: {
      primary: { backgroundColor: 'blue' },
      secondary: { backgroundColor: 'gray' },
    },
  },
});
```

## Accessibility (WCAG 2.1 AAA)

- **aria-label**: Add labels to icon-only and textless elements
- **Live regions**: Use `useAnnounce` for dynamic content
- **Focus management**: Use `useFocusTrap` for modals
- **VisuallyHidden**: Hide content from visual but keep for screen readers
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible

```tsx
<button aria-label="Close dialog" onClick={onClose}>
  <VisuallyHidden>Close</VisuallyHidden>
  <XIcon />
</button>
```

## Testing

- **Vitest + React Testing Library**: Use for all tests
- **Type tests**: Use `tsd` for type-level tests
- **80% minimum coverage**: Maintain adequate test coverage
- **Accessibility tests**: Use `axe-core` for a11y testing

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
```

## Logging

- **Use `@jarl/logger`**: Use the centralized logger (Pino)
- **Log levels**: Use appropriate levels (trace, debug, info, warn, error, fatal)
- **Structured context**: Include context in each log

```typescript
import { createLogger } from '@jarl/logger';

const logger = createLogger({ name: 'my-component' });

logger.info({ userId: '123' }, 'User logged in');
logger.error({ error }, 'Failed to login');
```

## File Organization

```
packages/
  ${package-name}/
    src/
      index.ts
      ${component}.tsx
      ${component}.types.ts
      ${component}.styles.ts
      ${component}.test.tsx
    package.json
    tsconfig.json
```

## Import Conventions

- Use package aliases: `import { Button } from '@jarl/components';`
- Relative imports for internal files: `./Button.styles`
- Sort imports alphabetically

## Git Commits

- Use Conventional Commits
- Keep commits atomic and focused
- Write descriptive commit messages

## Code Review

- Self-review before opening PRs
- Address all comments
- Keep PRs small and focused
- Include screenshots for UI changes
