# Agent Directives for Design OS

Design OS is a **product planning and design tool** that helps users define their product vision, structure their data model, design their UI, and prepare export packages for implementation in a separate codebase.

> **Important**: Design OS is a planning tool, not the end product codebase. The screen designs and components generated here are meant to be exported and integrated into your actual product's codebase.

---

## Build Commands

```bash
npm run dev          # Start development server (port 3000)
npm run build        # TypeScript build + Vite production build
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

**No test command** - This codebase does not have a test suite.

---

## Code Style Guidelines

### Imports & File Structure
- Use absolute imports with `@/*` alias (e.g., `@/components/ui/card`)
- Group imports: external libraries first, then internal imports
- Co-locate components in `components/` folders with `index.ts` for exports
- Define types in `types/` folder, utilities in `lib/` folder

### TypeScript
- Use explicit interfaces for all component props
- Use `React.ComponentProps<"button">` for extending native element props
- Prefer `type` over `interface` for unions, `interface` for objects
- Use `type` imports with TypeScript (e.g., `import { type VariantProps }`)

### Component Style
```tsx
interface ComponentProps {
  // Props definition
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Hooks first
  const [state, setState] = useState()

  // Helper functions
  const helper = () => { ... }

  // Event handlers
  const handleClick = () => { ... }

  // Render
  return <div>...</div>
}
```

### Formatting
- 2-space indentation
- Double quotes for strings
- Trailing commas in multi-line objects/arrays
- Single-line components: no braces for return
- Multi-line JSX: parentheses around return value

### Naming Conventions
- Components: PascalCase (`HotelCard`, `DesignPage`)
- Functions/variables: camelCase (`loadProductData`, `formatPrice`)
- Types/interfaces: PascalCase (`ProductOverview`, `HotelCardProps`)
- Constants: UPPER_SNAKE_CASE (rare, only for truly global constants)
- Event handlers: `handle*` prefix (`handleClick`, `handleSubmit`)

### Styling (Tailwind CSS v4)
- Use `@import "tailwindcss"` (not v3)
- **Never** create/modify `tailwind.config.js` - Tailwind v4 uses CSS
- Use built-in Tailwind utility classes and colors (e.g., `stone-500`, `lime-400`)
- Use `dark:` variants for all colors (light + dark mode support)
- Use responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Combine classes with `cn()` helper from `@/lib/utils` (uses clsx + tailwind-merge)

### Error Handling
- Use try-catch for JSON parsing and file operations
- Return `null` or empty objects on errors (avoid throwing in loaders)
- Use optional chaining (`?.`) and nullish coalescing (`??`)

### Comments
- JSDoc comments for exported functions with parameters/return types
- Inline comments for complex logic only
- No comments for obvious code

### React Patterns
- Use functional components with hooks
- Destructure props in function signature
- Use `useMemo` for expensive computations
- Use callback refs or stable functions for event handlers passed to children

### Radix UI & shadcn/ui
- Use Radix UI primitives for complex interactive components
- Follow shadcn/ui patterns for reusable UI components
- Use `class-variance-authority` (cva) for component variants
- Use `data-slot` attribute for Radix Slot components

---

## Understanding Design OS Context

When working in Design OS, be aware of two distinct contexts:

### 1. Design OS Application
The React application that displays and manages planning files. When modifying the Design OS UI itself:
- Files live in `src/` (components, pages, utilities)
- Uses the Design OS design system (stone palette, DM Sans, etc.)
- Provides the interface for viewing specs, screen designs, exports, etc.

### 2. Product Design (Screen Designs & Exports)
The product you're planning and designing. When creating screen designs and exports:
- Screen design components live in `src/sections/[section-name]/` and `src/shell/`
- Product definition files live in `product/`
- Exports are packaged to `product-plan/` for integration into a separate codebase
- Follow the design requirements specified in each section's spec

---

## Design Requirements

- **Mobile Responsive**: Use responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- **Light & Dark Mode**: Use `dark:` variants for all colors
- **Props-Based Components**: Exportable components must accept data via props, never import data directly
- **No Navigation in Section Screen Designs**: Section components should not include navigation chrome (shell handles it)

---

## The Planning Flow

1. Product Overview → `product/product-overview.md`
2. Product Roadmap → `product/product-roadmap.md`
3. Data Model → `product/data-model/data-model.md`
4. Design System → `product/design-system/colors.json`, `typography.json`, elements.json
5. Application Shell → `product/shell/spec.md`, `src/shell/components/`
6. For each section: spec, data, screen designs, screenshots
7. Export → `product-plan/` with complete handoff package
