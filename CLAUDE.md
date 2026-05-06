# CLAUDE.md — Dukaan Pro

## Project Identity
- **App**: Dukaan Pro — PWA shop-management for small business owners in Pakistan (grocery, mobile phones, clothing, hardware, electronics, and more)
- **Tagline**: "Your shop, in your pocket."
- **Users**: Small shop owners in Pakistan — mobile-first, English UI
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
- **Auth**: NextAuth v5 — Credentials provider (identifier = email OR phone + password, no OTP)
- **Forgot Password**: Email magic link (no SMS/OTP) — `sendResetEmail()` in service.ts
- **Error Tracking**: None (Sentry removed)

## Design System

### Colors
Use the shadcn/ui semantic color tokens — the active theme (zinc, slate, etc.) determines the actual values. Never hardcode hex values.

| Purpose | Tailwind class |
|---------|---------------|
| Primary CTA, success bg | `bg-primary` / `text-primary` |
| Danger, debt amounts | `bg-destructive` / `text-destructive` |
| Page background | `bg-background` |
| Card / panel background | `bg-card` |
| Secondary surfaces | `bg-muted` |
| Subtle / secondary text | `text-muted-foreground` |
| Foreground on primary bg | `text-primary-foreground` |
| Borders | `border-border` |

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
- Language: English only throughout the UI

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
  name: string;         // e.g. "Ahmed Electronics"
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
  shopName: string;      // "Ahmed Electronics" — any business type
  ownerName: string;     // "Ahmed Khan"
  phone: string;         // 03XX XXXXXXX format — mandatory
  email: string;         // mandatory — used for sign-in and password reset
  city: string;          // "Lahore"
  password: string;      // min 6 characters
}
```

### Sign-In (A1)
- Identifier field accepts **email OR phone number** — user can sign in with either
- NextAuth `authorize()` calls `getDbUserByIdentifier()` which resolves by email or phone

## Feature File Hierarchy (Mandatory — mirrors src/features/inventory/)

Every feature MUST follow this exact structure:

```
src/features/<name>/
  api/
    types.ts          ← define first; InventoryFilters uses page/limit/search/categories
    service.ts        ← returns { items: T[], total: number } — ONLY file to swap for real backend
    queries.ts        ← queryOptions() factory; no staleTime unless required
    mutations.ts      ← mutationOptions() objects ONLY — never custom hooks
  schemas/
    <name>.ts         ← zod schema + FormValues type (number fields use number | undefined)
  constants/
    <name>-options.ts ← categoryOptions for form SelectField: { value, label }[]
  components/
    <name>-tables/
      options.tsx     ← CATEGORY_OPTIONS for DataTableFacetedFilter: { value, label }[]
      columns.tsx     ← ColumnDef[] with DataTableColumnHeader + meta for filterable cols
      cell-action.tsx ← DropdownMenu + AlertModal for row actions (useMutation spread)
      index.tsx       ← 'use client': useQueryStates + useSuspenseQuery + useDataTable + DataTable
    <name>-listing.tsx ← SERVER component: searchParamsCache.get() + prefetchQuery + HydrationBoundary
    <name>-form.tsx    ← 'use client': Card + CardHeader + CardContent + useFormFields<T>()

src/app/dashboard/<name>/
  page.tsx            ← async server: searchParamsCache.parse() + dual mobile/desktop layout
  new/page.tsx        ← PageContainer + <Form /> (default export from features)
```

Canonical reference: `src/features/inventory/` — use this as the template for every new feature.

## Table Pattern (Mandatory — use DataTable, never raw useReactTable)

```tsx
// columns.tsx
export const columns: ColumnDef<Item>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
    meta: { label: 'Name', placeholder: 'Search...', variant: 'text' },
    enableColumnFilter: true
  },
  {
    id: 'category',
    enableSorting: false,
    meta: { label: 'Category', variant: 'multiSelect', options: CATEGORY_OPTIONS },
    enableColumnFilter: true
  },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> }
];

// index.tsx (client component)
const columnIds = columns.map((c) => c.id).filter(Boolean) as string[];

