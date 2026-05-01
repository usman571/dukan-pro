# CLAUDE.md — Next Shadcn Dashboard Starter

## Project Stack
- **Framework**: Next.js 16 (App Router) — middleware is `src/proxy.ts` NOT middleware.ts
- **Language**: TypeScript 5.7 (strict mode)
- **Styling**: Tailwind CSS v4 (`@import 'tailwindcss'` syntax)
- **UI**: shadcn/ui New York style, zinc base
- **Linting**: oxlint + oxfmt (NOT ESLint/Prettier)
- **Package Manager**: Bun only — ignore package-lock.json
- **State**: Zustand (UI), TanStack Query (server), Nuqs (URL)
- **Forms**: TanStack Form + Zod via `useAppForm`
- **Tables**: TanStack Table
- **Auth**: Clerk (being removed)
- **Error Tracking**: Sentry (gated by NEXT_PUBLIC_SENTRY_DISABLED)

## Project Structure
src/
├── app/              # Next.js App Router pages
├── features/         # ALL new feature code goes here
│   ├── products/     # Canonical api/ pattern reference
│   ├── users/        # Canonical api/ pattern reference
│   └── ...others
├── components/
│   ├── ui/           # shadcn — NEVER modify directly
│   └── icons.tsx     # ONLY icon source
├── config/
│   └── nav-config.ts
├── hooks/
├── lib/
└── styles/

## Feature API Pattern (Mandatory for every feature)
src/features/<name>/api/
types.ts    ← define first, everything depends on this
service.ts  ← ONLY file to change when connecting real backend
queries.ts  ← query key factory + queryOptions

## React Query Pattern
```tsx
// SERVER (page.tsx):
void queryClient.prefetchQuery(featureQueryOptions(filters)); // void NOT await

return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<Skeleton />}>
      <FeatureTable />
    </Suspense>
  </HydrationBoundary>
);

// CLIENT component:
const { data } = useSuspenseQuery(featureQueryOptions(filters)); // NOT useQuery
```

## Commit Format
feat(products): Add category filter
fix(nav): Fix active state on refresh
refactor(auth): Remove Clerk dependency
chore(deps): Remove @clerk/nextjs

## CRITICAL RULES

1. **Icons** — ONLY `import { Icons } from '@/components/icons'` — never import `@tabler/icons-react` directly
2. **className** — ALWAYS `cn()` from `@/lib/utils` — never string concatenation
3. **Server components** — default, add `'use client'` only for hooks/browser APIs
4. **No `any`** — use proper TypeScript types always
5. **shadcn/ui** — never modify `src/components/ui/` — extend only
6. **Linting** — `bun run lint` before every commit
7. **One file per commit** — never `git add .`
8. **Feature structure** — always `types.ts` → `service.ts` → `queries.ts`
9. **Prefetch** — `void queryClient.prefetchQuery()` never `await`
10. **Query hooks** — `useSuspenseQuery` not `useQuery` for prefetched data
11. **Page headers** — always use `PageContainer` props (`pageTitle`, `pageDescription`) — never import `<Heading>` manually
12. **Forms** — use `useAppForm` from `@/components/ui/tanstack-form` — never `useState` inside `AppField` render props
13. **Button loading** — use `<Button isLoading={isPending}>` pattern
14. **Data layer** — never import from `@/constants/mock-api*` directly in components — always go through service layer

## DO NOT
- ❌ Import icons from `@tabler/icons-react` directly
- ❌ Modify `src/components/ui/` files
- ❌ Use `any` TypeScript type
- ❌ Use `await` with prefetchQuery — use `void`
- ❌ Use `useQuery` where `useSuspenseQuery` should be
- ❌ Bundle multiple files in one commit
- ❌ Use `console.log` in production code
- ❌ Import from `@/constants/mock-api*` in components
- ❌ Use Clerk APIs (being removed)