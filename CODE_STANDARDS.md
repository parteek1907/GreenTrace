# Coding Standards

## General
- Use TypeScript for all new code.
- Write functional components with React Hooks.
- Ensure all code passes `eslint` and `prettier` formatting.

## Architecture
- Use `src/features` for domain-specific logic and UI.
- Use `src/components/ui` strictly for generic, reusable UI components (e.g., buttons, inputs).
- Custom hooks go to `src/hooks`.
- API logic and external services go to `src/services`.

## Testing
- All core calculations (`src/lib/carbon`) must have 100% unit test coverage.
- UI components should be tested using React Testing Library.
- E2E tests are preferred for main workflows (Authentication, Onboarding, Dashboard).
