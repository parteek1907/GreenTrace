# Testing Infrastructure

GreenTrace relies on a comprehensive testing suite to ensure high code quality, accurate carbon footprint calculations, and reliable user interactions.

## Frameworks
1. **Unit Testing:** Vitest
2. **Component Testing:** React Testing Library
3. **End-to-End (E2E) Testing:** Playwright

## Coverage Targets
Our goal is to maintain >80% test coverage across the entire platform.
- **Carbon Engine (`src/lib/carbon`):** 100% statement coverage. Due to its critical nature, all algorithms must be validated.
- **UI Components:** Tested for accessibility and correct rendering states.
- **API & Hooks:** Fully integration-tested against mock Supabase instances.

## Running Tests
- **Unit Tests:** `npm run test`
- **E2E Tests:** `npx playwright test`
- **Coverage Report:** `npm run test:coverage` (Requires Vitest coverage module)
