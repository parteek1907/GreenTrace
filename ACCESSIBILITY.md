# Accessibility Compliance (WCAG AA)

GreenTrace is built with inclusive design principles to ensure usability for all users, targeting WCAG 2.1 AA compliance.

## Strategies Implemented

### 1. Semantic HTML
We rely on native semantic elements (`<nav>`, `<main>`, `<article>`, `<section>`, `<button>`) to construct the layout, ensuring screen readers can correctly interpret the document structure.

### 2. Component Primitives
Interactive components (Accordions, Tabs, Dialogs) are built using accessible primitives from **Radix UI** and **Ark UI**.
These libraries automatically handle:
- `aria-expanded`, `aria-controls`, `aria-hidden` attributes.
- Keyboard navigation (Arrow keys, Space, Enter, Escape).
- Focus management and trapping (where applicable).

### 3. Keyboard Navigation
- All interactive elements are reachable via `Tab`.
- Focus states are explicitly styled using `focus-visible:outline-2 focus-visible:outline-gt-primary` to avoid relying solely on default browser outlines, ensuring high contrast focus indicators.
- We implemented a `FocusRail` with arrow-key support.

### 4. Color Contrast
- The UI palette (`gt-primary`, `gt-dark`, etc.) has been audited to guarantee a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.
- Text over images is protected with gradient overlays to maintain readability.

### 5. Media & Animations
- Images have descriptive `alt` tags. Decorative images use `alt=""` or `role="presentation"`.
- We respect `prefers-reduced-motion` natively through Framer Motion and CSS media queries, disabling heavy 3D transforms if the user opts out.