export function FeatureTable() {
  const [params] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    name: parseAsString,
    category: parseAsString,
    sort: getSortingStateParser(columnIds).withDefault([])
  });

  const filters = {
    page: params.page, limit: params.perPage,
    ...(params.name && { search: params.name }),
    ...(params.category && { categories: params.category })
  };

  const { data } = useSuspenseQuery(featureQueryOptions(filters));
  const pageCount = Math.ceil(data.total / params.perPage);

  const { table } = useDataTable({
    data: data.items, columns, pageCount,
    shallow: true, debounceMs: 500,
    initialState: { columnPinning: { right: ['actions'] } }
  });

  return <DataTable table={table}><DataTableToolbar table={table} /></DataTable>;
}
```

## Mutations Pattern (mutationOptions — never custom hooks)

```ts
// mutations.ts
export const addItemMutation = mutationOptions({
  mutationFn: (data: AddItemInput) => createItem(data),
  onSuccess: () => getQueryClient().invalidateQueries({ queryKey: featureKeys.all })
});

export const deleteItemMutation = mutationOptions({
  mutationFn: (id: number) => deleteItem(id),
  onSuccess: () => getQueryClient().invalidateQueries({ queryKey: featureKeys.all })
});

// In components — always spread:
const mutation = useMutation({ ...addItemMutation, onSuccess: () => { toast.success('...'); } });
```

## Form Pattern (useFormFields — never raw AppField for standard inputs)

```tsx
// schema.ts
export const featureSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.number({ message: 'Required' }).positive()
});
export type FeatureFormValues = { name: string; category: string; price: number | undefined };

// form.tsx ('use client')
export default function FeatureForm() {
  const { FormTextField, FormSelectField } = useFormFields<FeatureFormValues>();

  const form = useAppForm({
    defaultValues: { name: '', category: '', price: undefined } as FeatureFormValues,
    validators: { onSubmit: featureSchema },
    onSubmit: ({ value }) => mutation.mutate(value)
  });

  return (
    <Card className='mx-auto w-full'>
      <CardHeader><CardTitle>Add Item</CardTitle></CardHeader>
      <CardContent>
        <form.AppForm>
          <form.Form className='space-y-6'>
            <FormTextField name='name' label='Name' required />
            <FormSelectField name='category' label='Category' required options={categoryOptions} />
            <FormTextField name='price' label='Price (Rs)' required type='number' />
            <form.SubmitButton>Save</form.SubmitButton>
          </form.Form>
        </form.AppForm>
      </CardContent>
    </Card>
  );
}
```

## Server Listing + Page Pattern

```tsx
// <name>-listing.tsx (server component — no 'use client')
export default function FeatureListingPage() {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = { page, limit: pageLimit, ...(search && { search }), ...(categories && { categories }) };
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(featureQueryOptions(filters));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeatureTable />
    </HydrationBoundary>
  );
}

// page.tsx (async server component)
// IMPORTANT: md:h-full wrapper is required so DataTable's absolute inset-0
// scroll area gets a real height from the sidebar layout's flex chain.
export default async function FeaturePage(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <div className='md:flex md:h-full md:flex-col'>
      {/* Mobile: card list with local state */}
      <div className='md:hidden'>
        <FeatureMobileView />
      </div>
      {/* Desktop: server-driven DataTable — flex-1 passes height to DataTable */}
      <div className='hidden md:flex md:flex-1 md:flex-col'>
        <PageContainer pageTitle='...' pageDescription='...' pageHeaderAction={<Link>...</Link>}>
          <FeatureListingPage />
        </PageContainer>
      </div>
    </div>
  );
}
```

## React Query Pattern

```tsx
// Prefetch (server listing component):
void queryClient.prefetchQuery(featureQueryOptions(filters)); // void NOT await

// Client table component:
const { data } = useSuspenseQuery(featureQueryOptions(filters)); // NOT useQuery

