---
name: project-conventions
description: >
  Coding conventions for this project. Auto-loaded when working with
  .ts or .tsx files, implementing features, or writing components.
triggers:
  - "*.tsx"
  - "*.ts"
  - "component"
  - "feature"
  - "implement"
---

# Project Conventions

## TypeScript
```tsx
// ✅ Explicit return types
function getUsers(): Promise { ... }

// ✅ interface for objects
interface ProductFilters {
  search?: string;
  status?: 'active' | 'inactive';
}

// ✅ type for unions
type Theme = 'vercel' | 'claude' | 'mono';

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
// ✅ Function declaration
// ✅ Named export
// ✅ Props interface = ComponentNameProps

interface ProductCardProps {
  product: Product;
  onEdit: (id: number) => void;
}

function ProductCard({ product, onEdit }: ProductCardProps): JSX.Element {
  return (
    <div className={cn('rounded-lg border', product.active && 'border-green-500')}>
      ...
    
  );
}

export { ProductCard };
```

## className — always cn()
```tsx
// ✅
className={cn('base', condition && 'extra', variant === 'primary' && 'bg-blue-500')}

// ❌ Never
className={`base ${condition ? 'extra' : ''}`}
className={'base ' + extra}
```

## Icons — only via Icons object
```tsx
// ✅
import { Icons } from '@/components/icons';


// ❌ Never
import { IconSearch } from '@tabler/icons-react';
```

## Server vs Client Components
```tsx
// ✅ Server component — no directive (default)
export default function ProductPage() {
  return ...;
}

// ✅ Client — only when needed
'use client';
import { useState } from 'react';

// Add 'use client' ONLY for:
// - useState, useEffect, useReducer
// - Browser APIs (window, document)
// - Third-party client-only libs
```

## PageContainer — always use props
```tsx
// ✅

  {children}


// ❌ Never import Heading manually in pages
```

## Button Loading
```tsx
// ✅
Save
```

## Forms
```tsx
// ✅ useAppForm from tanstack-form
import { useAppForm } from '@/components/ui/tanstack-form';

// ❌ Never useState inside AppField render props
// Extract stateful logic to separate component
```

## Commit Format
```bash
# One file per commit — always
git add src/features/products/api/types.ts
git commit -m "feat(products): Add Product types"

git add src/features/products/api/service.ts
git commit -m "feat(products): Add product service"

# Format: type(scope): description
# Types: feat / fix / refactor / chore / docs
```