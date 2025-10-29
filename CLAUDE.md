# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo using pnpm workspaces and Turbo for build orchestration. The repository contains:

- **apps/**: Next.js applications (ai-headshot-generator, mbti, shop, template)
- **packages/**: Shared packages (common-tailwind, test-utils, ui, utils)
- **Root**: Contains monorepo configuration and shared dependencies

## Development Commands

### Building & Development

- `pnpm dev` - Start all apps in development mode via Turbo
- `pnpm build` - Build all packages and apps
- `pnpm build:ui` - Build only the UI package
- `pnpm dev:home` - Start specific app (replace 'home' with app name)
- `pnpm dev:all` - Start all apps concurrently

### Code Quality

- `pnpm lint` - Run linting across all packages
- `pnpm format` - Format code with Prettier across all packages
- `pnpm clean` - Clean build artifacts and node_modules
- `pnpm test` - Run tests across all packages

### Individual App Development

Navigate to specific app directories and run:

- `pnpm dev` - Start development server (ports vary by app)
- `pnpm build` - Build the app
- `pnpm lint` - Lint the app
- `pnpm format` - Format the app

## Architecture Notes

### Monorepo Configuration

- Uses **pnpm workspaces** for package management
- Uses **Turbo** for build orchestration and caching
- Shared packages use `workspace:*` protocol for internal dependencies
- All apps run on different ports (e.g., ai-headshot-generator on 3008)

### Key Technologies

- **Next.js 14.2.5** for applications
- **TypeScript** throughout
- **Tailwind CSS** for styling
- **shadcn/ui** components (via shared ui package)
- **Zustand** for state management
- **ESLint + Prettier** for code quality
- **Husky + lint-staged** for pre-commit hooks

### Shared Packages

- `@mono-repo/ui` - Shared React components
- `@mono-repo/utils` - Utility functions
- `@mono-repo/common-tailwind` - Shared Tailwind configuration
- `@mono-repo/test-utils` - Testing utilities

### Proxy Server

Some apps (like ai-headshot-generator) include proxy servers for API calls to handle CORS and environment variable management.

## Package Management

- Package manager: **pnpm@9.0.0**
- Node version requirement: **>=18**
- Workspace configuration in `pnpm-workspace.yaml`
- Turbo configuration in `turbo.json`

## Code Quality Tools

- Pre-commit hooks via Husky
- Automatic import cleanup with eslint-plugin-unused-imports
- Formatting with Prettier
- Linting with ESLint and Next.js lint rules
