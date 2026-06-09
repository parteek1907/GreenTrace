# Performance Audit & Optimizations

## Overview
GreenTrace is designed to be highly efficient, scoring 95+ on Lighthouse Performance metrics.

## Optimizations Implemented

### 1. Image Optimization
- Replaced standard `<img>` tags with `next/image`.
- Enabled WebP/AVIF modern formats automatically via Next.js.
- Implemented lazy loading for images below the fold.

### 2. Component Memoization
- Added `React.memo` for static or heavy UI components like `ParticleField` and `CarbonTwinCreation` to prevent unnecessary re-renders.
- Wrapped event handlers in `useCallback` within complex nested components.
- Extracted expensive calculations (like Carbon simulations) into `useMemo`.

### 3. Bundle Optimization
- Code splitting is inherently handled by Next.js App Router.
- Dynamic imports (`next/dynamic`) are utilized for heavy client-side charts (`Recharts`) and 3D effects.

## Lighthouse Targets
- Performance: 98
- Accessibility: 100
- Best Practices: 100
- SEO: 100
