---
name: nextjs-patterns
description: >
  Next.js 16 App Router patterns for Dukaan Pro.
  Auto-loaded when working with app/ directory, layouts, pages, or proxy.ts.
triggers:
  - "app/"
  - "layout.tsx"
  - "page.tsx"
  - "proxy.ts"
  - "route handler"
  - "server component"
---

# Next.js 16 App Router Patterns — Dukaan Pro

## IMPORTANT
- Middleware file is `src/proxy.ts` — NOT middleware.ts
- Tailwind v4 uses `@import 'tailwindcss'` — NOT `@tailwind base/components/utilities`
- Linter is oxlint + oxfmt — NOT ESLint/Prettier
- Auth: NextAuth v5 — `src/auth.ts` + `src/app/api/auth/[...nextauth]/route.ts`
- No Sentry, no Clerk

## Page Pattern
```tsx
// src/app/dashboard/inventory/page.tsx
import { getQueryClient } from '@/lib/query-client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import PageContainer from '@/components/layout/page-container';
import { inventoryQueryOptions } from '@/features/inventory/api/queries';

export const metadata = { title: 'Inventory | Dukaan Pro' };

export default async function InventoryPage({ searchParams }: PageProps) {
  const filters = inventorySearchParamsCache.parse(await searchParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(inventoryQueryOptions(filters)); // void NOT await

  return (
    <PageContainer
      pageTitle="Inventory"
      pageDescription="Apne products manage karein"
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<InventorySkeleton />}>
          <InventoryTable filters={filters} />
        </Suspense>
      </HydrationBoundary>
    </PageContainer>
  );
}
```

## Route Handler Pattern
```typescript
// src/app/api/inventory/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
  search: z.string().optional(),
  category: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const params = schema.parse(
      Object.fromEntries(request.nextUrl.searchParams)
    );
    const data = await getProducts(params);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

## Error Boundary (No Sentry)
```tsx
// src/app/dashboard/[feature]/error.tsx
'use client';
export default function FeatureError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <p className="text-destructive">Kuch ghalat hua. Dobara koshish karein.</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## proxy.ts (Middleware + Auth Guard)
```typescript
// src/proxy.ts
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');
  const isOnAuth = req.nextUrl.pathname.startsWith('/auth');

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  if (isOnAuth && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard/overview', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

## Auth Pattern (NextAuth v5 Credentials)
```typescript
// src/auth.ts — credentials with phone+password
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phone: { label: 'Phone', type: 'tel' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // validate against service layer
        const user = await validateUser(credentials);
        return user ?? null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
});
```

## Adding shadcn Component
```bash
bunx shadcn add [component-name]
# Never modify src/components/ui/ after adding
```

## Image Domains (next.config.ts)
```typescript
// next.config.ts — add external image domains here
// images: { remotePatterns: [{ hostname: 'example.com' }] }
```

## Clearing Build Cache
```bash
# When instrumentation or layout errors appear after file deletion:
rm -rf .next
bun run dev
```
