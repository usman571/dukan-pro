---
name: react-query-patterns
description: >
  TanStack React Query v5 patterns for Dukaan Pro.
  Auto-loaded when working with queries.ts, data fetching, or mutations.
triggers:
  - "queries.ts"
  - "useQuery"
  - "useSuspenseQuery"
  - "useMutation"
  - "queryClient"
  - "HydrationBoundary"
---

# React Query Patterns — Dukaan Pro

## Query Key Factory
```typescript
// queries.ts — every feature must have this
export const inventoryKeys = {
  all: ['inventory'] as const,
  list: (filters: ProductFilters) => [...inventoryKeys.all, 'list', filters] as const,
  detail: (id: number) => [...inventoryKeys.all, 'detail', id] as const,
};
```

## Query Options (shared between server + client)
```typescript
export function inventoryQueryOptions(filters: ProductFilters) {
  return queryOptions({
    queryKey: inventoryKeys.list(filters),
    queryFn: () => getProducts(filters),
    staleTime: 60 * 1000,
  });
}
```

## Server Component — Page Pattern
```tsx
// page.tsx
export default async function InventoryPage({ searchParams }: PageProps) {
  const filters = await parseFilters(searchParams);
  const queryClient = getQueryClient();

  // ✅ void — NOT await
  void queryClient.prefetchQuery(inventoryQueryOptions(filters));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<InventorySkeleton />}>
        <InventoryTable filters={filters} />
      </Suspense>
    </HydrationBoundary>
  );
}
```

## Client Component
```tsx
'use client';

function InventoryTable({ filters }: Props): JSX.Element {
  // ✅ useSuspenseQuery — NOT useQuery
  const { data } = useSuspenseQuery(inventoryQueryOptions(filters));

  return <DataTable data={data.products} columns={columns} />;
}
```

## Mutation with Dukaan Pro Toast Messages
```tsx
const mutation = useMutation({
  mutationFn: (data: CreateProductPayload) => createProduct(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
    toast.success('Product add ho gaya'); // Urdu success messages encouraged
  },
  onError: () => {
    toast.error('Kuch ghalat hua. Dobara koshish karein.');
  },
});

<Button isLoading={mutation.isPending} onClick={() => mutation.mutate(data)}>
  Save
</Button>
```

## Sale Mutation (cart → confirmation)
```tsx
const saleMutation = useMutation({
  mutationFn: (data: CreateSalePayload) => createSale(data),
  onSuccess: (sale) => {
    // Invalidate both sales and inventory (stock changed)
    queryClient.invalidateQueries({ queryKey: saleKeys.all });
    queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
    // Navigate to confirmation screen
    router.push(`/dashboard/sales/confirmation/${sale.id}`);
  },
});
```

## Udhaar Payment Mutation
```tsx
const paymentMutation = useMutation({
  mutationFn: ({ customerId, amount }: RecordPaymentPayload) =>
    recordPayment(customerId, amount),
  onSuccess: (_, { customerId }) => {
    // Invalidate customer detail + udhaar list
    queryClient.invalidateQueries({ queryKey: udhaarKeys.detail(customerId) });
    queryClient.invalidateQueries({ queryKey: udhaarKeys.all });
    toast.success('Payment record ho gaya');
  },
});
```

## URL State with Nuqs
```typescript
// Server side (page.tsx):
import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server';

export const inventorySearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(20),
  search: parseAsString.withDefault(''),
  category: parseAsString.withDefault(''),
});

// Client side (filter component):
'use client';
const [search, setSearch] = useQueryState('search', {
  shallow: true, // ✅ no server roundtrip
  defaultValue: '',
});
const [category, setCategory] = useQueryState('category', {
  shallow: true,
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
queryClient.invalidateQueries({ queryKey: ['inventory'] });
// ✅
queryClient.invalidateQueries({ queryKey: inventoryKeys.all });

// ❌ forgetting to invalidate inventory after a sale
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: saleKeys.all }); // only sales
}
// ✅ sales change stock — always invalidate both
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: saleKeys.all });
  queryClient.invalidateQueries({ queryKey: inventoryKeys.all }); // stock updated
}
```