// Mobile view (no SSR, self-fetching):
const { data, isLoading } = useQuery(featureQueryOptions({ page: 1, limit: 100 }));
```

## Starter Kit First — Core Principle

**The starter kit IS the implementation.** When building any Dukaan Pro screen:

1. **Design PDF gives you**: content, labels, field names, order, layout flow, what data to show
2. **Starter kit gives you**: every component, every pattern, every styling decision

This means: if the design shows a table → use `DataTable`. If it shows a form → use `useFormFields`. If it shows a filter → use `DataTableFacetedFilter`. If it shows a card list → use `Card` + starter kit layout. **Never build a custom implementation of something the starter kit already provides.**

### Starter Kit → Dukaan Pro Mapping

| Design element | Always use |
|---------------|------------|
| Any data table | `DataTable` + `useDataTable` + `DataTableToolbar` |
| Any form | `useFormFields<T>()` + `useAppForm` + `Card` + `CardContent` |
| Any dropdown/menu | `DropdownMenu` from shadcn |
| Any category filter (desktop) | `DataTableFacetedFilter` |
| Any category filter (mobile) | `ToggleGroup` chips |
| Any modal/confirm | `AlertModal` from `@/components/modal/alert-modal` |
| Any sheet/drawer | `Sheet` from shadcn |
| Any page header | `PageContainer` with `pageTitle` + `pageDescription` props |
| Any icon | `Icons` from `@/components/icons` — never direct tabler imports |
| Any loading state | `<Button isLoading={isPending}>` or skeleton components |
| Any server data list | `HydrationBoundary` + `useSuspenseQuery` (desktop table) / `useQuery` (mobile) |

### Reference Examples (src/features/forms/ — DO NOT DELETE)
The `src/features/forms/` folder contains starter kit form pattern demos. Before building any form, check these for the correct pattern:
- `sheet-form-demo.tsx` — form inside Sheet
- `multi-step-product-form.tsx` — multi-step wizard
- `advanced-form-patterns.tsx` — linked fields, async validation, dynamic rows

## Design Rule
The design PDF defines **content, order, and flow only** — not which component to use.
- Table in design → always `DataTable` + `useDataTable` (never raw `useReactTable`)
- Dropdown in design → always `DropdownMenu` from shadcn
- Form fields in design → always `FormTextField` / `FormSelectField` via `useFormFields<T>()`
- Category filter in design → `DataTableFacetedFilter` on desktop, `ToggleGroup` chips on mobile
- Never replace starter kit components with custom implementations

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

## Language Rule
English only — no Urdu strings anywhere in the UI. All labels, messages, toasts, placeholders, and descriptions must be in English.

## Commit Format
```
feat(inventory): Add product category filter
fix(udhaar): Fix balance calculation on payment
refactor(sales): Extract cart logic to hook
chore(deps): Remove @dnd-kit packages
```
Scopes: `auth` · `dashboard` · `sales` · `inventory` · `purchases` · `udhaar` · `reports` · `nav` · `layout` · `deps`

## Build Phases (Agreed Order)

### Phase 1 — Foundation (Auth + Layout) ✅ COMPLETE
1. **Auth pages** — A1, A2, A4, A5, A6 + D1 desktop split ✅
2. **Layout** — Mobile bottom nav (5 items) + Desktop sidebar restructure ✅
3. **Nav config** — Dukaan Pro nav items ✅

#### Phase 1 Implementation Notes
- Bottom nav: `src/components/layout/bottom-nav.tsx` — `md:hidden`, 5 tabs + center FAB
- Nav items: Dashboard · Inventory · Purchases · Udhaar · Reports (in `src/config/nav-config.ts`)
- Sidebar header: logo + "Dukaan Pro" + `session.user.shopName` (in `app-sidebar.tsx`)
- Header: original SearchInput + ThemeSelector + ThemeModeToggle preserved, bell + "New sale" button added on right (desktop only)
- Auth left pane: `bg-foreground text-background` for dark contrast (D1 split screen)
- `shopName` threaded through NextAuth JWT → session (`src/auth.ts`, `src/types/next-auth.d.ts`)

### Phase 2 — Core Business Features
4. **Dashboard** (M1 + D2) — KPIs, low-stock alert, recent sales ✅
5. **Inventory** (M4 + M5 + D4) — Product list, add product, data table ✅
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
8. **Feature structure** — always `types.ts` → `service.ts` → `queries.ts` → `mutations.ts` + `schemas/` + `constants/` + `<name>-tables/`
9. **Prefetch** — `void queryClient.prefetchQuery()` never `await`
10. **Query hooks** — `useSuspenseQuery` in table client components; `useQuery` in mobile self-fetching views
11. **Page headers** — always use `PageContainer` props (`pageTitle`, `pageDescription`) — never import `<Heading>` manually
12. **Forms** — use `useFormFields<FormValues>()` from `@/components/ui/tanstack-form` + `Card` + `CardContent` wrapper; never raw `AppField` for standard inputs
13. **Mutations** — always `mutationOptions()` objects in `mutations.ts`; spread with `useMutation({ ...xyzMutation, onSuccess: ... })` in components — never write custom `useXxx` mutation hooks
14. **Tables** — always `DataTable` + `DataTableToolbar` + `useDataTable` from starter kit; never raw `useReactTable` with manual table markup
15. **Button loading** — use `<Button isLoading={isPending}>` pattern
16. **Currency** — always `Rs X,XXX` format — never ₨ or PKR
17. **Mobile-first** — every component must render correctly at 320px
18. **Data layer** — never import from `@/constants/mock-api*` in components — always go through service layer
19. **No Sentry** — removed, do not re-add
20. **No Clerk** — removed, use NextAuth v5 credentials only
21. **No hardcoded colors** — never use hex values or arbitrary Tailwind brackets (`bg-[#...]`) — always use shadcn semantic tokens: `bg-primary`, `text-primary`, `text-primary-foreground`, `text-destructive`, `bg-background`, `bg-card`, `bg-muted`, `text-muted-foreground`, `border-border`
22. **English only** — no Urdu strings, no `dir="auto"`, no bilingual copy anywhere in the UI
23. **Page layout** — dual mobile/desktop pages must wrap in `<div className='md:flex md:h-full md:flex-col'>` — this gives `DataTable`'s `absolute inset-0` scroll area a real height from the sidebar flex chain
24. **Design interpretation** — design PDF defines content, order, and flow only; always use the starter kit component (DataTable, FormSelectField, DropdownMenu, etc.) — never build custom replacements

## DO NOT
- ❌ Import icons from `@tabler/icons-react` directly
- ❌ Modify `src/components/ui/` files
- ❌ Use `any` TypeScript type
- ❌ Use `await` with prefetchQuery — use `void`
- ❌ Use raw `useReactTable` — always use `useDataTable` hook
- ❌ Write custom mutation hooks — always use `mutationOptions()` + spread
- ❌ Use raw `AppField` render props for standard inputs — use `useFormFields<T>()`
- ❌ Build forms without `Card` + `CardContent` wrapper
- ❌ Bundle multiple files in one commit
- ❌ Use `console.log` in production code
- ❌ Import from `@/constants/mock-api*` in components
- ❌ Use Clerk or Sentry APIs
- ❌ Use ₨ or PKR — use "Rs" prefix only
- ❌ Build desktop-only components without 320px mobile fallback
- ❌ Hardcode Pakistani phone numbers without validation (must be 11 digits, start with 03)
- ❌ Use hardcoded hex colors or `bg-[#...]` — use `bg-primary`, `text-primary`, `text-destructive`, `bg-muted`, `bg-card` etc.
- ❌ Use Urdu strings or `dir="auto"` — English only
- ❌ Use specific personal names in placeholders/examples — use generic names like "Ahmed Khan", "Sara Ali", "Example Shop" instead of "Karim Bhai", "Karim Kiryana Store"
- ❌ Assume kiryana/grocery context — the app is for any small retail business (mobile phones, clothing, hardware, electronics, etc.)
- ❌ Wrap `PageContainer` in a plain `hidden md:block` div — use `hidden md:flex md:flex-1 md:flex-col` to preserve the flex height chain
- ❌ Build a custom component when the starter kit already has one — always check `src/components/ui/`, `src/components/modal/`, and `src/features/forms/` before writing new UI code
- ❌ Interpret design screens as component specs — designs define WHAT to show (fields, labels, data), not HOW to build it (starter kit defines the how)
- ❌ Delete or modify `src/features/forms/` — it is the canonical form pattern reference for Dukaan Pro
