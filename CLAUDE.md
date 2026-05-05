# CLAUDE.md — Dukaan Pro

## Project Identity
- **App**: Dukaan Pro — PWA shop-management for Pakistani kirana store owners
- **Tagline**: "Apni dukaan, apni jeb mein"
- **Users**: Small shop owners in Pakistan — mobile-first, bilingual (Urdu + English)
- **Type**: Progressive Web App (mobile 320×640 + desktop 1280×800)

## Tech Stack
- **Framework**: Next.js 16 (App Router) — middleware is `src/proxy.ts` NOT middleware.ts
- **Language**: TypeScript 5.7 (strict mode)
- **Styling**: Tailwind CSS v4 (`@import 'tailwindcss'` syntax)
- **UI**: shadcn/ui New York style, zinc base
- **Linting**: oxlint + oxfmt (NOT ESLint/Prettier)
- **Package Manager**: Bun only — ignore package-lock.json
- **State**: Zustand (UI), TanStack Query (server), Nuqs (URL)
- **Forms**: TanStack Form + Zod via `useAppForm`
- **Tables**: TanStack Table
- **Auth**: NextAuth v5 — Credentials provider (email + password, no OTP)
- **Forgot Password**: Email magic link (no SMS/OTP) — `sendResetEmail()` in service.ts
- **Error Tracking**: None (Sentry removed)

## Design System

### Colors
```css
--ink-900: #0D1117    /* dark background — primary bg */
--green:   #10B981    /* profit, success, primary CTA */
--red:     #EF4444    /* udhaar, danger, debt */
--amber:   #F59E0B    /* low stock, warnings */
```
- Green → profit values, success states, primary buttons
- Red → udhaar balances, debt amounts, danger actions
- Amber → low stock alerts, warnings
- All amounts: `Rs X,XXX` format (no ₨ symbol, always "Rs")

### Layout
| Platform | Viewport | Navigation |
|----------|----------|------------|
| Mobile | 320×640 | Bottom nav: Home · Stock · Udhaar · Reports + center FAB (+) |
| Desktop | 1280×800 | Left sidebar: logo, nav items, user at bottom |

### Typography
- Font: System UI
- Scale: 9–28pt
- Headings: weight 700–800
- Bilingual: English UI labels + Urdu taglines/messages in proper Urdu script

## Project Structure
```
src/
├── app/
│   ├── auth/            # Auth pages (URL: /auth/sign-in etc.)
│   │   ├── sign-in/     # A1: Login
│   │   ├── sign-up/     # A2: Create account (A3 OTP skipped)
│   │   ├── success/     # A4: Signup success
│   │   ├── forgot-password/  # A5: Forgot password (email magic link)
│   │   └── reset-password/   # A6: Reset password
│   └── dashboard/       # Protected app pages
│       ├── overview/    # M1/D2: Dashboard — KPIs, low-stock, recent sales
│       ├── sales/       # M2/M3/D3: New sale + confirmation + POS
│       ├── inventory/   # M4/M5/D4: Product list + add product
│       ├── purchases/   # M6: Record purchase
│       ├── udhaar/      # M7/M8/D5: Udhaar khaata + customer detail
│       │   └── [customerId]/ # M8: Customer detail page
│       └── reports/     # M9/D6: Reports
├── features/            # ALL new feature code goes here
│   ├── inventory/       # Products — canonical api/ pattern
│   ├── customers/       # Users — canonical api/ pattern
│   ├── sales/
│   ├── udhaar/
│   ├── purchases/
│   ├── reports/
│   └── auth/
├── components/
│   ├── ui/              # shadcn — NEVER modify directly
│   ├── layout/          # AppSidebar, BottomNav, Header
│   └── icons.tsx        # ONLY icon source
├── config/
│   └── nav-config.ts
├── hooks/
├── lib/
└── styles/
```

## Data Models
```typescript
interface Shop {
  id: string;
  name: string;         // e.g. "Karim Kiryana Store"
  ownerName: string;
  phone: string;        // Pakistani format: 03XX XXXXXXX
  city: string;
}

interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  brand: string;
  buyPrice: number;     // in Rs
  sellPrice: number;    // in Rs
  stock: number;
  lowStockThreshold: number;  // default 10
}

type ProductCategory =
  | 'Tea' | 'Oil' | 'Dairy' | 'Spices'
  | 'Snacks' | 'Drinks' | 'Cleaning' | 'Biscuits';

interface Sale {
  id: number;
  items: SaleItem[];
  total: number;
  profit: number;
  paymentMode: 'cash' | 'udhaar';
  customerId?: number;  // null = walk-in
  createdAt: string;
}

interface SaleItem {
  productId: number;
  productName: string;
  qty: number;
  sellPrice: number;
  buyPrice: number;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  balance: number;      // outstanding udhaar — positive = owes you
  createdAt: string;
}

interface Transaction {
  id: number;
  customerId: number;
  type: 'sale' | 'payment';
  amount: number;       // negative for sale, positive for payment
  items?: SaleItem[];
  note?: string;
  createdAt: string;
}

interface Purchase {
  id: number;
  supplier: string;
  items: PurchaseItem[];
  total: number;
  paidAmount: number;
  createdAt: string;
}

interface PurchaseItem {
  productId: number;
  productName: string;
  qty: number;
  costEach: number;
}
```

