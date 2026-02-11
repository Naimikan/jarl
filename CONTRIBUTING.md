# Contributing to JARL

Thank you for your interest in contributing to JARL! This document outlines the guidelines for contributing.

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Git

### Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies:

```bash
pnpm install
```

4. Create a branch for your changes:

```bash
git checkout -b feature/my-feature
```

## Development

### Available Commands

| Command | Description |
|---------|-------------|
| `pnpm build` | Build all packages |
| `pnpm dev` | Run dev mode for all packages |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format code with Biome |
| `pnpm test` | Run tests |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm docs:dev` | Start documentation dev server |

### Adding New Components

See the template in `packages/components/template/` for the recommended structure.

### Adding New Packages

1. Create a new directory in `packages/`
2. Add a `package.json` with proper workspace dependencies
3. Add the package to `pnpm-workspace.yaml`
4. Run `pnpm install`

## Code Style

- Use Biome for formatting and linting
- Follow the TypeScript strict mode guidelines
- Write tests for all new functionality
- Update documentation as needed

## Commit Messages

Use Conventional Commits:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Maintenance tasks

## Pull Requests

1. Ensure all CI checks pass
2. Keep PRs focused and small
3. Write clear PR descriptions
4. Link related issues

## Publishing

This project uses Changesets for versioning. To publish:

1. Make your changes
2. Run `npx changeset` to create a changeset
3. Commit and push
4. CI will automatically version and publish on merge to main
