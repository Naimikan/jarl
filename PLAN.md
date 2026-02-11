📋 PLAN FINAL COMPLETO: JARL - Just Another React Library
---
🎯 OBJETIVO
Crear un monorepo moderno y listo para usar con toda la infraestructura configurada para desarrollar una biblioteca de componentes React siguiendo las mejores prácticas actuales.
---
📦 ESTRUCTURA DE DIRECTORIOS
jarl/
├── apps/
│   ├── docs/                           # Documentación (Nextra)
│   │   ├── pages/
│   │   │   ├── _meta.json
│   │   │   ├── index.mdx
│   │   │   ├── getting-started.mdx
│   │   │   └── guides/
│   │   ├── theme.config.tsx
│   │   ├── next.config.js
│   │   └── package.json
│   └── playground/                     # Playground (vacío, listo)
├── packages/
│   ├── theme/                          # Sistema de theming
│   │   ├── src/
│   │   │   ├── vars/
│   │   │   │   ├── colors.ts
│   │   │   │   ├── typography.ts
│   │   │   │   └── spacing.ts
│   │   │   ├── themes/
│   │   │   │   ├── default.ts
│   │   │   │   └── dark.ts
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── a11y/                          # WCAG 2.1 AAA helpers
│   │   ├── src/
│   │   │   ├── aria.ts
│   │   │   ├── focus.ts
│   │   │   ├── keyboard.ts
│   │   │   ├── live-region.ts
│   │   │   ├── screen-reader.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useAriaAttributes.ts
│   │   │   │   ├── useFocusable.ts
│   │   │   │   ├── useAnnounce.ts
│   │   │   │   ├── useFocusTrap.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── logger/                        # Pino logging
│   │   ├── src/
│   │   │   ├── Logger.ts
│   │   │   ├── transports/
│   │   │   │   └── console.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── react-utils/                   # SSR + React 19 hooks
│   │   ├── src/
│   │   │   ├── hooks/
│   │   │   │   ├── useIsomorphicEffect.ts
│   │   │   │   ├── useId.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── utils/                         # js-utils base (vacío)
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── components/                    # Carpeta de componentes
│   │   └── template/                  # Template de ejemplo
│   │       ├── src/
│   │       │   ├── index.ts
│   │       │   ├── Button.tsx
│   │       │   ├── Button.types.ts
│   │       │   ├── Button.props.ts
│   │       │   ├── Button.styles.ts
│   │       │   ├── Button.recipe.ts
│   │       │   └── index.test.tsx
│   │       ├── package.json
│   │       ├── tsconfig.json
│   │       ├── README.md
│   │       └── CHANGELOG.md
│   └── config/                        # Configs compartidos
│       ├── eslint/
│       ├── typescript/
│       ├── vitest/
│       └── biome/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── release.yml
│       └── deploy-docs.yml
├── .changeset/
│   └── config.json
├── .vscode/
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json
├── pnpm-workspace.yaml
├── turbo.json
├── biome.json
├── tsconfig.json
├── tsconfig.base.json
├── package.json
├── .nvmrc
├── .gitignore
├── README.md
├── CONTRIBUTING.md
├── AGENTS.md
└── LICENSE
---
🔧 TECNOLOGÍAS
| Categoría | Herramienta |
|-----------|-------------|
| Package Manager | pnpm 9.x |
| Build System | tsup 8.x + Turborepo 2.x |
| Linting/Formatting | Biome |
| Testing | Vitest 2.x + Testing Library |
| Types | TypeScript 5.6+ (strict) |
| Framework | React 19.x |
| Styles | @vanilla-extract/css + recipes |
| Docs | Nextra 4.x (Next.js 15.x) |
| Logging | Pino 9.x |
| Versioning | Changesets |
| Hosting | GitHub Pages |
---
📄 ARCHIVOS A CREAR
| Archivo | Propósito |
|---------|-----------|
| package.json | Raíz con pnpm workspaces + scripts |
| pnpm-workspace.yaml | Definición de workspaces |
| turbo.json | Build caching |
| tsconfig.base.json | TypeScript strict base |
| tsconfig.json | Raíz con paths aliases |
| biome.json | Linting + formatting |
| .nvmrc | Node 20+ |
| .gitignore | Git ignore estándar |
| .changeset/config.json | Versionado automático |
| .github/workflows/ci.yml | CI pipeline |
| .github/workflows/release.yml | Release pipeline |
| .github/workflows/deploy-docs.yml | GitHub Pages deploy |
| .vscode/settings.json | VS Code settings |
| .vscode/extensions.json | Extensions recomendadas |
| .vscode/launch.json | Debug config |
| README.md | Documentación principal |
| CONTRIBUTING.md | Guía de contribución |
| AGENTS.md | Reglas de buenas prácticas |
---
📁 PAQUETES INCLUIDOS
| Paquete | Descripción | Contenido |
|---------|-------------|-----------|
| @jarl/theme | Sistema de theming Vanilla Extract | CSS Variables, temas (light/dark), ThemeProvider |
| @jarl/a11y | Helpers WCAG 2.1 AAA | useAriaAttributes, useFocusTrap, useAnnounce, etc. |
| @jarl/logger | Logging estructurado con Pino | Logger configurado, transports |
| @jarl/react-utils | Hooks SSR + React 19 | useIsomorphicEffect, useId |
| @jarl/utils | Utilidades JS (vacío) | Listo para añadir funciones |
| @jarl/config/* | Configs compartidos | ESLint, TypeScript, Vitest, Biome |
| @jarl/docs | Documentación Nextra | Configurado para GitHub Pages |
| @jarl/template | Template de componente | Estructura completa lista para duplicar |
---
✅ REGLAS DE BUENAS PRÁCTICAS (AGENTS.md)
TypeScript
- Strict mode obligatorio
- no any prohibido
- Tipos explícitos en funciones
- Utility types para abstracciones
React
- Destructuración de props obligatoria (sin React.FC)
- useId para IDs únicos (SSR-safe)
- useCallback y useMemo con dependencias completas
- Fragment shorthand <>
Vanilla Extract
- Recipes para variantes
- CSS Variables con createVar
- Zero runtime styles (sin template literals dinámicos)
Accesibilidad (WCAG 2.1 AAA)
- aria-label en iconos y elementos sin texto
- Live regions con useAnnounce
- Focus management con useFocusTrap
- VisuallyHidden para screen readers
- Keyboard navigation completa
Testing
- Vitest + Testing Library
- Type tests con tsd
- Coverage mínimo 80%
- Tests de accesibilidad con axe-core
Logging
- Usar @jarl/logger (Pino)
- Niveles: trace, debug, info, warn, error, fatal
- Contexto estructurado en cada log
---
🚀 COMANDOS DISPONIBLES
pnpm install              # Instalar dependencias
pnpm build               # Compilar todos los paquetes
pnpm build --filter @jarl/button  # Compilar paquete específico
pnpm test                 # Ejecutar tests
pnpm test --filter @jarl/button    # Tests de paquete
pnpm lint                 # Verificar linting
pnpm typecheck           # Verificar tipos TypeScript
pnpm docs:dev            # Docs en modo desarrollo
pnpm docs:build          # Compilar docs para producción
pnpm changeset           # Crear changeset
pnpm changeset version   # Versionar cambios
pnpm changeset publish   # Publicar paquetes
---
📊 QUÉ INCLUYE VS CODE
| Configuración | Valor |
|---------------|-------|
| Format on save | Activado |
| Biome como formatter | Principal |
| Biome como linter | Principal |
| TypeScript import | Non-relative |
| Búsqueda | Excluye node_modules, dist, .turbo |
Extensiones recomendadas:
- Biome
- ESLint
- Prettier
- Code Spell Checker
- ES7+ React Snippets
- Auto Rename Tag
- Nuxtxt
- Tailwind CSS IntelliSense
---
🎯 QUÉ NO INCLUYE (Scope Controlado)
| Elemento | Razón |
|----------|-------|
| Storybook | Añadir después, cuando haya componentes |
| Chromatic | Dependencia de Storybook |
| Migración de Gearz | Scope inicial controlado |
| Playwright E2E | Demasiado early |
| Visual regression | Añadir después |
---
⏱️ ESTIMACIÓN DE SETUP
| Tarea | Tiempo |
|-------|--------|
| Crear estructura + configs | 2-3 horas |
| Configurar CI/CD | 30 minutos |
| Configurar GitHub Pages | 15 minutos |
| Documentación + AGENTS | 1 hora |
| Total | ~5 horas |
---
📝 PRÓXIMOS PASOS
Una vez creado el repositorio:
1. Fork/Clone el repositorio
2. Personalizar package.json (nombre, author, etc.)
3. Escribir tu primer componente usando el template
4. Probar el template
5. Duplicar el template para más componentes
6. Escribir docs en /apps/docs/pages/
---

