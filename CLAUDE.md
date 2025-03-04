# CLAUDE.md - Project Guidelines

## Build Commands
- Development: `npm run dev` - Start local dev server
- Production: `npm run build` - Build for production
- Development build: `npm run build:dev` - Build with dev mode
- Lint: `npm run lint` - Run ESLint
- Preview: `npm run preview` - Preview production build

## Code Style
- Components: React functional components with arrow functions
- TypeScript: Use types for props, state, and function parameters
- Imports: Group external libraries first, then internal modules using `@/` paths
- Formatting: Follow existing codebase format (2-space indentation)
- State: Use React hooks for local state, React Query for data fetching
- UI: Use shadcn/ui components and Tailwind CSS for styling
- Error handling: Try/catch blocks when needed, form validation with React Hook Form
- Naming: PascalCase for components, camelCase for functions/variables
- File structure: Group by feature in `/components`, `/pages`, `/hooks`, `/lib`

## Tests
No current test setup. When adding, use standard React testing patterns.