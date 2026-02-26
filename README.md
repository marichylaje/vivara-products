# Vivara Products – Frontend Technical Test

## Overview

React + TypeScript application consuming the DummyJSON API.

Features implemented:

- Paginated products table
- Full-text search
- Category filtering
- Product detail view
- Full CRUD (create, edit, delete)
- Local persistence for write operations
- Unit tests (Vitest)
- E2E tests (Playwright)

The focus of this implementation is clean architecture, scalability, and pragmatic frontend design.

---

## Tech Stack

- React (latest)
- TypeScript (strict)
- Vite
- React Router
- TanStack Query (React Query)
- Styled-components
- Vitest + Testing Library
- Playwright

---

## Architecture

Feature-sliced layered structure:

src/

- app/ → Providers, router, global styles
- pages/ → Route-level composition
- features/ → User actions (forms, modals, filters)
- entities/ → Domain logic (Product, API, persistence)
- shared/ → UI kit and reusable utilities

Dependency direction:

app → pages → features → entities → shared

This keeps responsibilities isolated and prevents tight coupling.

---

## Data & State Management

All remote data is handled via React Query.

- Centralized query keys
- Cache invalidation after mutations
- Query-based pagination
- Error & loading states

---

## CRUD Strategy

DummyJSON does not persist writes.

To simulate real backend behavior:

- All create/update/delete operations are stored in localStorage
- Server data is patched locally using:
  - created
  - updated
  - deleted

This ensures:

- UI behaves as if writes were persisted
- Data survives page refresh
- No fake server-side PUT/DELETE calls

---

## Search & Filters

- Search and category filters are mutually exclusive (intentional simplification)
- List state (search, category, page) persists across navigation

---

## Styling

Styled-components with typed theme:

- Centralized design tokens
- Responsive layout
- Mobile-friendly table behavior
- Thumbnail rendering in detail view

---

## Testing

### Unit Tests (Vitest)

- ProductsPage (CRUD + filters)
- ProductDetailsPage
- local persistence logic
- Debounce hook
- Form validation

### E2E Tests (Playwright)

- App loads
- Navigation to detail
- Product creation flow

---

## Running the Project

Install:

npm install

Dev server:

npm run dev

Build:

npm run build

---

## Running Tests

Unit tests:

npm run test

E2E tests:

npx playwright install
npm run test:e2e

---

## Key Decisions

- React Query used as single source of remote truth
- No global state manager (not required)
- Local persistence to simulate real backend writes
- Architecture designed for scalability and maintainability

---

## Possible Improvements

- Optimistic UI updates
- Improved accessibility
- MSW for fully isolated API mocking
- CI pipeline
- Performance audit

---

This implementation prioritizes clarity, maintainability, and realistic frontend architecture over unnecessary complexity.