## App Screens Reference (from design PDF)
```
AUTH                    MOBILE APP        DESKTOP PWA
A1 Login                M1 Dashboard      D1 Login (split screen)
A2 Create account       M2 New sale       D2 Dashboard
A3 OTP ← SKIPPED        M3 Confirmation   D3 New sale (POS)
A4 Signup success       M4 Inventory      D4 Inventory table
A5 Forgot password      M5 Add product    D5 Udhaar dashboard
A6 Reset password       M6 Purchase       D6 Reports
                        M7 Udhaar list
                        M8 Customer detail
                        M9 Reports
```

### Auth Flow Details
- **A1 Login**: Email + password → dashboard
- **A2 Signup**: Shop name, Owner name, Phone, City, Email, Password → A4 (skip A3)
- **A3 OTP**: ❌ SKIPPED — not implemented
- **A4 Success**: Green screen — "Record first sale" / "Skip to dashboard"
- **A5 Forgot**: User enters email → magic link sent → email client → A6
- **A6 Reset**: New password + confirm → A1 (login)
- **D1 Desktop Login**: Split screen — marketing pane (left) + form (right)

### Signup Fields (A2)
```typescript
interface SignUpFormValues {
  shopName: string;      // "Karim Kiryana Store"
  ownerName: string;     // "Karim Bhai"
  phone: string;         // 03XX XXXXXXX format
  city: string;          // "Lahore"
  email: string;         // for magic link / account recovery
  password: string;      // min 6 characters
}
```

## Feature API Pattern (Mandatory for every feature)
```
src/features/<name>/api/
  types.ts    ← define first, everything depends on this
  service.ts  ← ONLY file to change when connecting real backend
  queries.ts  ← query key factory + queryOptions
```

## React Query Pattern
```tsx
// SERVER (page.tsx):
void queryClient.prefetchQuery(featureQueryOptions(filters)); // void NOT await

return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<Skeleton />}>
      <FeatureTable filters={filters} />
    </Suspense>
  </HydrationBoundary>
);

// CLIENT component:
const { data } = useSuspenseQuery(featureQueryOptions(filters)); // NOT useQuery
```

## Currency Formatting
```typescript
// ✅ Always this format
"Rs 8,420"      // KPI values
"Rs 1,280"      // amounts
"+Rs 180"       // profit (with + prefix, green color)
"−Rs 1,240"     // udhaar deduction (with − prefix, red color)

// ✅ Utility
function formatRs(amount: number): string {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

// ❌ Never
"₨8420" | "PKR 8,420" | "8420 Rs"
```

## Mobile-First Rules
- Every component must work at 320px width minimum
- Bottom nav on mobile: 5 items (Home, Stock, +FAB, Udhaar, Reports)
- FAB (+) is center item — opens New Sale
- Use `md:` breakpoint to switch to desktop sidebar layout
- Touch targets minimum 44×44px
- No hover-only interactions

## Bilingual Pattern
```tsx
// Page headers and navigation: English
// Taglines, success messages, descriptions: Urdu script
// ✅ Correct
<h1>Dashboard</h1>
<p className="text-muted-foreground">Asalaam-o-Alaikum, Karim Bhai</p>

// ✅ Urdu text — use proper script, right-to-left when needed
<p dir="auto">Apni dukaan, apni jeb mein.</p>
```

## Commit Format
```
feat(inventory): Add product category filter
fix(udhaar): Fix balance calculation on payment
refactor(sales): Extract cart logic to hook
chore(deps): Remove @dnd-kit packages
```
Scopes: `auth` · `dashboard` · `sales` · `inventory` · `purchases` · `udhaar` · `reports` · `nav` · `layout` · `deps`

## Build Phases (Agreed Order)

### Phase 1 — Foundation (Auth + Layout)
1. **Auth pages** — A1, A2, A4, A5, A6 + D1 desktop split
2. **Layout** — Mobile bottom nav (5 items) + Desktop sidebar restructure
3. **Nav config** — Dukaan Pro nav items

### Phase 2 — Core Business Features
4. **Dashboard** (M1 + D2) — KPIs, low-stock alert, recent sales
5. **Inventory** (M4 + M5 + D4) — Product list, add product, data table
6. **Sales** (M2 + M3 + D3) — Cart, confirmation, POS layout
7. **Udhaar** (M7 + M8 + D5) — Khaata list, customer detail, dashboard

### Phase 3 — Supporting Features
8. **Purchases** (M6) — Supplier, line items, paid/balance
9. **Reports** (M9 + D6) — Period selector, charts, top products

**Data Strategy**: Mock data via service layer — `service.ts` is the only file to swap when real backend arrives.

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
14. **Currency** — always `Rs X,XXX` format — never ₨ or PKR
15. **Mobile-first** — every component must render correctly at 320px
16. **Data layer** — never import from `@/constants/mock-api*` in components — always go through service layer
17. **No Sentry** — removed, do not re-add
18. **No Clerk** — removed, use NextAuth v5 credentials only

## DO NOT
- ❌ Import icons from `@tabler/icons-react` directly
- ❌ Modify `src/components/ui/` files
- ❌ Use `any` TypeScript type
- ❌ Use `await` with prefetchQuery — use `void`
- ❌ Use `useQuery` where `useSuspenseQuery` should be
- ❌ Bundle multiple files in one commit
- ❌ Use `console.log` in production code
- ❌ Import from `@/constants/mock-api*` in components
- ❌ Use Clerk or Sentry APIs
- ❌ Use ₨ or PKR — use "Rs" prefix only
- ❌ Build desktop-only components without 320px mobile fallback
- ❌ Hardcode Pakistani phone numbers without validation (must be 11 digits, start with 03)
