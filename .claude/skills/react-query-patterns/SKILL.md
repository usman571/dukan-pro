---
name: react-query-patterns
description: >
  TanStack React Query v5 patterns for this project.
  Auto-loaded when working with queries.ts, data fetching, or mutations.
triggers:
  - "queries.ts"
  - "useQuery"
  - "useSuspenseQuery"
  - "useMutation"
  - "queryClient"
  - "HydrationBoundary"
---

# React Query Patterns

## Query Key Factory
```typescript
// queries.ts — every feature must have this
export const productKeys = {
  all: ['products'] as const,
  list: (filters: ProductFilters) => [...productKeys.all, 'list', filters] as const,
  detail: (id: number) => [...productKeys.all, 'detail', id] as const,
};
```

## Query Options (shared between server + client)
```typescript
export function productsQueryOptions(filters: ProductFilters) {
  return queryOptions({
    queryKey: productKeys.list(filters),
    queryFn: () => getProducts(filters),
    staleTime: 60 * 1000,
  });
}
```

## Server Component — Page Pattern
```tsx
// page.tsx
export default async function ProductsPage({ searchParams }: PageProps) {
  const filters = await parseFilters(searchParams);
  const queryClient = getQueryClient();

  // ✅ void — NOT await
  void queryClient.prefetchQuery(productsQueryOptions(filters));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductTable filters={filters} />
      </Suspense>
    </HydrationBoundary>
  );
}
```

## Client Component
```tsx
'use client';

function ProductTable({ filters }: Props): JSX.Element {
  // ✅ useSuspenseQuery — NOT useQuery
  const { data } = useSuspenseQuery(productsQueryOptions(filters));

  return <DataTable data={data.products} columns={columns} />;
}
```

## Mutation
```tsx
const mutation = useMutation({
  mutationFn: (data: CreateProductPayload) => createProduct(data),
  onSuccess: () => {
    // ✅ Invalidate by key hierarchy
    queryClient.invalidateQueries({ queryKey: productKeys.all });
    toast.success('Created');
  },
  onError: () => {
    toast.error('Failed');
  },
});

<Button isLoading={mutation.isPending} onClick={() => mutation.mutate(data)}>
  Save
</Button>
```

## URL State with Nuqs
```typescript
// Server side (page.tsx):
import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server';

export const productSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  search: parseAsString.withDefault(''),
});

// Client side (filter component):
'use client';
const [search, setSearch] = useQueryState('search', {
  shallow: true, // ✅ no server roundtrip
  defaultValue: '',
});
```

## Common Mistakes
```tsx
// ❌ await blocks streaming
await queryClient.prefetchQuery(options);
// ✅
void queryClient.prefetchQuery(options);

// ❌ useQuery doesn't work with Suspense
const { data, isLoading } = useQuery(options);
// ✅
const { data } = useSuspenseQuery(options);

// ❌ hardcoded keys
queryClient.invalidateQueries({ queryKey: ['products'] });
// ✅
queryClient.invalidateQueries({ queryKey: productKeys.all });
```