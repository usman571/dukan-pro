# /new-feature-scaffold — Quick Feature Scaffold

Quickly scaffolds the api/ layer for a new Dukaan Pro feature following the canonical pattern.

## Step 1: Ask
1. Feature name? (single word, lowercase: `inventory` `udhaar` `sales` `purchases` `reports`)
2. Which data model? (check CLAUDE.md for: Product, Sale, Customer, Transaction, Purchase)

## Step 2: Create Files in Order

### 1. src/features/<name>/api/types.ts
```typescript
// Base entity — match CLAUDE.md data models exactly
export interface [Name] {
  id: number;
  // fields from CLAUDE.md data model
  createdAt: string;
}

// List response
export interface [Name]ListResponse {
  data: [Name][];
  total: number;
  page: number;
  limit: number;
}

// Filters
export interface [Name]Filters {
  page: number;
  limit: number;
  search?: string;
  // add domain-specific filters (e.g. category for products, paymentMode for sales)
}

// Mutation payloads
export interface Create[Name]Payload {
  // required fields for creation
}

export interface Update[Name]Payload extends Partial<Create[Name]Payload> {
  id: number;
}
```

### 2. src/features/<name>/api/service.ts
```typescript
import type { [Name], [Name]Filters, [Name]ListResponse, Create[Name]Payload } from './types';

// Mock data uses Pakistani context:
// Names: Karim Bhai, Asif Mehmood, Farhana Bibi
// Products: Tapal Danedar, Sufi Oil, Olpers Milk, National Salt
// Amounts: realistic Rs values for kirana (50–5000 range)

export async function get[Name]s(filters: [Name]Filters): Promise<[Name]ListResponse> {
  // TODO: replace with real API call
  return {
    data: [],
    total: 0,
    page: filters.page,
    limit: filters.limit,
  };
}

export async function get[Name](id: number): Promise<[Name]> {
  // TODO: replace with real API call
  throw new Error('Not implemented');
}

export async function create[Name](payload: Create[Name]Payload): Promise<[Name]> {
  // TODO: replace with real API call
  throw new Error('Not implemented');
}

export async function update[Name](id: number, payload: Partial<Create[Name]Payload>): Promise<[Name]> {
  // TODO: replace with real API call
  throw new Error('Not implemented');
}

export async function delete[Name](id: number): Promise<void> {
  // TODO: replace with real API call
  throw new Error('Not implemented');
}
```

### 3. src/features/<name>/api/queries.ts
```typescript
import { queryOptions } from '@tanstack/react-query';
import { get[Name]s, get[Name] } from './service';
import type { [Name]Filters } from './types';

export const [name]Keys = {
  all: ['[name]s'] as const,
  list: (filters: [Name]Filters) => [...[name]Keys.all, 'list', filters] as const,
  detail: (id: number) => [...[name]Keys.all, 'detail', id] as const,
};

export function [name]sQueryOptions(filters: [Name]Filters) {
  return queryOptions({
    queryKey: [name]Keys.list(filters),
    queryFn: () => get[Name]s(filters),
    staleTime: 60 * 1000,
  });
}

export function [name]QueryOptions(id: number) {
  return queryOptions({
    queryKey: [name]Keys.detail(id),
    queryFn: () => get[Name](id),
    staleTime: 5 * 60 * 1000,
  });
}
```

## Step 3: Commit Each File
```bash
git add src/features/<name>/api/types.ts
git commit -m "feat(<name>): Add TypeScript types"

git add src/features/<name>/api/service.ts
git commit -m "feat(<name>): Add service layer"

git add src/features/<name>/api/queries.ts
git commit -m "feat(<name>): Add React Query options"
```

## Step 4: Report
Tell user:
- 3 files created
- Mock data uses Pakistani context (names, products, Rs amounts)
- To add UI: run /feature-dev with the relevant screen refs (M? / D?)
- To connect real backend: only edit service.ts — never touch queries.ts or types.ts for backend changes
