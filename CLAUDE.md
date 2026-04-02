# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 boilerplate project built with Vite, TypeScript, and Pinia for state management. The project uses pnpm as the package manager and includes ESLint for code quality.

## Essential Commands

### Development
```bash
pnpm start     # Start development server (alias for pnpm dev)
pnpm dev       # Start Vite development server
pnpm preview   # Preview production build locally
```

### Building
```bash
pnpm build            # Build for production
pnpm staging          # Build for staging environment
```

### Code Quality
```bash
pnpm lint --fix             # Run ESLint with production config
pnpm lint:ts          # Run TypeScript type checking with vue-tsc
```

### Deployment
```bash
pnpm deploy:staging     # Deploy to staging environment
pnpm deploy:production  # Deploy to production environment
```

## Architecture & Key Patterns

### State Management
- Uses Pinia for state management with composition API style stores
- Store files are located in `src/stores/`
- Example: `auth-store.ts` manages authentication state and tokens
- Stores use localStorage for persistent data (see `STORAGE_KEYS` constant)

### HTTP Client
- Uses Alova (not axios) as the HTTP client
- Configuration in `src/utils/alova.ts`
- Automatic token injection from auth store via Authorization header
- Query parameters serialized with qs library using bracket array format
- Custom response/error handling with metadata extraction from `x-` prefixed headers
- Uses @pinia/colada for mutations and query management

### Routing
- Vue Router with typed routes
- Router configuration in `src/router/index.ts`
- Uses HTML5 history mode with configurable base URL from env
- Includes 404 catch-all route

### Component Architecture
- Components organized in `src/components/`
- Views/pages in `src/views/`
- Auto-imports enabled via `unplugin-vue-components`

### Styling
- SCSS with global mixins auto-imported
- Global styles in `src/styles/global.scss`
- Mixins available globally from `src/styles/mixins.scss`

### Environment Configuration
- Environment variables prefixed with `VITE_APP_`
- Key variables:
  - `VITE_APP_PORT`: Development server port
  - `VITE_APP_API_HOST`: Backend API host for proxy
  - `VITE_APP_ROUTER_BASE_URL`: Router base path
  - `VITE_APP_ENV`: Current environment
- Separate `.env` files for development, staging, and production

### Build Configuration
- Vite with Vue plugin
- TypeScript checking integrated into dev server
- ESLint checking during development
- Vue DevTools enabled in development
- Vendor code splitting for better caching
- Chunk size warning limit set to 800KB

### Project Requirements
- Node.js >= 18.0.0
- Uses pnpm exclusively (enforced via preinstall script)
- asdf for version management

## Important Implementation Details

- Path alias `@` maps to `src/` directory
- Auth tokens stored in localStorage with environment-prefixed keys (see `STORAGE_KEYS` constant)
- 401 responses trigger automatic sign-out and redirect to login
- Response metadata extracted from `x-` prefixed headers using snake_case conversion
- Components use directory-based namespace imports via `unplugin-vue-components`
- No test framework currently configured
- Uses `@pinia/colada` for async data management with Pinia stores
- Environment-specific storage keys prevent data conflicts between environments
