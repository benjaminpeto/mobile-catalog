## mobile-catalog

A **Next.js v15** TypeScript application for visualising, searching, and
managing a mobile phones catalog, styled with **styled-components**, unit-tested
with **Vitest**, and linted/formatted under the **Airbnb** guide. Husky ensures
linting, formatting, and type-checking before each commit.

---

## Prerequisites

- **Node.js ≥ 18.18.0**
- **npm** (bundled with Node.js)

---

## Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/benjaminpeto/mobile-catalog.git
   cd mobile-catalog
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Copy `.env.example` and add environmental variables**

4. **Start the server**

   ```bash
   npm run dev
   ```

---

## Available Scripts

| Script               | Description                         |
| -------------------- | ----------------------------------- |
| `npm run dev`        | Start Next.js in development mode   |
| `npm run build`      | Build for production (Webpack)      |
| `npm run start`      | Run the production server           |
| `npm run lint`       | Run ESLint (Airbnb + Next.js)       |
| `npm run lint:fix`   | Auto-fix linting issues             |
| `npm run format`     | Format code with Prettier           |
| `npm run type-check` | Run `tsc -b` for full type checking |
| `npm run test`       | Run unit tests with Vitest          |

---

## Configuration

- **TypeScript** Strict mode, `@/*` path alias, and Next.js’s built-in
  `next.config.ts` support.
- **ESLint** Extends `next/core-web-vitals`, `airbnb`, and Prettier; enforces
  kebab-case filenames.
- **Styled-Components** SSR enabled via `compiler.styledComponents = true` and
  custom `_document.tsx`.
- **Husky** Hooks run `lint`, `format`, and `type-check` before each commit to
  ensure quality.

---

## Project Structure

```
mobile-catalog/
├── .husky
├── src/
│   ├── app/           # Next.js App Router (layouts, pages)
│   ├── components/    # Reusable UI components
│   ├── context/       # Context for global state management
│   ├── hooks/         # Custom React hooks
│   ├── helpers/       # Helper functions
│   ├── lib/           # Libraries
│   └── tests/         # Vitest unit test config -- here I could have include global mocks, but I did not
├── public/            # Static assets
├── eslint.config.mjs  # ESLint config
├── prettier.config.js # Prettier config
├── next.config.ts     # Next.js configuration
├── tsconfig.json      # TypeScript configuration
└── README.md          # This file
```

---

## Core Features

- **Phone Listing**: Grid of the first 20 phones with image, name, brand, and
  price; real-time API search by name/brand; result count indicator.
- **Phone Detail**: Displays selected phone’s name, brand, dynamic image by
  color, storage/color selectors with live price update, specs, and “Add to
  Cart” button (enabled once options chosen).
- **Shopping Cart**: Persistent via `localStorage`, shows items with selected
  variants, unit and total price, item removal, and “Continue Shopping” link.

---

## Testing

- **Vitest** + **@testing-library/react** for unit tests of components, hooks,
  API calls, and utilities.
- Run all tests:

  ```bash
  npm run test
  ```

---
