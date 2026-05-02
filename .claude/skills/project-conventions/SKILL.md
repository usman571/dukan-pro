---
name: project-conventions
description: >
  Coding conventions for Dukaan Pro. Auto-loaded when working with
  .ts or .tsx files, implementing features, or writing components.
triggers:
  - "*.tsx"
  - "*.ts"
  - "component"
  - "feature"
  - "implement"
---

# Dukaan Pro — Project Conventions

## TypeScript
```tsx
// ✅ Explicit return types
function getSales(): Promise<SaleListResponse> { ... }

// ✅ interface for objects
interface ProductFilters {
  search?: string;
  category?: ProductCategory;
  page: number;
  limit: number;
}

// ✅ type for unions
type PaymentMode = 'cash' | 'udhaar';
type ProductCategory = 'Tea' | 'Oil' | 'Dairy' | 'Spices' | 'Snacks' | 'Drinks' | 'Cleaning' | 'Biscuits';

// ✅ Never any — use unknown + narrow
function process(data: unknown): string {
  if (typeof data !== 'string') throw new Error('Expected string');
  return data;
}

// ✅ Path alias always
import { cn } from '@/lib/utils'; // ✅
import { cn } from '../../../lib/utils'; // ❌
```

## Components
```tsx
// ✅ Function declaration + named export + Props interface
interface ProductCardProps {
  product: Product;
  onEdit: (id: number) => void;
}

function ProductCard({ product, onEdit }: ProductCardProps): JSX.Element {
  return (
    <div className={cn('rounded-lg border', product.stock < 10 && 'border-amber-500')}>
      ...
    </div>
  );
}

export { ProductCard };
```

## className — always cn()
```tsx
// ✅
className={cn('base', condition && 'extra', isProfit && 'text-green-500')}

// ❌ Never
className={`base ${condition ? 'extra' : ''}`}
className={'base ' + extra}
```

## Currency — always Rs format
```tsx
// ✅
function formatRs(amount: number): string {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

// ✅ Usage in JSX
<span className="text-green-500">+Rs {profit.toLocaleString('en-PK')}</span>
<span className="text-red-500">Rs {balance.toLocaleString('en-PK')}</span>

// ❌ Never
"₨8,420" | "PKR 8,420" | "8420 Rs"
```

## Color Semantics
```tsx
// ✅ Profit / success / primary CTA
className="text-green-500"       // profit values
className="bg-green-500"         // primary buttons, success badges

// ✅ Udhaar / danger / debt
className="text-red-500"         // outstanding balances
className="bg-red-50"            // danger alert backgrounds

// ✅ Warnings / low stock
className="text-amber-500"       // low stock counts
className="bg-amber-50"          // warning alert backgrounds
```

## Icons — only via Icons object
```tsx
// ✅
import { Icons } from '@/components/icons';
<Icons.search className="h-4 w-4" />

// ❌ Never
import { IconSearch } from '@tabler/icons-react';
```

## Server vs Client Components
```tsx
// ✅ Server component — no directive (default)
export default function InventoryPage() {
  return ...;
}

// ✅ Client — only when needed
'use client';
import { useState } from 'react';

// Add 'use client' ONLY for:
// - useState, useEffect, useReducer
// - Browser APIs (window, document)
// - TanStack Form, TanStack Table interactions
```

## Mobile-First Layout
```tsx
// ✅ Mobile base + desktop upgrade
<div className="space-y-3 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
  ...
</div>

// ✅ Bottom nav clearance (mobile only)
<div className="pb-20 md:pb-0">
  {/* scrollable content */}
</div>

// ✅ Full width on mobile
<div className="w-full md:w-auto">
```

## PageContainer — always use props
```tsx
// ✅
<PageContainer pageTitle="Inventory" pageDescription="12 products · 3 low stock">
  {children}
</PageContainer>

// ❌ Never import Heading manually in pages
```

## Button Loading
```tsx
// ✅
<Button isLoading={mutation.isPending}>Save</Button>
```

## Forms
```tsx
// ✅ useAppForm from tanstack-form
import { useAppForm } from '@/components/ui/tanstack-form';

// ❌ Never useState inside AppField render props
// Extract stateful logic to separate component
```

## Phone Number Validation (Pakistan)
```typescript
// ✅ Pakistani mobile: 11 digits, starts with 03
const phoneSchema = z.string()
  .regex(/^03\d{9}$/, 'Phone must be 11 digits starting with 03');
```

## Commit Format
```bash
# One file per commit — always
git add src/features/inventory/api/types.ts
git commit -m "feat(inventory): Add Product types"

# Format: type(scope): description
# Types: feat / fix / refactor / chore / docs
# Scopes: auth · dashboard · sales · inventory · purchases · udhaar · reports · nav · layout · deps
```
