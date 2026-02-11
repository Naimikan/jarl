# JARL - Just Another React Library

A modern, accessible, and performant React component library built with React 19, Vanilla Extract, and TypeScript.

## Features

- **Accessible**: WCAG 2.1 AAA compliant with comprehensive a11y utilities
- **Performant**: Zero-runtime styles with Vanilla Extract
- **Type-safe**: Full TypeScript support with strict mode
- **Modular**: Monorepo architecture with pnpm workspaces
- **Well-tested**: Vitest + React Testing Library

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| `@jarl/theme` | Theming system with CSS variables | - |
| `@jarl/a11y` | Accessibility utilities (hooks, helpers) | - |
| `@jarl/logger` | Structured logging with Pino | - |
| `@jarl/react-utils` | React 19 SSR utilities | - |
| `@jarl/utils` | JavaScript utilities | - |
| `@jarl/config` | Shared configurations | - |

## Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Start docs
pnpm docs:dev
```

## Documentation

See the [docs](apps/docs/pages) for detailed documentation.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

MIT
