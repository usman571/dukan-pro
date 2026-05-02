---
name: nextjs-patterns
description: >
  Next.js 16 App Router patterns for this project.
  Auto-loaded when working with app/ directory, layouts, pages, or proxy.ts.
triggers:
  - "app/"
  - "layout.tsx"
  - "page.tsx"
  - "proxy.ts"
  - "route handler"
  - "server component"
---

# Next.js 16 App Router Patterns

## IMPORTANT
- Middleware file is `src/proxy.ts` — NOT middleware.ts
- Tailwind v4 uses `@import 'tailwindcss'` — NOT `@tailwind base/components/utilities`
- Linter is oxlint + oxfmt — NOT ESLint/Prettier

## Page Pattern
```tsx
// src/app/dashboard/[feature]/page.tsx
import { getQueryClient } from '@/lib/query-client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import PageContainer from '@/components/layout/page-container';

export const metadata = { title: 'Feature' };

export default async function FeaturePage({ searchParams }: PageProps) {
  const filters = featureSearchParamsCache.parse(await searchParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(featureQueryOptions(filters));

  return (
    <PageContainer
      pageTitle='Feature Name'
      pageDescription='Description here'
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<Skeleton />}>
          <FeatureTable filters={filters} />
        </Suspense>
      </HydrationBoundary>
    </PageContainer>
  );
}
```

## Route Handler Pattern
```typescript
// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
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

## Error Boundary
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
    <div>
      <p>Something went wrong</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## proxy.ts (middleware)
```typescript
// src/proxy.ts — this project's middleware file
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED = ['/dashboard'];
const PUBLIC = ['/auth/sign-in', '/auth/sign-up'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED.some(p => pathname.startsWith(p));
  const session = request.cookies.get('session')?.value;

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

## Adding shadcn Component
```bash
bunx shadcn add [component-name]
# Never modify src/components/ui/ after adding
```

## Image Domains (next.config.ts)
```typescript
// next.config.ts — add external image domains here as needed
// images: { remotePatterns: [{ hostname: 'example.com' }] }
```